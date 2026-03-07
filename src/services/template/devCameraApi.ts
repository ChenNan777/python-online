/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新DevCamera信息 PUT /DevCamera */
export function devCameraUsingPut({
  body,
  options,
}: {
  body: API.DevCamera;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/DevCamera', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的DevCamera POST /DevCamera */
export function devCameraUsingPost({
  body,
  options,
}: {
  body: API.DevCamera;
  options?: CustomRequestOptions;
}) {
  return request<API.DevCamera>('/DevCamera', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个DevCamera GET /DevCamera/${param0} */
export function devCameraDeviceIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DevCameraDeviceIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { deviceId: param0, ...queryParams } = params;

  return request<API.DevCameraVo>(`/DevCamera/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个DevCamera DELETE /DevCamera/${param0} */
export function devCameraDeviceIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DevCameraDeviceIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { deviceId: param0, ...queryParams } = params;

  return request<boolean>(`/DevCamera/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新DevCamera信息 PUT /DevCamera/batch */
export function devCameraBatchUsingPut({
  body,
  options,
}: {
  body: API.DevCameraBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/DevCamera/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除DevCamera DELETE /DevCamera/batch */
export function devCameraBatchUsingDelete({
  body,
  options,
}: {
  body: API.DevCameraRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/DevCamera/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出DevCamera数据到Excel文件 GET /DevCamera/export */
export function devCameraOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DevCameraOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/DevCamera/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入DevCamera数据 POST /DevCamera/import */
export function devCameraOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.DevCameraOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/DevCamera/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询DevCamera列表 GET /DevCamera/search */
export function devCameraSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DevCameraSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageDevCameraVo>('/DevCamera/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
