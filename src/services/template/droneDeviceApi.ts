/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新DroneDevice信息 PUT /DroneDevice */
export function droneDeviceUsingPut({
  body,
  options,
}: {
  body: API.DroneDevice;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/DroneDevice', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的DroneDevice POST /DroneDevice */
export function droneDeviceUsingPost({
  body,
  options,
}: {
  body: API.DroneDevice;
  options?: CustomRequestOptions;
}) {
  return request<API.DroneDevice>('/DroneDevice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个DroneDevice DELETE /DroneDevice/${param0} */
export function droneDeviceDroneIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneDeviceDroneIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { droneId: param0, ...queryParams } = params;

  return request<boolean>(`/DroneDevice/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新DroneDevice信息 PUT /DroneDevice/batch */
export function droneDeviceBatchUsingPut({
  body,
  options,
}: {
  body: API.DroneDeviceBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/DroneDevice/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除DroneDevice DELETE /DroneDevice/batch */
export function droneDeviceBatchUsingDelete({
  body,
  options,
}: {
  body: API.DroneDeviceRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/DroneDevice/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出DroneDevice数据到Excel文件 GET /DroneDevice/export */
export function droneDeviceOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneDeviceOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/DroneDevice/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入DroneDevice数据 POST /DroneDevice/import */
export function droneDeviceOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.DroneDeviceOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/DroneDevice/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询DroneDevice列表 GET /DroneDevice/search */
export function droneDeviceSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneDeviceSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageDroneDeviceVo>('/DroneDevice/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
