/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新AlertRules信息 PUT /AlertRules */
export function alertRulesUsingPut({
  body,
  options,
}: {
  body: API.AlertRules;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/AlertRules', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的AlertRules POST /AlertRules */
export function alertRulesUsingPost({
  body,
  options,
}: {
  body: API.AlertRules;
  options?: CustomRequestOptions;
}) {
  return request<API.AlertRules>('/AlertRules', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个AlertRules GET /AlertRules/${param0} */
export function alertRulesIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AlertRulesIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<API.AlertRulesVo>(`/AlertRules/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个AlertRules DELETE /AlertRules/${param0} */
export function alertRulesIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AlertRulesIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { id: param0, ...queryParams } = params;

  return request<boolean>(`/AlertRules/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新AlertRules信息 PUT /AlertRules/batch */
export function alertRulesBatchUsingPut({
  body,
  options,
}: {
  body: API.AlertRulesBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/AlertRules/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除AlertRules DELETE /AlertRules/batch */
export function alertRulesBatchUsingDelete({
  body,
  options,
}: {
  body: API.AlertRulesRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/AlertRules/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出AlertRules数据到Excel文件 GET /AlertRules/export */
export function alertRulesOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AlertRulesOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/AlertRules/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入AlertRules数据 POST /AlertRules/import */
export function alertRulesOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.AlertRulesOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/AlertRules/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询AlertRules列表 GET /AlertRules/search */
export function alertRulesSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AlertRulesSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PageAlertRulesVo>('/AlertRules/search', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
