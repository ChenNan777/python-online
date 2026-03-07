/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 查询所有会员等级 GET /memberLevel/list */
export function memberLevelListUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MemberLevelListUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.UmsMemberLevel[]>('/memberLevel/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
