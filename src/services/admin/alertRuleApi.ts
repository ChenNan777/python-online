/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 告警规则分页列表 分页查询告警规则分页列表 GET /alert-rule/page */
export function alertRulePageUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AlertRulePageUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageAlertRuleVO>('/alert-rule/page', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
