/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新TrainingTeam信息 PUT /TrainingTeam */
export function trainingTeamUsingPut({
  body,
  options,
}: {
  body: API.TrainingTeam;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/TrainingTeam', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的TrainingTeam POST /TrainingTeam */
export function trainingTeamUsingPost({
  body,
  options,
}: {
  body: API.TrainingTeam;
  options?: CustomRequestOptions;
}) {
  return request<API.TrainingTeam>('/TrainingTeam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个TrainingTeam GET /TrainingTeam/${param0} */
export function trainingTeamTeamIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTeamTeamIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { teamId: param0, ...queryParams } = params;

  return request<API.TrainingTeamVo>(`/TrainingTeam/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个TrainingTeam DELETE /TrainingTeam/${param0} */
export function trainingTeamTeamIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTeamTeamIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { teamId: param0, ...queryParams } = params;

  return request<boolean>(`/TrainingTeam/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新TrainingTeam信息 PUT /TrainingTeam/batch */
export function trainingTeamBatchUsingPut({
  body,
  options,
}: {
  body: API.TrainingTeamBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TrainingTeam/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除TrainingTeam DELETE /TrainingTeam/batch */
export function trainingTeamBatchUsingDelete({
  body,
  options,
}: {
  body: API.TrainingTeamRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TrainingTeam/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出TrainingTeam数据到Excel文件 GET /TrainingTeam/export */
export function trainingTeamOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTeamOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/TrainingTeam/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入TrainingTeam数据 POST /TrainingTeam/import */
export function trainingTeamOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.TrainingTeamOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/TrainingTeam/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询TrainingTeam列表 GET /TrainingTeam/search */
export function trainingTeamSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTeamSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageTrainingTeamVo>('/TrainingTeam/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
