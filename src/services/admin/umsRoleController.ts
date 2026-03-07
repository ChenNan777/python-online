/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 给角色分配菜单 POST /role/allocMenu */
export function roleAllocMenuUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleAllocMenuUsingPostParams;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/role/allocMenu', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 给角色分配资源 POST /role/allocResource */
export function roleAllocResourceUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleAllocResourceUsingPostParams;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/role/allocResource', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 添加角色 POST /role/create */
export function roleCreateUsingPost({
  body,
  options,
}: {
  body: API.UmsRoleDto;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/role/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除角色 POST /role/delete */
export function roleOpenApiDeleteUsingPost({
  body,
  options,
}: {
  body: API.LongIdListReq;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/role/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据角色名称分页获取角色列表 GET /role/list */
export function roleListUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleListUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageUmsRoleDto>('/role/list', {
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

/** 获取所有角色 GET /role/listAll */
export function roleListAllUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.UmsRoleDto[]>('/role/listAll', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取角色相关菜单 GET /role/listMenu/${param0} */
export function roleListMenuRoleIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleListMenuRoleIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { roleId: param0, ...queryParams } = params;

  return request<API.UmsMenu[]>(`/role/listMenu/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取角色相关资源 GET /role/listResource/${param0} */
export function roleListResourceRoleIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleListResourceRoleIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { roleId: param0, ...queryParams } = params;

  return request<API.UmsResource[]>(`/role/listResource/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改角色 POST /role/update/${param0} */
export function roleUpdateIdUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleUpdateIdUsingPostParams;
  body: API.UmsRoleDto;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(`/role/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 修改角色状态 POST /role/updateStatus/${param0} */
export function roleUpdateStatusIdUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.RoleUpdateStatusIdUsingPostParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(`/role/updateStatus/${param0}`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
