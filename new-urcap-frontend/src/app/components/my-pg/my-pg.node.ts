import { ProgramNode, VariableDeclaration } from '@universal-robots/contribution-api';

export interface MyPgNode extends ProgramNode {
    type: string;
    parameters: {
        waitTime: number;
        header: string;
        variable: VariableDeclaration;
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
