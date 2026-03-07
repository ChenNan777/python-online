/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新DroneRealtimeStatus信息 PUT /DroneRealtimeStatus */
export function droneRealtimeStatusUsingPut({
  body,
  options,
}: {
  body: API.DroneRealtimeStatus;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/DroneRealtimeStatus', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的DroneRealtimeStatus POST /DroneRealtimeStatus */
export function droneRealtimeStatusUsingPost({
  body,
  options,
}: {
  body: API.DroneRealtimeStatus;
  options?: CustomRequestOptions;
}) {
  return request<API.DroneRealtimeStatus>('/DroneRealtimeStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个DroneRealtimeStatus GET /DroneRealtimeStatus/${param0} */
export function droneRealtimeStatusStatusIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneRealtimeStatusStatusIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { statusId: param0, ...queryParams } = params;

  return request<API.DroneRealtimeStatusVo>(`/DroneRealtimeStatus/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个DroneRealtimeStatus DELETE /DroneRealtimeStatus/${param0} */
export function droneRealtimeStatusStatusIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneRealtimeStatusStatusIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { statusId: param0, ...queryParams } = params;

  return request<boolean>(`/DroneRealtimeStatus/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新DroneRealtimeStatus信息 PUT /DroneRealtimeStatus/batch */
export function droneRealtimeStatusBatchUsingPut({
  body,
  options,
}: {
  body: API.DroneRealtimeStatusBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/DroneRealtimeStatus/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除DroneRealtimeStatus DELETE /DroneRealtimeStatus/batch */
export function droneRealtimeStatusBatchUsingDelete({
  body,
  options,
}: {
  body: API.DroneRealtimeStatusRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/DroneRealtimeStatus/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出DroneRealtimeStatus数据到Excel文件 GET /DroneRealtimeStatus/export */
export function droneRealtimeStatusOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneRealtimeStatusOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/DroneRealtimeStatus/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入DroneRealtimeStatus数据 POST /DroneRealtimeStatus/import */
export function droneRealtimeStatusOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.DroneRealtimeStatusOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/DroneRealtimeStatus/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询DroneRealtimeStatus列表 GET /DroneRealtimeStatus/search */
export function droneRealtimeStatusSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneRealtimeStatusSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageDroneRealtimeStatusVo>('/DroneRealtimeStatus/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
