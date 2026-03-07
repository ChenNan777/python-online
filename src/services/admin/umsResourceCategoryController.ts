/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 添加后台资源分类 POST /resourceCategory/create */
export function resourceCategoryCreateUsingPost({
  body,
  options,
}: {
  body: API.UmsResourceCategory;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/resourceCategory/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据ID删除后台资源分类 POST /resourceCategory/delete/${param0} */
export function resourceCategoryOpenApiDeleteIdUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ResourceCategoryOpenApiDeleteIdUsingPostParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(
    `/resourceCategory/delete/${param0}`,
    {
      method: 'POST',
      params: { ...queryParams },
      ...(options || {}),
    }
  );
}

/** 查询所有后台资源分类 GET /resourceCategory/listAll */
export function resourceCategoryListAllUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.UmsResourceCategory[]>('/resourceCategory/listAll', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改后台资源分类 POST /resourceCategory/update/${param0} */
export function resourceCategoryUpdateIdUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.ResourceCategoryUpdateIdUsingPostParams;
  body: API.UmsResourceCategory;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(
    `/resourceCategory/update/${param0}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      params: { ...queryParams },
      data: body,
      ...(options || {}),
    }
  );
}
