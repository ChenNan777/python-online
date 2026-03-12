export type UavApiResponse<T> = {
  code: number;
  msg: string;
  data?: T;
};

export type UavSignalDeviceInfo = {
  /** 设备名称 */
  deviceName: string;
  /** 设备 IP */
  deviceIp: string;
  /** 设备端口 */
  devicePort: number;
  /** 在线状态：1 在线，0 离线 */
  state: 0 | 1;
  /** 天线纬度（可能为空） */
  localLatitude: number | null;
  /** 天线经度（可能为空） */
  localLongitude: number | null;
};

export type UavSignalSmodeRecord = {
  /** 接收设备端口 */
  port: number;
  /** 地址（示例中为 16001） */
  address: number;
  /** AOA（到达角，单位：度） */
  aoa: number;
  /** TOA（到达时间，示例为时间戳/计数值） */
  toa: number;
  /** TOA 对应时间（ISO 字符串） */
  toaDatetime: string;
  /** 接收设备纬度（可能为空） */
  localLatitude: number | null;
  /** 接收设备经度（可能为空） */
  localLongitude: number | null;
  /** 数据创建时间（字符串） */
  createTime: string;
};
