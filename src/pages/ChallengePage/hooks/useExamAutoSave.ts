import { useEffect, useRef } from "react";

import type { StudentTrainingAssignmentVO } from "../../../services/admin/types";
import { useSaveCodeMutation } from "../queries/useSaveCodeMutation";

export function useExamAutoSave(args: {
  enabled: boolean;
  assignment: StudentTrainingAssignmentVO | null;
  operationType: string;
  currentCode: string;
  lastSavedCode: string | null;
  delayMs: number;
  saveCodeMutation: ReturnType<typeof useSaveCodeMutation>;
  onSaved: (savedCode: string) => void;
}) {
  const {
    enabled,
    assignment,
    operationType,
    currentCode,
    lastSavedCode,
    delayMs,
    saveCodeMutation,
    onSaved,
  } = args;

  const saveCodeMutationRef = useRef(saveCodeMutation);
  useEffect(() => {
    saveCodeMutationRef.current = saveCodeMutation;
  }, [saveCodeMutation]);

  useEffect(() => {
    if (!enabled || !assignment) {
      return;
    }

    if (currentCode === lastSavedCode) {
      return;
    }

    const timer = window.setTimeout(() => {
      saveCodeMutationRef.current.mutate(
        {
          assignment,
          operationType,
          sourceCode: currentCode,
        },
        {
          onSuccess: (savedCode) => {
            onSaved(savedCode);
          },
        },
      );
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [assignment, currentCode, delayMs, enabled, lastSavedCode, onSaved, operationType]);
}
