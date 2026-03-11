import { useMemo } from "react";
import { Tag } from "antd";
import DebugPanelStack, { type DebugPanel } from "../../components/DebugPanelStack";
import BreakpointPanel from "./BreakpointPanel";
import OutputPanel from "./OutputPanel";
import VariablePanel from "./VariablePanel";
import MapPanel from "../../components/MapPanel";
import GraphPanel from "../../components/GraphPanel";
import {
  MAP_DEBUG_PANEL_TAB,
  POSITIONING_DEBUG_PANEL_TAB,
  type ChallengePanelTab,
} from "../../constants/challenge";
import type { RunStatus } from "../../types";
import { usePythonStore } from "../../store/usePythonStore";
import type { RoadNetwork } from "../../utils/parseRoadNetwork";

function formatDurationMs(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "";
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function OutputPanelTitle({ status, durationMs }: { status: RunStatus; durationMs: number | null }) {
  const statusNode =
    status === "running" ? <Tag color="processing" className="text-xs">运行中</Tag>
    : status === "success" ? <Tag color="success" className="text-xs">成功</Tag>
    : status === "error" ? <Tag color="error" className="text-xs">失败</Tag>
    : null;
  const durationText = status === "success" && durationMs !== null ? formatDurationMs(durationMs) : "";
  return (
    <>
      <span className="shrink-0">输出</span>
      {statusNode}
      {durationText && <span className="text-[11px] whitespace-nowrap" style={{ color: 'var(--text-tertiary)' }}>{durationText}</span>}
    </>
  );
}

type Props = {
  activeTab: "debugger" | "graph" | "graph-debug" | ChallengePanelTab;
  extraPanels?: DebugPanel[];
  roadNetwork?: RoadNetwork | null;
  isPracticeMode?: boolean;
};

export default function RightPanelStack({ activeTab, extraPanels, roadNetwork, isPracticeMode }: Props) {
  const {
    code, breakpoints, setBreakpointEnabled, removeBreakpoint,
    output, runStatus, outputDurationMs, variableScopes,
  } = usePythonStore((s) => ({
    code: s.code,
    breakpoints: s.breakpoints,
    setBreakpointEnabled: s.setBreakpointEnabled,
    removeBreakpoint: s.removeBreakpoint,
    output: s.output,
    runStatus: s.runStatus,
    outputDurationMs: s.outputDurationMs,
    variableScopes: s.variableScopes,
  }));

  const basePanels = useMemo((): DebugPanel[] => {
    const panels: DebugPanel[] = [];
    if (activeTab !== "graph") {
      panels.push({
        key: "variables",
        title: "变量",
        content: <VariablePanel scopes={variableScopes} />,
      });
      panels.push({
        key: "breakpoints",
        title: "断点",
        content: (
          <BreakpointPanel
            breakpoints={breakpoints}
            code={code}
            onSetBreakpointEnabled={setBreakpointEnabled}
            onRemoveBreakpoint={removeBreakpoint}
          />
        ),
      });
    }
    panels.push({
      key: "output",
      title: <OutputPanelTitle status={runStatus} durationMs={outputDurationMs} />,
      content: <OutputPanel output={output} />,
    });
    return panels;
  }, [activeTab, variableScopes, breakpoints, code, setBreakpointEnabled, removeBreakpoint, runStatus, outputDurationMs, output]);

  const allPanels = useMemo(
    () => [...(extraPanels ?? []), ...basePanels],
    [basePanels, extraPanels],
  );

  const debugStackKey = `${activeTab}:${allPanels.map((p) => p.key).join(",")}`;
  const debugStack = <DebugPanelStack key={debugStackKey} panels={allPanels} />;

  if (activeTab === "graph-debug") {
    return (
      <div className="h-full flex flex-col">
        <div className="shrink-0 theme-border" style={{ height: "50%", borderBottomWidth: 1, borderBottomStyle: 'solid' }}>
          <GraphPanel />
        </div>
        <div className="flex-1 min-h-0">{debugStack}</div>
      </div>
    );
  }

  if (activeTab === POSITIONING_DEBUG_PANEL_TAB) {
    return (
      <div className="h-full flex flex-col">
        <div className="shrink-0 theme-border" style={{ height: "50%", borderBottomWidth: 1, borderBottomStyle: 'solid' }}>
          <MapPanel roadNetwork={null} isPracticeMode={isPracticeMode} />
        </div>
        <div className="flex-1 min-h-0">{debugStack}</div>
      </div>
    );
  }

  if (activeTab === MAP_DEBUG_PANEL_TAB) {
    return (
      <div className="h-full flex flex-col">
        <div className="shrink-0 theme-border" style={{ height: "50%", borderBottomWidth: 1, borderBottomStyle: 'solid' }}>
          <MapPanel roadNetwork={roadNetwork || null} isPracticeMode={isPracticeMode} />
        </div>
        <div className="flex-1 min-h-0">{debugStack}</div>
      </div>
    );
  }

  return debugStack;
}
