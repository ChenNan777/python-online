/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 队员执行任务情况查询 队员执行任务情况查询 GET /team/ */
export function teamUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TeamUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.MemberDeviceRelationVo[]>('/team/', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}

/** 根据队员id，任务id查询队员最新体征状态 根据队员id，任务id查询队员最新体征状态 GET /team/${param0}/${param1}/health */
export function teamTaskIdTeamIdHealthUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TeamTaskIdTeamIdHealthUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, teamId: param1, ...queryParams } = params;

  return request<API.TeamTaskVitalSignsVO>(`/team/${param0}/${param1}/health`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询某次任务每个小组实时平均得分 查询某次任务每个小组实时平均得分 GET /team/${param0}/avg-score */
export function teamTaskIdAvgScoreUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TeamTaskIdAvgScoreUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<API.TeamRealtimeScoreVO>(`/team/${param0}/avg-score`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询TrainingTeam列表 GET /team/search */
export function teamSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TeamSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageTrainingTeamVo>('/team/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}

/** 队伍上报定位无人机位置信息 队伍上报定位无人机位置信息 POST /team/uav/info */
export function teamUavInfoUsingPost({
  body,
  options,
}: {
  body: API.TargetDetectionMessageDTO;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/team/uav/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
