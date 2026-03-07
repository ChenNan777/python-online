/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新LogBracelet信息 PUT /LogBracelet */
export function logBraceletUsingPut({
  body,
  options,
}: {
  body: API.LogBracelet;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/LogBracelet', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的LogBracelet POST /LogBracelet */
export function logBraceletUsingPost({
  body,
  options,
}: {
  body: API.LogBracelet;
  options?: CustomRequestOptions;
}) {
  return request<API.LogBracelet>('/LogBracelet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个LogBracelet GET /LogBracelet/${param0} */
export function logBraceletSnowflakeIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogBraceletSnowflakeIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { snowflakeId: param0, ...queryParams } = params;

  return request<API.LogBraceletVo>(`/LogBracelet/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个LogBracelet DELETE /LogBracelet/${param0} */
export function logBraceletSnowflakeIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogBraceletSnowflakeIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { snowflakeId: param0, ...queryParams } = params;

  return request<boolean>(`/LogBracelet/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新LogBracelet信息 PUT /LogBracelet/batch */
export function logBraceletBatchUsingPut({
  body,
  options,
}: {
  body: API.LogBraceletBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/LogBracelet/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除LogBracelet DELETE /LogBracelet/batch */
export function logBraceletBatchUsingDelete({
  body,
  options,
}: {
  body: API.LogBraceletRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/LogBracelet/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出LogBracelet数据到Excel文件 GET /LogBracelet/export */
export function logBraceletOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogBraceletOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/LogBracelet/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入LogBracelet数据 POST /LogBracelet/import */
export function logBraceletOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.LogBraceletOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/LogBracelet/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询LogBracelet列表 GET /LogBracelet/search */
export function logBraceletSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogBraceletSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageLogBraceletVo>('/LogBracelet/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
