/* eslint-disable */
// @ts-ignore
import {
  httpClient as request,
  CustomRequestOptions,
} from '@/utils/httpClient';

import * as API from './types';

/** 路径相似度比较 POST /external/compare */
export function externalCompareUsingPost({
  body,
  options,
}: {
  body: API.PathSimilarityReq;
  options?: CustomRequestOptions;
}) {
  return request<API.PathSimilarityResultDTO>('/external/compare', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 路径规划 POST /external/pathOverlap */
export function externalPathOverlapUsingPost({
  body,
  options,
}: {
  body: API.FeatureCollection;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/external/pathOverlap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 定位分析 POST /external/positioningAnalysis */
export function externalPositioningAnalysisUsingPost({
  body,
  options,
}: {
  body: API.TargetDetectionMessageDTO;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/external/positioningAnalysis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 目标捕获 POST /external/targetCapture */
export function externalTargetCaptureUsingPost({
  body,
  options,
}: {
  body: API.BraceletDataDTO;
  options?: CustomRequestOptions;
}) {
  return request<boolean>('/external/targetCapture', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
