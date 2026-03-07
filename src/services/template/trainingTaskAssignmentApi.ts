/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新TrainingTaskAssignment信息 PUT /TrainingTaskAssignment */
export function trainingTaskAssignmentUsingPut({
  body,
  options,
}: {
  body: API.TrainingTaskAssignment;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/TrainingTaskAssignment', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的TrainingTaskAssignment POST /TrainingTaskAssignment */
export function trainingTaskAssignmentUsingPost({
  body,
  options,
}: {
  body: API.TrainingTaskAssignment;
  options?: CustomRequestOptions;
}) {
  return request<API.TrainingTaskAssignment>('/TrainingTaskAssignment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个TrainingTaskAssignment GET /TrainingTaskAssignment/${param0} */
export function trainingTaskAssignmentAssignmentIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTaskAssignmentAssignmentIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { assignmentId: param0, ...queryParams } = params;

  return request<API.TrainingTaskAssignmentVo>(
    `/TrainingTaskAssignment/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 根据主键删除 删除单个TrainingTaskAssignment DELETE /TrainingTaskAssignment/${param0} */
export function trainingTaskAssignmentAssignmentIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTaskAssignmentAssignmentIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { assignmentId: param0, ...queryParams } = params;

  return request<boolean>(`/TrainingTaskAssignment/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新TrainingTaskAssignment信息 PUT /TrainingTaskAssignment/batch */
export function trainingTaskAssignmentBatchUsingPut({
  body,
  options,
}: {
  body: API.TrainingTaskAssignmentBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TrainingTaskAssignment/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除TrainingTaskAssignment DELETE /TrainingTaskAssignment/batch */
export function trainingTaskAssignmentBatchUsingDelete({
  body,
  options,
}: {
  body: API.TrainingTaskAssignmentRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/TrainingTaskAssignment/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出TrainingTaskAssignment数据到Excel文件 GET /TrainingTaskAssignment/export */
export function trainingTaskAssignmentOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTaskAssignmentOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/TrainingTaskAssignment/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入TrainingTaskAssignment数据 POST /TrainingTaskAssignment/import */
export function trainingTaskAssignmentOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.TrainingTaskAssignmentOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/TrainingTaskAssignment/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询TrainingTaskAssignment列表 GET /TrainingTaskAssignment/search */
export function trainingTaskAssignmentSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TrainingTaskAssignmentSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageTrainingTaskAssignmentVo>(
    '/TrainingTaskAssignment/search',
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
