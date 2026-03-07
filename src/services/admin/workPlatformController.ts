/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 任务信息 学员任务信息 GET /workPlatform/task */
export function workPlatformTaskUsingGet({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<API.WorkPlatformTaskVO>('/workPlatform/task', {
    method: 'GET',
    ...(options || {}),
  });
}
