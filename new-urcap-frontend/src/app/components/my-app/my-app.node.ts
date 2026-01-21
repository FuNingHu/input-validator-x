import { ApplicationNode } from '@universal-robots/contribution-api';

export interface MyAppNode extends ApplicationNode {
  type: string;
  version: string;
}
