import type { ChallengeType } from './challenge';

export const ROOT_PATH = '/';
export const LOGIN_PATH = '/login';
export const DASHBOARD_PATH = '/dashboard';
export const PRACTICE_PATH = '/practice';
export const DEBUGGER_PATH = '/debugger';
export const PRACTICE_CHALLENGE_PATH = '/practice/:type';
export const CHALLENGE_PATH = '/challenge/:type';
export const PRACTICE_CHALLENGE_PREFIX = '/practice/';

export type ChallengeTypePath = ChallengeType;

export function buildChallengePath(type: ChallengeTypePath): string {
  return `/challenge/${type}`;
}

export function buildPracticeChallengePath(type: ChallengeTypePath): string {
  return `/practice/${type}`;
}
