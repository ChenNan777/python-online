/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新Scores信息 PUT /Scores */
export function scoresUsingPut({
  body,
  options,
}: {
  body: API.Scores;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/Scores', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的Scores POST /Scores */
export function scoresUsingPost({
  body,
  options,
}: {
  body: API.Scores;
  options?: CustomRequestOptions;
}) {
  return request<API.Scores>('/Scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个Scores GET /Scores/${param0} */
export function scoresIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ScoresIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.ScoresVo>(`/Scores/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个Scores DELETE /Scores/${param0} */
export function scoresIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ScoresIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<boolean>(`/Scores/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新Scores信息 PUT /Scores/batch */
export function scoresBatchUsingPut({
  body,
  options,
}: {
  body: API.ScoresBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/Scores/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除Scores DELETE /Scores/batch */
export function scoresBatchUsingDelete({
  body,
  options,
}: {
  body: API.ScoresRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/Scores/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出Scores数据到Excel文件 GET /Scores/export */
export function scoresOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ScoresOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/Scores/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入Scores数据 POST /Scores/import */
export function scoresOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.ScoresOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/Scores/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询Scores列表 GET /Scores/search */
export function scoresSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ScoresSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageScoresVo>('/Scores/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
