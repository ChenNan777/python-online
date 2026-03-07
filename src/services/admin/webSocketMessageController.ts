/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 获取WebSocket连接统计 POST /websocket/stats */
export function websocketStatsUsingPost({
  options,
}: {
  options?: CustomRequestOptions;
}) {
  return request<Record<string, Record<string, unknown>>>('/websocket/stats', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 发送系统通知 POST /websocket/system/notify */
export function websocketSystemNotifyUsingPost({
  body,
  options,
}: {
  body: API.WebsocketSystemNotifyUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, Record<string, unknown>>>(
    '/websocket/system/notify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** 发送个人消息 POST /websocket/user/send */
export function websocketUserSendUsingPost({
  body,
  options,
}: {
  body: API.WebsocketUserSendUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<Record<string, Record<string, unknown>>>(
    '/websocket/user/send',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    }
  );
}
