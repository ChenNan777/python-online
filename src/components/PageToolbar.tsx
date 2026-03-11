import type { ReactNode } from 'react';

type PageToolbarProps = {
  leftContent: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
  className?: string;
};

export default function PageToolbar({ leftContent, centerContent, rightContent, className }: PageToolbarProps) {
  return (
    <div className={className}>
      <div className="min-w-0 flex items-center gap-1.5">{leftContent}</div>
      {centerContent ? (
        <div className="flex-1 min-w-0 flex items-center justify-center">{centerContent}</div>
      ) : (
        <div className="flex-1" />
      )}
      {rightContent ? <div className="shrink-0 min-w-0 flex items-center gap-2">{rightContent}</div> : null}
    </div>
  );
}
