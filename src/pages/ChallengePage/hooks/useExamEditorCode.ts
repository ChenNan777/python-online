import { useEffect, useRef, useState } from "react";

import type { StudentOperationCodeVo, StudentTrainingAssignmentVO } from "../../../services/admin/types";
import type { Challenge } from "../challenges";
import { getLatestHistoryCode } from "../adapters/examChallengeAdapter";

export function useExamEditorCode(args: {
  challenge: Challenge | null;
  assignment: StudentTrainingAssignmentVO | null;
  records: StudentOperationCodeVo[];
  historyLoading: boolean;
}) {
  const { challenge, assignment, records, historyLoading } = args;
  const [initialCode, setInitialCode] = useState<string | undefined>(challenge?.starterCode);
  const [currentCode, setCurrentCode] = useState<string>(challenge?.starterCode ?? "");
  const [lastSavedCode, setLastSavedCode] = useState<string | null>(null);
  const bootstrapKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!challenge || !assignment || historyLoading) {
      return;
    }

    const latestCode = getLatestHistoryCode(records) ?? challenge.starterCode;
    const bootstrapKey = `${challenge.id}:${assignment.taskId ?? "none"}:${assignment.memberId ?? "none"}:${latestCode}`;
    if (bootstrapKeyRef.current === bootstrapKey) {
      return;
    }

    bootstrapKeyRef.current = bootstrapKey;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInitialCode(latestCode);
    setCurrentCode(latestCode);
    setLastSavedCode(latestCode);
  }, [assignment, challenge, historyLoading, records]);

  return {
    initialCode,
    currentCode,
    lastSavedCode,
    setInitialCode,
    setCurrentCode,
    setLastSavedCode,
  };
}

