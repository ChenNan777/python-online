/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新TrainingComment信息 PUT /TrainingComment */
export function trainingCommentUsingPut({
  body,
  options,
}: {
  body: API.TrainingComment;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/TrainingComment', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的TrainingComment POST /TrainingComment */
export function trainingCommentUsingPost({
  body,
  options,
}: {
  body: API.TrainingComment;
  options?: CustomRequestOptions;
}) {
  return request<API.TrainingComment>('/TrainingComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个TrainingComment GET /TrainingComment/${param0} */
export function trainingCommentCommentIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingCommentCommentIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { commentId: param0, ...queryParams } = params;

  return request<API.TrainingCommentVo>(`/TrainingComment/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个TrainingComment DELETE /TrainingComment/${param0} */
export function trainingCommentCommentIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingCommentCommentIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { commentId: param0, ...queryParams } = params;

  return request<boolean>(`/TrainingComment/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新TrainingComment信息 PUT /TrainingComment/batch */
export function trainingCommentBatchUsingPut({
  body,
  options,
}: {
  body: API.TrainingCommentBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TrainingComment/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除TrainingComment DELETE /TrainingComment/batch */
export function trainingCommentBatchUsingDelete({
  body,
  options,
}: {
  body: API.TrainingCommentRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TrainingComment/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出TrainingComment数据到Excel文件 GET /TrainingComment/export */
export function trainingCommentOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingCommentOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/TrainingComment/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入TrainingComment数据 POST /TrainingComment/import */
export function trainingCommentOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.TrainingCommentOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/TrainingComment/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询TrainingComment列表 GET /TrainingComment/search */
export function trainingCommentSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingCommentSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageTrainingCommentVo>('/TrainingComment/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
