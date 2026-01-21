import { ProgramNode } from '@universal-robots/contribution-api';

export interface MyPgNode extends ProgramNode {
    type: string;
    parameters: {
        waitTime: number;
        header: string;
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
