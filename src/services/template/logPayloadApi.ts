/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新LogPayload信息 PUT /LogPayload */
export function logPayloadUsingPut({
  body,
  options,
}: {
  body: API.LogPayload;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/LogPayload', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的LogPayload POST /LogPayload */
export function logPayloadUsingPost({
  body,
  options,
}: {
  body: API.LogPayload;
  options?: CustomRequestOptions;
}) {
  return request<API.LogPayload>('/LogPayload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个LogPayload GET /LogPayload/${param0} */
export function logPayloadSnowflakeIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogPayloadSnowflakeIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { snowflakeId: param0, ...queryParams } = params;

  return request<API.LogPayloadVo>(`/LogPayload/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个LogPayload DELETE /LogPayload/${param0} */
export function logPayloadSnowflakeIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogPayloadSnowflakeIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { snowflakeId: param0, ...queryParams } = params;

  return request<boolean>(`/LogPayload/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新LogPayload信息 PUT /LogPayload/batch */
export function logPayloadBatchUsingPut({
  body,
  options,
}: {
  body: API.LogPayloadBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/LogPayload/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除LogPayload DELETE /LogPayload/batch */
export function logPayloadBatchUsingDelete({
  body,
  options,
}: {
  body: API.LogPayloadRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/LogPayload/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出LogPayload数据到Excel文件 GET /LogPayload/export */
export function logPayloadOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogPayloadOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/LogPayload/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入LogPayload数据 POST /LogPayload/import */
export function logPayloadOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.LogPayloadOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/LogPayload/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询LogPayload列表 GET /LogPayload/search */
export function logPayloadSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogPayloadSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageLogPayloadVo>('/LogPayload/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
