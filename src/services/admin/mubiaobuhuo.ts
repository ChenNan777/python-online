/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 健康检查 平板端测试与后端的连接状态 GET /target-capture/health */
export function targetCaptureHealthUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<string>('/target-capture/health', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取目标捕获最优路径 根据平板序列号获取任务相关的最优目标捕获路径，包含起点、终点和路径建议 GET /target-capture/optimal-path */
export function targetCaptureOptimalPathUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TargetCaptureOptimalPathUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.TargetCaptureOptimalPathVO>(
    '/target-capture/optimal-path',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 获取目标捕获最优路径 获取任务相关的最优目标捕获路径，包含起点、终点和路径建议 GET /target-capture/optimal-path/task/${param0}/team/${param1} */
export function targetCaptureOptimalPathTaskTaskIdTeamTeamIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TargetCaptureOptimalPathTaskTaskIdTeamTeamIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, teamId: param1, ...queryParams } = params;

  return request<API.TargetCaptureOptimalPathVO>(
    `/target-capture/optimal-path/task/${param0}/team/${param1}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 目标捕获上报 学生平板端通过 HTTP API 上报目标捕获完成事件 POST /target-capture/report */
export function targetCaptureReportUsingPost({
  body,
  options,
}: {
  body: API.TargetCaptureReportRequest;
  options?: CustomRequestOptions;
}) {
  return request<string>('/target-capture/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取任务下所有队伍的目标捕获评分 获取指定任务中所有队伍的目标捕获评分情况 GET /target-capture/scores/task/${param0} */
export function targetCaptureScoresTaskTaskIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TargetCaptureScoresTaskTaskIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<API.TeamTargetCaptureScoreDTO[]>(
    `/target-capture/scores/task/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 获取指定队伍的详细目标捕获评分 获取指定队伍的详细目标捕获评分和成员结果 GET /target-capture/scores/task/${param0}/team/${param1} */
export function targetCaptureScoresTaskTaskIdTeamTeamIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TargetCaptureScoresTaskTaskIdTeamTeamIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, teamId: param1, ...queryParams } = params;

  return request<API.TeamTargetCaptureScoreDTO>(
    `/target-capture/scores/task/${param0}/team/${param1}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
