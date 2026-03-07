/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新RadiationPayloadConfigChangeLog信息 PUT /RadiationPayloadConfigChangeLog */
export function radiationPayloadConfigChangeLogUsingPut({
  body,
  options,
}: {
  body: API.RadiationPayloadConfigChangeLog;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/RadiationPayloadConfigChangeLog', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的RadiationPayloadConfigChangeLog POST /RadiationPayloadConfigChangeLog */
export function radiationPayloadConfigChangeLogUsingPost({
  body,
  options,
}: {
  body: API.RadiationPayloadConfigChangeLog;
  options?: CustomRequestOptions;
}) {
  return request<API.RadiationPayloadConfigChangeLog>(
    '/RadiationPayloadConfigChangeLog',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 根据主键查询 根据ID查询单个RadiationPayloadConfigChangeLog GET /RadiationPayloadConfigChangeLog/${param0} */
export function radiationPayloadConfigChangeLogLogIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RadiationPayloadConfigChangeLogLogIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { logId: param0, ...queryParams } = params;

  return request<API.RadiationPayloadConfigChangeLogVO>(
    `/RadiationPayloadConfigChangeLog/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 根据主键删除 删除单个RadiationPayloadConfigChangeLog DELETE /RadiationPayloadConfigChangeLog/${param0} */
export function radiationPayloadConfigChangeLogLogIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RadiationPayloadConfigChangeLogLogIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { logId: param0, ...queryParams } = params;

  return request<boolean>(`/RadiationPayloadConfigChangeLog/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新RadiationPayloadConfigChangeLog信息 PUT /RadiationPayloadConfigChangeLog/batch */
export function radiationPayloadConfigChangeLogBatchUsingPut({
  body,
  options,
}: {
  body: API.RadiationPayloadConfigChangeLogBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/RadiationPayloadConfigChangeLog/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除RadiationPayloadConfigChangeLog DELETE /RadiationPayloadConfigChangeLog/batch */
export function radiationPayloadConfigChangeLogBatchUsingDelete({
  body,
  options,
}: {
  body: API.RadiationPayloadConfigChangeLogRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/RadiationPayloadConfigChangeLog/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出RadiationPayloadConfigChangeLog数据到Excel文件 GET /RadiationPayloadConfigChangeLog/export */
export function radiationPayloadConfigChangeLogOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RadiationPayloadConfigChangeLogOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/RadiationPayloadConfigChangeLog/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入RadiationPayloadConfigChangeLog数据 POST /RadiationPayloadConfigChangeLog/import */
export function radiationPayloadConfigChangeLogOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.RadiationPayloadConfigChangeLogOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/RadiationPayloadConfigChangeLog/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
