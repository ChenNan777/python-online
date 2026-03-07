import { Button, Space, Tooltip } from 'antd';
import {
  CornerDownRight,
  CornerUpLeft,
  LoaderCircle,
  Play,
  PlayCircle,
  SquareStop,
  StepForward,
} from 'lucide-react';
import { usePythonStore } from '../store/usePythonStore';

type RunControlsProps = {
  onRun: () => void;
  onContinue: () => void;
  onStepOver: () => void;
  onStepInto: () => void;
  onStepOut: () => void;
  onStop: () => void;
  runLabel?: string;
};

export default function RunControls({
  onRun,
  onContinue,
  onStepOver,
  onStepInto,
  onStepOut,
  onStop,
  runLabel = '运行',
}: RunControlsProps) {
  const { isRunning, isPaused, isReady, hasBreakpoints, runStatus } = usePythonStore((state) => ({
    isRunning: state.isRunning,
    isPaused: state.isPaused,
    isReady: state.isReady,
    hasBreakpoints: state.breakpoints.some((breakpoint) => breakpoint.enabled),
    runStatus: state.runStatus,
  }));

  if (!isRunning) {
    return (
      <Tooltip title={isReady ? runLabel : '加载中...'} placement="bottom">
        <span>
          <Button
            className="theme-run-btn theme-run-btn--primary"
            size="small"
            type="primary"
            shape="circle"
            onClick={onRun}
            disabled={!isReady}
            aria-label={isReady ? runLabel : '加载中'}
            icon={isReady ? <PlayCircle size={14} /> : <LoaderCircle size={14} className="animate-spin" />}
          />
        </span>
      </Tooltip>
    );
  }

  if (!hasBreakpoints && !isPaused && runStatus === 'running') {
    return (
      <Space size={4} className="theme-run-controls">
        <Tooltip title="运行中" placement="bottom">
          <span>
            <Button
              className="theme-run-btn theme-run-btn--primary"
              size="small"
              type="primary"
              shape="circle"
              disabled
              aria-label="运行中"
              icon={<LoaderCircle size={14} className="animate-spin" />}
            />
          </span>
        </Tooltip>
        <Tooltip title="结束运行" placement="bottom">
          <span>
            <Button
              className="theme-run-btn theme-run-btn--danger"
              size="small"
              shape="circle"
              danger
              onClick={onStop}
              aria-label="结束运行"
              icon={<SquareStop size={14} />}
            />
          </span>
        </Tooltip>
      </Space>
    );
  }

  return (
    <Space size={4} className="theme-run-controls">
      <Tooltip title="继续运行" placement="bottom">
        <span>
          <Button className="theme-run-btn" size="small" shape="circle" onClick={onContinue} disabled={!isPaused} aria-label="继续运行" icon={<Play size={14} />} />
        </span>
      </Tooltip>
      <Tooltip title="单步（跳过函数）" placement="bottom">
        <span>
          <Button className="theme-run-btn" size="small" shape="circle" onClick={onStepOver} disabled={!isPaused} aria-label="单步（跳过函数）" icon={<StepForward size={14} />} />
        </span>
      </Tooltip>
      <Tooltip title="运行进函数" placement="bottom">
        <span>
          <Button className="theme-run-btn" size="small" shape="circle" onClick={onStepInto} disabled={!isPaused} aria-label="运行进函数" icon={<CornerDownRight size={14} />} />
        </span>
      </Tooltip>
      <Tooltip title="运行出函数" placement="bottom">
        <span>
          <Button className="theme-run-btn" size="small" shape="circle" onClick={onStepOut} disabled={!isPaused} aria-label="运行出函数" icon={<CornerUpLeft size={14} />} />
        </span>
      </Tooltip>
      <Tooltip title="结束运行" placement="bottom">
        <span>
          <Button className="theme-run-btn theme-run-btn--danger" size="small" shape="circle" danger onClick={onStop} aria-label="结束运行" icon={<SquareStop size={14} />} />
        </span>
      </Tooltip>
    </Space>
  );
}
