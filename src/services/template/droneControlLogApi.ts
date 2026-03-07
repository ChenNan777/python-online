/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新DroneControlLog信息 PUT /DroneControlLog */
export function droneControlLogUsingPut({
  body,
  options,
}: {
  body: API.DroneControlLog;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/DroneControlLog', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的DroneControlLog POST /DroneControlLog */
export function droneControlLogUsingPost({
  body,
  options,
}: {
  body: API.DroneControlLog;
  options?: CustomRequestOptions;
}) {
  return request<API.DroneControlLog>('/DroneControlLog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个DroneControlLog GET /DroneControlLog/${param0} */
export function droneControlLogLogIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneControlLogLogIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { logId: param0, ...queryParams } = params;

  return request<API.DroneControlLogVo>(`/DroneControlLog/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个DroneControlLog DELETE /DroneControlLog/${param0} */
export function droneControlLogLogIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneControlLogLogIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { logId: param0, ...queryParams } = params;

  return request<boolean>(`/DroneControlLog/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新DroneControlLog信息 PUT /DroneControlLog/batch */
export function droneControlLogBatchUsingPut({
  body,
  options,
}: {
  body: API.DroneControlLogBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/DroneControlLog/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除DroneControlLog DELETE /DroneControlLog/batch */
export function droneControlLogBatchUsingDelete({
  body,
  options,
}: {
  body: API.DroneControlLogRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/DroneControlLog/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出DroneControlLog数据到Excel文件 GET /DroneControlLog/export */
export function droneControlLogOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneControlLogOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/DroneControlLog/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入DroneControlLog数据 POST /DroneControlLog/import */
export function droneControlLogOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.DroneControlLogOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/DroneControlLog/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询DroneControlLog列表 GET /DroneControlLog/search */
export function droneControlLogSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneControlLogSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageDroneControlLogVo>('/DroneControlLog/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
