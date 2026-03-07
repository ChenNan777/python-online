/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据ID获取菜单详情 GET /menu/${param0} */
export function menuIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MenuIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.UmsMenu>(`/menu/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 添加后台菜单 POST /menu/create */
export function menuCreateUsingPost({
  body,
  options,
}: {
  body: API.UmsMenu;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/menu/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据ID删除后台菜单 POST /menu/delete/${param0} */
export function menuOpenApiDeleteIdUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MenuOpenApiDeleteIdUsingPostParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(`/menu/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页查询后台菜单 GET /menu/list/${param0} */
export function menuListParentIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MenuListParentIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { parentId: param0, ...queryParams } = params;

  return request<API.CommonPageUmsMenu>(`/menu/list/${param0}`, {
    method: 'GET',
    params: {
      // pageSize has a default value: 5
      pageSize: '5',
      // pageNum has a default value: 1
      pageNum: '1',
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 树形结构返回所有菜单列表 GET /menu/treeList */
export function menuTreeListUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.UmsMenuNode[]>('/menu/treeList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改后台菜单 POST /menu/update/${param0} */
export function menuUpdateIdUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MenuUpdateIdUsingPostParams;
  body: API.UmsMenu;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(`/menu/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 修改菜单显示状态 POST /menu/updateHidden/${param0} */
export function menuUpdateHiddenIdUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MenuUpdateHiddenIdUsingPostParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(`/menu/updateHidden/${param0}`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
