import type { ReactNode } from 'react';

type PageToolbarProps = {
  leftContent: ReactNode;
  rightContent?: ReactNode;
  className?: string;
};

export default function PageToolbar({ leftContent, rightContent, className }: PageToolbarProps) {
  return (
    <div className={className}>
      <div className="min-w-0 flex items-center gap-1.5">{leftContent}</div>
      <div className="flex-1" />
      {rightContent ? <div className="shrink-0 min-w-0 flex items-center gap-2">{rightContent}</div> : null}
    </div>
  );
}
