/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 无人机设备详情 根据ID查询单个DroneDevice GET /drone/${param0}/detail */
export function droneDroneIdDetailUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneDroneIdDetailUsingGetParams;
  options?: CustomRequestOptions;
}) {
  const { droneId: param0, ...queryParams } = params;

  return request<API.DroneDeviceVo>(`/drone/${param0}/detail`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 飞行分页列表 分页查询无人机飞行列表 GET /drone/device/page */
export function droneDevicePageUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneDevicePageUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageFlyingDroneDeviceVo>('/drone/device/page', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}

/** 无人机运动轨迹查询 无人机运动轨迹查询 GET /drone/drone-path */
export function droneDronePathUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneDronePathUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.LogDronePathVo>('/drone/drone-path', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}

/** 无人机操作日志列表 分页查询无人机操作日志列表 GET /drone/log-uav-operation/page */
export function droneLogUavOperationPageUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneLogUavOperationPageUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageLogUavOperationDTO>(
    '/drone/log-uav-operation/page',
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

/** 批量获取无人机状态 根据多个无人机 ID 批量查询无人机实时状态信息 POST /drone/status/by-ids */
export function droneStatusByIdsUsingPost({
  body,
  options,
}: {
  body: API.DroneStatusByIdsUsingPostBody;
  options?: CustomRequestOptions;
}) {
  return request<API.DroneRealtimeStatusVo[]>('/drone/status/by-ids', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 无人机操控台列表/GIS无人机全量节点列表 分页查询无人机实时状态列表 GET /drone/status/page */
export function droneStatusPageUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneStatusPageUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageDroneRealtimeStatusVo>('/drone/status/page', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}

/** 无人机告警信息列表 分页查询无人机告警信息列表 GET /drone/warning/page */
export function droneWarningPageUsingGet({
  params,
  options,
}: {
  // 叠加生成的Param类型 (非body参数openapi默认没有生成对象)
  params: API.DroneWarningPageUsingGetParams;
  options?: CustomRequestOptions;
}) {
  return request<API.CommonPageUAVAlertMessageDTO>('/drone/warning/page', {
    method: 'GET',
    params: {
      ...params,
      req: undefined,
      ...params['req'],
    },
    ...(options || {}),
  });
}
