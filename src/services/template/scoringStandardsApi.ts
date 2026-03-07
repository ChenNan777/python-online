/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新ScoringStandards信息 PUT /ScoringStandards */
export function scoringStandardsUsingPut({
  body,
  options,
}: {
  body: API.ScoringStandards;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/ScoringStandards', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的ScoringStandards POST /ScoringStandards */
export function scoringStandardsUsingPost({
  body,
  options,
}: {
  body: API.ScoringStandards;
  options?: CustomRequestOptions;
}) {
  return request<API.ScoringStandards>('/ScoringStandards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个ScoringStandards GET /ScoringStandards/${param0} */
export function scoringStandardsIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ScoringStandardsIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.ScoringStandardsVo>(`/ScoringStandards/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个ScoringStandards DELETE /ScoringStandards/${param0} */
export function scoringStandardsIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ScoringStandardsIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<boolean>(`/ScoringStandards/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新ScoringStandards信息 PUT /ScoringStandards/batch */
export function scoringStandardsBatchUsingPut({
  body,
  options,
}: {
  body: API.ScoringStandardsBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/ScoringStandards/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除ScoringStandards DELETE /ScoringStandards/batch */
export function scoringStandardsBatchUsingDelete({
  body,
  options,
}: {
  body: API.ScoringStandardsRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/ScoringStandards/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出ScoringStandards数据到Excel文件 GET /ScoringStandards/export */
export function scoringStandardsOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ScoringStandardsOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/ScoringStandards/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入ScoringStandards数据 POST /ScoringStandards/import */
export function scoringStandardsOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.ScoringStandardsOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/ScoringStandards/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询ScoringStandards列表 GET /ScoringStandards/search */
export function scoringStandardsSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ScoringStandardsSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageScoringStandardsVo>('/ScoringStandards/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
