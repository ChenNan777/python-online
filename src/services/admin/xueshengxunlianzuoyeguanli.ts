/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 查询单个代码详情 根据 ID 查询代码详细信息 GET /StudentOperationCode/${param0} */
export function studentOperationCodeIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.StudentOperationCodeIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.StudentOperationCodeVo>(
    `/StudentOperationCode/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 获取学生当前训练作业信息 根据用户 ID 获取学生当前任务的作业信息（定位分析或路径规划） GET /StudentOperationCode/assignment-info */
export function studentOperationCodeAssignmentInfoUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.StudentOperationCodeAssignmentInfoUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.StudentTrainingAssignmentVO>(
    '/StudentOperationCode/assignment-info',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 查询学生的代码历史 查询指定学生在指定任务中的所有代码记录 GET /StudentOperationCode/list/student/${param0}/${param1} */
export function studentOperationCodeListStudentTaskIdMemberIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.StudentOperationCodeListStudentTaskIdMemberIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, memberId: param1, ...queryParams } = params;

  return request<API.StudentOperationCodeVo[]>(
    `/StudentOperationCode/list/student/${param0}/${param1}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 查询指定作业类型的代码 查询指定任务下指定作业类型的所有代码 GET /StudentOperationCode/list/type */
export function studentOperationCodeListTypeUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.StudentOperationCodeListTypeUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.StudentOperationCodeVo[]>(
    '/StudentOperationCode/list/type',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** 保存学生作业代码 保存学生提交的编程代码（支持定位分析和路径规划） POST /StudentOperationCode/saveCode */
export function studentOperationCodeSaveCodeUsingPost({
  body,
  options,
}: {
  body: API.StudentOperationCodeDTO;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/StudentOperationCode/saveCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询StudentOperationCode列表 GET /StudentOperationCode/search */
export function studentOperationCodeSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.StudentOperationCodeSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageStudentOperationCodeVo>(
    '/StudentOperationCode/search',
    {
      method: 'GET',
      params: {
        ...params,
        req: undefined,
        ...params['req'],
      },
      ...(options || {}),
    }
  );
}

/** 统一提交训练作业 学生提交训练作业，支持定位分析和路径规划两种类型 POST /StudentOperationCode/submit */
export function studentOperationCodeSubmitUsingPost({
  body,
  options,
}: {
  body: API.StudentTrainingWorkSubmitDTO;
  options?: CustomRequestOptions;
}) {
  return request<string>('/StudentOperationCode/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新代码信息 更新已提交的代码信息 PUT /StudentOperationCode/update */
export function studentOperationCodeUpdateUsingPut({
  body,
  options,
}: {
  body: API.StudentOperationCodeDTO;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/StudentOperationCode/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
