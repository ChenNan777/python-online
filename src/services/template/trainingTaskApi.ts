/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新TrainingTask信息 PUT /TrainingTask */
export function trainingTaskUsingPut({
  body,
  options,
}: {
  body: API.TrainingTask;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/TrainingTask', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的TrainingTask POST /TrainingTask */
export function trainingTaskUsingPost({
  body,
  options,
}: {
  body: API.TrainingTask;
  options?: CustomRequestOptions;
}) {
  return request<API.TrainingTask>('/TrainingTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个TrainingTask GET /TrainingTask/${param0} */
export function trainingTaskTaskIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTaskTaskIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<API.TrainingTaskVO>(`/TrainingTask/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个TrainingTask DELETE /TrainingTask/${param0} */
export function trainingTaskTaskIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTaskTaskIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { taskId: param0, ...queryParams } = params;

  return request<boolean>(`/TrainingTask/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新TrainingTask信息 PUT /TrainingTask/batch */
export function trainingTaskBatchUsingPut({
  body,
  options,
}: {
  body: API.TrainingTaskBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TrainingTask/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除TrainingTask DELETE /TrainingTask/batch */
export function trainingTaskBatchUsingDelete({
  body,
  options,
}: {
  body: API.TrainingTaskRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TrainingTask/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出TrainingTask数据到Excel文件 GET /TrainingTask/export */
export function trainingTaskOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTaskOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/TrainingTask/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入TrainingTask数据 POST /TrainingTask/import */
export function trainingTaskOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.TrainingTaskOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/TrainingTask/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询TrainingTask列表 GET /TrainingTask/search */
export function trainingTaskSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTaskSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageTrainingTaskVO>('/TrainingTask/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
