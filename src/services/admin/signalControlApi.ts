/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 新增多模信号设备 创建新的多模信号设备 POST /signal */
export function signalUsingPost({
  body,
  options,
}: {
  body: API.RadiationPayload;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/signal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 多模信号设备详情 根据ID查询单个多模信号设备详情 GET /signal/${param0}/detail */
export function signalPayloadIdDetailUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.SignalPayloadIdDetailUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { payloadId: param0, ...queryParams } = params;

  return request<API.RadiationPayloadVo>(`/signal/${param0}/detail`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 配置多模信号设备参数 根据ID配置多模信号设备参数 POST /signal/config */
export function signalConfigUsingPost({
  body,
  options,
}: {
  body: API.RadiationPayload;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/signal/config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 控制记录分页条件查询 根据条件分页查询控制记录 GET /signal/control-log/page */
export function signalControlLogPageUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.SignalControlLogPageUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageRadiationPayloadConfigChangeLogVO>(
    '/signal/control-log/page',
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

/** 多模信号设备列表 分页查询多模信号设备列表 GET /signal/radiation-payload/page */
export function signalRadiationPayloadPageUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.SignalRadiationPayloadPageUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageSignalDeviceVo>(
    '/signal/radiation-payload/page',
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

/** 多模信号设备列表 分页查询多模信号设备列表 GET /target-recon/radiation-payload/page */
export function targetReconRadiationPayloadPageUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.TargetReconRadiationPayloadPageUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageSignalDeviceVo>(
    '/target-recon/radiation-payload/page',
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
