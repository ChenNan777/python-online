/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 此处后端没有提供注释 GET /task-event/path-planning/${param0} */
export function taskEventPathPlanningPlanningIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskEventPathPlanningPlanningIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { planningId: param0, ...queryParams } = params;

  return request<API.PathPlanning>(`/task-event/path-planning/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /task-event/path-planning/${param0} */
export function taskEventPathPlanningPlanningIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskEventPathPlanningPlanningIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { planningId: param0, ...queryParams } = params;

  return request<string>(`/task-event/path-planning/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /task-event/path-planning/assignment-info */
export function taskEventPathPlanningAssignmentInfoUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskEventPathPlanningAssignmentInfoUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PathPlanningAssignmentDTO>(
    '/task-event/path-planning/assignment-info',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 获取任务下所有队伍的路径规划评分 获取指定任务中所有队伍的路径规划评分情况 GET /task-event/path-planning/scores/task/${param0} */
export function taskEventPathPlanningScoresTaskTaskIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskEventPathPlanningScoresTaskTaskIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<API.TeamPathPlanningScoreDTO[]>(
    `/task-event/path-planning/scores/task/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 获取指定队伍的详细路径规划评分 获取指定队伍的详细路径规划评分和成员结果 GET /task-event/path-planning/scores/task/${param0}/team/${param1} */
export function taskEventPathPlanningScoresTaskTaskIdTeamTeamIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskEventPathPlanningScoresTaskTaskIdTeamTeamIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, teamId: param1, ...queryParams } = params;

  return request<API.TeamPathPlanningScoreDTO>(
    `/task-event/path-planning/scores/task/${param0}/team/${param1}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /task-event/path-planning/submit */
export function taskEventPathPlanningSubmitUsingPost({
  body,
  options,
}: {
  body: API.PathPlanningRequestDTO;
  options?: CustomRequestOptions;
}) {
  return request<string>('/task-event/path-planning/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /task-event/path-planning/task/${param0} */
export function taskEventPathPlanningTaskTaskIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskEventPathPlanningTaskTaskIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<API.PathPlanning[]>(
    `/task-event/path-planning/task/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 GET /task-event/path-planning/team/${param0} */
export function taskEventPathPlanningTeamTeamIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskEventPathPlanningTeamTeamIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { teamId: param0, ...queryParams } = params;

  return request<API.PathPlanning[]>(
    `/task-event/path-planning/team/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}
