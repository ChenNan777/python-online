/* eslint-disable */
// @ts-ignore

export type AlertHistory = {
  id?: number;
  /** 告警规则ID */
  alertRuleId?: number;
  /** 阈值ID */
  thresholdId?: number;
  /** 关联的任务ID */
  taskId?: number;
  /** 告警对象类型（无人机，队伍，队员，载荷） */
  alertObjectType?: string;
  /** 告警对象id */
  alertObjectId?: string;
  /** 实际采集值 */
  actualValue?: number;
  /** 告警级别：info、warning、critical */
  alertLevel?: string;
  createdAt?: string;
  updatedAt?: string;
  /** 渲染后的告警消息 */
  alertMessage?: string;
  /** 阈值类型 */
  thresholdType?: string;
};

export type AlertHistoryBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type AlertHistoryBatchUsingPutBody = {
  updateData?: AlertHistory;
  condition?: AlertHistoryRequestParam;
};

export type AlertHistoryBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type AlertHistoryIdUsingDeleteParams = {
  id: number;
};

export type AlertHistoryIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type AlertHistoryIdUsingGetParams = {
  id: number;
};

export type AlertHistoryIdUsingGetResponses = {
  /**
   * OK
   */
  200: AlertHistoryVo;
};

export type AlertHistoryOpenApiExportUsingGetParams = {
  condition?: AlertHistory;
};

export type AlertHistoryOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type AlertHistoryOpenApiImportUsingPostBody = {
  file: string;
};

export type AlertHistoryOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type AlertHistoryRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** Id */
  id?: number;
  /** 告警规则ID */
  alertRuleId?: number;
  /** 阈值ID */
  thresholdId?: number;
  /** 关联的任务ID */
  taskId?: number;
  /** 告警对象类型（无人机，队伍，队员，载荷） */
  alertObjectType?: string;
  /** 告警对象id */
  alertObjectId?: string;
  /** 实际采集值 */
  actualValue?: number;
  /** 告警级别：info、warning、critical */
  alertLevel?: string;
  /** Created at start range */
  createdAtStart?: string;
  /** Created at end range */
  createdAtEnd?: string;
  /** Updated at start range */
  updatedAtStart?: string;
  /** Updated at end range */
  updatedAtEnd?: string;
  /** 渲染后的告警消息 */
  alertMessage?: string;
};

export type AlertHistorySearchUsingGetParams = {
  req: AlertHistoryRequestParam;
};

export type AlertHistorySearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageAlertHistoryVo;
};

export type AlertHistoryUsingPostResponses = {
  /**
   * OK
   */
  200: AlertHistory;
};

export type AlertHistoryUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type AlertHistoryVo = {
  /** Id */
  id?: number;
  /** 告警规则ID */
  alertRuleId?: number;
  /** 阈值ID */
  thresholdId?: number;
  /** 关联的任务ID */
  taskId?: number;
  /** 告警对象类型（无人机，队伍，队员，载荷） */
  alertObjectType?: string;
  /** 告警对象id */
  alertObjectId?: string;
  /** 实际采集值 */
  actualValue?: number;
  /** 告警级别：info、warning、critical */
  alertLevel?: string;
  /** Created at */
  createdAt?: string;
  /** Updated at */
  updatedAt?: string;
  /** 渲染后的告警消息 */
  alertMessage?: string;
};

export type AlertRules = {
  id?: number;
  /** 告警规则名称 */
  ruleName?: string;
  /** 关联的阈值ID */
  thresholdId?: number;
  /** 告警级别：info、warning、error、critical */
  alertLevel?: string;
  /** 是否激活规则 */
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  /** 告警消息模板，支持变量替换如{entity_name}、{actual_value}、{threshold_name}等 */
  messageTemplate?: string;
};

export type AlertRulesBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type AlertRulesBatchUsingPutBody = {
  updateData?: AlertRules;
  condition?: AlertRulesRequestParam;
};

export type AlertRulesBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type AlertRulesIdUsingDeleteParams = {
  id: number;
};

export type AlertRulesIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type AlertRulesIdUsingGetParams = {
  id: number;
};

export type AlertRulesIdUsingGetResponses = {
  /**
   * OK
   */
  200: AlertRulesVo;
};

export type AlertRulesOpenApiExportUsingGetParams = {
  condition?: AlertRules;
};

export type AlertRulesOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type AlertRulesOpenApiImportUsingPostBody = {
  file: string;
};

export type AlertRulesOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type AlertRulesSearchUsingGetParams = {
  req: AlertRulesRequestParam;
};

export type AlertRulesSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageAlertRulesVo;
};

export type AlertRulesUsingPostResponses = {
  /**
   * OK
   */
  200: AlertRules;
};

export type AlertRulesUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type AlertRulesVo = {
  /** Id */
  id?: number;
  /** 告警规则名称 */
  ruleName?: string;
  /** 关联的阈值ID */
  thresholdId?: number;
  /** 告警级别：info、warning、error、critical */
  alertLevel?: string;
  /** 是否激活规则 */
  isActive?: boolean;
  /** Created at */
  createdAt?: string;
  /** Updated at */
  updatedAt?: string;
  /** 告警消息模板，支持变量替换如{entity_name}、{actual_value}、{threshold_name}等 */
  messageTemplate?: string;
};

export type CommonPageDevCameraVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: DevCameraVo[];
};

export type CommonPageDevTabletVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: DevTabletVo[];
};

export type CommonPageDroneDeviceVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: DroneDeviceVo[];
};

export type CommonPageGeoAreasVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: GeoAreasVo[];
};

export type CommonPageLogTargetDetectionVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: LogTargetDetectionVo[];
};

export type CommonPageLogZcPathVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: LogZcPathVo[];
};

export type CommonPagePersonnelVitalSignsVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: PersonnelVitalSignsVo[];
};

export type CommonPageRadiationPayloadVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: RadiationPayloadVo[];
};

export type CommonPageTrainingCommentVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: TrainingCommentVo[];
};

export type CommonPageTrainingTaskTeamStatusVO = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: TrainingTaskTeamStatusVO[];
};

export type CommonPageTrainingTeamVo = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: TrainingTeamVo[];
};

export type CommonPageUmsAdminLoginLogVO = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  total?: number;
  list?: UmsAdminLoginLogVO[];
};

export type CommonResultAlertRules = {
  code?: number;
  message?: string;
  data?: AlertRules;
};

export type CommonResultAlertRulesVo = {
  code?: number;
  message?: string;
  /** AlertRules VO */
  data?: AlertRulesVo;
};

export type CommonResultBoolean = {
  code?: number;
  message?: string;
  data?: boolean;
};

export type CommonResultCommonPageDevCameraVo = {
  code?: number;
  message?: string;
  data?: CommonPageDevCameraVo;
};

export type CommonResultCommonPageDevTabletVo = {
  code?: number;
  message?: string;
  data?: CommonPageDevTabletVo;
};

export type CommonResultCommonPageDroneDeviceVo = {
  code?: number;
  message?: string;
  data?: CommonPageDroneDeviceVo;
};

export type CommonResultCommonPageGeoAreasVo = {
  code?: number;
  message?: string;
  data?: CommonPageGeoAreasVo;
};

export type CommonResultCommonPageLogTargetDetectionVo = {
  code?: number;
  message?: string;
  data?: CommonPageLogTargetDetectionVo;
};

export type CommonResultCommonPageLogZcPathVo = {
  code?: number;
  message?: string;
  data?: CommonPageLogZcPathVo;
};

export type CommonResultCommonPagePersonnelVitalSignsVo = {
  code?: number;
  message?: string;
  data?: CommonPagePersonnelVitalSignsVo;
};

export type CommonResultCommonPageRadiationPayloadVo = {
  code?: number;
  message?: string;
  data?: CommonPageRadiationPayloadVo;
};

export type CommonResultCommonPageTrainingCommentVo = {
  code?: number;
  message?: string;
  data?: CommonPageTrainingCommentVo;
};

export type CommonResultCommonPageTrainingTaskTeamStatusVO = {
  code?: number;
  message?: string;
  data?: CommonPageTrainingTaskTeamStatusVO;
};

export type CommonResultCommonPageTrainingTeamVo = {
  code?: number;
  message?: string;
  data?: CommonPageTrainingTeamVo;
};

export type CommonResultCommonPageUmsAdminLoginLogVO = {
  code?: number;
  message?: string;
  data?: CommonPageUmsAdminLoginLogVO;
};

export type CommonResultDevCamera = {
  code?: number;
  message?: string;
  data?: DevCamera;
};

export type CommonResultDevCameraVo = {
  code?: number;
  message?: string;
  /** DevCamera VO */
  data?: DevCameraVo;
};

export type CommonResultDevTablet = {
  code?: number;
  message?: string;
  data?: DevTablet;
};

export type CommonResultDevTabletVo = {
  code?: number;
  message?: string;
  /** DevTablet VO */
  data?: DevTabletVo;
};

export type CommonResultDroneDevice = {
  code?: number;
  message?: string;
  data?: DroneDevice;
};

export type CommonResultDroneWarning = {
  code?: number;
  message?: string;
  data?: DroneWarning;
};

export type CommonResultDroneWarningVo = {
  code?: number;
  message?: string;
  /** DroneWarning VO */
  data?: DroneWarningVo;
};

export type CommonResultGeoAreas = {
  code?: number;
  message?: string;
  data?: GeoAreas;
};

export type CommonResultGeoAreasVo = {
  code?: number;
  message?: string;
  /** GeoAreas VO */
  data?: GeoAreasVo;
};

export type CommonResultInteger = {
  code?: number;
  message?: string;
  data?: number;
};

export type CommonResultListPersonnelVitalSignsVo = {
  code?: number;
  message?: string;
  data?: PersonnelVitalSignsVo[];
};

export type CommonResultLogTargetDetection = {
  code?: number;
  message?: string;
  data?: LogTargetDetection;
};

export type CommonResultLogTargetDetectionVo = {
  code?: number;
  message?: string;
  /** LogTargetDetection VO */
  data?: LogTargetDetectionVo;
};

export type CommonResultLogZcPath = {
  code?: number;
  message?: string;
  data?: LogZcPath;
};

export type CommonResultLogZcPathVo = {
  code?: number;
  message?: string;
  /** LogZcPath VO */
  data?: LogZcPathVo;
};

export type CommonResultPageAlertRulesVo = {
  code?: number;
  message?: string;
  data?: PageAlertRulesVo;
};

export type CommonResultPageDroneWarningVo = {
  code?: number;
  message?: string;
  data?: PageDroneWarningVo;
};

export type CommonResultPageScoringStandardsVo = {
  code?: number;
  message?: string;
  data?: PageScoringStandardsVo;
};

export type CommonResultPageTrainingTaskAssignmentVo = {
  code?: number;
  message?: string;
  data?: PageTrainingTaskAssignmentVo;
};

export type CommonResultPersonnelVitalSigns = {
  code?: number;
  message?: string;
  data?: PersonnelVitalSigns;
};

export type CommonResultPersonnelVitalSignsVo = {
  code?: number;
  message?: string;
  /** PersonnelVitalSigns VO */
  data?: PersonnelVitalSignsVo;
};

export type CommonResultRadiationPayload = {
  code?: number;
  message?: string;
  data?: RadiationPayload;
};

export type CommonResultRadiationPayloadVo = {
  code?: number;
  message?: string;
  /** RadiationPayload VO */
  data?: RadiationPayloadVo;
};

export type CommonResultScoringStandards = {
  code?: number;
  message?: string;
  data?: ScoringStandards;
};

export type CommonResultScoringStandardsVo = {
  code?: number;
  message?: string;
  /** ScoringStandards VO */
  data?: ScoringStandardsVo;
};

export type CommonResultString = {
  code?: number;
  message?: string;
  data?: string;
};

export type CommonResultTrainingComment = {
  code?: number;
  message?: string;
  data?: TrainingComment;
};

export type CommonResultTrainingCommentVo = {
  code?: number;
  message?: string;
  /** TrainingComment VO */
  data?: TrainingCommentVo;
};

export type CommonResultTrainingTaskAssignment = {
  code?: number;
  message?: string;
  data?: TrainingTaskAssignment;
};

export type CommonResultTrainingTaskAssignmentVo = {
  code?: number;
  message?: string;
  /** TrainingTaskAssignment VO */
  data?: TrainingTaskAssignmentVo;
};

export type CommonResultTrainingTaskTeamStatus = {
  code?: number;
  message?: string;
  data?: TrainingTaskTeamStatus;
};

export type CommonResultTrainingTaskTeamStatusVO = {
  code?: number;
  message?: string;
  /** TrainingTaskTeamStatus */
  data?: TrainingTaskTeamStatusVO;
};

export type CommonResultTrainingTeam = {
  code?: number;
  message?: string;
  data?: TrainingTeam;
};

export type CommonResultTrainingTeamVo = {
  code?: number;
  message?: string;
  /** TrainingTeam VO */
  data?: TrainingTeamVo;
};

export type CommonResultUmsAdminLoginLog = {
  code?: number;
  message?: string;
  data?: UmsAdminLoginLog;
};

export type CommonResultUmsAdminLoginLogVO = {
  code?: number;
  message?: string;
  /** UmsAdminLoginLog */
  data?: UmsAdminLoginLogVO;
};

export type DevCamera = {
  /** 设备ID，主键且自动递增 */
  deviceId?: string;
  /** 摄像头名称，最大长度255个字符，不能为空 */
  cameraName?: string;
  /** 使用队伍ID，可以为空 */
  teamId?: number;
  /** 使用队员ID，可以为空 */
  playerId?: number;
  /** IP地址，最大长度15个字符，用于存储IP地址格式（如 192.168.1.1） */
  ipAddress?: string;
  cameraStatus?: boolean;
};

export type DevCameraBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type DevCameraBatchUsingPutBody = {
  updateData?: DevCamera;
  condition?: DevCameraRequestParam;
};

export type DevCameraBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type DevCameraDeviceIdUsingDeleteParams = {
  deviceId: string;
};

export type DevCameraDeviceIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type DevCameraDeviceIdUsingGetParams = {
  deviceId: string;
};

export type DevCameraDeviceIdUsingGetResponses = {
  /**
   * OK
   */
  200: DevCameraVo;
};

export type DevCameraOpenApiExportUsingGetParams = {
  condition?: DevCamera;
};

export type DevCameraOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type DevCameraOpenApiImportUsingPostBody = {
  file: string;
};

export type DevCameraOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type DevCameraRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 设备ID，主键且自动递增 */
  deviceId?: string;
  /** 摄像头名称，最大长度255个字符，不能为空 */
  cameraName?: string;
  /** 使用队伍ID，可以为空 */
  teamId?: number;
  /** 使用队员ID，可以为空 */
  playerId?: number;
  /** IP地址，最大长度15个字符，用于存储IP地址格式（如 192.168.1.1） */
  ipAddress?: string;
  /** Camera status */
  cameraStatus?: boolean;
};

export type DevCameraSearchUsingGetParams = {
  req: DevCameraRequestParam;
};

export type DevCameraSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageDevCameraVo;
};

export type DevCameraUsingPostResponses = {
  /**
   * OK
   */
  200: DevCamera;
};

export type DevCameraUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type DevCameraVo = {
  /** 设备ID，主键且自动递增 */
  deviceId?: string;
  /** 摄像头名称，最大长度255个字符，不能为空 */
  cameraName?: string;
  /** 使用队伍ID，可以为空 */
  teamId?: number;
  /** 使用队员ID，可以为空 */
  playerId?: number;
  /** IP地址，最大长度15个字符，用于存储IP地址格式（如 192.168.1.1） */
  ipAddress?: string;
  /** Camera status */
  cameraStatus?: boolean;
};

export type DevTablet = {
  /** 设备id */
  deviceId?: string;
  /** 平板名称 */
  tabletName?: string;
  /** 使用队伍id */
  teamId?: number;
  /** 使用队员id */
  memberId?: number;
  /** 电池电量 */
  batteryLevel?: number;
  /** 平板状态 */
  tabletStatus?: boolean;
};

export type DevTabletBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type DevTabletBatchUsingPutBody = {
  updateData?: DevTablet;
  condition?: DevTabletRequestParam;
};

export type DevTabletBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type DevTabletDeviceIdUsingDeleteParams = {
  deviceId: string;
};

export type DevTabletDeviceIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type DevTabletDeviceIdUsingGetParams = {
  deviceId: string;
};

export type DevTabletDeviceIdUsingGetResponses = {
  /**
   * OK
   */
  200: DevTabletVo;
};

export type DevTabletOpenApiExportUsingGetParams = {
  condition?: DevTablet;
};

export type DevTabletOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type DevTabletOpenApiImportUsingPostBody = {
  file: string;
};

export type DevTabletOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type DevTabletRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 设备id */
  deviceId?: string;
  /** 平板名称 */
  tabletName?: string;
  /** 使用队伍id */
  teamId?: number;
  /** 使用队员id */
  memberId?: number;
  /** 电池电量 */
  batteryLevel?: number;
  /** 平板状态 */
  tabletStatus?: boolean;
};

export type DevTabletSearchUsingGetParams = {
  req: DevTabletRequestParam;
};

export type DevTabletSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageDevTabletVo;
};

export type DevTabletUsingPostResponses = {
  /**
   * OK
   */
  200: DevTablet;
};

export type DevTabletUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type DevTabletVo = {
  /** 设备id */
  deviceId?: string;
  /** 平板名称 */
  tabletName?: string;
  /** 使用队伍id */
  teamId?: number;
  /** 使用队员id */
  memberId?: number;
  /** 电池电量 */
  batteryLevel?: number;
  /** 平板状态 */
  tabletStatus?: boolean;
};

export type DroneControlLog = {
  /** 告警ID */
  logId?: number;
  /** 无人机ID */
  droneId?: number;
  /** 无人机名称 */
  droneName?: string;
  /** 操作员ID */
  operatorId?: number;
  /** 操作员姓名 */
  operatorName?: string;
  /** 控制指令（0-无 1-起飞 2-降落 3-返航 4-悬停 5-继续 6-暂停 7-定点飞行 8-预设航路 9-自由飞行 10-重启 11-模式切换 12-参数调节） */
  controlType?: string;
  /** 操控命令 */
  controlCommand?: string;
  /** 指令执行状态（0-已下发未确认 1-执行成功 2-执行失败 3-无人机拒绝 4-超时未响应） */
  executeStatus?: string;
  /** 失败原因 */
  failureReason?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
};

export type DroneControlLogBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type DroneControlLogBatchUsingPutBody = {
  updateData?: DroneControlLog;
  condition?: DroneControlLogRequestParam;
};

export type DroneControlLogBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type DroneControlLogLogIdUsingDeleteParams = {
  logId: number;
};

export type DroneControlLogLogIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type DroneControlLogLogIdUsingGetParams = {
  logId: number;
};

export type DroneControlLogLogIdUsingGetResponses = {
  /**
   * OK
   */
  200: DroneControlLogVo;
};

export type DroneControlLogOpenApiExportUsingGetParams = {
  condition?: DroneControlLog;
};

export type DroneControlLogOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type DroneControlLogOpenApiImportUsingPostBody = {
  file: string;
};

export type DroneControlLogOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type DroneControlLogRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 告警ID */
  logId?: number;
  /** 无人机ID */
  droneId?: number;
  /** 无人机名称 */
  droneName?: string;
  /** 操作员ID */
  operatorId?: number;
  /** 操作员姓名 */
  operatorName?: string;
  /** 控制指令（0-无 1-起飞 2-降落 3-返航 4-悬停 5-继续 6-暂停 7-定点飞行 8-预设航路 9-自由飞行 10-重启 11-模式切换 12-参数调节） */
  controlType?: string;
  /** 操控命令 */
  controlCommand?: string;
  /** 指令执行状态（0-已下发未确认 1-执行成功 2-执行失败 3-无人机拒绝 4-超时未响应） */
  executeStatus?: string;
  /** 失败原因 */
  failureReason?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
};

export type DroneControlLogSearchUsingGetParams = {
  req: DroneControlLogRequestParam;
};

export type DroneControlLogSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageDroneControlLogVo;
};

export type DroneControlLogUsingPostResponses = {
  /**
   * OK
   */
  200: DroneControlLog;
};

export type DroneControlLogUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type DroneControlLogVo = {
  /** 告警ID */
  logId?: number;
  /** 无人机ID */
  droneId?: number;
  /** 无人机名称 */
  droneName?: string;
  /** 控制指令（0-无 1-起飞 2-降落 3-返航 4-悬停 5-继续 6-暂停 7-定点飞行 8-预设航路 9-自由飞行 10-重启 11-模式切换 12-参数调节） */
  controlType?: string;
  /** 操作员姓名 */
  operatorName?: string;
  /** 操控命令 */
  controlCommand?: string;
  /** 创建时间 */
  createTime?: string;
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

export type DroneDeviceBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type DroneDeviceBatchUsingPutBody = {
  updateData?: DroneDevice;
  condition?: DroneDeviceRequestParam;
};

export type DroneDeviceBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type DroneDeviceDroneIdUsingDeleteParams = {
  droneId: string;
};

export type DroneDeviceDroneIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type DroneDeviceOpenApiExportUsingGetParams = {
  condition?: DroneDevice;
};

export type DroneDeviceOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type DroneDeviceOpenApiImportUsingPostBody = {
  file: string;
};

export type DroneDeviceOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type DroneDeviceSearchUsingGetParams = {
  req: DroneDeviceRequestParam;
};

export type DroneDeviceSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageDroneDeviceVo;
};

export type DroneDeviceUsingPostResponses = {
  /**
   * OK
   */
  200: DroneDevice;
};

export type DroneDeviceUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
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

export type DroneRealtimeStatus = {
  /** 无人机ID */
  droneId?: string;
  /** 飞行状态（0-待机 1-准备 2-飞行 3-降落 4-返航 5-悬停 6-暂停 7-异常） */
  flightStatus?: boolean;
  /** 飞行模式（1-手动 2-自动 3-返航 4-悬停 5-跟随 6-环绕 7-航点 8-编队） */
  flightMode?: boolean;
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
  cameraStatus?: boolean;
  /** 录像状态（0-未录像 1-录像中 2-暂停 3-已停止） */
  recordingStatus?: boolean;
  /** SD卡容量（GB） */
  sdCardCapacity?: number;
  /** SD卡剩余容量（GB） */
  sdCardRemaining?: number;
  /** 异常状态（0-正常 1-通信异常 2-导航异常 3-动力异常 4-电池异常 5-传感器异常 6-载荷异常 7-飞控异常 8-其他异常） */
  exceptionStatus?: boolean;
  /** 异常描述 */
  exceptionDescription?: string;
  /** 控制指令（0-无 1-起飞 2-降落 3-返航 4-悬停 5-继续 6-暂停 7-自检 8-校准 9-紧急停止 10-重启 11-模式切换 12-参数调节） */
  controlCommand?: boolean;
  /** 指令执行状态（0-已下发未确认 1-执行成功 2-执行失败 3-无人机拒绝 4-超时未响应） */
  commandStatus?: boolean;
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
};

export type DroneRealtimeStatusBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type DroneRealtimeStatusBatchUsingPutBody = {
  updateData?: DroneRealtimeStatus;
  condition?: DroneRealtimeStatusRequestParam;
};

export type DroneRealtimeStatusBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type DroneRealtimeStatusOpenApiExportUsingGetParams = {
  condition?: DroneRealtimeStatus;
};

export type DroneRealtimeStatusOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type DroneRealtimeStatusOpenApiImportUsingPostBody = {
  file: string;
};

export type DroneRealtimeStatusOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type DroneRealtimeStatusSearchUsingGetParams = {
  req: DroneRealtimeStatusRequestParam;
};

export type DroneRealtimeStatusSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageDroneRealtimeStatusVo;
};

export type DroneRealtimeStatusStatusIdUsingDeleteParams = {
  statusId: number;
};

export type DroneRealtimeStatusStatusIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type DroneRealtimeStatusStatusIdUsingGetParams = {
  statusId: string;
};

export type DroneRealtimeStatusStatusIdUsingGetResponses = {
  /**
   * OK
   */
  200: DroneRealtimeStatusVo;
};

export type DroneRealtimeStatusUsingPostResponses = {
  /**
   * OK
   */
  200: DroneRealtimeStatus;
};

export type DroneRealtimeStatusUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
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

export type DroneWarning = {
  /** 告警ID */
  warningId?: number;
  /** 无人机ID */
  droneId?: string;
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

export type DroneWarningBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type DroneWarningBatchUsingPutBody = {
  updateData?: DroneWarning;
  condition?: DroneWarningRequestParam;
};

export type DroneWarningBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type DroneWarningOpenApiExportUsingGetParams = {
  condition?: DroneWarning;
};

export type DroneWarningOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type DroneWarningOpenApiImportUsingPostBody = {
  file: string;
};

export type DroneWarningOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type DroneWarningSearchUsingGetParams = {
  req: DroneWarningRequestParam;
};

export type DroneWarningSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageDroneWarningVo;
};

export type DroneWarningUsingPostResponses = {
  /**
   * OK
   */
  200: DroneWarning;
};

export type DroneWarningUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type DroneWarningVo = {
  /** 告警ID */
  warningId?: number;
  /** 无人机ID */
  droneId?: string;
  /** 无人机名称 */
  droneName?: string;
  /** 告警内容 */
  warningEvent?: string;
  /** 告警类型 */
  warningType?: string;
  /** 告警等级 */
  warningLevel?: string;
  /** 告警时间 */
  warningTime?: string;
};

export type DroneWarningWarningIdUsingDeleteParams = {
  warningId: number;
};

export type DroneWarningWarningIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type DroneWarningWarningIdUsingGetParams = {
  warningId: number;
};

export type DroneWarningWarningIdUsingGetResponses = {
  /**
   * OK
   */
  200: DroneWarningVo;
};

export type GeoAreas = {
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

export type GeoAreasAreaIdUsingDeleteParams = {
  areaId: number;
};

export type GeoAreasAreaIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type GeoAreasAreaIdUsingGetParams = {
  areaId: number;
};

export type GeoAreasAreaIdUsingGetResponses = {
  /**
   * OK
   */
  200: GeoAreasVo;
};

export type GeoAreasBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type GeoAreasBatchUsingPutBody = {
  updateData?: GeoAreas;
  condition?: GeoAreasRequestParam;
};

export type GeoAreasBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type GeoAreasOpenApiExportUsingGetParams = {
  condition?: GeoAreas;
};

export type GeoAreasOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type GeoAreasOpenApiImportUsingPostBody = {
  file: string;
};

export type GeoAreasOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type GeoAreasSearchUsingGetParams = {
  req: GeoAreasRequestParam;
};

export type GeoAreasSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageGeoAreasVo;
};

export type GeoAreasUsingPostResponses = {
  /**
   * OK
   */
  200: GeoAreas;
};

export type GeoAreasUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
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

export type LogBraceletBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type LogBraceletBatchUsingPutBody = {
  updateData?: LogBracelet;
  condition?: LogBraceletRequestParam;
};

export type LogBraceletBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type LogBraceletOpenApiExportUsingGetParams = {
  condition?: LogBracelet;
};

export type LogBraceletOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type LogBraceletOpenApiImportUsingPostBody = {
  file: string;
};

export type LogBraceletOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type LogBraceletSearchUsingGetParams = {
  req: LogBraceletRequestParam;
};

export type LogBraceletSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageLogBraceletVo;
};

export type LogBraceletSnowflakeIdUsingDeleteParams = {
  snowflakeId: number;
};

export type LogBraceletSnowflakeIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type LogBraceletSnowflakeIdUsingGetParams = {
  snowflakeId: number;
};

export type LogBraceletSnowflakeIdUsingGetResponses = {
  /**
   * OK
   */
  200: LogBraceletVo;
};

export type LogBraceletUsingPostResponses = {
  /**
   * OK
   */
  200: LogBracelet;
};

export type LogBraceletUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type LogBraceletVo = {
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

export type LogMemberPathVo = {
  /** 队员基本信息 */
  dtoList?: TeamMemberDTO[];
  /** 运动轨迹列表 */
  pathList?: LogBracelet[];
};

export type LogPayload = {
  /** 雪花id */
  snowflakeId?: number;
  /** 载荷唯一标识 */
  payloadId?: string;
  /** 信号发射类型：ADS-B、Model-S、MARK X、雷达、典型通信信号等 */
  signalType?: string;
  /** 信号模式：Continuous (连续辐射)、ontrolled (受控辐射)、Programmed (程控辐射) */
  signalMode?: string;
  /** 频率（Hz） */
  frequency?: number;
  /** 功率 */
  power?: number;
  /** 脉宽（μs），对于连续波信号，为0 */
  pulseWidth?: number;
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
};

export type LogPayloadBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type LogPayloadBatchUsingPutBody = {
  updateData?: LogPayload;
  condition?: LogPayloadRequestParam;
};

export type LogPayloadBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type LogPayloadOpenApiExportUsingGetParams = {
  condition?: LogPayload;
};

export type LogPayloadOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type LogPayloadOpenApiImportUsingPostBody = {
  file: string;
};

export type LogPayloadOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type LogPayloadRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 雪花id */
  snowflakeId?: number;
  /** 载荷唯一标识 */
  payloadId?: number;
  /** 信号发射类型：ADS-B、Model-S、MARK X、雷达、典型通信信号等 */
  signalType?: string;
  /** 信号模式：Continuous (连续辐射)、ontrolled (受控辐射)、Programmed (程控辐射) */
  signalMode?: string;
  /** 频率（Hz） */
  frequency?: number;
  /** 功率 */
  power?: number;
  /** 脉宽（μs），对于连续波信号，为0 */
  pulseWidth?: number;
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
};

export type LogPayloadSearchUsingGetParams = {
  req: LogPayloadRequestParam;
};

export type LogPayloadSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageLogPayloadVo;
};

export type LogPayloadSnowflakeIdUsingDeleteParams = {
  snowflakeId: number;
};

export type LogPayloadSnowflakeIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type LogPayloadSnowflakeIdUsingGetParams = {
  snowflakeId: number;
};

export type LogPayloadSnowflakeIdUsingGetResponses = {
  /**
   * OK
   */
  200: LogPayloadVo;
};

export type LogPayloadUsingPostResponses = {
  /**
   * OK
   */
  200: LogPayload;
};

export type LogPayloadUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type LogPayloadVo = {
  /** 雪花id */
  snowflakeId?: number;
  /** 载荷唯一标识 */
  payloadId?: number;
  /** 信号发射类型：ADS-B、Model-S、MARK X、雷达、典型通信信号等 */
  signalType?: string;
  /** 信号模式：Continuous (连续辐射)、ontrolled (受控辐射)、Programmed (程控辐射) */
  signalMode?: string;
  /** 频率（Hz） */
  frequency?: number;
  /** 功率 */
  power?: number;
  /** 脉宽（μs），对于连续波信号，为0 */
  pulseWidth?: number;
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
};

export type LogTargetDetection = {
  /** 雪花ID */
  snowflakeId?: number;
  /** 任务ID */
  taskId?: number;
  /** 团队ID */
  teamId?: number;
  /** 成员ID */
  memberId?: number;
  /** 无人机ID */
  uavId?: string;
  /** 经度 */
  lon?: number;
  /** 纬度 */
  lat?: number;
  /** 报告时间 */
  reportTime?: string;
};

export type LogTargetDetectionBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type LogTargetDetectionBatchUsingPutBody = {
  updateData?: LogTargetDetection;
  condition?: LogTargetDetectionRequestParam;
};

export type LogTargetDetectionBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type LogTargetDetectionOpenApiExportUsingGetParams = {
  condition?: LogTargetDetection;
};

export type LogTargetDetectionOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type LogTargetDetectionOpenApiImportUsingPostBody = {
  file: string;
};

export type LogTargetDetectionOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type LogTargetDetectionRequestParam = {
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
  /** 团队ID */
  teamId?: number;
  /** 成员ID */
  memberId?: number;
  /** 无人机ID */
  uavId?: string;
  /** 经度 */
  lon?: number;
  /** 纬度 */
  lat?: number;
  /** 报告时间 start range */
  reportTimeStart?: string;
  /** 报告时间 end range */
  reportTimeEnd?: string;
};

export type LogTargetDetectionSearchUsingGetParams = {
  req: LogTargetDetectionRequestParam;
};

export type LogTargetDetectionSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageLogTargetDetectionVo;
};

export type LogTargetDetectionSnowflakeIdUsingDeleteParams = {
  snowflakeId: number;
};

export type LogTargetDetectionSnowflakeIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type LogTargetDetectionSnowflakeIdUsingGetParams = {
  snowflakeId: number;
};

export type LogTargetDetectionSnowflakeIdUsingGetResponses = {
  /**
   * OK
   */
  200: LogTargetDetectionVo;
};

export type LogTargetDetectionUsingPostResponses = {
  /**
   * OK
   */
  200: LogTargetDetection;
};

export type LogTargetDetectionUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type LogTargetDetectionVo = {
  /** 雪花ID */
  snowflakeId?: number;
  /** 任务ID */
  taskId?: number;
  /** 团队ID */
  teamId?: number;
  /** 成员ID */
  memberId?: number;
  /** 无人机ID */
  uavId?: string;
  /** 经度 */
  lon?: number;
  /** 纬度 */
  lat?: number;
  /** 报告时间 */
  reportTime?: string;
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

export type LogUavBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type LogUavBatchUsingPutBody = {
  updateData?: LogUav;
  condition?: LogUavRequestParam;
};

export type LogUavBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type LogUavOpenApiExportUsingGetParams = {
  condition?: LogUav;
};

export type LogUavOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type LogUavOpenApiImportUsingPostBody = {
  file: string;
};

export type LogUavOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type LogUavSearchUsingGetParams = {
  req: LogUavRequestParam;
};

export type LogUavSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageLogMemberPathVo;
};

export type LogUavSnowflakeIdUsingDeleteParams = {
  snowflakeId: number;
};

export type LogUavSnowflakeIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type LogUavSnowflakeIdUsingGetParams = {
  snowflakeId: number;
};

export type LogUavSnowflakeIdUsingGetResponses = {
  /**
   * OK
   */
  200: LogMemberPathVo;
};

export type LogUavUsingPostResponses = {
  /**
   * OK
   */
  200: LogUav;
};

export type LogUavUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type LogZcPath = {
  /** 雪花id */
  snowflakeId?: number;
  /** 任务id */
  taskId?: number;
  /** 队伍id */
  teamId?: number;
  /** 队伍成员id */
  memberId?: number;
  /** 实际路径 */
  geoJson?: string;
  /** 创建时间 */
  createdAt?: string;
  /** ZC(队伍ZC路径) OPTIMAL（最优路径） */
  pathType?: string;
};

export type LogZcPathBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type LogZcPathBatchUsingPutBody = {
  updateData?: LogZcPath;
  condition?: LogZcPathRequestParam;
};

export type LogZcPathBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type LogZcPathOpenApiExportUsingGetParams = {
  condition?: LogZcPath;
};

export type LogZcPathOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type LogZcPathOpenApiImportUsingPostBody = {
  file: string;
};

export type LogZcPathOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type LogZcPathRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 雪花id */
  snowflakeId?: number;
  /** 任务id */
  taskId?: number;
  /** 队伍id */
  teamId?: number;
  /** 队伍成员id */
  memberId?: number;
  /** 实际路径 */
  geoJson?: string;
  /** 创建时间 start range */
  createdAtStart?: string;
  /** 创建时间 end range */
  createdAtEnd?: string;
  /** ZC(队伍ZC路径) OPTIMAL（最优路径） */
  pathType?: string;
};

export type LogZcPathSearchUsingGetParams = {
  req: LogZcPathRequestParam;
};

export type LogZcPathSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageLogZcPathVo;
};

export type LogZcPathSnowflakeIdUsingDeleteParams = {
  snowflakeId: number;
};

export type LogZcPathSnowflakeIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type LogZcPathSnowflakeIdUsingGetParams = {
  snowflakeId: number;
};

export type LogZcPathSnowflakeIdUsingGetResponses = {
  /**
   * OK
   */
  200: LogZcPathVo;
};

export type LogZcPathUsingPostResponses = {
  /**
   * OK
   */
  200: LogZcPath;
};

export type LogZcPathUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type LogZcPathVo = {
  /** 雪花id */
  snowflakeId?: number;
  /** 任务id */
  taskId?: number;
  /** 队伍id */
  teamId?: number;
  /** 队伍成员id */
  memberId?: number;
  /** 实际路径 */
  geoJson?: string;
  /** 创建时间 */
  createdAt?: string;
  /** ZC(队伍ZC路径) OPTIMAL（最优路径） */
  pathType?: string;
};

export type MemberDeviceRelation = {
  /** 主键 */
  id?: number;
  /** 任务id */
  taskId?: number;
  /** 队伍id */
  teamId?: number;
  /** 队伍成员id */
  memberId?: number;
  /** 设备id */
  deviceId?: number;
  /** 设备类型（1-手环 2-平板 3-无人机） */
  deviceType?: string;
};

export type MemberDeviceRelationBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type MemberDeviceRelationBatchUsingPutBody = {
  updateData?: MemberDeviceRelation;
  condition?: MemberDeviceRelationRequestParam;
};

export type MemberDeviceRelationBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type MemberDeviceRelationIdUsingDeleteParams = {
  id: number;
};

export type MemberDeviceRelationIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type MemberDeviceRelationIdUsingGetParams = {
  id: number;
};

export type MemberDeviceRelationIdUsingGetResponses = {
  /**
   * OK
   */
  200: MemberDeviceRelationVo;
};

export type MemberDeviceRelationOpenApiExportUsingGetParams = {
  condition?: MemberDeviceRelation;
};

export type MemberDeviceRelationOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type MemberDeviceRelationOpenApiImportUsingPostBody = {
  file: string;
};

export type MemberDeviceRelationOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type MemberDeviceRelationSearchUsingGetParams = {
  req: MemberDeviceRelationRequestParam;
};

export type MemberDeviceRelationSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageMemberDeviceRelationVo;
};

export type MemberDeviceRelationUsingPostResponses = {
  /**
   * OK
   */
  200: MemberDeviceRelation;
};

export type MemberDeviceRelationUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
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

export type PageableObject = {
  offset?: number;
  sort?: SortObject;
  pageNumber?: number;
  pageSize?: number;
  paged?: boolean;
  unpaged?: boolean;
};

export type PageAlertHistoryVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: AlertHistoryVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageAlertRulesVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: AlertRulesVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageDroneControlLogVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: DroneControlLogVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageDroneRealtimeStatusVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: DroneRealtimeStatusVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageDroneWarningVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: DroneWarningVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageLogBraceletVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: LogBraceletVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageLogMemberPathVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: LogMemberPathVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageLogPayloadVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: LogPayloadVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageMemberDeviceRelationVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: MemberDeviceRelationVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageScoresVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: ScoresVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageScoringStandardsVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: ScoringStandardsVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageStudentTargetAssignmentVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: StudentTargetAssignmentVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageTaskDroneConfigVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: TaskDroneConfigVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageThresholdsVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: ThresholdsVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageTrainingTaskAssignmentVo = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: TrainingTaskAssignmentVo[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PageTrainingTaskVO = {
  totalElements?: number;
  totalPages?: number;
  size?: number;
  content?: TrainingTaskVO[];
  number?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  empty?: boolean;
};

export type PersonnelVitalSigns = {
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
};

export type PersonnelVitalSignsBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type PersonnelVitalSignsBatchUsingPutBody = {
  updateData?: PersonnelVitalSigns;
  condition?: PersonnelVitalSignsRequestParam;
};

export type PersonnelVitalSignsBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type PersonnelVitalSignsListUsingGetParams = {
  req: PersonnelVitalSignsRequestParam;
};

export type PersonnelVitalSignsListUsingGetResponses = {
  /**
   * OK
   */
  200: PersonnelVitalSignsVo[];
};

export type PersonnelVitalSignsOpenApiExportUsingGetParams = {
  condition?: PersonnelVitalSigns;
};

export type PersonnelVitalSignsOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type PersonnelVitalSignsOpenApiImportUsingPostBody = {
  file: string;
};

export type PersonnelVitalSignsOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type PersonnelVitalSignsRecordIdUsingDeleteParams = {
  recordId: string;
};

export type PersonnelVitalSignsRecordIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type PersonnelVitalSignsRecordIdUsingGetParams = {
  recordId: string;
};

export type PersonnelVitalSignsRecordIdUsingGetResponses = {
  /**
   * OK
   */
  200: PersonnelVitalSignsVo;
};

export type PersonnelVitalSignsRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** imei */
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
  motionStatus?: string;
  /** 步数 */
  stepCount?: number;
  /** 消耗卡路里 */
  caloriesBurned?: number;
  /** 数据采集时间 */
  collectionTime?: string;
  /** 异常状态（0-正常 1-心率异常 2-血压异常 3-体温异常 4-综合异常） */
  abnormalStatus?: string;
  /** 预警级别（0-无预警 1-轻微 2-中等 3-严重） */
  warningLevel?: string;
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  createTime?: string;
  /** 手腕温度 */
  wristTemp?: number;
};

export type PersonnelVitalSignsSearchUsingGetParams = {
  req: PersonnelVitalSignsRequestParam;
};

export type PersonnelVitalSignsSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPagePersonnelVitalSignsVo;
};

export type PersonnelVitalSignsUsingPostResponses = {
  /**
   * OK
   */
  200: PersonnelVitalSigns;
};

export type PersonnelVitalSignsUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
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

export type RadiationPayloadBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type RadiationPayloadBatchUsingPutBody = {
  updateData?: RadiationPayload;
  condition?: RadiationPayloadRequestParam;
};

export type RadiationPayloadBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type RadiationPayloadConfigChangeLog = {
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

export type RadiationPayloadConfigChangeLogBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type RadiationPayloadConfigChangeLogBatchUsingPutBody = {
  updateData?: RadiationPayloadConfigChangeLog;
  condition?: RadiationPayloadConfigChangeLogRequestParam;
};

export type RadiationPayloadConfigChangeLogBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type RadiationPayloadConfigChangeLogLogIdUsingDeleteParams = {
  logId: number;
};

export type RadiationPayloadConfigChangeLogLogIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type RadiationPayloadConfigChangeLogLogIdUsingGetParams = {
  logId: number;
};

export type RadiationPayloadConfigChangeLogLogIdUsingGetResponses = {
  /**
   * OK
   */
  200: RadiationPayloadConfigChangeLogVO;
};

export type RadiationPayloadConfigChangeLogOpenApiExportUsingGetParams = {
  condition?: RadiationPayloadConfigChangeLog;
};

export type RadiationPayloadConfigChangeLogOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type RadiationPayloadConfigChangeLogOpenApiImportUsingPostBody = {
  file: string;
};

export type RadiationPayloadConfigChangeLogOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type RadiationPayloadConfigChangeLogUsingPostResponses = {
  /**
   * OK
   */
  200: RadiationPayloadConfigChangeLog;
};

export type RadiationPayloadConfigChangeLogUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
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

export type RadiationPayloadOpenApiExportUsingGetParams = {
  condition?: RadiationPayload;
};

export type RadiationPayloadOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type RadiationPayloadOpenApiImportUsingPostBody = {
  file: string;
};

export type RadiationPayloadOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type RadiationPayloadPayloadIdUsingDeleteParams = {
  payloadId: string;
};

export type RadiationPayloadPayloadIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type RadiationPayloadPayloadIdUsingGetParams = {
  payloadId: string;
};

export type RadiationPayloadPayloadIdUsingGetResponses = {
  /**
   * OK
   */
  200: RadiationPayloadVo;
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

export type RadiationPayloadSearchUsingGetParams = {
  req: RadiationPayloadRequestParam;
};

export type RadiationPayloadSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageRadiationPayloadVo;
};

export type RadiationPayloadUsingPostResponses = {
  /**
   * OK
   */
  200: RadiationPayload;
};

export type RadiationPayloadUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
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

export type Scores = {
  id?: number;
  /** 使用的评分标准ID */
  scoringStandardId?: number;
  /** 关联的阈值ID */
  thresholdId?: number;
  /** 实际测量值 */
  actualValue?: number;
  /** 得分 */
  score?: number;
  /** 打分时间 */
  scoredAt?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 关联的任务ID，外键关联tasks表 */
  taskId?: number;
  /** 评分类型：1-定位分析，2-路径规划 3-目标捕获 */
  scoreType?: number;
  /** 评估对象类型（member, team） */
  assessmentObjectId?: string;
  /** 评估对象名称，便于查询显示 */
  assessmentObjectType?: string;
  /** 得分原因说明 */
  scoreReason?: string;
};

export type ScoresBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type ScoresBatchUsingPutBody = {
  updateData?: Scores;
  condition?: ScoresRequestParam;
};

export type ScoresBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type ScoresIdUsingDeleteParams = {
  id: number;
};

export type ScoresIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type ScoresIdUsingGetParams = {
  id: number;
};

export type ScoresIdUsingGetResponses = {
  /**
   * OK
   */
  200: ScoresVo;
};

export type ScoresOpenApiExportUsingGetParams = {
  condition?: Scores;
};

export type ScoresOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type ScoresOpenApiImportUsingPostBody = {
  file: string;
};

export type ScoresOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type ScoresRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** Id */
  id?: number;
  /** 使用的评分标准ID */
  scoringStandardId?: number;
  /** 关联的阈值ID */
  thresholdId?: number;
  /** 实际测量值 */
  actualValue?: number;
  /** 得分 */
  score?: number;
  /** 打分时间 */
  scoredAt?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 关联的任务ID，外键关联tasks表 */
  taskId?: number;
  /** 评估对象类型（member, team） */
  assessmentObjectId?: number;
  /** 评估对象名称，便于查询显示 */
  assessmentObjectType?: string;
  /** 得分原因说明 */
  scoreReason?: string;
};

export type ScoresSearchUsingGetParams = {
  req: ScoresRequestParam;
};

export type ScoresSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageScoresVo;
};

export type ScoresUsingPostResponses = {
  /**
   * OK
   */
  200: Scores;
};

export type ScoresUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type ScoresVo = {
  /** Id */
  id?: number;
  /** 使用的评分标准ID */
  scoringStandardId?: number;
  /** 关联的阈值ID */
  thresholdId?: number;
  /** 实际测量值 */
  actualValue?: number;
  /** 得分 */
  score?: number;
  /** 打分时间 */
  scoredAt?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 关联的任务ID，外键关联tasks表 */
  taskId?: number;
  /** 评估对象类型（member, team） */
  assessmentObjectId?: number;
  /** 评估对象名称，便于查询显示 */
  assessmentObjectType?: string;
  /** 得分原因说明 */
  scoreReason?: string;
};

export type ScoringStandards = {
  id?: number;
  /** 评分标准名称 */
  standardName?: string;
  /** 关联的阈值ID */
  thresholdId?: number;
  /** 该条件对应的得分 */
  score?: number;
  /** 是否启用 */
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  /** 条件类型：below_min、above_max、in_range、out_of_range */
  conditionType?: string;
  /** 评分标准权重，范围0-1，用于计算加权总分 */
  weight?: number;
  /** 该评分标准的满分值，必须为正整数 */
  maxScore?: number;
  /** 得分说明 */
  scoreDescription?: string;
};

export type ScoringStandardsBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type ScoringStandardsBatchUsingPutBody = {
  updateData?: ScoringStandards;
  condition?: ScoringStandardsRequestParam;
};

export type ScoringStandardsBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type ScoringStandardsIdUsingDeleteParams = {
  id: number;
};

export type ScoringStandardsIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type ScoringStandardsIdUsingGetParams = {
  id: number;
};

export type ScoringStandardsIdUsingGetResponses = {
  /**
   * OK
   */
  200: ScoringStandardsVo;
};

export type ScoringStandardsOpenApiExportUsingGetParams = {
  condition?: ScoringStandards;
};

export type ScoringStandardsOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type ScoringStandardsOpenApiImportUsingPostBody = {
  file: string;
};

export type ScoringStandardsOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type ScoringStandardsSearchUsingGetParams = {
  req: ScoringStandardsRequestParam;
};

export type ScoringStandardsSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageScoringStandardsVo;
};

export type ScoringStandardsUsingPostResponses = {
  /**
   * OK
   */
  200: ScoringStandards;
};

export type ScoringStandardsUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type ScoringStandardsVo = {
  /** Id */
  id?: number;
  /** 评分标准名称 */
  standardName?: string;
  /** 关联的阈值ID */
  thresholdId?: number;
  /** 该条件对应的得分 */
  score?: number;
  /** 是否启用 */
  isActive?: boolean;
  /** Created at */
  createdAt?: string;
  /** Updated at */
  updatedAt?: string;
  /** 条件类型：below_min、above_max、in_range、out_of_range */
  conditionType?: string;
  /** 评分标准权重，范围0-1，用于计算加权总分 */
  weight?: number;
  /** 该评分标准的满分值，必须为正整数 */
  maxScore?: number;
  /** 得分说明 */
  scoreDescription?: string;
};

export type SortObject = {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
};

export type StudentTargetAssignment = {
  /** 主键 ID（雪花算法） */
  id?: number;
  /** 任务 ID */
  taskId?: number;
  /** 学生成员 ID */
  memberId?: number;
  /** 队伍 ID */
  teamId?: number;
  /** 分配的目标 ID（无人机 ID） */
  targetId?: number;
  /** 目标名称 */
  targetName?: string;
  /** 分配时间 */
  assignedAt?: string;
  /** 状态：1-已分配，2-已完成 */
  status?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
};

export type StudentTargetAssignmentBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type StudentTargetAssignmentBatchUsingPutBody = {
  updateData?: StudentTargetAssignment;
  condition?: StudentTargetAssignmentRequestParam;
};

export type StudentTargetAssignmentBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type StudentTargetAssignmentIdUsingDeleteParams = {
  id: number;
};

export type StudentTargetAssignmentIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type StudentTargetAssignmentIdUsingGetParams = {
  id: number;
};

export type StudentTargetAssignmentIdUsingGetResponses = {
  /**
   * OK
   */
  200: StudentTargetAssignmentVo;
};

export type StudentTargetAssignmentOpenApiExportUsingGetParams = {
  condition?: StudentTargetAssignment;
};

export type StudentTargetAssignmentOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type StudentTargetAssignmentOpenApiImportUsingPostBody = {
  file: string;
};

export type StudentTargetAssignmentOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type StudentTargetAssignmentRequestParam = {
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
  /** 分配的目标 ID（无人机 ID） */
  targetId?: number;
  /** 目标名称 */
  targetName?: string;
  /** 分配时间 */
  assignedAt?: string;
  /** 状态：1-已分配，2-已完成 */
  status?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
};

export type StudentTargetAssignmentSearchUsingGetParams = {
  req: StudentTargetAssignmentRequestParam;
};

export type StudentTargetAssignmentSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageStudentTargetAssignmentVo;
};

export type StudentTargetAssignmentUsingPostResponses = {
  /**
   * OK
   */
  200: StudentTargetAssignment;
};

export type StudentTargetAssignmentUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type StudentTargetAssignmentVo = {
  /** 主键 ID（雪花算法） */
  id?: number;
  /** 任务 ID */
  taskId?: number;
  /** 学生成员 ID */
  memberId?: number;
  /** 队伍 ID */
  teamId?: number;
  /** 分配的目标 ID（无人机 ID） */
  targetId?: number;
  /** 目标名称 */
  targetName?: string;
  /** 分配时间 */
  assignedAt?: string;
  /** 状态：1-已分配，2-已完成 */
  status?: string;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
};

export type TaskDroneConfig = {
  /** 配置 ID（雪花算法） */
  configId?: number;
  /** 任务 ID */
  taskId?: number;
  /** 无人机 ID */
  droneId?: string;
  /** 无人机名称 */
  droneName?: string;
  /** 配置类型：1-定位分析阶段 2-路径规划阶段 3-通用配置 */
  configType?: string;
  /** 是否启用：0-禁用 1-启用 */
  isActive?: string;
  /** 排序顺序 */
  sortOrder?: number;
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
};

export type TaskDroneConfigBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type TaskDroneConfigBatchUsingPutBody = {
  updateData?: TaskDroneConfig;
  condition?: TaskDroneConfigRequestParam;
};

export type TaskDroneConfigBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type TaskDroneConfigConfigIdUsingDeleteParams = {
  configId: number;
};

export type TaskDroneConfigConfigIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TaskDroneConfigConfigIdUsingGetParams = {
  configId: number;
};

export type TaskDroneConfigConfigIdUsingGetResponses = {
  /**
   * OK
   */
  200: TaskDroneConfigVo;
};

export type TaskDroneConfigOpenApiExportUsingGetParams = {
  condition?: TaskDroneConfig;
};

export type TaskDroneConfigOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type TaskDroneConfigOpenApiImportUsingPostBody = {
  file: string;
};

export type TaskDroneConfigOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type TaskDroneConfigRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** 配置 ID（雪花算法） */
  configId?: number;
  /** 任务 ID */
  taskId?: number;
  /** 无人机 ID */
  droneId?: string;
  /** 无人机名称 */
  droneName?: string;
  /** 配置类型：1-定位分析阶段 2-路径规划阶段 3-通用配置 */
  configType?: string;
  /** 是否启用：0-禁用 1-启用 */
  isActive?: string;
  /** 排序顺序 */
  sortOrder?: number;
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
};

export type TaskDroneConfigSearchUsingGetParams = {
  req: TaskDroneConfigRequestParam;
};

export type TaskDroneConfigSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageTaskDroneConfigVo;
};

export type TaskDroneConfigUsingPostResponses = {
  /**
   * OK
   */
  200: TaskDroneConfig;
};

export type TaskDroneConfigUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TaskDroneConfigVo = {
  /** 配置 ID（雪花算法） */
  configId?: number;
  /** 任务 ID */
  taskId?: number;
  /** 无人机 ID */
  droneId?: string;
  /** 无人机名称 */
  droneName?: string;
  /** 配置类型：1-定位分析阶段 2-路径规划阶段 3-通用配置 */
  configType?: string;
  /** 是否启用：0-禁用 1-启用 */
  isActive?: string;
  /** 排序顺序 */
  sortOrder?: number;
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
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

export type Thresholds = {
  id?: number;
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
  /** 是否启用 */
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  /** 阈值描述 */
  description?: string;
};

export type ThresholdsBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type ThresholdsBatchUsingPutBody = {
  updateData?: Thresholds;
  condition?: ThresholdsRequestParam;
};

export type ThresholdsBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type ThresholdsIdUsingDeleteParams = {
  id: number;
};

export type ThresholdsIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type ThresholdsIdUsingGetParams = {
  id: number;
};

export type ThresholdsIdUsingGetResponses = {
  /**
   * OK
   */
  200: ThresholdsVo;
};

export type ThresholdsOpenApiExportUsingGetParams = {
  condition?: Thresholds;
};

export type ThresholdsOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type ThresholdsOpenApiImportUsingPostBody = {
  file: string;
};

export type ThresholdsOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type ThresholdsRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** Id */
  id?: number;
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
  /** 是否启用 */
  isActive?: boolean;
  /** Created at */
  createdAt?: string;
  /** Updated at */
  updatedAt?: string;
  /** 阈值描述 */
  description?: string;
};

export type ThresholdsSearchUsingGetParams = {
  req: ThresholdsRequestParam;
};

export type ThresholdsSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageThresholdsVo;
};

export type ThresholdsUsingPostResponses = {
  /**
   * OK
   */
  200: Thresholds;
};

export type ThresholdsUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type ThresholdsVo = {
  /** Id */
  id?: number;
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
  /** 是否启用 */
  isActive?: boolean;
  /** Created at */
  createdAt?: string;
  /** Updated at */
  updatedAt?: string;
  /** 阈值描述 */
  description?: string;
};

export type TrainingComment = {
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

export type TrainingCommentBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type TrainingCommentBatchUsingPutBody = {
  updateData?: TrainingComment;
  condition?: TrainingCommentRequestParam;
};

export type TrainingCommentBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type TrainingCommentCommentIdUsingDeleteParams = {
  commentId: number;
};

export type TrainingCommentCommentIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TrainingCommentCommentIdUsingGetParams = {
  commentId: number;
};

export type TrainingCommentCommentIdUsingGetResponses = {
  /**
   * OK
   */
  200: TrainingCommentVo;
};

export type TrainingCommentOpenApiExportUsingGetParams = {
  condition?: TrainingComment;
};

export type TrainingCommentOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type TrainingCommentOpenApiImportUsingPostBody = {
  file: string;
};

export type TrainingCommentOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type TrainingCommentSearchUsingGetParams = {
  req: TrainingCommentRequestParam;
};

export type TrainingCommentSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageTrainingCommentVo;
};

export type TrainingCommentUsingPostResponses = {
  /**
   * OK
   */
  200: TrainingComment;
};

export type TrainingCommentUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
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

export type TrainingTaskAssignmentAssignmentIdUsingDeleteParams = {
  assignmentId: number;
};

export type TrainingTaskAssignmentAssignmentIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TrainingTaskAssignmentAssignmentIdUsingGetParams = {
  assignmentId: number;
};

export type TrainingTaskAssignmentAssignmentIdUsingGetResponses = {
  /**
   * OK
   */
  200: TrainingTaskAssignmentVo;
};

export type TrainingTaskAssignmentBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type TrainingTaskAssignmentBatchUsingPutBody = {
  updateData?: TrainingTaskAssignment;
  condition?: TrainingTaskAssignmentRequestParam;
};

export type TrainingTaskAssignmentBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type TrainingTaskAssignmentOpenApiExportUsingGetParams = {
  condition?: TrainingTaskAssignment;
};

export type TrainingTaskAssignmentOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type TrainingTaskAssignmentOpenApiImportUsingPostBody = {
  file: string;
};

export type TrainingTaskAssignmentOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type TrainingTaskAssignmentRequestParam = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
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

export type TrainingTaskAssignmentSearchUsingGetParams = {
  req: TrainingTaskAssignmentRequestParam;
};

export type TrainingTaskAssignmentSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageTrainingTaskAssignmentVo;
};

export type TrainingTaskAssignmentUsingPostResponses = {
  /**
   * OK
   */
  200: TrainingTaskAssignment;
};

export type TrainingTaskAssignmentUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TrainingTaskAssignmentVo = {
  /** 任务分配ID */
  assignmentId?: number;
  /** 任务ID */
  taskId?: number;
  /** 无人机ID */
  droneId?: string;
  /** 辐射载荷ID */
  payloadId?: string;
  /** 手环ID */
  braceletId?: string;
  /** 任务角色id */
  taskRoleId?: number;
  /** 平板电脑id */
  tabletId?: string;
  /** 摄像头id */
  cameraId?: string;
  /** 队伍ID */
  teamId?: number;
  /** 队伍名称 */
  teamName?: string;
  /** 队员ID */
  memberId?: number;
  /** 队伍名称 */
  memberName?: string;
};

export type TrainingTaskBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type TrainingTaskBatchUsingPutBody = {
  updateData?: TrainingTask;
  condition?: TrainingTaskRequestParam;
};

export type TrainingTaskBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type TrainingTaskOpenApiExportUsingGetParams = {
  condition?: TrainingTask;
};

export type TrainingTaskOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type TrainingTaskOpenApiImportUsingPostBody = {
  file: string;
};

export type TrainingTaskOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type TrainingTaskSearchUsingGetParams = {
  req: TrainingTaskRequestParam;
};

export type TrainingTaskSearchUsingGetResponses = {
  /**
   * OK
   */
  200: PageTrainingTaskVO;
};

export type TrainingTaskTaskIdUsingDeleteParams = {
  taskId: number;
};

export type TrainingTaskTaskIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TrainingTaskTaskIdUsingGetParams = {
  taskId: number;
};

export type TrainingTaskTaskIdUsingGetResponses = {
  /**
   * OK
   */
  200: TrainingTaskVO;
};

export type TrainingTaskTeamStatus = {
  /** 雪花ID */
  snowflakeId?: number;
  /** 任务ID */
  taskId?: number;
  /** 队伍id */
  teamId?: number;
  /** 目标侦察 */
  targetRecon?: boolean;
  /** 路径规划 */
  pathPlanning?: boolean;
  /** 目标捕获 */
  targetCapture?: boolean;
  /** 目标侦察时间 */
  targetReconTime?: string;
  /** 路径规划时间 */
  pathPlanningTime?: string;
  /** 目标捕获时间 */
  targetCaptureTime?: string;
};

export type TrainingTaskTeamStatusBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type TrainingTaskTeamStatusBatchUsingPutBody = {
  updateData?: TrainingTaskTeamStatus;
  condition?: TrainingTaskTeamStatusRequestParam;
};

export type TrainingTaskTeamStatusBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type TrainingTaskTeamStatusOpenApiExportUsingGetParams = {
  condition?: TrainingTaskTeamStatus;
};

export type TrainingTaskTeamStatusOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type TrainingTaskTeamStatusOpenApiImportUsingPostBody = {
  file: string;
};

export type TrainingTaskTeamStatusOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type TrainingTaskTeamStatusRequestParam = {
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
  /** 目标侦察 */
  targetRecon?: boolean;
  /** 路径规划 */
  pathPlanning?: boolean;
  /** 目标捕获 */
  targetCapture?: boolean;
  /** 目标侦察时间 start range */
  targetReconTimeStart?: string;
  /** 目标侦察时间 end range */
  targetReconTimeEnd?: string;
  /** 路径规划时间 start range */
  pathPlanningTimeStart?: string;
  /** 路径规划时间 end range */
  pathPlanningTimeEnd?: string;
  /** 目标捕获时间 start range */
  targetCaptureTimeStart?: string;
  /** 目标捕获时间 end range */
  targetCaptureTimeEnd?: string;
};

export type TrainingTaskTeamStatusSearchUsingGetParams = {
  req: TrainingTaskTeamStatusRequestParam;
};

export type TrainingTaskTeamStatusSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageTrainingTaskTeamStatusVO;
};

export type TrainingTaskTeamStatusSnowflakeIdUsingDeleteParams = {
  snowflakeId: number;
};

export type TrainingTaskTeamStatusSnowflakeIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TrainingTaskTeamStatusSnowflakeIdUsingGetParams = {
  snowflakeId: number;
};

export type TrainingTaskTeamStatusSnowflakeIdUsingGetResponses = {
  /**
   * OK
   */
  200: TrainingTaskTeamStatusVO;
};

export type TrainingTaskTeamStatusUsingPostResponses = {
  /**
   * OK
   */
  200: TrainingTaskTeamStatus;
};

export type TrainingTaskTeamStatusUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TrainingTaskTeamStatusVO = {
  /** 雪花ID */
  snowflakeId?: number;
  /** 任务ID */
  taskId?: number;
  /** 队伍id */
  teamId?: number;
  /** 目标侦察 */
  targetRecon?: boolean;
  /** 路径规划 */
  pathPlanning?: boolean;
  /** 目标捕获 */
  targetCapture?: boolean;
  /** 目标侦察时间 */
  targetReconTime?: string;
  /** 路径规划时间 */
  pathPlanningTime?: string;
  /** 目标捕获时间 */
  targetCaptureTime?: string;
};

export type TrainingTaskUsingPostResponses = {
  /**
   * OK
   */
  200: TrainingTask;
};

export type TrainingTaskUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TrainingTaskVO = {
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

export type TrainingTeam = {
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

export type TrainingTeamBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type TrainingTeamBatchUsingPutBody = {
  updateData?: TrainingTeam;
  condition?: TrainingTeamRequestParam;
};

export type TrainingTeamBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type TrainingTeamOpenApiExportUsingGetParams = {
  condition?: TrainingTeam;
};

export type TrainingTeamOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type TrainingTeamOpenApiImportUsingPostBody = {
  file: string;
};

export type TrainingTeamOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
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

export type TrainingTeamSearchUsingGetParams = {
  req: TrainingTeamRequestParam;
};

export type TrainingTeamSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageTrainingTeamVo;
};

export type TrainingTeamTeamIdUsingDeleteParams = {
  teamId: number;
};

export type TrainingTeamTeamIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type TrainingTeamTeamIdUsingGetParams = {
  teamId: number;
};

export type TrainingTeamTeamIdUsingGetResponses = {
  /**
   * OK
   */
  200: TrainingTeamVo;
};

export type TrainingTeamUsingPostResponses = {
  /**
   * OK
   */
  200: TrainingTeam;
};

export type TrainingTeamUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
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

export type UmsAdminLoginLog = {
  id?: number;
  adminId?: number;
  createTime?: string;
  ip?: string;
  address?: string;
  /** 浏览器登录类型 */
  userAgent?: string;
};

export type UmsAdminLoginLogBatchUsingDeleteResponses = {
  /**
   * OK
   */
  200: number;
};

export type UmsAdminLoginLogBatchUsingPutBody = {
  updateData?: UmsAdminLoginLog;
  condition?: UmsAdminLoginLogReq;
};

export type UmsAdminLoginLogBatchUsingPutResponses = {
  /**
   * OK
   */
  200: number;
};

export type UmsAdminLoginLogIdUsingDeleteParams = {
  id: number;
};

export type UmsAdminLoginLogIdUsingDeleteResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type UmsAdminLoginLogIdUsingGetParams = {
  id: number;
};

export type UmsAdminLoginLogIdUsingGetResponses = {
  /**
   * OK
   */
  200: UmsAdminLoginLogVO;
};

export type UmsAdminLoginLogOpenApiExportUsingGetParams = {
  condition?: UmsAdminLoginLog;
};

export type UmsAdminLoginLogOpenApiExportUsingGetResponses = {
  /**
   * OK
   */
  200: unknown;
};

export type UmsAdminLoginLogOpenApiImportUsingPostBody = {
  file: string;
};

export type UmsAdminLoginLogOpenApiImportUsingPostResponses = {
  /**
   * OK
   */
  200: string;
};

export type UmsAdminLoginLogReq = {
  /** Page number (starting from 1) */
  pageNum?: number;
  /** Page size */
  pageSize?: number;
  /** order field and direction (e.g., 'id ASC, username DESC') */
  orderByClause?: string;
  /** Id */
  id?: number;
  /** Admin id */
  adminId?: number;
  /** Create time start range */
  createTimeStart?: string;
  /** Create time end range */
  createTimeEnd?: string;
  /** Ip */
  ip?: string;
  /** Address */
  address?: string;
  /** 浏览器登录类型 */
  userAgent?: string;
};

export type UmsAdminLoginLogSearchUsingGetParams = {
  req: UmsAdminLoginLogReq;
};

export type UmsAdminLoginLogSearchUsingGetResponses = {
  /**
   * OK
   */
  200: CommonPageUmsAdminLoginLogVO;
};

export type UmsAdminLoginLogUsingPostResponses = {
  /**
   * OK
   */
  200: UmsAdminLoginLog;
};

export type UmsAdminLoginLogUsingPutResponses = {
  /**
   * OK
   */
  200: boolean;
};

export type UmsAdminLoginLogVO = {
  /** Id */
  id?: number;
  /** Admin id */
  adminId?: number;
  /** 用户名 */
  username?: string;
  /** Create time */
  createTime?: string;
  /** Ip */
  ip?: string;
  /** Address */
  address?: string;
  /** 浏览器登录类型 */
  userAgent?: string;
};
