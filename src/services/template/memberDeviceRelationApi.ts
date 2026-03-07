/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新MemberDeviceRelation信息 PUT /MemberDeviceRelation */
export function memberDeviceRelationUsingPut({
  body,
  options,
}: {
  body: API.MemberDeviceRelation;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/MemberDeviceRelation', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的MemberDeviceRelation POST /MemberDeviceRelation */
export function memberDeviceRelationUsingPost({
  body,
  options,
}: {
  body: API.MemberDeviceRelation;
  options?: CustomRequestOptions;
}) {
  return request<API.MemberDeviceRelation>('/MemberDeviceRelation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个MemberDeviceRelation GET /MemberDeviceRelation/${param0} */
export function memberDeviceRelationIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MemberDeviceRelationIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.MemberDeviceRelationVo>(
    `/MemberDeviceRelation/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 根据主键删除 删除单个MemberDeviceRelation DELETE /MemberDeviceRelation/${param0} */
export function memberDeviceRelationIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MemberDeviceRelationIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<boolean>(`/MemberDeviceRelation/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新MemberDeviceRelation信息 PUT /MemberDeviceRelation/batch */
export function memberDeviceRelationBatchUsingPut({
  body,
  options,
}: {
  body: API.MemberDeviceRelationBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/MemberDeviceRelation/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除MemberDeviceRelation DELETE /MemberDeviceRelation/batch */
export function memberDeviceRelationBatchUsingDelete({
  body,
  options,
}: {
  body: API.MemberDeviceRelationRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/MemberDeviceRelation/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出MemberDeviceRelation数据到Excel文件 GET /MemberDeviceRelation/export */
export function memberDeviceRelationOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MemberDeviceRelationOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/MemberDeviceRelation/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入MemberDeviceRelation数据 POST /MemberDeviceRelation/import */
export function memberDeviceRelationOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.MemberDeviceRelationOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/MemberDeviceRelation/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询MemberDeviceRelation列表 GET /MemberDeviceRelation/search */
export function memberDeviceRelationSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MemberDeviceRelationSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageMemberDeviceRelationVo>(
    '/MemberDeviceRelation/search',
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
