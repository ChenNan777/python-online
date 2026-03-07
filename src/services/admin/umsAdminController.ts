/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 获取指定用户信息 GET /admin/${param0} */
export function adminIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AdminIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.UmsAdmin>(`/admin/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除指定用户信息 POST /admin/delete/${param0} */
export function adminOpenApiDeleteIdUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AdminOpenApiDeleteIdUsingPostParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(`/admin/delete/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取当前登录用户信息 GET /admin/info */
export function adminInfoUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/admin/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据用户名或姓名分页获取用户列表 GET /admin/list */
export function adminListUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AdminListUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageUmsAdminDto>('/admin/list', {
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

/** 登录以后返回token POST /admin/login */
export function adminLoginUsingPost({
  body,
  options,
}: {
  body: API.UmsAdminLoginParam;
  options?: CustomRequestOptions;
}) {
  return request<API.LoginResultVo>('/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 登出功能 POST /admin/logout */
export function adminLogoutUsingPost({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/admin/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 刷新token GET /admin/refreshToken */
export function adminRefreshTokenUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/admin/refreshToken', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户注册 POST /admin/register */
export function adminRegisterUsingPost({
  body,
  options,
}: {
  body: API.UmsAdminParam;
  options?: CustomRequestOptions;
}) {
  return request<API.UmsAdmin>('/admin/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取指定用户的角色 GET /admin/role/${param0} */
export function adminRoleAdminIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AdminRoleAdminIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { adminId: param0, ...queryParams } = params;

  return request<API.UmsRole[]>(`/admin/role/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 给用户分配角色 POST /admin/role/update */
export function adminRoleUpdateUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AdminRoleUpdateUsingPostParams;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/admin/role/update', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 修改指定用户信息 POST /admin/update/${param0} */
export function adminUpdateIdUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AdminUpdateIdUsingPostParams;
  body: API.UmsAdminDto;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(`/admin/update/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 修改指定用户密码 POST /admin/updatePassword */
export function adminUpdatePasswordUsingPost({
  body,
  options,
}: {
  body: API.UpdateAdminPasswordParam;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/admin/updatePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改帐号状态 POST /admin/updateStatus/${param0} */
export function adminUpdateStatusIdUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AdminUpdateStatusIdUsingPostParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<Record<string, unknown>>(`/admin/updateStatus/${param0}`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
