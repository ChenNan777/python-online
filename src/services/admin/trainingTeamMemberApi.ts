/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新TrainingTeamMember信息 PUT /TrainingTeamMember */
export function trainingTeamMemberUsingPut({
  body,
  options,
}: {
  body: API.TrainingTeamMember;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/TrainingTeamMember', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的TrainingTeamMember POST /TrainingTeamMember */
export function trainingTeamMemberUsingPost({
  body,
  options,
}: {
  body: API.TrainingTeamMember;
  options?: CustomRequestOptions;
}) {
  return request<API.TrainingTeamMember>('/TrainingTeamMember', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个TrainingTeamMember GET /TrainingTeamMember/${param0} */
export function trainingTeamMemberMemberIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTeamMemberMemberIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { memberId: param0, ...queryParams } = params;

  return request<API.TrainingTeamMemberVo>(`/TrainingTeamMember/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个TrainingTeamMember DELETE /TrainingTeamMember/${param0} */
export function trainingTeamMemberMemberIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTeamMemberMemberIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { memberId: param0, ...queryParams } = params;

  return request<boolean>(`/TrainingTeamMember/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新TrainingTeamMember信息 PUT /TrainingTeamMember/batch */
export function trainingTeamMemberBatchUsingPut({
  body,
  options,
}: {
  body: API.TrainingTeamMemberBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TrainingTeamMember/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除TrainingTeamMember DELETE /TrainingTeamMember/batch */
export function trainingTeamMemberBatchUsingDelete({
  body,
  options,
}: {
  body: API.TrainingTeamMemberRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TrainingTeamMember/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出TrainingTeamMember数据到Excel文件 GET /TrainingTeamMember/export */
export function trainingTeamMemberOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTeamMemberOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/TrainingTeamMember/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入TrainingTeamMember数据 POST /TrainingTeamMember/import */
export function trainingTeamMemberOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.TrainingTeamMemberOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/TrainingTeamMember/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询TrainingTeamMember列表 GET /TrainingTeamMember/search */
export function trainingTeamMemberSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTeamMemberSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageTrainingTeamMemberVo>(
    '/TrainingTeamMember/search',
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
