/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新LogUav信息 PUT /LogUav */
export function logUavUsingPut({
  body,
  options,
}: {
  body: API.LogUav;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/LogUav', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的LogUav POST /LogUav */
export function logUavUsingPost({
  body,
  options,
}: {
  body: API.LogUav;
  options?: CustomRequestOptions;
}) {
  return request<API.LogUav>('/LogUav', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个LogUav GET /LogUav/${param0} */
export function logUavSnowflakeIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogUavSnowflakeIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { snowflakeId: param0, ...queryParams } = params;

  return request<API.LogMemberPathVo>(`/LogUav/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个LogUav DELETE /LogUav/${param0} */
export function logUavSnowflakeIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogUavSnowflakeIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { snowflakeId: param0, ...queryParams } = params;

  return request<boolean>(`/LogUav/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新LogUav信息 PUT /LogUav/batch */
export function logUavBatchUsingPut({
  body,
  options,
}: {
  body: API.LogUavBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/LogUav/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除LogUav DELETE /LogUav/batch */
export function logUavBatchUsingDelete({
  body,
  options,
}: {
  body: API.LogUavRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/LogUav/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出LogUav数据到Excel文件 GET /LogUav/export */
export function logUavOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogUavOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/LogUav/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入LogUav数据 POST /LogUav/import */
export function logUavOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.LogUavOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/LogUav/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询LogUav列表 GET /LogUav/search */
export function logUavSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogUavSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageLogMemberPathVo>('/LogUav/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
