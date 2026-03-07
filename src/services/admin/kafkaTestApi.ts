/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 发送测试消息 向指定Topic发送JSON字符串 POST /kafka/send */
export function kafkaSendUsingPost({
  params,
  body,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.KafkaSendUsingPostParams;
  body: API.KafkaSendUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/kafka/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
