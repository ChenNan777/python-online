/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据ID获取资源详情 GET /resource/${param0} */
export function resourceIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ResourceIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.UmsResource>(`/resource/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 添加后台资源 POST /resource/create */
export function resourceCreateUsingPost({
  body,
  options,
}: {
  body: API.UmsResource;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/resource/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据ID删除后台资源 POST /resource/delete/${param0} */
export function resourceOpenApiDeleteIdUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ResourceOpenApiDeleteIdUsingPostParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(`/resource/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页模糊查询后台资源 GET /resource/list */
export function resourceListUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ResourceListUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageUmsResource>('/resource/list', {
    method: 'GET',
    params: {
      // pageSize has a default value: 5
      pageSize: '5',
      // pageNum has a default value: 1
      pageNum: '1',
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询所有后台资源 GET /resource/listAll */
export function resourceListAllUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.UmsResource[]>('/resource/listAll', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改后台资源 POST /resource/update/${param0} */
export function resourceUpdateIdUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ResourceUpdateIdUsingPostParams;
  body: API.UmsResource;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(`/resource/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
