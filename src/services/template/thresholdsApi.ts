/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新Thresholds信息 PUT /Thresholds */
export function thresholdsUsingPut({
  body,
  options,
}: {
  body: API.Thresholds;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/Thresholds', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的Thresholds POST /Thresholds */
export function thresholdsUsingPost({
  body,
  options,
}: {
  body: API.Thresholds;
  options?: CustomRequestOptions;
}) {
  return request<API.Thresholds>('/Thresholds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个Thresholds GET /Thresholds/${param0} */
export function thresholdsIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ThresholdsIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.ThresholdsVo>(`/Thresholds/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个Thresholds DELETE /Thresholds/${param0} */
export function thresholdsIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ThresholdsIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<boolean>(`/Thresholds/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新Thresholds信息 PUT /Thresholds/batch */
export function thresholdsBatchUsingPut({
  body,
  options,
}: {
  body: API.ThresholdsBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/Thresholds/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除Thresholds DELETE /Thresholds/batch */
export function thresholdsBatchUsingDelete({
  body,
  options,
}: {
  body: API.ThresholdsRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/Thresholds/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出Thresholds数据到Excel文件 GET /Thresholds/export */
export function thresholdsOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ThresholdsOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/Thresholds/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入Thresholds数据 POST /Thresholds/import */
export function thresholdsOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.ThresholdsOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/Thresholds/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询Thresholds列表 GET /Thresholds/search */
export function thresholdsSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ThresholdsSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageThresholdsVo>('/Thresholds/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
