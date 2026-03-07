/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 文件删除 POST /minio/delete */
export function minioOpenApiDeleteUsingPost({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.MinioOpenApiDeleteUsingPostParams;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/minio/delete', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 文件上传 POST /minio/upload */
export function minioUploadUsingPost({
  body,
  options,
}: {
  body: API.MinioUploadUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, unknown>>('/minio/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
