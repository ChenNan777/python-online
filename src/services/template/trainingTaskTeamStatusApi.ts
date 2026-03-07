/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新TrainingTaskTeamStatus信息 PUT /TrainingTaskTeamStatus */
export function trainingTaskTeamStatusUsingPut({
  body,
  options,
}: {
  body: API.TrainingTaskTeamStatus;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/TrainingTaskTeamStatus', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的TrainingTaskTeamStatus POST /TrainingTaskTeamStatus */
export function trainingTaskTeamStatusUsingPost({
  body,
  options,
}: {
  body: API.TrainingTaskTeamStatus;
  options?: CustomRequestOptions;
}) {
  return request<API.TrainingTaskTeamStatus>('/TrainingTaskTeamStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个TrainingTaskTeamStatus GET /TrainingTaskTeamStatus/${param0} */
export function trainingTaskTeamStatusSnowflakeIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTaskTeamStatusSnowflakeIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { snowflakeId: param0, ...queryParams } = params;

  return request<API.TrainingTaskTeamStatusVO>(
    `/TrainingTaskTeamStatus/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 根据主键删除 删除单个TrainingTaskTeamStatus DELETE /TrainingTaskTeamStatus/${param0} */
export function trainingTaskTeamStatusSnowflakeIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTaskTeamStatusSnowflakeIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { snowflakeId: param0, ...queryParams } = params;

  return request<boolean>(`/TrainingTaskTeamStatus/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新TrainingTaskTeamStatus信息 PUT /TrainingTaskTeamStatus/batch */
export function trainingTaskTeamStatusBatchUsingPut({
  body,
  options,
}: {
  body: API.TrainingTaskTeamStatusBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TrainingTaskTeamStatus/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除TrainingTaskTeamStatus DELETE /TrainingTaskTeamStatus/batch */
export function trainingTaskTeamStatusBatchUsingDelete({
  body,
  options,
}: {
  body: API.TrainingTaskTeamStatusRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TrainingTaskTeamStatus/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出TrainingTaskTeamStatus数据到Excel文件 GET /TrainingTaskTeamStatus/export */
export function trainingTaskTeamStatusOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTaskTeamStatusOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/TrainingTaskTeamStatus/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入TrainingTaskTeamStatus数据 POST /TrainingTaskTeamStatus/import */
export function trainingTaskTeamStatusOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.TrainingTaskTeamStatusOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/TrainingTaskTeamStatus/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询TrainingTaskTeamStatus列表 GET /TrainingTaskTeamStatus/search */
export function trainingTaskTeamStatusSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTaskTeamStatusSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageTrainingTaskTeamStatusVO>(
    '/TrainingTaskTeamStatus/search',
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
