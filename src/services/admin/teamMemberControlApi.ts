/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据队员id，任务id查询队员最新体征状态 根据队员id，任务id查询队员最新体征状态 GET /member/${param0}/${param1}/health */
export function memberTaskIdMemberIdHealthUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MemberTaskIdMemberIdHealthUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, memberId: param1, ...queryParams } = params;

  return request<API.MemberTaskVitalSignsVO>(
    `/member/${param0}/${param1}/health`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 队员告警信息统计 队员运动轨迹分页查询 GET /member/${param0}/alert-stats */
export function memberTaskIdAlertStatsUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MemberTaskIdAlertStatsUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<API.MemberAlertStatsDTO[]>(`/member/${param0}/alert-stats`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据id查询队员最新体征状态 根据id查询队员最新体征状态 GET /member/${param0}/health */
export function memberMemberIdHealthUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MemberMemberIdHealthUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { memberId: param0, ...queryParams } = params;

  return request<API.PersonnelVitalSignsVo>(`/member/${param0}/health`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 队员运动轨迹分页查询 队员运动轨迹分页查询 GET /member/member-path/page */
export function memberMemberPathPageUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MemberMemberPathPageUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.LogMemberPathVo>('/member/member-path/page', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询TrainingTeam列表 GET /member/search */
export function memberSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MemberSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageTrainingTeamMemberVo>('/member/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
