/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新StudentTargetAssignment信息 PUT /StudentTargetAssignment */
export function studentTargetAssignmentUsingPut({
  body,
  options,
}: {
  body: API.StudentTargetAssignment;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/StudentTargetAssignment', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的StudentTargetAssignment POST /StudentTargetAssignment */
export function studentTargetAssignmentUsingPost({
  body,
  options,
}: {
  body: API.StudentTargetAssignment;
  options?: CustomRequestOptions;
}) {
  return request<API.StudentTargetAssignment>('/StudentTargetAssignment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个StudentTargetAssignment GET /StudentTargetAssignment/${param0} */
export function studentTargetAssignmentIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.StudentTargetAssignmentIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.StudentTargetAssignmentVo>(
    `/StudentTargetAssignment/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 根据主键删除 删除单个StudentTargetAssignment DELETE /StudentTargetAssignment/${param0} */
export function studentTargetAssignmentIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.StudentTargetAssignmentIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<boolean>(`/StudentTargetAssignment/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新StudentTargetAssignment信息 PUT /StudentTargetAssignment/batch */
export function studentTargetAssignmentBatchUsingPut({
  body,
  options,
}: {
  body: API.StudentTargetAssignmentBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/StudentTargetAssignment/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除StudentTargetAssignment DELETE /StudentTargetAssignment/batch */
export function studentTargetAssignmentBatchUsingDelete({
  body,
  options,
}: {
  body: API.StudentTargetAssignmentRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/StudentTargetAssignment/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出StudentTargetAssignment数据到Excel文件 GET /StudentTargetAssignment/export */
export function studentTargetAssignmentOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.StudentTargetAssignmentOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/StudentTargetAssignment/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入StudentTargetAssignment数据 POST /StudentTargetAssignment/import */
export function studentTargetAssignmentOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.StudentTargetAssignmentOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/StudentTargetAssignment/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询StudentTargetAssignment列表 GET /StudentTargetAssignment/search */
export function studentTargetAssignmentSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.StudentTargetAssignmentSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageStudentTargetAssignmentVo>(
    '/StudentTargetAssignment/search',
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
