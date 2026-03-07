/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新GeoAreas信息 PUT /GeoAreas */
export function geoAreasUsingPut({
  body,
  options,
}: {
  body: API.GeoAreas;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/GeoAreas', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的GeoAreas POST /GeoAreas */
export function geoAreasUsingPost({
  body,
  options,
}: {
  body: API.GeoAreas;
  options?: CustomRequestOptions;
}) {
  return request<API.GeoAreas>('/GeoAreas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个GeoAreas GET /GeoAreas/${param0} */
export function geoAreasAreaIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.GeoAreasAreaIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { areaId: param0, ...queryParams } = params;

  return request<API.GeoAreasVo>(`/GeoAreas/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个GeoAreas DELETE /GeoAreas/${param0} */
export function geoAreasAreaIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.GeoAreasAreaIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { areaId: param0, ...queryParams } = params;

  return request<boolean>(`/GeoAreas/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新GeoAreas信息 PUT /GeoAreas/batch */
export function geoAreasBatchUsingPut({
  body,
  options,
}: {
  body: API.GeoAreasBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/GeoAreas/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除GeoAreas DELETE /GeoAreas/batch */
export function geoAreasBatchUsingDelete({
  body,
  options,
}: {
  body: API.GeoAreasRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/GeoAreas/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出GeoAreas数据到Excel文件 GET /GeoAreas/export */
export function geoAreasOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.GeoAreasOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/GeoAreas/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入GeoAreas数据 POST /GeoAreas/import */
export function geoAreasOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.GeoAreasOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/GeoAreas/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询GeoAreas列表 GET /GeoAreas/search */
export function geoAreasSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.GeoAreasSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageGeoAreasVo>('/GeoAreas/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
