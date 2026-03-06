import { Button, Space, Tooltip } from "antd";
import {
  CornerDownRight,
  CornerUpLeft,
  LoaderCircle,
  Play,
  PlayCircle,
  SquareStop,
  StepForward,
} from "lucide-react";

import { usePythonStore } from "../../../store/usePythonStore";

type RunControlsProps = {
  onRun: () => void;
  onContinue: () => void;
  onStepOver: () => void;
  onStepInto: () => void;
  onStepOut: () => void;
  onStop: () => void;
};

export default function RunControls(props: RunControlsProps) {
  const { isRunning, isPaused, isReady, hasBreakpoints, runStatus } =
    usePythonStore((s) => ({
      isRunning: s.isRunning,
      isPaused: s.isPaused,
      isReady: s.isReady,
      hasBreakpoints: s.breakpoints.some((b) => b.enabled),
      runStatus: s.runStatus,
    }));

  if (!isRunning) {
    return (
      <Tooltip title={isReady ? "运行" : "加载中..."} placement="bottom">
        <span>
          <Button
            size="small"
            type="primary"
            shape="circle"
            onClick={props.onRun}
            disabled={!isReady}
            icon={isReady ? <PlayCircle size={14} /> : <LoaderCircle size={14} className="animate-spin" />}
          />
        </span>
      </Tooltip>
    );
  }

  if (!hasBreakpoints && !isPaused && runStatus === "running") {
    return (
      <Space size={4}>
        <Tooltip title="运行中" placement="bottom">
          <span>
            <Button size="small" type="primary" shape="circle" disabled
              icon={<LoaderCircle size={14} className="animate-spin" />} />
          </span>
        </Tooltip>
        <Tooltip title="结束运行" placement="bottom">
          <span>
            <Button size="small" shape="circle" danger onClick={props.onStop}
              icon={<SquareStop size={14} />} />
          </span>
        </Tooltip>
      </Space>
    );
  }

  return (
    <Space size={4}>
      <Tooltip title="继续运行" placement="bottom">
        <span>
          <Button size="small" shape="circle" onClick={props.onContinue}
            disabled={!isPaused} icon={<Play size={14} />} />
        </span>
      </Tooltip>
      <Tooltip title="单步（跳过函数）" placement="bottom">
        <span>
          <Button size="small" shape="circle" onClick={props.onStepOver}
            disabled={!isPaused} icon={<StepForward size={14} />} />
        </span>
      </Tooltip>
      <Tooltip title="运行进函数" placement="bottom">
        <span>
          <Button size="small" shape="circle" onClick={props.onStepInto}
            disabled={!isPaused} icon={<CornerDownRight size={14} />} />
        </span>
      </Tooltip>
      <Tooltip title="运行出函数" placement="bottom">
        <span>
          <Button size="small" shape="circle" onClick={props.onStepOut}
            disabled={!isPaused} icon={<CornerUpLeft size={14} />} />
        </span>
      </Tooltip>
      <Tooltip title="结束运行" placement="bottom">
        <span>
          <Button size="small" shape="circle" danger onClick={props.onStop}
            icon={<SquareStop size={14} />} />
        </span>
      </Tooltip>
    </Space>
  );
}
