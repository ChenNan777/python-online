/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新DevTablet信息 PUT /DevTablet */
export function devTabletUsingPut({
  body,
  options,
}: {
  body: API.DevTablet;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/DevTablet', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的DevTablet POST /DevTablet */
export function devTabletUsingPost({
  body,
  options,
}: {
  body: API.DevTablet;
  options?: CustomRequestOptions;
}) {
  return request<API.DevTablet>('/DevTablet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个DevTablet GET /DevTablet/${param0} */
export function devTabletDeviceIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DevTabletDeviceIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { deviceId: param0, ...queryParams } = params;

  return request<API.DevTabletVo>(`/DevTablet/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个DevTablet DELETE /DevTablet/${param0} */
export function devTabletDeviceIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DevTabletDeviceIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { deviceId: param0, ...queryParams } = params;

  return request<boolean>(`/DevTablet/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新DevTablet信息 PUT /DevTablet/batch */
export function devTabletBatchUsingPut({
  body,
  options,
}: {
  body: API.DevTabletBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/DevTablet/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除DevTablet DELETE /DevTablet/batch */
export function devTabletBatchUsingDelete({
  body,
  options,
}: {
  body: API.DevTabletRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/DevTablet/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出DevTablet数据到Excel文件 GET /DevTablet/export */
export function devTabletOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DevTabletOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/DevTablet/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入DevTablet数据 POST /DevTablet/import */
export function devTabletOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.DevTabletOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/DevTablet/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询DevTablet列表 GET /DevTablet/search */
export function devTabletSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DevTabletSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageDevTabletVo>('/DevTablet/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
