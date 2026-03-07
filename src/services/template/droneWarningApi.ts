/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新DroneWarning信息 PUT /DroneWarning */
export function droneWarningUsingPut({
  body,
  options,
}: {
  body: API.DroneWarning;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/DroneWarning', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的DroneWarning POST /DroneWarning */
export function droneWarningUsingPost({
  body,
  options,
}: {
  body: API.DroneWarning;
  options?: CustomRequestOptions;
}) {
  return request<API.DroneWarning>('/DroneWarning', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个DroneWarning GET /DroneWarning/${param0} */
export function droneWarningWarningIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneWarningWarningIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { warningId: param0, ...queryParams } = params;

  return request<API.DroneWarningVo>(`/DroneWarning/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个DroneWarning DELETE /DroneWarning/${param0} */
export function droneWarningWarningIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneWarningWarningIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { warningId: param0, ...queryParams } = params;

  return request<boolean>(`/DroneWarning/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新DroneWarning信息 PUT /DroneWarning/batch */
export function droneWarningBatchUsingPut({
  body,
  options,
}: {
  body: API.DroneWarningBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/DroneWarning/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除DroneWarning DELETE /DroneWarning/batch */
export function droneWarningBatchUsingDelete({
  body,
  options,
}: {
  body: API.DroneWarningRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/DroneWarning/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出DroneWarning数据到Excel文件 GET /DroneWarning/export */
export function droneWarningOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneWarningOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/DroneWarning/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入DroneWarning数据 POST /DroneWarning/import */
export function droneWarningOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.DroneWarningOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/DroneWarning/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询DroneWarning列表 GET /DroneWarning/search */
export function droneWarningSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneWarningSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageDroneWarningVo>('/DroneWarning/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
