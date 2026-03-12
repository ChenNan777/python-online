import { http, HttpResponse } from 'msw';

import type { UavApiResponse, UavSignalDeviceInfo, UavSignalSmodeRecord } from '@/types/uav';

const deviceList: UavSignalDeviceInfo[] = [
  {
    deviceName: '信号接收处理设备9',
    deviceIp: '120.55.190.183',
    devicePort: 16209,
    state: 1,
    localLatitude: 26.080249786376953,
    localLongitude: 119.26862335205078,
  },
  {
    deviceName: '信号接收处理设备10',
    deviceIp: '120.55.190.183',
    devicePort: 16210,
    state: 0,
    localLatitude: null,
    localLongitude: null,
  },
  {
    deviceName: '信号接收处理设备1',
    deviceIp: '120.55.190.183',
    devicePort: 16201,
    state: 0,
    localLatitude: null,
    localLongitude: null,
  },
  {
    deviceName: '信号接收处理设备7',
    deviceIp: '120.55.190.183',
    devicePort: 16207,
    state: 0,
    localLatitude: null,
    localLongitude: null,
  },
];

const smodeSample: UavSignalSmodeRecord[] = [
  {
    port: 16209,
    address: 16001,
    aoa: 162.1757680879193,
    toa: 63558229980,
    toaDatetime: '2026-03-01T00:01:03.558',
    localLatitude: 26.080249786376953,
    localLongitude: 119.26862335205078,
    createTime: '2026-03-09 17:24:15',
  },
];

export const handlers = [
  http.get('/uav-api/uavSignalReceiveProcessDevice/listInfo', () => {
    const body: UavApiResponse<UavSignalDeviceInfo[]> = {
      code: 200,
      msg: '操作成功',
      data: deviceList,
    };
    return HttpResponse.json(body);
  }),

  http.get('/uav-api/uavSignalReceiveProcessDevice/getSmodeByUavId', ({ request }) => {
    const url = new URL(request.url);
    const rawUavId = url.searchParams.get('uavId');
    const uavId = rawUavId ? Number(rawUavId) : NaN;

    if (!Number.isFinite(uavId) || uavId <= 0 || uavId === 9999) {
      const body: UavApiResponse<never> = {
        code: 1001,
        msg: '无人机不存在',
      };
      return HttpResponse.json(body, { status: 200 });
    }

    const body: UavApiResponse<UavSignalSmodeRecord[]> = {
      code: 200,
      msg: '操作成功',
      data: smodeSample,
    };
    return HttpResponse.json(body);
  }),
];

