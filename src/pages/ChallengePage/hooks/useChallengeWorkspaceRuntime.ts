import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { editor as MonacoEditor } from "monaco-editor";

import { usePyodideWorkerRuntime } from "../../../features/pythonRunner";
import { useAuthStore } from "../../../store/useAuthStore";
import { usePythonStore } from "../../../store/usePythonStore";
import { useThemeStore } from "../../../store/useThemeStore";
import type { PositioningData } from "../../../types";
import type { RoadNetwork } from "../../../utils/parseRoadNetwork";
import {
  PATHFINDING_CHALLENGE_ID,
  POSITIONING_CHALLENGE_ID,
} from "../../../constants/challenge";
import { useChallengeContextCode } from "./useChallengeContextCode";
import { useEditorDecorations } from "./useEditorDecorations";
import type { Challenge } from "../challenges";
import type { TestResult } from "../useChallengeRunner";

type MessageApi = {
  loading: (content: string, duration?: number) => void;
  success: (content: string, duration?: number) => void;
  error: (content: string, duration?: number) => void;
  info: (content: string, duration?: number) => void;
};

export function useChallengeWorkspaceRuntime(args: {
  challenge: Challenge;
  mode: "practice" | "exam";
  initialCode?: string;
  roadNetwork: RoadNetwork | null;
  positioningData: PositioningData | null;
  onCodeChange?: (code: string) => void;
  messageApi: MessageApi;
}) {
  const {
    challenge,
    mode,
    initialCode,
    roadNetwork,
    positioningData,
    onCodeChange,
    messageApi,
  } = args;

  const isPracticeRoute = mode === "practice";
  const themeId = useThemeStore((state) => state.themeId);
  const memberName = useAuthStore((state) => state.user?.task?.memberName);
  const teamName = useAuthStore((state) => state.user?.team?.name);
  const isPathfindingChallenge = challenge.id === PATHFINDING_CHALLENGE_ID;
  const isPositioningChallenge = challenge.id === POSITIONING_CHALLENGE_ID;
  const testCasesRef = useRef(challenge.testCases);
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const appliedCodeRef = useRef<string | null>(null);

  const {
    code,
    setCode,
    contextCode,
    setContextCode,
    breakpoints,
    toggleBreakpoint,
    setBreakpoints,
    isRunning,
    currentLine,
    hoverLine,
    setHoverLine,
    pausedDepth,
    output,
    setGraphData,
    setGraphResult,
    setRoadNetwork,
    setVariableScopes,
    setCurrentLine,
    setIsPaused,
    setPositioningData,
    setPositioningResult,
    debugMode,
    setDebugMode,
    debugStartCoord,
    setDebugStartCoord,
    debugEndCoord,
    setDebugEndCoord,
    setChallengeMode,
  } = usePythonStore();

  const [results, setResults] = useState<TestResult[] | null>(null);

  const applyCodeToEditor = useCallback(
    (nextCode: string) => {
      setCode(nextCode);
      onCodeChange?.(nextCode);
      if (editorRef.current) {
        editorRef.current.setValue(nextCode);
      }
    },
    [onCodeChange, setCode],
  );

  const handleCodeChange = useCallback(
    (nextCode: string) => {
      setCode(nextCode);
      onCodeChange?.(nextCode);
    },
    [onCodeChange, setCode],
  );

  const clearGraphState = useCallback(() => {
    setGraphData(null);
    setGraphResult(null);
    setRoadNetwork(null);
  }, [setGraphData, setGraphResult, setRoadNetwork]);

  const clearPositioningState = useCallback(() => {
    setPositioningData(null);
    setPositioningResult(null);
  }, [setPositioningData, setPositioningResult]);

  const resetEditorRuntimeState = useCallback(() => {
    setBreakpoints([]);
    setResults(null);
    setVariableScopes([]);
    setCurrentLine(null);
    setIsPaused(false);
  }, [setBreakpoints, setCurrentLine, setIsPaused, setVariableScopes]);

  useEffect(() => {
    setChallengeMode(isPracticeRoute);
  }, [isPracticeRoute, setChallengeMode]);

  useEffect(() => {
    testCasesRef.current = challenge.testCases;
  }, [challenge.testCases]);

  useEffect(() => {
    const nextCode = initialCode ?? challenge.starterCode;
    const appliedKey = `${challenge.id}:${nextCode}`;
    if (appliedCodeRef.current === appliedKey) {
      return;
    }

    appliedCodeRef.current = appliedKey;
    applyCodeToEditor(nextCode);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resetEditorRuntimeState();
    setContextCode("");
  }, [applyCodeToEditor, challenge.id, challenge.starterCode, initialCode, resetEditorRuntimeState, setContextCode]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resetEditorRuntimeState();

    if (isPathfindingChallenge) {
      setRoadNetwork(roadNetwork);
      setGraphResult(null);
      clearPositioningState();
      return;
    }

    if (isPositioningChallenge) {
      setPositioningData(positioningData);
      setPositioningResult(null);
      clearGraphState();
      return;
    }

    clearGraphState();
    clearPositioningState();
  }, [
    challenge.id,
    clearGraphState,
    clearPositioningState,
    isPathfindingChallenge,
    isPositioningChallenge,
    positioningData,
    resetEditorRuntimeState,
    roadNetwork,
    setGraphResult,
    setPositioningData,
    setPositioningResult,
    setRoadNetwork,
  ]);

  const effectiveContextCode = useChallengeContextCode({
    testCases: challenge.testCases,
    contextCode,
    roadNetwork,
    positioningData,
    debugMode,
    debugStartCoord,
    debugEndCoord,
    isPathfindingChallenge,
    isPositioningChallenge,
  });

  const enabledBreakpointLines = useMemo(
    () => breakpoints.filter((b) => b.enabled).map((b) => b.line),
    [breakpoints],
  );

  const { clearEditorRunError, showEditorRunError, handleEditorMount } = useEditorDecorations({
    editorRef,
    breakpoints,
    currentLine,
    hoverLine,
    toggleBreakpoint,
    setHoverLine,
  });

  const {
    depsLoading,
    basePackages,
    loadedPackages,
    loadExtraPackages,
    runCode,
    continueExec,
    stepOver,
    stepInto,
    stepOut,
    stopExec,
  } = usePyodideWorkerRuntime({
    code,
    contextCode: effectiveContextCode,
    enabledBreakpointLines,
    clearEditorRunError,
    showEditorRunError,
    messageApi,
  });

  useEffect(() => {
    const resultLine = output.find((line) => line.startsWith("__RESULTS__:"));
    if (!resultLine) {
      return;
    }

    try {
      const parsed: { passed: boolean; actual: string; expected: string }[] = JSON.parse(
        resultLine.slice("__RESULTS__:".length),
      );
      setResults(
        parsed.map((result, index) => ({
          ...result,
          description: testCasesRef.current[index]?.description ?? `测试 ${index + 1}`,
        })),
      );
    } catch {
      // ignore parse failure
    }
  }, [output]);

  const baseDepth = Math.max(1, pausedDepth);
  const handleStepOver = useCallback(() => stepOver(baseDepth), [baseDepth, stepOver]);
  const handleStepInto = useCallback(() => stepInto(baseDepth), [baseDepth, stepInto]);
  const handleStepOut = useCallback(() => stepOut(baseDepth), [baseDepth, stepOut]);

  const handleDebugModeChange = useCallback(
    (enabled: boolean) => {
      setDebugMode(enabled);
      setGraphResult(null);
      if (!enabled) {
        setDebugStartCoord(null);
        setDebugEndCoord(null);
      }
    },
    [setDebugEndCoord, setDebugMode, setDebugStartCoord, setGraphResult],
  );

  const consoleOutput = useMemo(
    () => output.filter((line) => !line.startsWith("__RESULTS__:")),
    [output],
  );
  const passedCount = results?.filter((result) => result.passed).length ?? 0;
  const totalCount = results?.length ?? 0;
  const allPassed = results !== null && totalCount > 0 && passedCount === totalCount;
  const hasContext = contextCode.trim().length > 0;

  return {
    isPracticeRoute,
    themeId,
    memberName,
    teamName,
    isPathfindingChallenge,
    isPositioningChallenge,
    code,
    contextCode,
    setContextCode,
    debugMode,
    handleDebugModeChange,
    isRunning,
    depsLoading,
    basePackages,
    loadedPackages,
    loadExtraPackages,
    runCode,
    continueExec,
    handleStepOver,
    handleStepInto,
    handleStepOut,
    stopExec,
    handleCodeChange,
    applyCodeToEditor,
    handleEditorMount,
    results,
    consoleOutput,
    passedCount,
    totalCount,
    allPassed,
    hasContext,
  };
}

