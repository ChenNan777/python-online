import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

function parseDeadlineMs(deadline: unknown): number | null {
  if (deadline == null) {
    return null;
  }

  if (typeof deadline === 'number') {
    if (!Number.isFinite(deadline)) {
      return null;
    }
    const asMs = deadline > 10_000_000_000 ? deadline : deadline * 1000;
    return asMs > 0 ? asMs : null;
  }

  if (typeof deadline === 'string') {
    const trimmed = deadline.trim();
    if (!trimmed) {
      return null;
    }

    const parsed = Date.parse(trimmed);
    if (Number.isFinite(parsed)) {
      return parsed;
    }

    const normalized = trimmed.replace('T', ' ').replace(/\//g, '-');
    const match = normalized.match(
      /^(\d{4})-(\d{1,2})-(\d{1,2})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/,
    );
    if (!match) {
      return null;
    }
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const hour = match[4] ? Number(match[4]) : 0;
    const minute = match[5] ? Number(match[5]) : 0;
    const second = match[6] ? Number(match[6]) : 0;
    const date = new Date(year, month - 1, day, hour, minute, second);
    return Number.isFinite(date.getTime()) ? date.getTime() : null;
  }

  if (Array.isArray(deadline)) {
    const parts = deadline.filter((value) => typeof value === 'number' && Number.isFinite(value)) as number[];
    const [year, month, day, hour = 0, minute = 0, second = 0] = parts;
    if (!year || !month || !day) {
      return null;
    }
    const date = new Date(year, month - 1, day, hour, minute, second);
    return Number.isFinite(date.getTime()) ? date.getTime() : null;
  }

  return null;
}

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function formatRemainingMs(remainingMs: number): string {
  if (!Number.isFinite(remainingMs) || remainingMs <= 0) {
    return '00:00:00';
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  if (days > 0) {
    return `${days}天 ${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
  }
  return `${pad2(totalHours)}:${pad2(minutes)}:${pad2(seconds)}`;
}

export type ExamDeadlineCountdownState = {
  countdown: ReactNode | null;
  isExpired: boolean;
  deadlineMs: number | null;
  remainingMs: number | null;
};

export function useExamDeadlineCountdown(deadline: unknown): ExamDeadlineCountdownState {
  const deadlineMs = useMemo(() => parseDeadlineMs(deadline), [deadline]);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (deadlineMs === null) {
      return;
    }
    const timer = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => window.clearInterval(timer);
  }, [deadlineMs]);

  const remainingMs = deadlineMs !== null ? deadlineMs - nowMs : null;
  const isExpired = remainingMs !== null && remainingMs <= 0;

  const countdown = useMemo(() => {
    if (deadlineMs === null || remainingMs === null) {
      return null;
    }

    const expired = remainingMs <= 0;
    const label = expired ? '考试已经截止' : formatRemainingMs(remainingMs);
    const tone = expired ? 'var(--danger-strong)' : 'var(--accent-primary)';

    return (
      <div className="min-w-0 flex items-center px-3 py-1 rounded-full select-none">
        <span
          className="font-mono text-[12px] font-semibold tabular-nums whitespace-nowrap"
          style={{ color: tone }}
        >
          {label}
        </span>
      </div>
    );
  }, [deadlineMs, remainingMs]);

  return useMemo(
    () => ({
      countdown,
      isExpired,
      deadlineMs,
      remainingMs,
    }),
    [countdown, deadlineMs, isExpired, remainingMs],
  );
}
