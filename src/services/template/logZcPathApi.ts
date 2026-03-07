/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新LogZcPath信息 PUT /LogZcPath */
export function logZcPathUsingPut({
  body,
  options,
}: {
  body: API.LogZcPath;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/LogZcPath', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的LogZcPath POST /LogZcPath */
export function logZcPathUsingPost({
  body,
  options,
}: {
  body: API.LogZcPath;
  options?: CustomRequestOptions;
}) {
  return request<API.LogZcPath>('/LogZcPath', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个LogZcPath GET /LogZcPath/${param0} */
export function logZcPathSnowflakeIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogZcPathSnowflakeIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { snowflakeId: param0, ...queryParams } = params;

  return request<API.LogZcPathVo>(`/LogZcPath/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个LogZcPath DELETE /LogZcPath/${param0} */
export function logZcPathSnowflakeIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogZcPathSnowflakeIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { snowflakeId: param0, ...queryParams } = params;

  return request<boolean>(`/LogZcPath/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新LogZcPath信息 PUT /LogZcPath/batch */
export function logZcPathBatchUsingPut({
  body,
  options,
}: {
  body: API.LogZcPathBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/LogZcPath/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除LogZcPath DELETE /LogZcPath/batch */
export function logZcPathBatchUsingDelete({
  body,
  options,
}: {
  body: API.LogZcPathRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/LogZcPath/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出LogZcPath数据到Excel文件 GET /LogZcPath/export */
export function logZcPathOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogZcPathOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/LogZcPath/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入LogZcPath数据 POST /LogZcPath/import */
export function logZcPathOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.LogZcPathOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/LogZcPath/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询LogZcPath列表 GET /LogZcPath/search */
export function logZcPathSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogZcPathSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageLogZcPathVo>('/LogZcPath/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
