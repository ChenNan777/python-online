/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新TaskDroneConfig信息 PUT /TaskDroneConfig */
export function taskDroneConfigUsingPut({
  body,
  options,
}: {
  body: API.TaskDroneConfig;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/TaskDroneConfig', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的TaskDroneConfig POST /TaskDroneConfig */
export function taskDroneConfigUsingPost({
  body,
  options,
}: {
  body: API.TaskDroneConfig;
  options?: CustomRequestOptions;
}) {
  return request<API.TaskDroneConfig>('/TaskDroneConfig', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个TaskDroneConfig GET /TaskDroneConfig/${param0} */
export function taskDroneConfigConfigIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskDroneConfigConfigIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { configId: param0, ...queryParams } = params;

  return request<API.TaskDroneConfigVo>(`/TaskDroneConfig/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个TaskDroneConfig DELETE /TaskDroneConfig/${param0} */
export function taskDroneConfigConfigIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskDroneConfigConfigIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { configId: param0, ...queryParams } = params;

  return request<boolean>(`/TaskDroneConfig/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新TaskDroneConfig信息 PUT /TaskDroneConfig/batch */
export function taskDroneConfigBatchUsingPut({
  body,
  options,
}: {
  body: API.TaskDroneConfigBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TaskDroneConfig/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除TaskDroneConfig DELETE /TaskDroneConfig/batch */
export function taskDroneConfigBatchUsingDelete({
  body,
  options,
}: {
  body: API.TaskDroneConfigRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TaskDroneConfig/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出TaskDroneConfig数据到Excel文件 GET /TaskDroneConfig/export */
export function taskDroneConfigOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskDroneConfigOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/TaskDroneConfig/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入TaskDroneConfig数据 POST /TaskDroneConfig/import */
export function taskDroneConfigOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.TaskDroneConfigOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/TaskDroneConfig/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询TaskDroneConfig列表 GET /TaskDroneConfig/search */
export function taskDroneConfigSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TaskDroneConfigSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageTaskDroneConfigVo>('/TaskDroneConfig/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
