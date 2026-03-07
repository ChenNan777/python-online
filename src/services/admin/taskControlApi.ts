/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据id删除任务 根据id删除任务 DELETE /task/${param0} */
export function taskTaskIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskTaskIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<boolean>(`/task/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询任务详情 查询任务详情 GET /task/${param0}/detail */
export function taskTaskIdDetailUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskTaskIdDetailUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<API.TrainTaskDetailVO>(`/task/${param0}/detail`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询任务详情 查询任务详情 GET /task/${param0}/detailInfo */
export function taskTaskIdDetailInfoUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskTaskIdDetailInfoUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<API.TrainTaskDetailInfoVO>(`/task/${param0}/detailInfo`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 训练区域分页列表 条件查询训练区域分页列表 GET /task/areas/search */
export function taskAreasSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskAreasSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageGeoAreasVo>('/task/areas/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}

/** 全局任务信息 全局任务信息 GET /task/basic-info */
export function taskBasicInfoUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.TaskBasicInfoContext>('/task/basic-info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据ID批量更新队伍和设备，队员和设备绑定关系 根据ID批量更新队伍和设备，队员和设备绑定关系 POST /task/batchUpdate */
export function taskBatchUpdateUsingPost({
  body,
  options,
}: {
  body: API.TaskBatchUpdateUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/task/batchUpdate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 任务评论信息分页查询 任务评论信息分页查询 GET /task/comment/search */
export function taskCommentSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskCommentSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageTrainingCommentVo>('/task/comment/search', {
    method: 'GET',
    params: {
      ...params,
      param: undefined,
      ...params['param'],
    },
    ...(options || {}),
  });
}

/** 创建训练任务 创建新的训练任务 POST /task/create */
export function taskCreateUsingPost({
  body,
  options,
}: {
  body: API.TrainingTaskReqVO;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/task/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前正在执行的任务 获取当前正在执行的任务信息（任务 ID 和任务名称） GET /task/current-executing */
export function taskCurrentExecutingUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<Record<string, Record<string, unknown>>>(
    '/task/current-executing',
    {
      method: 'GET',
      ...(options || {}),
    }
  );
}

/** 获取可以执行的任务列表 获取可以执行的任务列表（准备就绪或已暂停的任务） GET /task/executable-list */
export function taskExecutableListUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<Record<string, Record<string, unknown>>[]>(
    '/task/executable-list',
    {
      method: 'GET',
      ...(options || {}),
    }
  );
}

/** 所有任务 所有任务列表 GET /task/list */
export function taskListUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.TrainTaskPageVO[]>('/task/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 训练任务分页列表 条件查询训练任务列表 GET /task/search */
export function taskSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageTrainTaskPageVO>('/task/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}

/** 修改训练任务状态 修改已创建的训练任务状态 POST /task/update */
export function taskUpdateUsingPost({
  body,
  options,
}: {
  body: API.TrainingTaskReqVO;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/task/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
