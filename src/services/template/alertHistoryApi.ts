/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新AlertHistory信息 PUT /AlertHistory */
export function alertHistoryUsingPut({
  body,
  options,
}: {
  body: API.AlertHistory;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/AlertHistory', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的AlertHistory POST /AlertHistory */
export function alertHistoryUsingPost({
  body,
  options,
}: {
  body: API.AlertHistory;
  options?: CustomRequestOptions;
}) {
  return request<API.AlertHistory>('/AlertHistory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个AlertHistory GET /AlertHistory/${param0} */
export function alertHistoryIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AlertHistoryIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.AlertHistoryVo>(`/AlertHistory/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个AlertHistory DELETE /AlertHistory/${param0} */
export function alertHistoryIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AlertHistoryIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<boolean>(`/AlertHistory/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新AlertHistory信息 PUT /AlertHistory/batch */
export function alertHistoryBatchUsingPut({
  body,
  options,
}: {
  body: API.AlertHistoryBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/AlertHistory/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除AlertHistory DELETE /AlertHistory/batch */
export function alertHistoryBatchUsingDelete({
  body,
  options,
}: {
  body: API.AlertHistoryRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/AlertHistory/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出AlertHistory数据到Excel文件 GET /AlertHistory/export */
export function alertHistoryOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AlertHistoryOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/AlertHistory/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入AlertHistory数据 POST /AlertHistory/import */
export function alertHistoryOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.AlertHistoryOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/AlertHistory/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询AlertHistory列表 GET /AlertHistory/search */
export function alertHistorySearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AlertHistorySearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageAlertHistoryVo>('/AlertHistory/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
