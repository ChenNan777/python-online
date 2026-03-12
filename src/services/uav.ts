import { uavHttpClient } from '@/utils/httpClient';

import type { UavApiResponse, UavSignalDeviceInfo, UavSignalSmodeRecord } from '@/types/uav';

export async function getUavSignalDeviceListInfo(): Promise<UavSignalDeviceInfo[]> {
  const response = (await uavHttpClient.get<UavApiResponse<UavSignalDeviceInfo[]>>(
    '/uavSignalReceiveProcessDevice/listInfo',
  )) as unknown as UavApiResponse<UavSignalDeviceInfo[]>;

  if (response.code !== 200 || !Array.isArray(response.data) || response.data.length === 0) {
    throw new Error(response.msg || '获取天线设备信息失败');
  }

  return response.data;
}

export async function getUavSignalSmodeByUavId(uavId: number): Promise<UavSignalSmodeRecord[]> {
  if (!Number.isFinite(uavId) || uavId <= 0) {
    throw new Error('无人机 ID 无效');
  }

  const response = (await uavHttpClient.get<UavApiResponse<UavSignalSmodeRecord[]>>(
    '/uavSignalReceiveProcessDevice/getSmodeByUavId',
    {
      params: { uavId },
    },
  )) as unknown as UavApiResponse<UavSignalSmodeRecord[]>;

  if (response.code !== 200 || !Array.isArray(response.data) || response.data.length === 0) {
    throw new Error(response.msg || '获取天线侦察数据失败');
  }

  return response.data;
}
