/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新UmsAdminLoginLog信息 PUT /UmsAdminLoginLog */
export function umsAdminLoginLogUsingPut({
  body,
  options,
}: {
  body: API.UmsAdminLoginLog;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/UmsAdminLoginLog', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的UmsAdminLoginLog POST /UmsAdminLoginLog */
export function umsAdminLoginLogUsingPost({
  body,
  options,
}: {
  body: API.UmsAdminLoginLog;
  options?: CustomRequestOptions;
}) {
  return request<API.UmsAdminLoginLog>('/UmsAdminLoginLog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个UmsAdminLoginLog GET /UmsAdminLoginLog/${param0} */
export function umsAdminLoginLogIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UmsAdminLoginLogIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.UmsAdminLoginLogVO>(`/UmsAdminLoginLog/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个UmsAdminLoginLog DELETE /UmsAdminLoginLog/${param0} */
export function umsAdminLoginLogIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UmsAdminLoginLogIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<boolean>(`/UmsAdminLoginLog/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新UmsAdminLoginLog信息 PUT /UmsAdminLoginLog/batch */
export function umsAdminLoginLogBatchUsingPut({
  body,
  options,
}: {
  body: API.UmsAdminLoginLogBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/UmsAdminLoginLog/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除UmsAdminLoginLog DELETE /UmsAdminLoginLog/batch */
export function umsAdminLoginLogBatchUsingDelete({
  body,
  options,
}: {
  body: API.UmsAdminLoginLogReq;
  options?: CustomRequestOptions;
}) {
  return request<number>('/UmsAdminLoginLog/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出UmsAdminLoginLog数据到Excel文件 GET /UmsAdminLoginLog/export */
export function umsAdminLoginLogOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UmsAdminLoginLogOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/UmsAdminLoginLog/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入UmsAdminLoginLog数据 POST /UmsAdminLoginLog/import */
export function umsAdminLoginLogOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.UmsAdminLoginLogOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/UmsAdminLoginLog/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询UmsAdminLoginLog列表 GET /UmsAdminLoginLog/search */
export function umsAdminLoginLogSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.UmsAdminLoginLogSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageUmsAdminLoginLogVO>('/UmsAdminLoginLog/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
