/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新LogTargetDetection信息 PUT /LogTargetDetection */
export function logTargetDetectionUsingPut({
  body,
  options,
}: {
  body: API.LogTargetDetection;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/LogTargetDetection', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的LogTargetDetection POST /LogTargetDetection */
export function logTargetDetectionUsingPost({
  body,
  options,
}: {
  body: API.LogTargetDetection;
  options?: CustomRequestOptions;
}) {
  return request<API.LogTargetDetection>('/LogTargetDetection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个LogTargetDetection GET /LogTargetDetection/${param0} */
export function logTargetDetectionSnowflakeIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogTargetDetectionSnowflakeIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { snowflakeId: param0, ...queryParams } = params;

  return request<API.LogTargetDetectionVo>(`/LogTargetDetection/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个LogTargetDetection DELETE /LogTargetDetection/${param0} */
export function logTargetDetectionSnowflakeIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogTargetDetectionSnowflakeIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { snowflakeId: param0, ...queryParams } = params;

  return request<boolean>(`/LogTargetDetection/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新LogTargetDetection信息 PUT /LogTargetDetection/batch */
export function logTargetDetectionBatchUsingPut({
  body,
  options,
}: {
  body: API.LogTargetDetectionBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/LogTargetDetection/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除LogTargetDetection DELETE /LogTargetDetection/batch */
export function logTargetDetectionBatchUsingDelete({
  body,
  options,
}: {
  body: API.LogTargetDetectionRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/LogTargetDetection/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出LogTargetDetection数据到Excel文件 GET /LogTargetDetection/export */
export function logTargetDetectionOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogTargetDetectionOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/LogTargetDetection/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入LogTargetDetection数据 POST /LogTargetDetection/import */
export function logTargetDetectionOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.LogTargetDetectionOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/LogTargetDetection/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询LogTargetDetection列表 GET /LogTargetDetection/search */
export function logTargetDetectionSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.LogTargetDetectionSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageLogTargetDetectionVo>(
    '/LogTargetDetection/search',
    {
      method: 'GET',
      params: {
        ...params,
        req: undefined,
        ...params['req'],
      },
      ...(options || {}),
    }
  );
}
