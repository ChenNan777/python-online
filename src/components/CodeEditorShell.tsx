import { Tooltip } from 'antd';
import type { ReactNode } from 'react';

export type CodeEditorBadge =
  | string
  | {
    label: ReactNode;
    tooltip?: ReactNode;
    key?: string;
    className?: string;
  };

type CodeEditorShellProps = {
  title: string;
  badges?: CodeEditorBadge[];
  extraBadges?: CodeEditorBadge[];
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function CodeEditorShell({
  title,
  badges = [],
  extraBadges = [],
  actions,
  children,
  className,
}: CodeEditorShellProps) {
  const allBadges = [...badges, ...extraBadges];
  return (
    <div className={`theme-editor-shell theme-editor-shell--framed theme-glow${className ? ` ${className}` : ''}`}>
      <div className="theme-editor-chrome">
        <div className="theme-editor-chrome__left">
          <div className="theme-editor-chrome__dots"><span /><span /><span /></div>
          <span className="theme-editor-chrome__title">{title}</span>
          {allBadges.length > 0 ? (
            <div className="theme-editor-chrome__meta">
              {allBadges.map((badge, index) => {
                const item = typeof badge === 'string' ? { label: badge, tooltip: undefined, key: undefined } : badge;
                const key = item.key ?? (typeof item.label === 'string' ? `${item.label}-${index}` : `badge-${index}`);
                const chipClassName = `theme-editor-chip${item.className ? ` ${item.className}` : ''}`;
                if (!item.tooltip) {
                  return (
                    <span key={key} className={chipClassName}>{item.label}</span>
                  );
                }

                return (
                  <Tooltip key={key} title={item.tooltip}>
                    <span className={chipClassName}>{item.label}</span>
                  </Tooltip>
                );
              })}
            </div>
          ) : null}
        </div>
        {actions ? <div className="theme-editor-chrome__actions">{actions}</div> : null}
      </div>
      <div className="theme-editor-body">{children}</div>
    </div>
  );
}
