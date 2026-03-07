/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 根据主键更新 更新PersonnelVitalSigns信息 PUT /PersonnelVitalSigns */
export function personnelVitalSignsUsingPut({
  body,
  options,
}: {
  body: API.PersonnelVitalSigns;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/PersonnelVitalSigns', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新记录 创建新的PersonnelVitalSigns POST /PersonnelVitalSigns */
export function personnelVitalSignsUsingPost({
  body,
  options,
}: {
  body: API.PersonnelVitalSigns;
  options?: CustomRequestOptions;
}) {
  return request<API.PersonnelVitalSigns>('/PersonnelVitalSigns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据主键查询 根据ID查询单个PersonnelVitalSigns GET /PersonnelVitalSigns/${param0} */
export function personnelVitalSignsRecordIdUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PersonnelVitalSignsRecordIdUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { recordId: param0, ...queryParams } = params;

  return request<API.PersonnelVitalSignsVo>(`/PersonnelVitalSigns/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据主键删除 删除单个PersonnelVitalSigns DELETE /PersonnelVitalSigns/${param0} */
export function personnelVitalSignsRecordIdUsingDelete({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PersonnelVitalSignsRecordIdUsingDeleteParams;
  options?: CustomRequestOptions;
}) {
  const { recordId: param0, ...queryParams } = params;

  return request<boolean>(`/PersonnelVitalSigns/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据条件批量更新 根据指定条件批量更新PersonnelVitalSigns信息 PUT /PersonnelVitalSigns/batch */
export function personnelVitalSignsBatchUsingPut({
  body,
  options,
}: {
  body: API.PersonnelVitalSignsBatchUsingPutBody;
  options?: CustomRequestOptions;
}) {
  return request<number>('/PersonnelVitalSigns/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件批量删除 根据条件批量删除PersonnelVitalSigns DELETE /PersonnelVitalSigns/batch */
export function personnelVitalSignsBatchUsingDelete({
  body,
  options,
}: {
  body: API.PersonnelVitalSignsRequestParam;
  options?: CustomRequestOptions;
}) {
  return request<number>('/PersonnelVitalSigns/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导出Excel 导出PersonnelVitalSigns数据到Excel文件 GET /PersonnelVitalSigns/export */
export function personnelVitalSignsOpenApiExportUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PersonnelVitalSignsOpenApiExportUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<unknown>('/PersonnelVitalSigns/export', {
    method: 'GET',
    params: {
      ...params,
      condition: undefined,
      ...params['condition'],
    },
    ...(options || {}),
  });
}

/** Excel批量导入 通过Excel文件批量导入PersonnelVitalSigns数据 POST /PersonnelVitalSigns/import */
export function personnelVitalSignsOpenApiImportUsingPost({
  body,
  options,
}: {
  body: API.PersonnelVitalSignsOpenApiImportUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<string>('/PersonnelVitalSigns/import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 列表条件查询 根据任务查询PersonnelVitalSigns列表 GET /PersonnelVitalSigns/list */
export function personnelVitalSignsListUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PersonnelVitalSignsListUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.PersonnelVitalSignsVo[]>('/PersonnelVitalSigns/list', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}

/** 分页条件查询 根据条件分页查询PersonnelVitalSigns列表 GET /PersonnelVitalSigns/search */
export function personnelVitalSignsSearchUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.PersonnelVitalSignsSearchUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPagePersonnelVitalSignsVo>(
    '/PersonnelVitalSigns/search',
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
