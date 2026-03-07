/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新RadiationPayload信息 PUT /RadiationPayload */
export function radiationPayloadUsingPut({
  body,
  options,
}: {
  body: API.RadiationPayload;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/RadiationPayload', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的RadiationPayload POST /RadiationPayload */
export function radiationPayloadUsingPost({
  body,
  options,
}: {
  body: API.RadiationPayload;
  options?: CustomRequestOptions;
}) {
  return request<API.RadiationPayload>('/RadiationPayload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个RadiationPayload GET /RadiationPayload/${param0} */
export function radiationPayloadPayloadIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RadiationPayloadPayloadIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { payloadId: param0, ...queryParams } = params;

  return request<API.RadiationPayloadVo>(`/RadiationPayload/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个RadiationPayload DELETE /RadiationPayload/${param0} */
export function radiationPayloadPayloadIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RadiationPayloadPayloadIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { payloadId: param0, ...queryParams } = params;

  return request<boolean>(`/RadiationPayload/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新RadiationPayload信息 PUT /RadiationPayload/batch */
export function radiationPayloadBatchUsingPut({
  body,
  options,
}: {
  body: API.RadiationPayloadBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/RadiationPayload/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除RadiationPayload DELETE /RadiationPayload/batch */
export function radiationPayloadBatchUsingDelete({
  body,
  options,
}: {
  body: API.RadiationPayloadRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/RadiationPayload/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出RadiationPayload数据到Excel文件 GET /RadiationPayload/export */
export function radiationPayloadOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RadiationPayloadOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/RadiationPayload/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入RadiationPayload数据 POST /RadiationPayload/import */
export function radiationPayloadOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.RadiationPayloadOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/RadiationPayload/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询RadiationPayload列表 GET /RadiationPayload/search */
export function radiationPayloadSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RadiationPayloadSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageRadiationPayloadVo>('/RadiationPayload/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
