/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 评估分页列表 查询评估分页列表 GET /assessment/page */
export function assessmentPageUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.AssessmentPageUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageScoreStandardVO>('/assessment/page', {
    method: 'GET',
    params: {
      ...params,
      param: undefined,
      ...params['param'],
    },
    ...(options || {}),
  });
}
