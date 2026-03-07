import type { ReactNode } from 'react';

type CodeEditorShellProps = {
  title: string;
  badges?: string[];
  children: ReactNode;
  className?: string;
};

export default function CodeEditorShell({ title, badges = [], children, className }: CodeEditorShellProps) {
  return (
    <div className={`theme-editor-shell theme-editor-shell--framed theme-glow${className ? ` ${className}` : ''}`}>
      <div className="theme-editor-chrome">
        <div className="theme-editor-chrome__left">
          <div className="theme-editor-chrome__dots"><span /><span /><span /></div>
          <span className="theme-editor-chrome__title">{title}</span>
        </div>
        {badges.length > 0 ? (
          <div className="theme-editor-chrome__meta">
            {badges.map((badge) => (
              <span key={badge} className="theme-editor-chip">{badge}</span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="theme-editor-body">{children}</div>
    </div>
  );
}
