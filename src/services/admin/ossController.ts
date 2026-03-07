/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** Oss上传成功回调 POST /aliyun/oss/callback */
export function aliyunOssCallbackUsingPost({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.OssCallbackResult>('/aliyun/oss/callback', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Oss上传签名生成 GET /aliyun/oss/policy */
export function aliyunOssPolicyUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.OssPolicyResult>('/aliyun/oss/policy', {
    method: 'GET',
    ...(options || {}),
  });
}
