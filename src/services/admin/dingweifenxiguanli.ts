/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 获取当前任务的侦察数据 获取登录学生当前正在执行任务的侦察数据，用于定位分析作业 GET /positioning-analysis/current-task/recon-data */
export function positioningAnalysisCurrentTaskReconDataUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PositioningAnalysisCurrentTaskReconDataUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.StudentPositioningInfoVO>(
    '/positioning-analysis/current-task/recon-data',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 获取任务下所有队伍的定位分析评分 获取指定任务中所有队伍的定位分析评分情况 GET /positioning-analysis/scores/task/${param0} */
export function positioningAnalysisScoresTaskTaskIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PositioningAnalysisScoresTaskTaskIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<API.TeamPositioningScoreDTO[]>(
    `/positioning-analysis/scores/task/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 获取指定队伍的详细定位分析评分 获取指定队伍的详细定位分析评分和成员结果 GET /positioning-analysis/scores/task/${param0}/team/${param1} */
export function positioningAnalysisScoresTaskTaskIdTeamTeamIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PositioningAnalysisScoresTaskTaskIdTeamTeamIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, teamId: param1, ...queryParams } = params;

  return request<API.TeamPositioningScoreDTO>(
    `/positioning-analysis/scores/task/${param0}/team/${param1}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 提交定位分析结果 学生提交定位分析结果，系统自动评分 POST /positioning-analysis/submit */
export function positioningAnalysisSubmitUsingPost({
  body,
  options,
}: {
  body: API.PositioningAnalysisResultDTO;
  options?: CustomRequestOptions;
}) {
  return request<string>('/positioning-analysis/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
