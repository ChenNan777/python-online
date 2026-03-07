import type { GenerateServiceProps } from 'openapi-ts-request';

const common: Partial<GenerateServiceProps> = {
  requestLibPath: `import {httpClient as request, CustomRequestOptions} from '@/utils/httpClient';`,
  requestOptionsType: 'CustomRequestOptions',
  isGenReactQuery: false,
  isGenJavaScript: false,
  isSupportParseEnumDesc: true,
  dataFields: ['data'],
};

export default [
  {
    ...common,
    schemaPath: 'http://192.168.0.216:28888/v3/api-docs/admin',
    serversPath: './src/services/admin',
  },
  {
    ...common,
    schemaPath: 'http://192.168.0.216:28888/v3/api-docs/template',
    serversPath: './src/services/template',
  },
] as GenerateServiceProps[];
