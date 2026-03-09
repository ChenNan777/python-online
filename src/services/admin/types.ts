/* eslint-disable */
// @ts-ignore

export type AdminIdUsingGetParams = {
  id: number;
};

export type AdminIdUsingGetResponses = {
  /**
   * OK
   */
  200: UmsAdmin;
};

export type AdminInfoUsingGetResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type AdminListUsingGetParams = {
  keyword?: string;
  startTime?: string;
  endTime?: string;
  pageSize?: number;
  pageNum?: number;
};

export type AdminListUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageUmsAdminDto;
};

export type AdminLoginUsingPostResponses = {
  /**
   * OK
   */
  200: LoginResultVo;
};

export type AdminLogoutUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type AdminOpenApiDeleteIdUsingPostParams = {
  id: number;
};

export type AdminOpenApiDeleteIdUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type AdminRefreshTokenUsingGetResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type AdminRegisterUsingPostResponses = {
  /**
   * OK
   */
  200: UmsAdmin;
};

export type AdminRoleAdminIdUsingGetParams = {
  adminId: number;
};

export type AdminRoleAdminIdUsingGetResponses = {
  /**
   * OK
   */
  200: UmsRole[];
};

export type AdminRoleUpdateUsingPostParams = {
  adminId: number;
  roleIds: number[];
};

export type AdminRoleUpdateUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type AdminUpdateIdUsingPostParams = {
  id: number;
};

export type AdminUpdateIdUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type AdminUpdatePasswordUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type AdminUpdateStatusIdUsingPostParams = {
  id: number;
  status: number;
};

export type AdminUpdateStatusIdUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type AlertRulePageUsingGetParams = {
  req: AlertRulesRequestParam;
};

export type AlertRulePageUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageAlertRuleVO;
};

export type AlertRulesRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** Id */
  id?: number;
  /** 阈值类型 */
  thresholdType?: string[];
  /** 告警级别：info、warning、error、critical */
  alertLevel?: string;
};

export type AlertRuleVO = {
  /** alert_rules表的id字段 */
  alertId?: number;
  /** 告警规则名称 */
  ruleName?: string;
  /** 告警级别：info、warning、error、critical */
  alertLevel?: string;
  /** 告警消息模板，支持变量替换如{entity_name}、{actual_value}、{threshold_name}等 */
  messageTemplate?: string;
  /** 是否激活规则 */
  isActive?: boolean;
  /** thresholds表的id字段 */
  thresholdId?: number;
  /** 阈值名称 */
  thresholdName?: string;
  /** 阈值类型（如：temperature, pressure, heart_rate等） */
  thresholdType?: string;
  /** 最小值 */
  minValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 单位（如：℃, mmHg, bpm等） */
  unit?: string;
  /** 阈值描述 */
  description?: string;
};

export type AlgoParams = {
  simplifyTolM?: number;
  bufferM?: number;
  densifyM?: number;
  S?: number;
};

export type AliyunOssCallbackUsingPostResponses = {
  /**
   * OK
   */
  200: OssCallbackResult;
};

export type AliyunOssPolicyUsingGetResponses = {
  /**
   * OK
   */
  200: OssPolicyResult;
};

export type AssessmentPageUsingGetParams = {
  param: ScoringStandardsRequestParam;
};

export type AssessmentPageUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageScoreStandardVO;
};

export type BraceletDataDTO = {
  imei?: string;
  stepCount?: number;
  heartRate?: number;
  diastolicBp?: number;
  systolicBp?: number;
  bodyTemp?: number;
  wristTemp?: number;
  bloodOxygen?: number;
  latitude?: number;
  longitude?: number;
  dataTime?: string;
};

export type BraceletDeviceVO = {
  /** 手环 IMEI */
  imei?: string;
  /** 佩戴者 ID */
  memberId?: number;
  /** 佩戴者姓名 */
  memberName?: string;
  /** 所属队伍 ID */
  teamId?: number;
  /** 队伍名称 */
  teamName?: string;
  /** 最新心率 */
  heartRate?: number;
  /** 最新血氧 */
  bloodOxygen?: number;
  /** 最新体温 */
  bodyTemp?: number;
  /** 最新位置 - 纬度 */
  latitude?: number;
  /** 最新位置 - 经度 */
  longitude?: number;
  /** 数据更新时间 */
  dataTime?: string;
};

export type CommonPageAlertRuleVO = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: AlertRuleVO[];
};

export type CommonPageDroneRealtimeStatusVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: DroneRealtimeStatusVo[];
};

export type CommonPageFlyingDroneDeviceVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: FlyingDroneDeviceVo[];
};

export type CommonPageGeoAreasVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: GeoAreasVo[];
};

export type CommonPageLogUavOperationDTO = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: LogUavOperationDTO[];
};

export type CommonPagePathPlanningVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: PathPlanningVo[];
};

export type CommonPageRadiationPayloadConfigChangeLogVO = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: RadiationPayloadConfigChangeLogVO[];
};

export type CommonPageScoreStandardVO = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: ScoreStandardVO[];
};

export type CommonPageSignalDeviceVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: SignalDeviceVo[];
};

export type CommonPageTrainingCommentVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: TrainingCommentVo[];
};

export type CommonPageTrainingTeamMemberVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: TrainingTeamMemberVo[];
};

export type CommonPageTrainingTeamVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: TrainingTeamVo[];
};

export type CommonPageTrainTaskPageVO = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: TrainTaskPageVO[];
};

export type CommonPageUAVAlertMessageDTO = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: UAVAlertMessageDTO[];
};

export type CommonPageUmsAdminDto = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: UmsAdminDto[];
};

export type CommonPageUmsMenu = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: UmsMenu[];
};

export type CommonPageUmsResource = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: UmsResource[];
};

export type CommonPageUmsRoleDto = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: UmsRoleDto[];
};

export type CommonResult = {
  code?: number;
  message?: string;
  data?: Record<string, unknown>;
};

export type CommonResultBoolean = {
  code?: number;
  message?: string;
  data?: boolean;
};

export type CommonResultCommonPageAlertRuleVO = {
  code?: number;
  message?: string;
  data?: CommonPageAlertRuleVO;
};

export type CommonResultCommonPageDroneRealtimeStatusVo = {
  code?: number;
  message?: string;
  data?: CommonPageDroneRealtimeStatusVo;
};

export type CommonResultCommonPageFlyingDroneDeviceVo = {
  code?: number;
  message?: string;
  data?: CommonPageFlyingDroneDeviceVo;
};

export type CommonResultCommonPageGeoAreasVo = {
  code?: number;
  message?: string;
  data?: CommonPageGeoAreasVo;
};

export type CommonResultCommonPageLogUavOperationDTO = {
  code?: number;
  message?: string;
  data?: CommonPageLogUavOperationDTO;
};

export type CommonResultCommonPagePathPlanningVo = {
  code?: number;
  message?: string;
  data?: CommonPagePathPlanningVo;
};

export type CommonResultCommonPageRadiationPayloadConfigChangeLogVO = {
  code?: number;
  message?: string;
  data?: CommonPageRadiationPayloadConfigChangeLogVO;
};

export type CommonResultCommonPageScoreStandardVO = {
  code?: number;
  message?: string;
  data?: CommonPageScoreStandardVO;
};

export type CommonResultCommonPageSignalDeviceVo = {
  code?: number;
  message?: string;
  data?: CommonPageSignalDeviceVo;
};

export type CommonResultCommonPageTrainingCommentVo = {
  code?: number;
  message?: string;
  data?: CommonPageTrainingCommentVo;
};

export type CommonResultCommonPageTrainingTeamMemberVo = {
  code?: number;
  message?: string;
  data?: CommonPageTrainingTeamMemberVo;
};

export type CommonResultCommonPageTrainingTeamVo = {
  code?: number;
  message?: string;
  data?: CommonPageTrainingTeamVo;
};

export type CommonResultCommonPageTrainTaskPageVO = {
  code?: number;
  message?: string;
  data?: CommonPageTrainTaskPageVO;
};

export type CommonResultCommonPageUAVAlertMessageDTO = {
  code?: number;
  message?: string;
  data?: CommonPageUAVAlertMessageDTO;
};

export type CommonResultCommonPageUmsAdminDto = {
  code?: number;
  message?: string;
  data?: CommonPageUmsAdminDto;
};

export type CommonResultCommonPageUmsMenu = {
  code?: number;
  message?: string;
  data?: CommonPageUmsMenu;
};

export type CommonResultCommonPageUmsResource = {
  code?: number;
  message?: string;
  data?: CommonPageUmsResource;
};

export type CommonResultCommonPageUmsRoleDto = {
  code?: number;
  message?: string;
  data?: CommonPageUmsRoleDto;
};

export type CommonResultDroneDeviceVo = {
  code?: number;
  message?: string;
  /** DroneDevice VO */
  data?: DroneDeviceVo;
};

export type CommonResultInteger = {
  code?: number;
  message?: string;
  data?: number;
};

export type CommonResultListDroneRealtimeStatusVo = {
  code?: number;
  message?: string;
  data?: DroneRealtimeStatusVo[];
};

export type CommonResultListMapStringObject = {
  code?: number;
  message?: string;
  data?: Record<string, Record<string, unknown>>[];
};

export type CommonResultListMemberAlertStatsDTO = {
  code?: number;
  message?: string;
  data?: MemberAlertStatsDTO[];
};

export type CommonResultListMemberDeviceRelationVo = {
  code?: number;
  message?: string;
  data?: MemberDeviceRelationVo[];
};

export type CommonResultListPathPlanning = {
  code?: number;
  message?: string;
  data?: PathPlanning[];
};

export type CommonResultListStudentOperationCodeVo = {
  code?: number;
  message?: string;
  data?: StudentOperationCodeVo[];
};

export type CommonResultListTaskEvent = {
  code?: number;
  message?: string;
  data?: TaskEvent[];
};

export type CommonResultListTeamPositioningScoreDTO = {
  code?: number;
  message?: string;
  data?: TeamPositioningScoreDTO[];
};

export type CommonResultListTrainTaskPageVO = {
  code?: number;
  message?: string;
  data?: TrainTaskPageVO[];
};

export type CommonResultListUmsMemberLevel = {
  code?: number;
  message?: string;
  data?: UmsMemberLevel[];
};

export type CommonResultListUmsMenu = {
  code?: number;
  message?: string;
  data?: UmsMenu[];
};

export type CommonResultListUmsMenuNode = {
  code?: number;
  message?: string;
  data?: UmsMenuNode[];
};

export type CommonResultListUmsResource = {
  code?: number;
  message?: string;
  data?: UmsResource[];
};

export type CommonResultListUmsResourceCategory = {
  code?: number;
  message?: string;
  data?: UmsResourceCategory[];
};

export type CommonResultListUmsRole = {
  code?: number;
  message?: string;
  data?: UmsRole[];
};

export type CommonResultListUmsRoleDto = {
  code?: number;
  message?: string;
  data?: UmsRoleDto[];
};

export type CommonResultLogDronePathVo = {
  code?: number;
  message?: string;
  /** LogUav VO */
  data?: LogDronePathVo;
};

export type CommonResultLoginResultVo = {
  code?: number;
  message?: string;
  data?: LoginResultVo;
};

export type CommonResultLogMemberPathVo = {
  code?: number;
  message?: string;
  /** LogUav VO */
  data?: LogMemberPathVo;
};

export type CommonResultMapStringObject = {
  code?: number;
  message?: string;
  data?: Record<string, Record<string, unknown>>;
};

export type CommonResultMemberTaskVitalSignsVO = {
  code?: number;
  message?: string;
  data?: MemberTaskVitalSignsVO;
};

export type CommonResultOssCallbackResult = {
  code?: number;
  message?: string;
  data?: OssCallbackResult;
};

export type CommonResultOssPolicyResult = {
  code?: number;
  message?: string;
  data?: OssPolicyResult;
};

export type CommonResultPathPlanning = {
  code?: number;
  message?: string;
  data?: PathPlanning;
};

export type CommonResultPathPlanningAssignmentDTO = {
  code?: number;
  message?: string;
  data?: PathPlanningAssignmentDTO;
};

export type CommonResultPathSimilarityResultDTO = {
  code?: number;
  message?: string;
  data?: PathSimilarityResultDTO;
};

export type CommonResultPersonnelVitalSignsVo = {
  code?: number;
  message?: string;
  /** PersonnelVitalSigns VO */
  data?: PersonnelVitalSignsVo;
};

export type CommonResultRadiationPayloadVo = {
  code?: number;
  message?: string;
  /** RadiationPayload VO */
  data?: RadiationPayloadVo;
};

export type CommonResultString = {
  code?: number;
  message?: string;
  data?: string;
};

export type CommonResultStudentOperationCodeVo = {
  code?: number;
  message?: string;
  /** StudentOperationCode VO */
  data?: StudentOperationCodeVo;
};

export type CommonResultStudentPositioningInfoVO = {
  code?: number;
  message?: string;
  data?: StudentPositioningInfoVO;
};

export type CommonResultStudentTrainingAssignmentVO = {
  code?: number;
  message?: string;
  data?: StudentTrainingAssignmentVO;
};

export type CommonResultTaskBasicInfoContext = {
  code?: number;
  message?: string;
  data?: TaskBasicInfoContext;
};

export type CommonResultTaskStatusDisplayVO = {
  code?: number;
  message?: string;
  data?: TaskStatusDisplayVO;
};

export type CommonResultTeamPositioningScoreDTO = {
  code?: number;
  message?: string;
  /** 队伍定位分析评分DTO */
  data?: TeamPositioningScoreDTO;
};

export type CommonResultTeamRealtimeScoreVO = {
  code?: number;
  message?: string;
  data?: TeamRealtimeScoreVO;
};

export type CommonResultTeamTaskVitalSignsVO = {
  code?: number;
  message?: string;
  data?: TeamTaskVitalSignsVO;
};

export type CommonResultTrainingTeamMember = {
  code?: number;
  message?: string;
  data?: TrainingTeamMember;
};

export type CommonResultTrainingTeamMemberVo = {
  code?: number;
  message?: string;
  /** TrainingTeamMember VO */
  data?: TrainingTeamMemberVo;
};

export type CommonResultTrainTaskDetailInfoVO = {
  code?: number;
  message?: string;
  data?: TrainTaskDetailInfoVO;
};

export type CommonResultTrainTaskDetailVO = {
  code?: number;
  message?: string;
  data?: TrainTaskDetailVO;
};

export type CommonResultUmsAdmin = {
  code?: number;
  message?: string;
  data?: UmsAdmin;
};

export type CommonResultUmsMenu = {
  code?: number;
  message?: string;
  data?: UmsMenu;
};

export type CommonResultUmsResource = {
  code?: number;
  message?: string;
  data?: UmsResource;
};

export type CommonResultWorkPlatformTaskVO = {
  code?: number;
  message?: string;
  /** 作业平台任务列表VO */
  data?: WorkPlatformTaskVO;
};

export type DroneDevice = {
  /** 无人机ID */
  droneId?: string;
  /** 无人机编号 */
  droneCode?: string;
  /** 无人机名称 */
  droneName?: string;
  /** 无人机型号 */
  droneModel?: string;
  /** 序列号 */
  serialNumber?: string;
  /** 设备状态（0-离线 1-在线 2-飞行中 3-故障 4-维护中） */
  deviceStatus?: string;
  /** 最大飞行高度（米） */
  maxAltitude?: number;
  /** 最大飞行速度（m/s） */
  maxSpeed?: number;
  /** 最大续航时间（分钟） */
  maxFlightTime?: number;
  /** 载重能力（kg） */
  payloadCapacity?: number;
  /** 备注 */
  remark?: string;
  /** 创建部门 */
  createDept?: number;
  /** 创建者 */
  createBy?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 外部系统使用的无人机uid */
  uid?: string;
  /** 无人机提供的视频流 */
  liveStreamUrl?: string;
  /** 关联云服务IP */
  serverIp?: string;
  /** 关联云服务端口 */
  serverPort?: string;
};

export type DroneDevicePageUsingGetParams = {
  req: DroneDeviceRequestParam;
};

export type DroneDevicePageUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageFlyingDroneDeviceVo;
};

export type DroneDeviceRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 无人机ID */
  droneId?: string;
  /** 无人机编号 */
  droneCode?: string;
  /** 无人机名称 */
  droneName?: string;
  /** 无人机型号 */
  droneModel?: string;
  /** 序列号 */
  serialNumber?: string;
  /** 设备状态（0-离线 1-在线 2-飞行中 3-故障 4-维护中） */
  deviceStatus?: string;
  /** 最大飞行高度（米） */
  maxAltitude?: number;
  /** 最大飞行速度（m/s） */
  maxSpeed?: number;
  /** 最大续航时间（分钟） */
  maxFlightTime?: number;
  /** 载重能力（kg） */
  payloadCapacity?: number;
  /** 备注 */
  remark?: string;
  /** 创建部门 */
  createDept?: number;
  /** 创建者 */
  createBy?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
};

export type DroneDeviceVo = {
  /** 无人机ID */
  droneId?: string;
  /** 无人机编号 */
  droneCode?: string;
  /** 无人机名称 */
  droneName?: string;
  /** 无人机型号 */
  droneModel?: string;
  /** 序列号 */
  serialNumber?: string;
  /** 设备状态（0-离线 1-在线 2-飞行中 3-故障 4-维护中） */
  deviceStatus?: string;
  /** 最大飞行高度（米） */
  maxAltitude?: number;
  /** 最大飞行速度（m/s） */
  maxSpeed?: number;
  /** 最大续航时间（分钟） */
  maxFlightTime?: number;
  /** 载重能力（kg） */
  payloadCapacity?: number;
  /** 备注 */
  remark?: string;
  /** 创建部门 */
  createDept?: number;
  /** 创建者 */
  createBy?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 外部系统使用的无人机uid */
  uid?: string;
};

export type DroneDeviceVO = {
  /** 无人机 ID */
  droneId?: string;
  /** 无人机编号 */
  droneCode?: string;
  /** 无人机名称 */
  droneName?: string;
  /** 无人机型号 */
  droneModel?: string;
  /** 序列号 */
  serialNumber?: string;
  /** 设备状态（0-离线 1-在线 2-飞行中 3-故障 4-维护中） */
  deviceStatus?: string;
  /** 最大飞行高度（米） */
  maxAltitude?: number;
  /** 最大飞行速度（m/s） */
  maxSpeed?: number;
  /** 最大续航时间（分钟） */
  maxFlightTime?: number;
  /** 载重能力（kg） */
  payloadCapacity?: number;
  /** 外部系统使用的无人机 uid */
  uid?: string;
  /** 视频流 URL */
  liveStreamUrl?: string;
  /** 服务器 IP */
  serverIp?: string;
  /** 服务器端口 */
  serverPort?: string;
  /** 所属队伍 ID */
  teamId?: number;
  /** 使用队员 ID */
  memberId?: number;
};

export type DroneDroneIdDetailUsingGetParams = {
  droneId: string;
};

export type DroneDroneIdDetailUsingGetResponses = {
  /**
   * OK
   */
  200: DroneDeviceVo;
};

export type DroneDronePathUsingGetParams = {
  req: LogUavRequestParam;
};

export type DroneDronePathUsingGetResponses = {
  /**
   * OK
   */
  200: LogDronePathVo;
};

export type DroneLogUavOperationPageUsingGetParams = {
  req: LogUavOperationReq;
};

export type DroneLogUavOperationPageUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageLogUavOperationDTO;
};

export type DroneRealtimeStatusRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 状态ID */
  statusId?: number;
  /** 无人机ID */
  droneId?: number;
  /** 飞行状态（0-待机 1-准备 2-飞行 3-降落 4-返航 5-悬停 6-暂停 7-异常） */
  flightStatus?: string;
  /** 飞行模式（1-手动 2-自动 3-返航 4-悬停 5-跟随 6-环绕 7-航点 8-编队） */
  flightMode?: string;
  /** 当前坐标-经度 */
  longitude?: number;
  /** 当前坐标-纬度 */
  latitude?: number;
  /** 当前高度（米） */
  currentAltitude?: number;
  /** 当前方位角（度） */
  heading?: number;
  /** 当前速度（m/s） */
  currentSpeed?: number;
  /** 垂直速度（m/s） */
  verticalSpeed?: number;
  /** 电池电量（%） */
  batteryLevel?: number;
  /** 电池电压（V） */
  batteryVoltage?: number;
  /** 电池温度（℃） */
  batteryTemperature?: number;
  /** 剩余飞行时间（分钟） */
  remainingFlightTime?: number;
  /** 信号强度（dBm） */
  signalStrength?: number;
  /** GPS精度（米） */
  gpsAccuracy?: number;
  /** GPS卫星数量 */
  gpsSatelliteCount?: number;
  /** 环境温度（℃） */
  ambientTemperature?: number;
  /** 环境湿度（%） */
  humidity?: number;
  /** 风速（m/s） */
  windSpeed?: number;
  /** 风向（度） */
  windDirection?: number;
  /** 气压（hPa） */
  airPressure?: number;
  /** 飞行时间（秒） */
  flightDuration?: number;
  /** 飞行距离（米） */
  flightDistance?: number;
  /** 云台俯仰角（度） */
  gimbalPitch?: number;
  /** 云台横滚角（度） */
  gimbalRoll?: number;
  /** 云台偏航角（度） */
  gimbalYaw?: number;
  /** 相机状态（0-关闭 1-开启 2-录像中 3-拍照中 4-故障） */
  cameraStatus?: string;
  /** 录像状态（0-未录像 1-录像中 2-暂停 3-已停止） */
  recordingStatus?: string;
  /** SD卡容量（GB） */
  sdCardCapacity?: number;
  /** SD卡剩余容量（GB） */
  sdCardRemaining?: number;
  /** 异常状态（0-正常 1-通信异常 2-导航异常 3-动力异常 4-电池异常 5-传感器异常 6-载荷异常 7-飞控异常 8-其他异常） */
  exceptionStatus?: string;
  /** 异常描述 */
  exceptionDescription?: string;
  /** 控制指令（0-无 1-起飞 2-降落 3-返航 4-悬停 5-继续 6-暂停 7-自检 8-校准 9-紧急停止 10-重启 11-模式切换 12-参数调节） */
  controlCommand?: string;
  /** 指令执行状态（0-已下发未确认 1-执行成功 2-执行失败 3-无人机拒绝 4-超时未响应） */
  commandStatus?: string;
  /** 任务ID */
  taskId?: number;
  /** 操作员ID */
  operatorId?: number;
  /** 操作员姓名 */
  operatorName?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
  /** 备注 */
  remark?: string;
};

export type DroneRealtimeStatusVo = {
  /** 无人机ID */
  droneId?: string;
  /** 无人机名称 */
  droneName?: string;
  /** 无人机编号 */
  droneCode?: string;
  /** 无人机型号 */
  droneModel?: string;
  /** 当前坐标-经度 */
  longitude?: number;
  /** 当前坐标-纬度 */
  latitude?: number;
  /** 当前高度（米） */
  currentAltitude?: number;
  /** 当前方位角（度） */
  heading?: number;
  /** 当前速度（m/s） */
  currentSpeed?: number;
  /** 信号强度（dBm） */
  signalStrength?: number;
  /** 剩余飞行时间（分钟） */
  remainingFlightTime?: number;
};

export type DroneStatusByIdsUsingPostBody = string[];

export type DroneStatusByIdsUsingPostResponses = {
  /**
   * OK
   */
  200: DroneRealtimeStatusVo[];
};

export type DroneStatusPageUsingGetParams = {
  req: DroneRealtimeStatusRequestParam;
};

export type DroneStatusPageUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageDroneRealtimeStatusVo;
};

export type DroneWarningPageUsingGetParams = {
  req: DroneWarningRequestParam;
};

export type DroneWarningPageUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageUAVAlertMessageDTO;
};

export type DroneWarningRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 告警ID */
  warningId?: number;
  /** 无人机ID */
  droneId?: number;
  /** 无人机名称 */
  droneName?: string;
  /** 告警类型 */
  warningType?: string;
  /** 告警等级 */
  warningLevel?: string;
  /** 告警内容 */
  warningEvent?: string;
  /** 告警时间 */
  warningTime?: string;
};

export type EventInfo = {
  operatorId?: number;
  operator?: string;
  eventCode?: string;
  eventName?: string;
  eventDesc?: string;
  eventTime?: string;
};

export type ExternalCompareUsingPostResponses = {
  /**
   * OK
   */
  200: PathSimilarityResultDTO;
};

export type ExternalPathOverlapUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type ExternalPositioningAnalysisUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type ExternalTargetCaptureUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type Feature = {
  type?: string;
  geometry?: Geometry;
};

export type FeatureCollection = {
  type?: string;
  id?: string;
  features?: Feature[];
};

export type FlyingDroneDeviceVo = {
  /** 无人机ID */
  droneId?: string;
  /** 无人机编号 */
  droneCode?: string;
  /** 无人机名称 */
  droneName?: string;
  /** 无人机型号 */
  droneModel?: string;
  /** 序列号 */
  serialNumber?: string;
  /** 设备状态（0-离线 1-在线） */
  deviceStatus?: number;
  /** 最大飞行高度（米） */
  maxAltitude?: number;
  /** 最大飞行速度（m/s） */
  maxSpeed?: number;
  /** 最大续航时间（分钟） */
  maxFlightTime?: number;
  /** 载重能力（kg） */
  payloadCapacity?: number;
  /** 备注 */
  remark?: string;
  /** 创建部门 */
  createDept?: number;
  /** 创建者 */
  createBy?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 外部系统使用的无人机uid */
  uid?: string;
  /** 无人机提供的视频流 */
  liveStreamUrl?: string;
  /** 飞行状态（0-待机 1-准备 2-飞行 3-降落 4-返航 5-悬停 6-暂停 7-异常） */
  flightStatus?: number;
  /** 飞行模式（1-手动 2-自动 3-返航 4-悬停 5-跟随 6-环绕 7-航点 8-编队） */
  flightMode?: number;
  /** 当前坐标-经度 */
  longitude?: number;
  /** 当前坐标-纬度 */
  latitude?: number;
  /** 当前高度（米） */
  currentAltitude?: number;
  /** 当前方位角（度） */
  heading?: number;
  /** 当前速度（m/s） */
  currentSpeed?: number;
  /** 垂直速度（m/s） */
  verticalSpeed?: number;
  /** 电池电量（%） */
  batteryLevel?: number;
  /** 电池电压（V） */
  batteryVoltage?: number;
  /** 电池温度（℃） */
  batteryTemperature?: number;
  /** 剩余飞行时间（分钟） */
  remainingFlightTime?: number;
  /** 信号强度（dBm） */
  signalStrength?: number;
  /** GPS精度（米） */
  gpsAccuracy?: number;
  /** GPS卫星数量 */
  gpsSatelliteCount?: number;
  /** 环境温度（℃） */
  ambientTemperature?: number;
  /** 环境湿度（%） */
  humidity?: number;
  /** 风速（m/s） */
  windSpeed?: number;
  /** 风向（度） */
  windDirection?: number;
  /** 气压（hPa） */
  airPressure?: number;
  /** 飞行时间（秒） */
  flightDuration?: number;
  /** 飞行距离（米） */
  flightDistance?: number;
  /** 云台俯仰角（度） */
  gimbalPitch?: number;
  /** 云台横滚角（度） */
  gimbalRoll?: number;
  /** 云台偏航角（度） */
  gimbalYaw?: number;
  /** 相机状态（0-关闭 1-开启 2-录像中 3-拍照中 4-故障） */
  cameraStatus?: number;
  /** 录像状态（0-未录像 1-录像中 2-暂停 3-已停止） */
  recordingStatus?: number;
  /** SD卡容量（GB） */
  sdCardCapacity?: number;
  /** SD卡剩余容量（GB） */
  sdCardRemaining?: number;
  /** 异常状态（0-正常 1-通信异常 2-导航异常 3-动力异常 4-电池异常 5-传感器异常 6-载荷异常 7-飞控异常 8-其他异常） */
  exceptionStatus?: number;
  /** 异常描述 */
  exceptionDescription?: string;
  /** 控制指令（0-无 1-起飞 2-降落 3-返航 4-悬停 5-继续 6-暂停 7-自检 8-校准 9-紧急停止 10-重启 11-模式切换 12-参数调节） */
  controlCommand?: number;
  /** 指令执行状态（0-已下发未确认 1-执行成功 2-执行失败 3-无人机拒绝 4-超时未响应） */
  commandStatus?: number;
  /** 任务ID */
  taskId?: number;
  /** 操作员ID */
  operatorId?: number;
  /** 操作员姓名 */
  operatorName?: string;
  /** 电量剩余百分比（%） */
  batteryRemainPercent?: number;
  /** 海拔高度（米，AMSL） */
  absoluteAltitudeM?: number;
  /** 相对起飞点的高度（米） */
  relativeAltitudeM?: number;
  /** 方位角（度） */
  headingDeg?: number;
  /** 北向速度（米/秒） */
  northMs?: number;
  /** 东向速度（米/秒） */
  eastMs?: number;
  /** 向下速度（米/秒） */
  downMs?: number;
  /** 可见卫星数量（个） */
  numSatellites?: number;
  /** 关联云服务IP */
  serverIp?: string;
  /** 关联云服务端口 */
  serverPort?: string;
};

export type GeoAreasRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** Area id */
  areaId?: number;
  /** 区域名 */
  areaName?: string;
  /** 预设区域标志（0否，1是） */
  defaultFlag?: string;
  /** 创建人id */
  createBy?: number;
  /** 创建时间 */
  createTime?: string;
  /** 区域围栏信息 */
  geoJson?: string;
};

export type GeoAreasVo = {
  /** Area id */
  areaId?: number;
  /** 区域名 */
  areaName?: string;
  /** 预设区域标志（0否，1是） */
  defaultFlag?: boolean;
  /** 创建人id */
  createBy?: number;
  /** 创建时间 */
  createTime?: string;
  /** 区域围栏信息 */
  geoJson?: string;
};

export type GeoAreasVO = {
  /** 区域id */
  areaId?: number;
  /** 区域名 */
  areaName?: string;
  /** 区域围栏信息 */
  geoJson?: string;
  /** 预设区域标志（0否，1是） */
  defaultFlag?: boolean;
};

export type GeoAreaVO = {
  areaId?: number;
  /** 区域名 */
  areaName?: string;
  /** 区域围栏信息 */
  geoJson?: string;
};

export type Geometry = {
  type?: string;
  coordinates?: number[][];
};

export type KafkaSendUsingPostBody = string;

export type KafkaSendUsingPostParams = {
  topic:
    | 'TEST'
    | 'UAV_TOPIC'
    | 'BRACELET_TOPIC'
    | 'PAYLOAD_TOPIC'
    | 'PAD_TOPIC'
    | 'UAV_LOG_TOPIC';
};

export type KafkaSendUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type LocationPoint = {
  lat?: number;
  lon?: number;
};

export type LogBracelet = {
  /** 雪花id */
  snowflakeId?: number;
  /** 任务id */
  taskId?: number;
  /** 设备唯一标识（IMEI号） */
  imei?: string;
  /** 计步数量（步） */
  stepCount?: number;
  /** 心率（bpm） */
  heartRate?: number;
  /** 舒张压（mmHg） */
  diastolicBp?: number;
  /** 收缩压（mmHg） */
  systolicBp?: number;
  /** 体温（摄氏度，℃） */
  bodyTemp?: number;
  /** 腕温（摄氏度，℃） */
  wristTemp?: number;
  /** 血氧饱和度（%） */
  bloodOxygen?: number;
  /** 纬度（地理坐标） */
  latitude?: number;
  /** 经度（地理坐标） */
  longitude?: number;
  /** 数据采集时间 */
  dataTime?: string;
};

export type LogBraceletRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 任务id */
  taskId?: number;
  /** 设备唯一标识（IMEI号） */
  imei?: string;
  /** 任务状态（2-目标侦察阶段进行中 3-路径规划阶段进行中 4-目标捕获阶段进行中） 该字段用来筛选对应阶段手环运动的轨迹 */
  taskPhase?: string;
};

export type LogDronePathVo = {
  /** 队员基本信息 */
  dtoList?: DroneDevice[];
  /** 运动轨迹列表 */
  pathList?: LogUav[];
};

export type LoginResultVo = {
  token?: string;
  tokenHead?: string;
  adminInfo?: UmsAdmin;
  menuInfo?: UmsMenuNode[];
};

export type LogMemberPathVo = {
  /** 队员基本信息 */
  dtoList?: TeamMemberDTO[];
  /** 运动轨迹列表 */
  pathList?: LogBracelet[];
};

export type LogUav = {
  /** 雪花id */
  snowflakeId?: number;
  /** 任务ID */
  taskId?: number;
  /** 无人机ID */
  droneId?: string;
  /** 纬度（度） */
  latitude?: number;
  /** 经度（度） */
  longitude?: number;
  /** 电量剩余百分比（%） */
  batteryRemainPercent?: number;
  /** 海拔高度（米，AMSL） */
  absoluteAltitudeM?: number;
  /** 相对起飞点的高度（takeoff altitude）（米） */
  relativeAltitudeM?: number;
  /** 方位角（度） */
  headingDeg?: number;
  /** 北向速度（米/秒） */
  northMs?: number;
  /** 东向速度（米/秒） */
  eastMs?: number;
  /** 向下速度（米/秒） */
  downMs?: number;
  /** 可见卫星数量（个） */
  numSatellites?: number;
  /** GPS 锁类型，例如：NO_FIX / FIX_2D / FIX_3D */
  gpsFixType?: string;
  /** 水平精度因子（无单位） */
  hdop?: number;
  /** 垂直精度因子（无单位） */
  vdop?: number;
  /** Course Over Ground（地面航向角）（度） */
  cogDeg?: number;
  /** 数据采集时间（时间戳 / Date 类型） */
  dataTime?: string;
};

export type LogUavOperationDTO = {
  /** 雪花ID */
  snowflakeId?: number;
  /** 任务ID */
  taskId?: number;
  /** 无人机ID */
  uavId?: string;
  /** 动作 */
  action?: string;
  /** 开始操作时间 */
  startTime?: string;
  /** 操作持续时间 */
  duration?: number;
  /** 数据类型 */
  dataType?: string;
  /** 操作员ID */
  operatorId?: number;
  /** 无人机名称 */
  droneName?: string;
  /** ums_admin表的username字段 */
  username?: string;
};

export type LogUavOperationReq = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 雪花ID */
  snowflakeId?: number;
  /** 任务ID */
  taskId?: number;
  /** 无人机ID */
  uavId?: string;
  /** 动作 */
  action?: string;
  /** 开始操作时间 start range */
  startTimeStart?: string;
  /** 开始操作时间 end range */
  startTimeEnd?: string;
  /** 操作持续时间 */
  duration?: number;
  /** 数据类型 */
  dataType?: string;
  /** 操作员ID */
  operatorId?: number;
};

export type LogUavRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 雪花id */
  snowflakeId?: number;
  /** 任务ID */
  taskId?: number;
  /** 无人机ID */
  droneId?: string;
  /** 任务状态（2-目标侦察阶段进行中 3-路径规划阶段进行中 4-目标捕获阶段进行中） 该字段用来筛选对应阶段手环运动的轨迹 */
  taskPhase?: string;
};

export type LongIdListReq = {
  idList?: number[];
};

export type MemberAlertStatsDTO = {
  /** 任务ID */
  taskId?: number;
  /** 告警对象类型 */
  alertObjectType?: string;
  /** 告警级别（error数量是告警数量，info数量是预警数量） */
  alertLevel?: string;
  /** 告警去重数量 */
  braceletCount?: number;
};

export type MemberDeviceRelationRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 主键 */
  id?: number;
  /** 任务id */
  taskId?: number;
  /** 队伍id */
  teamIds?: number[];
  /** 队伍成员id */
  memberId?: number;
  /** 设备id */
  deviceId?: number;
  /** 设备类型（1-手环 2-平板 3-无人机） */
  deviceType?: string;
};

export type MemberDeviceRelationVo = {
  /** 任务ID */
  taskId?: number;
  /** 团队ID */
  teamId?: number;
  /** 团队名称 */
  teamName?: string;
  /** 成员ID */
  memberId?: number;
  /** 成员姓名 */
  memberName?: string;
  /** 设备类型（1-手环 2-平板 3-无人机） */
  deviceType?: string;
  /** 设备ID */
  deviceId?: number;
};

export type MemberLevelListUsingGetParams = {
  defaultStatus: number;
};

export type MemberLevelListUsingGetResponses = {
  /**
   * OK
   */
  200: UmsMemberLevel[];
};

export type MemberMemberIdHealthUsingGetParams = {
  memberId: number;
};

export type MemberMemberIdHealthUsingGetResponses = {
  /**
   * OK
   */
  200: PersonnelVitalSignsVo;
};

export type MemberMemberPathPageUsingGetParams = {
  req: LogBraceletRequestParam;
};

export type MemberMemberPathPageUsingGetResponses = {
  /**
   * OK
   */
  200: LogMemberPathVo;
};

export type MemberPositioningResultDTO = {
  /** 成员ID */
  memberId?: number;
  /** 成员姓名 */
  memberName?: string;
  /** 定位经度 */
  longitude?: number;
  /** 定位纬度 */
  latitude?: number;
  /** 定位精度(米) */
  accuracy?: number;
  /** 定位耗时(秒) */
  positioningTime?: number;
  /** 定位精度得分 */
  accuracyScore?: number;
  /** 定位耗时得分 */
  timeScore?: number;
  /** 成员总得分 */
  totalScore?: number;
  /** 分析描述 */
  analysisDescription?: string;
  /** 提交时间 */
  submitTime?: string;
};

export type MemberSearchUsingGetParams = {
  req: TrainingTeamRequestParam;
};

export type MemberSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageTrainingTeamMemberVo;
};

export type MemberTaskIdAlertStatsUsingGetParams = {
  taskId: number;
};

export type MemberTaskIdAlertStatsUsingGetResponses = {
  /**
   * OK
   */
  200: MemberAlertStatsDTO[];
};

export type MemberTaskIdMemberIdHealthUsingGetParams = {
  taskId: number;
  memberId: number;
};

export type MemberTaskIdMemberIdHealthUsingGetResponses = {
  /**
   * OK
   */
  200: MemberTaskVitalSignsVO;
};

export type MemberTaskVitalSignsVO = {
  /** 任务ID */
  taskId?: number;
  /** 人员体征列表 */
  vitalSignList?: MemeberVitalSignDTO[];
};

export type MemeberVitalSignDTO = {
  /** 任务ID */
  taskId?: number;
  /** 人员ID */
  memberId?: number;
  /** vital_sign_type字段 */
  vitalSignType?: string;
  /** 心率（次/分钟） */
  val?: number;
  /** unit字段 */
  unit?: string;
  /** 创建时间 */
  createTime?: string;
};

export type MenuCreateUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type MenuIdUsingGetParams = {
  id: number;
};

export type MenuIdUsingGetResponses = {
  /**
   * OK
   */
  200: UmsMenu;
};

export type MenuListParentIdUsingGetParams = {
  parentId: number;
  pageSize?: number;
  pageNum?: number;
};

export type MenuListParentIdUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageUmsMenu;
};

export type MenuOpenApiDeleteIdUsingPostParams = {
  id: number;
};

export type MenuOpenApiDeleteIdUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type MenuTreeListUsingGetResponses = {
  /**
   * OK
   */
  200: UmsMenuNode[];
};

export type MenuUpdateHiddenIdUsingPostParams = {
  id: number;
  hidden: number;
};

export type MenuUpdateHiddenIdUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type MenuUpdateIdUsingPostParams = {
  id: number;
};

export type MenuUpdateIdUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type MinioOpenApiDeleteUsingPostParams = {
  objectName: string;
};

export type MinioOpenApiDeleteUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type MinioUploadUsingPostBody = {
  file: string;
};

export type MinioUploadUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type OssCallbackResult = {
  /** 文件名称 */
  filename?: string;
  /** 文件大小 */
  size?: string;
  /** 文件的mimeType */
  mimeType?: string;
  /** 图片文件的宽 */
  width?: string;
  /** 图片文件的高 */
  height?: string;
};

export type OssPolicyResult = {
  /** 访问身份验证中用到用户标识 */
  accessKeyId?: string;
  /** 用户表单上传的策略,经过base64编码过的字符串 */
  policy?: string;
  /** 对policy签名后的字符串 */
  signature?: string;
  /** 上传文件夹路径前缀 */
  dir?: string;
  /** oss对外服务的访问域名 */
  host?: string;
  /** 上传成功后的回调设置 */
  callback?: string;
};

export type PageableObject = {
  offset?: number;
  sort?: SortObject;
  pageSize?: number;
  pageNumber?: number;
  unpaged?: boolean;
  paged?: boolean;
};

export type PageStudentOperationCodeVo = {
  totalPages?: number;
  totalElements?: number;
  first?: boolean;
  last?: boolean;
  size?: number;
  content?: StudentOperationCodeVo[];
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PathPlanning = {
  planningId?: number;
  taskId?: number;
  teamId?: number;
  teamName?: string;
  personnelId?: number;
  personnelName?: string;
  startLongitude?: number;
  startLatitude?: number;
  endLongitude?: number;
  endLatitude?: number;
  plannedPath?: string;
  actualPath?: string;
  optimalPath?: string;
  plannedDistance?: number;
  actualDistance?: number;
  optimalDistance?: number;
  planningTime?: string;
  startExecutionTime?: string;
  completionTime?: string;
  executionDuration?: number;
  remark?: string;
  createTime?: string;
};

export type PathPlanningAssignmentDTO = {
  taskId?: number;
  taskName?: string;
  teamId?: number;
  teamName?: string;
  memberId?: number;
  memberName?: string;
  targetId?: string;
  targetLongitude?: number;
  targetLatitude?: number;
  startLongitude?: number;
  startLatitude?: number;
  deviceSn?: string;
  roadNetworkGeoJson?: string;
};

export type PathPlanningData = {
  planningResult: PlanningResultDTO;
};

export type PathPlanningRequestDTO = {
  taskId: number;
  teamId: number;
  teamName?: string;
  memberId: number;
  memberName?: string;
  eventCode: string;
  eventName?: string;
  eventDesc?: string;
  planningResult: PlanningResultDTO;
};

export type PathPlanningVo = {
  planningId?: number;
  taskId?: number;
  teamId?: number;
  teamName?: string;
  personnelId?: number;
  personnelName?: string;
  startLongitude?: number;
  startLatitude?: number;
  endLongitude?: number;
  endLatitude?: number;
  plannedPath?: string;
  actualPath?: string;
  optimalPath?: string;
  plannedDistance?: number;
  actualDistance?: number;
  optimalDistance?: number;
  planningTime?: string;
  startExecutionTime?: string;
  completionTime?: string;
  executionDuration?: number;
  remark?: string;
  createTime?: string;
};

export type PathSimilarityReq = {
  optimalPath?: number[][];
  actualPaths?: number[][][];
  params?: AlgoParams;
};

export type PathSimilarityResultDTO = {
  results?: PathSimilarityResultItem[];
};

export type PathSimilarityResultItem = {
  pathIndex?: number;
  frechetDistance?: number;
  bufferOverlapRatio?: number;
  similarityScore?: number;
};

export type PersonnelVitalSignsVo = {
  /** 手环IMEI编号 */
  imei?: string;
  /** 手环设备ID */
  deviceId?: string;
  /** 心率（次/分钟） */
  heartRate?: number;
  /** 收缩压（mmHg） */
  systolicPressure?: number;
  /** 舒张压（mmHg） */
  diastolicPressure?: number;
  /** 体温（℃） */
  bodyTemperature?: number;
  /** 血氧饱和度（%） */
  oxygenSaturation?: number;
  /** 疲劳度（0-100） */
  fatigueLevel?: number;
  /** 压力指数（0-100） */
  stressIndex?: number;
  /** 当前位置-经度 */
  longitude?: number;
  /** 当前位置-纬度 */
  latitude?: number;
  /** 运动状态（0-静止 1-步行 2-跑步 3-剧烈运动） */
  motionStatus?: boolean;
  /** 步数 */
  stepCount?: number;
  /** 消耗卡路里 */
  caloriesBurned?: number;
  /** 数据采集时间 */
  collectionTime?: string;
  /** 异常状态（0-正常 1-心率异常 2-血压异常 3-体温异常 4-综合异常） */
  abnormalStatus?: number;
  /** 预警级别（0-无预警 1-轻微 2-中等 3-严重） */
  warningLevel?: number;
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  createTime?: string;
  /** 手腕温度 */
  wristTemp?: number;
  /** 心率告警级别 */
  heartRateAlertLevel?: string;
  /** 手腕温度告警级别 */
  oxygenSaturationAlertLevel?: string;
  /** 手腕温度告警级别 */
  bodyTemperatureAlertLevel?: string;
  memberId?: number;
  memberName?: string;
};

export type PhaseInfo = {
  phaseCode?: number;
  phaseName?: string;
  startTime?: string;
  endTime?: string;
  isCompleted?: boolean;
  status?: number;
};

export type PlanningResultDTO = {
  pathId: string;
  algorithmUsed: string;
  totalDistance?: number;
  estimatedDuration?: number;
  waypoints: WaypointDTO[];
};

export type PositioningAnalysisCurrentTaskReconDataUsingGetParams = {
  /** 用户 ID（登录用户） */
  userId: number;
};

export type PositioningAnalysisCurrentTaskReconDataUsingGetResponses = {
  /**
   * OK
   */
  200: StudentPositioningInfoVO;
};

export type PositioningAnalysisData = {
  /** 无人机目标 ID */
  uavId: number;
  /** 定位经度 */
  longitude: number;
  /** 定位纬度 */
  latitude: number;
  /** 定位精度 (米) */
  accuracy?: number;
  /** 分析描述 */
  analysisDescription?: string;
};

export type PositioningAnalysisResultDTO = {
  /** 任务ID */
  taskId: number;
  /** 队伍ID */
  teamId: number;
  /** 提交结果的成员ID */
  memberId: number;
  /** 提交结果的无人机ID */
  uavId: number;
  /** 提交结果的成员姓名 */
  memberName: string;
  /** 定位经度 */
  longitude?: number;
  /** 定位纬度 */
  latitude?: number;
  /** 定位精度(米) */
  accuracy?: number;
  /** 定位耗时(秒) */
  positioningTime?: number;
  /** 分析描述 */
  analysisDescription?: string;
  /** 提交时间 */
  submitTime?: string;
};

export type PositioningAnalysisScoresTaskTaskIdTeamTeamIdUsingGetParams = {
  /** 任务ID */
  taskId: number;
  /** 队伍ID */
  teamId: number;
};

export type PositioningAnalysisScoresTaskTaskIdTeamTeamIdUsingGetResponses = {
  /**
   * OK
   */
  200: TeamPositioningScoreDTO;
};

export type PositioningAnalysisScoresTaskTaskIdUsingGetParams = {
  /** 任务ID */
  taskId: number;
};

export type PositioningAnalysisScoresTaskTaskIdUsingGetResponses = {
  /**
   * OK
   */
  200: TeamPositioningScoreDTO[];
};

export type PositioningAnalysisSubmitUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type RadiationPayload = {
  /** 载荷唯一标识 */
  payloadId?: string;
  /** 载荷编号 */
  payloadCode?: string;
  /** 载荷名称 */
  payloadName?: string;
  /** 载荷型号 */
  payloadModel?: string;
  /** 序列号 */
  serialNumber?: string;
  /** 设备状态（0-离线 1-在线 2-工作中 3-故障 4-维护中） */
  deviceStatus?: string;
  /** 信号类型（1-ADS-B 2-Model-S 3-MARK X 4-雷达 5-典型通信信号） */
  signalType?: string;
  /** 当前频率（MHz） */
  currentFrequency?: number;
  /** 频率范围（MHz） */
  frequencyRange?: string;
  /** 输出功率/发射功率（W） */
  powerOutput?: number;
  /** 信号强度（dBm） */
  signalStrength?: number;
  /** 调制方式 */
  modulationType?: string;
  /** 带宽（MHz） */
  bandwidth?: number;
  /** 天线增益（dBi） */
  antennaGain?: number;
  /** 工作温度（℃） */
  workingTemperature?: number;
  /** 功耗（W） */
  powerConsumption?: number;
  /** 挂载无人机ID */
  mountedDroneId?: string;
  /** 备注 */
  remark?: string;
  /** 创建部门 */
  createDept?: number;
  /** 创建者 */
  createBy?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 中心频率 */
  centerFrequency?: number;
  /** 脉宽（μs），对于连续波信号，为0 */
  pulseWidth?: number;
  /** 发射周期 */
  transmissionCycle?: number;
  /** 发射时长 */
  durationOfTransmission?: number;
  /** 信号模式：Continuous (连续辐射)、Controlled (受控辐射)、Programmed (程控辐射) */
  signalMode?: string;
  /** 频率（Hz） */
  frequency?: number;
  /** 功率 */
  power?: number;
  /** 脉冲重复周期（μs），对于连续波信号，为0 */
  pulseRepetitionInterval?: number;
  /** 经度 */
  longitude?: number;
  /** 纬度 */
  latitude?: number;
  /** 自定义报文（十六进制字符串格式） */
  customMessage?: string;
  /** 数据采集时间（时间戳 / Date 类型） */
  dataTime?: string;
  /** 关联云服务IP */
  serverIp?: string;
  /** 关联云服务端口 */
  serverPort?: string;
};

export type RadiationPayloadConfigChangeLogRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** Log id */
  logId?: number;
  /** 修改记录id */
  recordId?: number;
  /** 修改字段名 */
  columnName?: string;
  /** 修改人 */
  updatedBy?: string;
  /** 修改时间 */
  updatedTime?: string;
  /** 原始值 */
  oldValue?: string;
  /** 修改后的值 */
  newValue?: string;
};

export type RadiationPayloadConfigChangeLogVO = {
  /** Log id */
  logId?: number;
  /** 载荷id */
  payloadId?: string;
  /** 修改字段名 */
  columnName?: string;
  /** 修改人 */
  updatedBy?: number;
  /** 修改时间 */
  updatedTime?: string;
  /** 原始值 */
  oldValue?: string;
  /** 修改后的值 */
  newValue?: string;
};

export type RadiationPayloadRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 载荷ID */
  payloadId?: string;
  /** 载荷编号 */
  payloadCode?: string;
  /** 载荷名称 */
  payloadName?: string;
  /** 载荷型号 */
  payloadModel?: string;
  /** 序列号 */
  serialNumber?: string;
  /** 设备状态（0-离线 1-在线 2-工作中 3-故障 4-维护中） */
  deviceStatus?: string;
  /** 信号类型（1-ADS-B 2-Model-S 3-MARK X 4-雷达 5-典型通信信号） */
  signalType?: string;
  /** 当前频率（MHz） */
  currentFrequency?: number;
  /** 频率范围（MHz） */
  frequencyRange?: string;
  /** 输出功率/发射功率（W） */
  powerOutput?: number;
  /** 信号强度（dBm） */
  signalStrength?: number;
  /** 调制方式 */
  modulationType?: string;
  /** 带宽（MHz） */
  bandwidth?: number;
  /** 天线增益（dBi） */
  antennaGain?: number;
  /** 工作温度（℃） */
  workingTemperature?: number;
  /** 功耗（W） */
  powerConsumption?: number;
  /** 挂载无人机ID */
  mountedDroneId?: number;
  /** 备注 */
  remark?: string;
  /** 创建部门 */
  createDept?: number;
  /** 创建者 */
  createBy?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 中心频率 */
  centerFrequency?: number;
  /** 脉宽 */
  pulseWidth?: number;
  /** 发射周期 */
  transmissionCycle?: number;
  /** 发射时长 */
  durationOfTransmission?: number;
};

export type RadiationPayloadVo = {
  /** 载荷ID */
  payloadId?: string;
  /** 载荷编号 */
  payloadCode?: string;
  /** 载荷名称 */
  payloadName?: string;
  /** 载荷型号 */
  payloadModel?: string;
  /** 序列号 */
  serialNumber?: string;
  /** 设备状态（0-离线 1-在线 2-工作中 3-故障 4-维护中） */
  deviceStatus?: string;
  /** 信号类型（1-ADS-B 2-Model-S 3-MARK X 4-雷达 5-典型通信信号） */
  signalType?: string;
  /** 当前频率（MHz） */
  currentFrequency?: number;
  /** 频率范围（MHz） */
  frequencyRange?: string;
  /** 输出功率/发射功率（W） */
  powerOutput?: number;
  /** 信号强度（dBm） */
  signalStrength?: number;
  /** 调制方式 */
  modulationType?: string;
  /** 带宽（MHz） */
  bandwidth?: number;
  /** 天线增益（dBi） */
  antennaGain?: number;
  /** 工作温度（℃） */
  workingTemperature?: number;
  /** 功耗（W） */
  powerConsumption?: number;
  /** 挂载无人机ID */
  mountedDroneId?: number;
  /** 备注 */
  remark?: string;
  /** 创建部门 */
  createDept?: number;
  /** 创建者 */
  createBy?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 中心频率 */
  centerFrequency?: number;
  /** 脉宽 */
  pulseWidth?: number;
  /** 发射周期 */
  transmissionCycle?: number;
  /** 发射时长 */
  durationOfTransmission?: number;
  /** 自定义报文 */
  customMessage?: string;
  /** 关联云服务IP */
  serverIp?: string;
  /** 关联云服务端口 */
  serverPort?: string;
};

export type ReconnaissanceDataVO = {
  /** 目标 ID */
  targetId?: number;
  /** 频率（MHz） */
  frequency?: number;
  /** 经度（度） */
  longitude?: number;
  /** 纬度（度） */
  latitude?: number;
  /** 示向度（度） */
  bearing?: number;
  /** 无人机 ID */
  droneId?: string;
  /** 数据采集时间 */
  dataTime?: string;
};

export type ResourceCategoryCreateUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type ResourceCategoryListAllUsingGetResponses = {
  /**
   * OK
   */
  200: UmsResourceCategory[];
};

export type ResourceCategoryOpenApiDeleteIdUsingPostParams = {
  id: number;
};

export type ResourceCategoryOpenApiDeleteIdUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type ResourceCategoryUpdateIdUsingPostParams = {
  id: number;
};

export type ResourceCategoryUpdateIdUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type ResourceCreateUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type ResourceIdUsingGetParams = {
  id: number;
};

export type ResourceIdUsingGetResponses = {
  /**
   * OK
   */
  200: UmsResource;
};

export type ResourceListAllUsingGetResponses = {
  /**
   * OK
   */
  200: UmsResource[];
};

export type ResourceListUsingGetParams = {
  categoryId?: number;
  nameKeyword?: string;
  urlKeyword?: string;
  pageSize?: number;
  pageNum?: number;
};

export type ResourceListUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageUmsResource;
};

export type ResourceOpenApiDeleteIdUsingPostParams = {
  id: number;
};

export type ResourceOpenApiDeleteIdUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type ResourceUpdateIdUsingPostParams = {
  id: number;
};

export type ResourceUpdateIdUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type RoleAllocMenuUsingPostParams = {
  roleId: number;
  menuIds: number[];
};

export type RoleAllocMenuUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type RoleAllocResourceUsingPostParams = {
  roleId: number;
  resourceIds: number[];
};

export type RoleAllocResourceUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type RoleCreateUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type RoleListAllUsingGetResponses = {
  /**
   * OK
   */
  200: UmsRoleDto[];
};

export type RoleListMenuRoleIdUsingGetParams = {
  roleId: number;
};

export type RoleListMenuRoleIdUsingGetResponses = {
  /**
   * OK
   */
  200: UmsMenu[];
};

export type RoleListResourceRoleIdUsingGetParams = {
  roleId: number;
};

export type RoleListResourceRoleIdUsingGetResponses = {
  /**
   * OK
   */
  200: UmsResource[];
};

export type RoleListUsingGetParams = {
  keyword?: string;
  startTime?: string;
  endTime?: string;
  pageSize?: number;
  pageNum?: number;
};

export type RoleListUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageUmsRoleDto;
};

export type RoleOpenApiDeleteUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type RoleUpdateIdUsingPostParams = {
  id: number;
};

export type RoleUpdateIdUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type RoleUpdateStatusIdUsingPostParams = {
  id: number;
  status: number;
};

export type RoleUpdateStatusIdUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, unknown>;
};

export type ScoreDTO = {
  /** 任务ID */
  taskId?: number;
  /** 队伍ID */
  teamId?: number;
  /** 队伍名称 */
  teamName?: string;
  /** 统计的维度（PATH 路径评分, TARGET 目标评分, VITAL_SIGN 体征评分） */
  scoreType?: string;
  /** 统计的二级维度 */
  scoreSubType?: string;
  /** 分数 */
  score?: number;
};

export type ScoreStandardVO = {
  /** scoring_standards表的id字段 */
  standardId?: number;
  /** 评分标准名称 */
  standardName?: string;
  /** 该条件对应的得分 */
  score?: number;
  /** 得分说明 */
  scoreDescription?: string;
  /** 是否启用 */
  isActive?: boolean;
  /** 条件类型：below_min、above_max、in_range、out_of_range */
  conditionType?: string;
  /** 评分标准权重，范围0-1，用于计算加权总分 */
  weight?: number;
  /** thresholds表的id字段 */
  thresholdId?: number;
  /** 阈值名称 */
  thresholdName?: string;
  /** 阈值类型（如：temperature, pressure, heart_rate等） */
  thresholdType?: string;
  /** 最小值 */
  minValue?: number;
  /** 最大值 */
  maxValue?: number;
  /** 单位（如：℃, mmHg, bpm等） */
  unit?: string;
  /** 阈值描述 */
  description?: string;
};

export type ScoringStandardsRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** Id */
  id?: number;
  /** 阈值类型 */
  thresholdType?: string[];
  /** 告警级别：info、warning、error、critical */
  alertLevel?: string;
};

export type SignalConfigUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type SignalControlLogPageUsingGetParams = {
  req: RadiationPayloadConfigChangeLogRequestParam;
};

export type SignalControlLogPageUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageRadiationPayloadConfigChangeLogVO;
};

export type SignalDeviceVo = {
  /** 载荷ID */
  payloadId?: number;
  /** 设备状态（0-离线 1-在线 2-工作中 3-故障 4-维护中） */
  deviceStatus?: string;
  /** 输出功率（W） */
  powerOutput?: number;
  /** 当前频率（MHz） */
  currentFrequency?: number;
  /** 当前坐标-纬度 */
  latitude?: number;
  /** 当前坐标-经度 */
  longitude?: number;
  /** 当前高度（米） */
  currentAltitude?: number;
  /** 关联云服务IP */
  serverIp?: string;
  /** 关联云服务端口 */
  serverPort?: string;
};

export type SignalPayloadIdDetailUsingGetParams = {
  payloadId: string;
};

export type SignalPayloadIdDetailUsingGetResponses = {
  /**
   * OK
   */
  200: RadiationPayloadVo;
};

export type SignalRadiationPayloadPageUsingGetParams = {
  req: RadiationPayloadRequestParam;
};

export type SignalRadiationPayloadPageUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageSignalDeviceVo;
};

export type SignalUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type SortObject = {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
};

export type StudentOperationCodeAssignmentInfoUsingGetParams = {
  /** 用户 ID */
  userId: number;
};

export type StudentOperationCodeAssignmentInfoUsingGetResponses = {
  /**
   * OK
   */
  200: StudentTrainingAssignmentVO;
};

export type StudentOperationCodeDTO = {
  /** 任务 ID */
  taskId?: number;
  /** 成员 ID */
  memberId?: number;
  /** 队伍 ID */
  teamId?: number;
  /** 作业类型：1-定位分析，2-路径规划 */
  operationType?: string;
  /** 关联目标 ID（定位分析时为无人机 ID，路径规划时为空） */
  targetId?: number;
  /** 编程语言 */
  programmingLanguage?: string;
  /** 源代码内容 */
  sourceCode?: string;
  /** 代码文件路径 */
  codeFilePath?: string;
  /** 代码说明 */
  codeDescription?: string;
  /** 提交时间 */
  submitTime?: string;
};

export type StudentOperationCodeIdUsingGetParams = {
  /** 代码记录 ID */
  id: number;
};

export type StudentOperationCodeIdUsingGetResponses = {
  /**
   * OK
   */
  200: StudentOperationCodeVo;
};

export type StudentOperationCodeListStudentTaskIdMemberIdUsingGetParams = {
  /** 任务 ID */
  taskId: number;
  /** 成员 ID */
  memberId: number;
};

export type StudentOperationCodeListStudentTaskIdMemberIdUsingGetResponses = {
  /**
   * OK
   */
  200: StudentOperationCodeVo[];
};

export type StudentOperationCodeListTypeUsingGetParams = {
  /** 任务 ID */
  taskId: number;
  /** 作业类型：1-定位分析，2-路径规划 */
  operationType: string;
};

export type StudentOperationCodeListTypeUsingGetResponses = {
  /**
   * OK
   */
  200: StudentOperationCodeVo[];
};

export type StudentOperationCodeRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 主键 ID（雪花算法） */
  id?: number;
  /** 任务 ID */
  taskId?: number;
  /** 学生成员 ID */
  memberId?: number;
  /** 队伍 ID */
  teamId?: number;
  /** 作业类型：1-定位分析，2-路径规划 */
  operationType?: string;
  /** 关联目标 ID（定位分析时为无人机 ID，路径规划时为空） */
  targetId?: number;
  /** 编程语言（如：Python, Java, C++） */
  programmingLanguage?: string;
  /** 代码文件路径 */
  codeFilePath?: string;
  /** 代码说明 */
  codeDescription?: string;
  /** 提交时间 */
  submitTime?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
  /** 源代码内容 */
  sourceCode?: string;
};

export type StudentOperationCodeSaveCodeUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type StudentOperationCodeSearchUsingGetParams = {
  req: StudentOperationCodeRequestParam;
};

export type StudentOperationCodeSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageStudentOperationCodeVo;
};

export type StudentOperationCodeSubmitUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type StudentOperationCodeUpdateUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type StudentOperationCodeVo = {
  /** 主键 ID（雪花算法） */
  id?: number;
  /** 任务 ID */
  taskId?: number;
  /** 学生成员 ID */
  memberId?: number;
  /** 队伍 ID */
  teamId?: number;
  /** 作业类型：1-定位分析，2-路径规划 */
  operationType?: string;
  /** 关联目标 ID（定位分析时为无人机 ID，路径规划时为空） */
  targetId?: number;
  /** 编程语言（如：Python, Java, C++） */
  programmingLanguage?: string;
  /** 代码文件路径 */
  codeFilePath?: string;
  /** 代码说明 */
  codeDescription?: string;
  /** 提交时间 */
  submitTime?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
  /** 源代码内容 */
  sourceCode?: string;
};

export type StudentPositioningInfoVO = {
  /** 学生 ID */
  memberId?: number;
  /** 学生姓名 */
  memberName?: string;
  /** 所属队伍 ID */
  teamId?: number;
  /** 所属队伍名称 */
  teamName?: string;
  /** 参与的任务 ID */
  taskId?: number;
  /** 任务名称 */
  taskName?: string;
  /** 侦察数据列表 */
  reconnaissanceDataList?: ReconnaissanceDataVO[];
};

export type StudentTrainingAssignmentVO = {
  /** 学生 ID */
  memberId?: number;
  /** 学生姓名 */
  memberName?: string;
  /** 所属队伍 ID */
  teamId?: number;
  /** 所属队伍名称 */
  teamName?: string;
  /** 参与的任务 ID */
  taskId?: number;
  /** 任务名称 */
  taskName?: string;
  /** 当前任务阶段码（4-定位分析，5-路径规划） */
  taskPhaseCode?: string;
  /** 平板序列号（路径规划使用） */
  deviceSn?: string;
  /** 目标 ID（定位分析为无人机 ID，路径规划为目标点 ID） */
  targetId?: string;
  /** 目标位置 - 经度 */
  targetLongitude?: number;
  /** 目标位置 - 纬度 */
  targetLatitude?: number;
  /** 人员开始位置 - 经度（路径规划使用） */
  startLongitude?: number;
  /** 人员开始位置 - 纬度（路径规划使用） */
  startLatitude?: number;
  /** 路网数据 GeoJSON（路径规划使用） */
  roadNetworkGeoJson?: string;
};

export type StudentTrainingWorkSubmitDTO = {
  /** 任务 ID */
  taskId: number;
  /** 队伍 ID */
  teamId: number;
  /** 成员 ID */
  memberId: number;
  /** 成员姓名 */
  memberName?: string;
  /** 作业类型（4-定位分析，5-路径规划） */
  workType: 4 | 5;
  /** 定位分析作业数据（作业类型为 4 时必填） */
  positioningData?: PositioningAnalysisData;
  /** 路径规划作业数据（作业类型为 5 时必填） */
  pathPlanningData?: PathPlanningData;
};

export type TabletDeviceVO = {
  /** 设备 ID */
  deviceId?: string;
  /** 平板名称 */
  tabletName?: string;
  /** 所属队伍 ID */
  teamId?: number;
  /** 使用队员 ID */
  memberId?: number;
  /** 电池电量 */
  batteryLevel?: number;
  /** 平板状态 */
  tabletStatus?: boolean;
};

export type TargetDetectionMessageDTO = {
  imei?: string;
  snowflakeId?: number;
  taskId?: number;
  teamId?: number;
  memberId?: number;
  uavId?: string;
  lon?: number;
  lat?: number;
  reportTime?: string;
  locationPoints?: LocationPoint[];
  DataType?: string;
  timestamp?: string;
};

export type TargetReconRadiationPayloadPageUsingGetParams = {
  req: RadiationPayloadRequestParam;
};

export type TargetReconRadiationPayloadPageUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageSignalDeviceVo;
};

export type TaskAreasSearchUsingGetParams = {
  req: GeoAreasRequestParam;
};

export type TaskAreasSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageGeoAreasVo;
};

export type TaskBasicInfoContext = {
  taskId?: number;
  startTime?: string;
};

export type TaskBasicInfoUsingGetResponses = {
  /**
   * OK
   */
  200: TaskBasicInfoContext;
};

export type TaskBasicInfoVO = {
  /** 任务ID */
  taskId?: number;
  /** 任务名称 */
  taskName?: string;
  /** 任务类型（1-侦察任务 2-巡航任务 3-反无人机演训 4-信号干扰测试 5-综合对抗演练 6-路径规划验证） */
  taskType?: string;
  /** 任务状态（0-未开始 1-进行中 2-已暂停 3-已完成 4-已取消） */
  taskStatus?: string;
  /** 任务描述 */
  taskDescription?: string;
  /** 计划开始时间 */
  plannedStartTime?: string;
};

export type TaskBatchUpdateUsingPostBody = TrainingTaskAssignment[];

export type TaskBatchUpdateUsingPostResponses = {
  /**
   * OK
   */
  200: number;
};

export type TaskCommentSearchUsingGetParams = {
  param: TrainingCommentRequestParam;
};

export type TaskCommentSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageTrainingCommentVo;
};

export type TaskCreateUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TaskCurrentExecutingUsingGetResponses = {
  /**
   * OK
   */
  200: Record<string, Record<string, unknown>>;
};

export type TaskDeviceSummaryVO = {
  /** 无人机设备列表 */
  droneList?: DroneDeviceVO[];
  /** 手环设备列表 */
  braceletList?: BraceletDeviceVO[];
  /** 平板设备列表 */
  tabletList?: TabletDeviceVO[];
};

export type TaskDisplayLastTaskStatusUsingGetResponses = {
  /**
   * OK
   */
  200: TaskStatusDisplayVO;
};

export type TaskDisplayLastTaskUsingGetResponses = {
  /**
   * OK
   */
  200: TaskStatusDisplayVO;
};

export type TaskDisplayTaskIdBroadcastUsingPostParams = {
  taskId: number;
  workflowKey?: string;
};

export type TaskDisplayTaskIdBroadcastUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TaskDisplayTaskIdStatusUsingGetParams = {
  taskId: number;
  workflowKey?: string;
};

export type TaskDisplayTaskIdStatusUsingGetResponses = {
  /**
   * OK
   */
  200: TaskStatusDisplayVO;
};

export type TaskDroneConfigVO = {
  /** 无人机 ID */
  droneId?: string;
  /** 无人机名称 */
  droneName?: string;
  /** 配置类型：1-定位分析阶段 2-路径规划阶段 3-通用配置 */
  configType?: string;
  /** 排序顺序 */
  sortOrder?: number;
};

export type TaskEvent = {
  id?: number;
  taskId: number;
  teamId?: number;
  teamName?: string;
  operatorId?: number;
  operatorIp?: string;
  operator?: string;
  eventCode: string;
  eventName?: string;
  eventDesc?: string;
  eventTime?: string;
  remark?: string;
  eventData?: string;
};

export type TaskEventExecuteUsingPostParams = {
  eventCode?: string;
  workflowKey?: string;
};

export type TaskEventExecuteUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TaskEventListUsingGetParams = {
  taskId: number;
};

export type TaskEventListUsingGetResponses = {
  /**
   * OK
   */
  200: TaskEvent[];
};

export type TaskEventPathPlanningAssignmentInfoUsingGetParams = {
  userId: number;
};

export type TaskEventPathPlanningAssignmentInfoUsingGetResponses = {
  /**
   * OK
   */
  200: PathPlanningAssignmentDTO;
};

export type TaskEventPathPlanningPlanningIdUsingDeleteParams = {
  planningId: number;
};

export type TaskEventPathPlanningPlanningIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: string;
};

export type TaskEventPathPlanningPlanningIdUsingGetParams = {
  planningId: number;
};

export type TaskEventPathPlanningPlanningIdUsingGetResponses = {
  /**
   * OK
   */
  200: PathPlanning;
};

export type TaskEventPathPlanningSubmitUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type TaskEventPathPlanningTaskTaskIdUsingGetParams = {
  taskId: number;
};

export type TaskEventPathPlanningTaskTaskIdUsingGetResponses = {
  /**
   * OK
   */
  200: PathPlanning[];
};

export type TaskEventPathPlanningTeamTeamIdUsingGetParams = {
  teamId: number;
};

export type TaskEventPathPlanningTeamTeamIdUsingGetResponses = {
  /**
   * OK
   */
  200: PathPlanning[];
};

export type TaskEventPauseUsingPostParams = {
  workflowKey?: string;
};

export type TaskEventPauseUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TaskEventReportUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TaskEventResetUsingPostParams = {
  workflowKey?: string;
};

export type TaskEventResetUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TaskEventResumeUsingPostParams = {
  workflowKey?: string;
};

export type TaskEventResumeUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TaskExecutableListUsingGetResponses = {
  /**
   * OK
   */
  200: Record<string, Record<string, unknown>>[];
};

export type TaskListUsingGetResponses = {
  /**
   * OK
   */
  200: TrainTaskPageVO[];
};

export type TaskRelatedAreaVO = {
  areaId?: number;
  /** 区域名 */
  areaName?: string;
  /** 区域围栏信息 */
  geoJson?: string;
};

export type TaskRelatedDeviceVO = {
  /** 雪花ID */
  assignmentId?: number;
  /** 队伍ID */
  teamId?: number;
  /** 队员ID */
  memberId?: number;
  /** 角色ID */
  taskRoleId?: string;
  /** 平板ID */
  tabletId?: string;
  /** 手环ID */
  braceletId?: string;
  /** 摄像头ID */
  cameraId?: string;
  /** 摄像头ID */
  droneId?: string;
};

export type TaskRelatedTeamVO = {
  /** 队伍ID */
  teamId?: number;
  /** 队伍名称 */
  teamName?: string;
  /** 指挥官ID */
  leaderId?: number;
  /** 指挥官 */
  leaderName?: string;
};

export type TaskSearchUsingGetParams = {
  req: TrainingTaskRequestParam;
};

export type TaskSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageTrainTaskPageVO;
};

export type TaskSituationTaskIdPathPlanningsUsingGetParams = {
  taskId: number;
};

export type TaskSituationTaskIdPathPlanningsUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPagePathPlanningVo;
};

export type TaskStatusDisplayVO = {
  taskId?: number;
  workflowKey?: string;
  paused?: boolean;
  taskDetail?: TrainTaskDetailVO;
  events?: EventInfo[];
  terms?: TermInfo[];
  phases?: PhaseInfo[];
  currentPhase?: PhaseInfo;
  lastUpdateTime?: string;
};

export type TaskTaskIdDetailInfoUsingGetParams = {
  taskId: number;
};

export type TaskTaskIdDetailInfoUsingGetResponses = {
  /**
   * OK
   */
  200: TrainTaskDetailInfoVO;
};

export type TaskTaskIdDetailUsingGetParams = {
  taskId: number;
};

export type TaskTaskIdDetailUsingGetResponses = {
  /**
   * OK
   */
  200: TrainTaskDetailVO;
};

export type TaskTaskIdUsingDeleteParams = {
  taskId: number;
};

export type TaskTaskIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TaskTeamInfoVO = {
  /** 队伍 ID */
  teamId?: number;
  /** 队伍名称 */
  teamName?: string;
  /** 指挥官 ID */
  leaderId?: number;
  /** 指挥官 */
  leaderName?: string;
  /** 队伍成员列表 */
  members?: TeamMemberVO[];
};

export type TaskUpdateUsingPostResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TeamMemberDTO = {
  /** 队伍ID */
  teamId?: number;
  /** 队伍名称 */
  teamName?: string;
  /** 队员ID */
  memberId?: number;
  /** 队员姓名 */
  memberName?: string;
  /** 手环IMEI */
  imei?: string;
};

export type TeamMemberRoleDeviceRelationInfoVO = {
  /** 队伍id */
  teamId?: number;
  /** 队员id */
  teamMemberId?: number;
  /** 负责内容（1-信号分析 2-信号侦察 3-目标捕获） */
  role?: number;
  /** 使用手环IMEI */
  imei?: string;
  /** 平板id */
  tabletId?: string;
  /** 摄像头id */
  cameraId?: string;
};

export type TeamMemberVO = {
  /** 成员 ID */
  memberId?: number;
  /** 成员名称 */
  memberName?: string;
  /** 成员类型 */
  memberType?: string;
  /** 成员状态（0-离队 1-在队） */
  memberStatus?: string;
  /** 用户 ID */
  userId?: number;
};

export type TeamPositioningScoreDTO = {
  /** 任务ID */
  taskId?: number;
  /** 队伍ID */
  teamId?: number;
  /** 队伍名称 */
  teamName?: string;
  /** 队长ID */
  leaderId?: number;
  /** 队长姓名 */
  leaderName?: string;
  /** 队伍成员定位分析结果列表 */
  memberResults?: MemberPositioningResultDTO[];
  /** 队伍平均定位精度得分 */
  avgAccuracyScore?: number;
  /** 队伍平均定位耗时得分 */
  avgTimeScore?: number;
  /** 队伍总得分 */
  totalScore?: number;
  /** 是否所有成员都已提交 */
  allMembersSubmitted?: boolean;
};

export type TeamRealtimeScoreVO = {
  /** 任务ID */
  taskId?: number;
  /** 评分列表 */
  scoreList?: ScoreDTO[];
};

export type TeamSearchUsingGetParams = {
  req: TrainingTeamRequestParam;
};

export type TeamSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageTrainingTeamVo;
};

export type TeamTaskIdAvgScoreUsingGetParams = {
  taskId: number;
  scoreType?: string;
};

export type TeamTaskIdAvgScoreUsingGetResponses = {
  /**
   * OK
   */
  200: TeamRealtimeScoreVO;
};

export type TeamTaskIdTeamIdHealthUsingGetParams = {
  taskId: number;
  teamId: number;
};

export type TeamTaskIdTeamIdHealthUsingGetResponses = {
  /**
   * OK
   */
  200: TeamTaskVitalSignsVO;
};

export type TeamTaskVitalSignsVO = {
  /** 任务ID */
  taskId?: number;
  /** 人员体征列表 */
  vitalSignList?: TeamVitalSignDTO[];
};

export type TeamUavInfoUsingPostResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type TeamUAVRelationInfoVO = {
  /** 队伍id */
  teamId?: number;
  /** 操作无人机ID */
  droneId?: string;
  /** 载荷id */
  payloadId?: string;
};

export type TeamUsingGetParams = {
  req: MemberDeviceRelationRequestParam;
};

export type TeamUsingGetResponses = {
  /**
   * OK
   */
  200: MemberDeviceRelationVo[];
};

export type TeamVitalSignDTO = {
  /** 任务ID */
  taskId?: number;
  /** 队伍ID */
  teamId?: number;
  /** vital_sign_type字段 */
  vitalSignType?: string;
  /** 心率（次/分钟） */
  val?: number;
  /** unit字段 */
  unit?: string;
  /** 创建时间 */
  createTime?: string;
};

export type TeamVO = {
  /** 队伍ID */
  teamId?: number;
  /** 队伍名称 */
  teamName?: string;
};

export type TermInfo = {
  /** 队伍ID */
  teamId?: number;
  /** 队伍名称 */
  teamName?: string;
  /** 指挥官ID */
  leaderId?: number;
  /** 指挥官 */
  leaderName?: string;
  /** 定位分析得分 */
  reconScore?: number;
  /** 路径规划得分 */
  pathScore?: number;
  /** 目标捕获得分 */
  captureScore?: number;
};

export type TrainingCommentRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 评论id */
  commentId?: number;
  /** 任务id */
  taskId?: number;
  /** 创建时间 */
  createdTime?: string;
  /** 创建人 */
  createdBy?: number;
  /** 评论内容 */
  content?: string;
};

export type TrainingCommentVo = {
  /** 评论id */
  commentId?: number;
  /** 任务id */
  taskId?: number;
  /** 创建时间 */
  createdTime?: string;
  /** 创建人 */
  createdBy?: number;
  /** 评论内容 */
  content?: string;
  /** 用户名 */
  username?: string;
};

export type TrainingTask = {
  /** 任务ID */
  taskId?: number;
  /** 任务名称 */
  taskName?: string;
  /** 任务类型（1-侦察任务 2-巡航任务 3-反无人机演训 4-信号干扰测试 5-综合对抗演练 6-路径规划验证） */
  taskType?: string;
  /** 任务状态（0-已创建 1-准备就绪 2-目标侦察阶段进行中 3-路径规划阶段进行中 4-目标捕获阶段进行中 5-已完成 6-已取消） */
  taskStatus?: string;
  /** 计划开始时间 */
  plannedStartTime?: string;
  /** 计划结束时间 */
  plannedEndTime?: string;
  /** 实际开始时间 */
  actualStartTime?: string;
  /** 实际结束时间 */
  actualEndTime?: string;
  /** 参与队伍数量 */
  teamCount?: number;
  /** 使用无人机数量 */
  droneCount?: number;
  /** 使用辐射信号载荷数量 */
  payloadCount?: number;
  /** 任务进度（0-100） */
  progress?: string;
  /** 任务导控人员ID */
  controllerId?: number;
  /** 任务导控人员姓名 */
  controllerName?: string;
  /** 备注 */
  remark?: string;
  /** 创建部门 */
  createDept?: number;
  /** 创建者 */
  createBy?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 任务上一次状态 */
  taskLastStatus?: string;
  /** 任务当前状态 */
  taskCurrentStatus?: string;
  /** 任务描述 */
  taskDescription?: string;
  /** 演训区域定义（JSON格式存储区域坐标） */
  trainingArea?: string;
};

export type TrainingTaskAssignment = {
  /** 任务分配ID */
  assignmentId?: number;
  /** 任务ID */
  taskId?: number;
  /** 参训队伍ID */
  teamId?: number;
  /** 无人机ID */
  droneId?: string;
  /** 辐射载荷ID */
  payloadId?: string;
  /** 手环ID */
  braceletId?: string;
  /** 成员id */
  memberId?: number;
  /** 任务角色id */
  taskRoleId?: number;
  /** 平板电脑id */
  tabletId?: string;
  /** 摄像头id */
  cameraId?: string;
};

export type TrainingTaskRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 任务ID */
  taskId?: number;
  /** 任务名称 */
  taskName?: string;
  /** 任务类型（1-侦察任务 2-巡航任务 3-反无人机演训 4-信号干扰测试 5-综合对抗演练 6-路径规划验证） */
  taskType?: string;
  /** 任务状态（0-已创建 1-准备就绪 2-目标侦察阶段进行中 3-路径规划阶段进行中 4-目标捕获阶段进行中 5-已完成 6-已取消） */
  taskStatus?: string;
  /** 计划开始时间 */
  plannedStartTime?: string;
  /** 计划结束时间 */
  plannedEndTime?: string;
};

export type TrainingTaskReqVO = {
  /** 任务名称 */
  taskId?: number;
  /** 任务名称 */
  taskName?: string;
  /** 任务类型（1-侦察任务 2-巡航任务 3-反无人机演训 4-信号干扰测试 5-综合对抗演练 6-路径规划验证） */
  taskType?: string;
  /** 计划开始时间 */
  plannedStartTime?: string;
  /** 计划开始时间 */
  plannedEndTime?: string;
  /** 任务优先级（1-普通 2-高 3-紧急） */
  priority?: string;
  /** 任务指挥官id */
  controllerId?: number;
  /** 任务描述 */
  remark?: string;
  /** 任务状态（0-未开始 1-进行中 2-已暂停 3-已完成 4-已取消） */
  taskLastStatus?: string;
  /** 任务状态（0-未开始 1-进行中 2-已暂停 3-已完成 4-已取消） */
  taskCurrentStatus?: string;
  /** 任务关联区域围栏信息 */
  geoAreasVOList?: GeoAreasVO[];
  /** 任务关联队伍信息 */
  teamUAVRelationInfoVOList?: TeamUAVRelationInfoVO[];
  /** 任务关联成员、成员关联负责内容、成员关联使用设备信息 */
  teamMemberRoleDeviceRelationInfoVOList?: TeamMemberRoleDeviceRelationInfoVO[];
  /** 任务配置的无人机池（用于定位分析和路径规划阶段） */
  taskDroneConfigVOList?: TaskDroneConfigVO[];
};

export type TrainingTeamMember = {
  /** 成员ID */
  memberId?: number;
  /** 成员名称 */
  memberName?: string;
  /** 队伍ID */
  teamId?: number;
  /** 成员类型 */
  memberType?: string;
  /** 成员状态（0-离队 1-在队） */
  memberStatus?: string;
  /** 创建者 */
  creator?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 成员ID */
  userId?: number;
};

export type TrainingTeamMemberBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type TrainingTeamMemberBatchUsingPutBody = {
  updateData?: TrainingTeamMember;
  condition?: TrainingTeamMemberRequestParam;
};

export type TrainingTeamMemberBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type TrainingTeamMemberMemberIdUsingDeleteParams = {
  memberId: number;
};

export type TrainingTeamMemberMemberIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TrainingTeamMemberMemberIdUsingGetParams = {
  memberId: number;
};

export type TrainingTeamMemberMemberIdUsingGetResponses = {
  /**
   * OK
   */
  200: TrainingTeamMemberVo;
};

export type TrainingTeamMemberOpenApiExportUsingGetParams = {
  condition?: TrainingTeamMember;
};

export type TrainingTeamMemberOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type TrainingTeamMemberOpenApiImportUsingPostBody = {
  file: string;
};

export type TrainingTeamMemberOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type TrainingTeamMemberRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 成员ID */
  memberId?: number;
  /** 成员名称 */
  memberName?: string;
  /** 队伍ID */
  teamId?: number;
  /** 成员类型 */
  memberType?: string;
  /** 成员状态（0-离队 1-在队） */
  memberStatus?: string;
  /** 创建者 */
  creator?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 用户ID */
  userId?: number;
};

export type TrainingTeamMemberSearchUsingGetParams = {
  req: TrainingTeamMemberRequestParam;
};

export type TrainingTeamMemberSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageTrainingTeamMemberVo;
};

export type TrainingTeamMemberUsingPostResponses = {
  /**
   * OK
   */
  200: TrainingTeamMember;
};

export type TrainingTeamMemberUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TrainingTeamMemberVo = {
  /** 成员ID */
  memberId?: number;
  /** 成员名称 */
  memberName?: string;
  /** 队伍ID */
  teamId?: number;
  /** 队伍ID */
  teamName?: string;
  /** 成员类型 */
  memberType?: string;
  /** 成员状态（0-离队 1-在队） */
  memberStatus?: string;
  /** 创建者 */
  creator?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** userId */
  userId?: number;
};

export type TrainingTeamRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 队伍ID */
  teamId?: number;
  /** 队伍编号 */
  teamCode?: string;
  /** 队伍名称 */
  teamName?: string;
  /** 队长ID */
  leaderId?: number;
  /** 队长姓名 */
  leaderName?: string;
  /** 成员数量 */
  memberCount?: number;
  /** 队伍状态（0-待命 1-训练中 2-休息 3-解散） */
  teamStatus?: string;
  /** 所属单位 */
  organization?: string;
  /** 联系电话 */
  contactPhone?: string;
  /** 备注 */
  remark?: string;
  /** 创建部门 */
  createDept?: number;
  /** 创建者 */
  creator?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 队伍描述 */
  teamDescription?: string;
};

export type TrainingTeamVo = {
  /** 队伍ID */
  teamId?: number;
  /** 队伍编号 */
  teamCode?: string;
  /** 队伍名称 */
  teamName?: string;
  /** 队长ID */
  leaderId?: number;
  /** 队长姓名 */
  leaderName?: string;
  /** 成员数量 */
  memberCount?: number;
  /** 队伍状态（0-待命 1-训练中 2-休息 3-解散） */
  teamStatus?: string;
  /** 所属单位 */
  organization?: string;
  /** 联系电话 */
  contactPhone?: string;
  /** 备注 */
  remark?: string;
  /** 创建部门 */
  createDept?: number;
  /** 创建者 */
  creator?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新者 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 队伍描述 */
  teamDescription?: string;
};

export type TrainTaskDetailInfoVO = {
  /** 任务基本信息 */
  taskBasicInfoVO?: TaskBasicInfoVO;
  /** 关联的区域信息 */
  taskRelatedAreaVOList?: TaskRelatedAreaVO[];
  /** 参与任务的队伍列表 */
  teamList?: TaskTeamInfoVO[];
  /** 任务设备信息 */
  deviceSummary?: TaskDeviceSummaryVO;
};

export type TrainTaskDetailVO = {
  /** 任务基本信息 */
  taskBasicInfoVO?: TaskBasicInfoVO;
  /** 关联的区域信息 */
  taskRelatedAreaVOList?: TaskRelatedAreaVO[];
  /** 关联的队伍信息 */
  taskRelatedTeamVOList?: TaskRelatedTeamVO[];
  /** 关联的设备信息 */
  deviceVOList?: TaskRelatedDeviceVO[];
};

export type TrainTaskPageVO = {
  /** 任务ID */
  taskId?: number;
  /** 任务名称 */
  taskName?: string;
  /** 任务类型（1-侦察任务 2-巡航任务 3-反无人机演训 4-信号干扰测试 5-综合对抗演练 6-路径规划验证） */
  taskType?: string;
  /** 任务状态（0-未开始 1-进行中 2-已暂停 3-已完成 4-已取消） */
  taskStatus?: string;
  /** 任务状态（0-未开始 1-进行中 2-已暂停 3-已完成 4-已取消） */
  taskLastStatus?: string;
  /** 任务状态（0-未开始 1-进行中 2-已暂停 3-已完成 4-已取消） */
  taskCurrentStatus?: string;
  /** 计划开始时间 */
  plannedStartTime?: string;
  /** 关联的区域信息 */
  geoAreaVOList?: GeoAreaVO[];
  /** 关联的队伍信息 */
  teamVOList?: TeamVO[];
};

export type UAVAlertMessageDTO = {
  /** t表的id字段 */
  id?: number;
  /** t表的alert_rule_id字段 */
  alertRuleId?: number;
  /** t表的threshold_id字段 */
  thresholdId?: number;
  /** t表的alert_object_type字段 */
  alertObjectType?: string;
  /** t表的alert_message字段 */
  alertMessage?: string;
  /** t表的created_at字段 */
  createdAt?: string;
  /** 阈值名称 */
  thresholdName?: string;
  /** 告警规则名称 */
  ruleName?: string;
  /** 告警级别：info、warning、error、critical */
  alertLevel?: string;
};

export type UmsAdmin = {
  id?: number;
  username?: string;
  password?: string;
  /** 头像 */
  icon?: string;
  /** 邮箱 */
  email?: string;
  /** 昵称 */
  nickName?: string;
  /** 备注信息 */
  note?: string;
  /** 创建时间 */
  createTime?: string;
  /** 最后登录时间 */
  loginTime?: string;
  /** 帐号启用状态：0->禁用；1->启用 */
  status?: number;
};

export type UmsAdminDto = {
  id?: number;
  username?: string;
  password?: string;
  /** 头像 */
  icon?: string;
  /** 邮箱 */
  email?: string;
  /** 昵称 */
  nickName?: string;
  /** 备注信息 */
  note?: string;
  /** 创建时间 */
  createTime?: string;
  /** 最后登录时间 */
  loginTime?: string;
  /** 帐号启用状态：0->禁用；1->启用 */
  status?: number;
  /** 分配角色 */
  roleIds?: number[];
};

export type UmsAdminLoginParam = {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
};

export type UmsAdminParam = {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 用户头像 */
  icon?: string;
  /** 电话 */
  email?: string;
  /** 用户昵称 */
  nickName?: string;
  /** 备注 */
  note?: string;
  /** 分配角色 */
  roleIds?: number[];
};

export type UmsMemberLevel = {
  id?: number;
  name?: string;
  growthPoint?: number;
  defaultStatus?: number;
  freeFreightPoint?: number;
  commentGrowthPoint?: number;
  priviledgeFreeFreight?: number;
  priviledgeSignIn?: number;
  priviledgeComment?: number;
  priviledgePromotion?: number;
  priviledgeMemberPrice?: number;
  priviledgeBirthday?: number;
  note?: string;
};

export type UmsMenu = {
  id?: number;
  /** 父级ID */
  parentId?: number;
  /** 创建时间 */
  createTime?: string;
  /** 菜单名称 */
  title?: string;
  /** 菜单级数 */
  level?: number;
  /** 菜单排序 */
  sort?: number;
  /** 前端名称 */
  name?: string;
  /** 前端图标 */
  icon?: string;
  /** 前端隐藏 */
  hidden?: number;
  component?: string;
  route?: string;
  type?: string;
  label?: string;
  status?: boolean;
};

export type UmsMenuNode = {
  id?: number;
  /** 父级ID */
  parentId?: number;
  /** 创建时间 */
  createTime?: string;
  /** 菜单名称 */
  title?: string;
  /** 菜单级数 */
  level?: number;
  /** 菜单排序 */
  sort?: number;
  /** 前端名称 */
  name?: string;
  /** 前端图标 */
  icon?: string;
  /** 前端隐藏 */
  hidden?: number;
  component?: string;
  route?: string;
  type?: string;
  label?: string;
  status?: boolean;
  /** 子级菜单 */
  children?: UmsMenuNode[];
};

export type UmsResource = {
  id?: number;
  /** 创建时间 */
  createTime?: string;
  /** 资源名称 */
  name?: string;
  /** 资源URL */
  url?: string;
  /** 描述 */
  description?: string;
  /** 资源分类ID */
  categoryId?: number;
};

export type UmsResourceCategory = {
  id?: number;
  /** 创建时间 */
  createTime?: string;
  /** 分类名称 */
  name?: string;
  /** 排序 */
  sort?: number;
};

export type UmsRole = {
  id?: number;
  /** 名称 */
  name?: string;
  /** 描述 */
  description?: string;
  /** 后台用户数量 */
  adminCount?: number;
  /** 创建时间 */
  createTime?: string;
  /** 启用状态：0->禁用；1->启用 */
  status?: number;
  sort?: number;
};

export type UmsRoleDto = {
  id?: number;
  /** 名称 */
  name?: string;
  /** 描述 */
  description?: string;
  /** 后台用户数量 */
  adminCount?: number;
  /** 创建时间 */
  createTime?: string;
  /** 启用状态：0->禁用；1->启用 */
  status?: number;
  sort?: number;
  menuIds?: number[];
  resourceIds?: number[];
};

export type UpdateAdminPasswordParam = {
  /** 用户名 */
  username: string;
  /** 旧密码 */
  oldPassword: string;
  /** 新密码 */
  newPassword: string;
};

export type WaypointDTO = {
  longitude: number;
  latitude: number;
  sequence?: number;
};

export type WebsocketStatsUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, Record<string, unknown>>;
};

export type WebsocketSystemNotifyUsingPostBody = Record<
  string,
  Record<string, unknown>
>;

export type WebsocketSystemNotifyUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, Record<string, unknown>>;
};

export type WebsocketUserSendUsingPostBody = Record<
  string,
  Record<string, unknown>
>;

export type WebsocketUserSendUsingPostResponses = {
  /**
   * OK
   */
  200: Record<string, Record<string, unknown>>;
};

export type WorkPlatformTaskUsingGetResponses = {
  /**
   * OK
   */
  200: WorkPlatformTaskVO;
};

export type WorkPlatformTaskVO = {
  /** 任务ID */
  taskId?: number;
  /** 任务名称 */
  taskName?: string;
  /** 任务状态 */
  taskStatus?: string;
  /** 任务开始时间 */
  startTime?: string;
  /** 任务结束时间 */
  endTime?: string;
  /** 队伍ID */
  teamId?: number;
  /** 队伍名称 */
  teamName?: string;
  /** 成员ID */
  memberId?: number;
  /** 成员名称 */
  memberName?: string;
  /** 任务角色ID */
  taskRoleId?: number;
  /** 任务角色名称 */
  taskRoleName?: string;
};

/** 作业类型（4-定位分析，5-路径规划） */
export enum WorkTypeEnum {
  POSITIONING_ANALYSIS = 4,
  PATH_PLANNING = 5,
}

export type IWorkTypeEnum = keyof typeof WorkTypeEnum;
