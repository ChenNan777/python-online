/* eslint-disable */
// @ts-ignore
import * as API from './types';

export function displayWorkTypeEnum(field: API.WorkTypeEnum) {
  return { 4: '定位分析', 5: '路径规划' }[field];
}
