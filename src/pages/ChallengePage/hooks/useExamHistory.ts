import { useCallback, useState } from 'react';

import type { StudentOperationCodeVo } from '@/services/admin/types';
import { studentOperationCodeListStudentTaskIdMemberIdUsingGet } from '@/services/admin/xueshengxunlianzuoyeguanli';

export function useExamHistory() {
  const [records, setRecords] = useState<StudentOperationCodeVo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async (taskId: number, memberId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await studentOperationCodeListStudentTaskIdMemberIdUsingGet({
        params: { taskId, memberId },
      });
      const sortedRecords = [...response.data].sort((left, right) => {
        const leftTime = Date.parse(left.updatedAt ?? left.submitTime ?? left.createdAt ?? '');
        const rightTime = Date.parse(right.updatedAt ?? right.submitTime ?? right.createdAt ?? '');
        return rightTime - leftTime;
      });
      setRecords(sortedRecords);
      return sortedRecords;
    } catch (historyError) {
      setRecords([]);
      setError(historyError instanceof Error ? historyError.message : '加载历史代码失败');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    records,
    loading,
    error,
    loadHistory,
  };
}
