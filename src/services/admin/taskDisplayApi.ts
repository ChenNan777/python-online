/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 手动触发状态更新广播 POST /task-display/${param0}/broadcast */
export function taskDisplayTaskIdBroadcastUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskDisplayTaskIdBroadcastUsingPostParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<boolean>(`/task-display/${param0}/broadcast`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 获取任务状态展示信息 GET /task-display/${param0}/status */
export function taskDisplayTaskIdStatusUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskDisplayTaskIdStatusUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<API.TaskStatusDisplayVO>(`/task-display/${param0}/status`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 获取最新任务 GET /task-display/lastTask */
export function taskDisplayLastTaskUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.TaskStatusDisplayVO>('/task-display/lastTask', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取最新就绪任务状态展示信息 GET /task-display/lastTask/status */
export function taskDisplayLastTaskStatusUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.TaskStatusDisplayVO>('/task-display/lastTask/status', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 导调员执行任务 POST /task-event/execute */
export function taskEventExecuteUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskEventExecuteUsingPostParams;
  body: API.TrainingTask;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/task-event/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询任务事件列表 GET /task-event/list */
export function taskEventListUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskEventListUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.TaskEvent[]>('/task-event/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 导调员暂停任务 POST /task-event/pause */
export function taskEventPauseUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskEventPauseUsingPostParams;
  body: API.TrainingTask;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/task-event/pause', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 事件上报 POST /task-event/report */
export function taskEventReportUsingPost({
  body,
  options,
}: {
  body: API.TaskEvent;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/task-event/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导调员重置任务 POST /task-event/reset */
export function taskEventResetUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskEventResetUsingPostParams;
  body: API.TrainingTask;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/task-event/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 导调员恢复任务 POST /task-event/resume */
export function taskEventResumeUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskEventResumeUsingPostParams;
  body: API.TrainingTask;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/task-event/resume', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取规划路径列表 GET /task-situation/${param0}/pathPlannings */
export function taskSituationTaskIdPathPlanningsUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskSituationTaskIdPathPlanningsUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<API.CommonPagePathPlanningVo>(
    `/task-situation/${param0}/pathPlannings`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
