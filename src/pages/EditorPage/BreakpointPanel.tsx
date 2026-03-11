import { useMemo } from "react";
import { Button, Checkbox, Typography } from "antd";
import { Trash2 } from "lucide-react";
import type { Breakpoint } from "../../types";

type BreakpointRow = Breakpoint & { key: number; content: string };

type BreakpointPanelProps = {
  breakpoints: Breakpoint[];
  code: string;
  onSetBreakpointEnabled: (line: number, enabled: boolean) => void;
  onRemoveBreakpoint: (line: number) => void;
};

export default function BreakpointPanel({
  breakpoints,
  code,
  onSetBreakpointEnabled,
  onRemoveBreakpoint,
}: BreakpointPanelProps) {
  const codeLines = useMemo(() => code.split(/\r?\n/), [code]);
  const rows = useMemo<BreakpointRow[]>(
    () =>
      [...breakpoints]
        .sort((a, b) => a.line - b.line)
        .map((bp) => ({
          ...bp,
          key: bp.line,
          content: (codeLines[bp.line - 1] ?? "").trimEnd(),
        })),
    [breakpoints, codeLines],
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 overflow-auto theme-breakpoints-panel__body">
        {rows.length === 0 ? (
          <Typography.Text type="secondary" className="block p-3 text-xs text-center opacity-60">
            暂无断点
          </Typography.Text>
        ) : (
          <div className="flex flex-col">
            {rows.map((row) => (
              <div
                key={row.key}
                className={`group flex items-center gap-2 px-3 py-1.5 text-xs border-b border-solid theme-breakpoints-panel__row ${
                  row.enabled ? "" : "opacity-60"
                }`}
                style={{ borderColor: 'var(--border-default)' }}
              >
                <div className="flex items-center gap-2 min-w-[32px]">
                  <Checkbox
                    checked={row.enabled}
                    onChange={(e) =>
                      onSetBreakpointEnabled(row.line, e.target.checked)
                    }
                    className="scale-75 origin-left"
                  />
                  <span className={`font-mono text-[11px] theme-text-tertiary ${row.enabled ? "" : "line-through"}`}>
                    {row.line}
                  </span>
                </div>

                <div
                  title={row.content}
                  className={`flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-xs ${
                    row.enabled ? "theme-text-secondary" : "line-through theme-text-tertiary"
                  }`}
                >
                  {row.content.length > 0 ? (
                    row.content
                  ) : (
                    <span className="theme-text-tertiary opacity-50">（空行）</span>
                  )}
                </div>

                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="small"
                    type="text"
                    danger
                    aria-label="删除断点"
                    icon={<Trash2 size={13} />}
                    onClick={() => onRemoveBreakpoint(row.line)}
                    className="flex items-center justify-center w-6 h-6 min-w-6 p-0"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
