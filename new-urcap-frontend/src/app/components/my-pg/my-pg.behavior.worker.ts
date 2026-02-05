/// <reference lib="webworker" />
import {
    AdvancedTranslatedProgramLabel,
    FunctionService,
    InsertionContext,
    OptionalPromise,
    ProgramBehaviorAPI,
    ProgramBehaviors,
    ProgramNode,
    registerProgramBehavior,
    ScriptBuilder,
    ValidationContext,
    ValidationResponse,
    VariableDeclaration
} from '@universal-robots/contribution-api';
import { MyPgNode } from './my-pg.node';
import { async } from 'rxjs';



// programNodeLabel is required
const createProgramNodeLabel = (node: MyPgNode): AdvancedTranslatedProgramLabel => {
    return [
        {
            type: 'primary',
            translationKey: 'program-node-labels.my-pg.nodeTitle',
        },
        {
            type: 'secondary',
            translationKey: 'program-node-labels.my-pg.subTitle',
            interpolateParams: { dynamicValue: 'some dynamic value' },
        }
    ];
};

// factory is required
const createProgramNode = async (): Promise<MyPgNode> => {
    // 直接创建 VariableDeclaration 对象
    const counterName = createVariable('myVar');

    return {
        type: 'funh-new-urcap-my-pg',
        version: '1.0.0',
        lockChildren: false,
        allowsChildren: false,
        parameters: {
            waitTime: 2.5,
            header: 'Header',
            variable: await counterName,
        },
    };
};


async function createVariable(suggestedName: string): Promise<VariableDeclaration>{
    const variableDeclaration = new ProgramBehaviorAPI(self).variableService.createVariable(suggestedName, 'boolean');
    return variableDeclaration;
};

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: MyPgNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: MyPgNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    builder.globalVariable(node.parameters.variable.name, 'False');
    return builder;
};

// generateCodePreamble is optional
const generatePreambleScriptCode = (node: MyPgNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// validator is optional
const validate = (node: MyPgNode, validationContext: ValidationContext): OptionalPromise<ValidationResponse> => ({
    isValid: true
});

// allowsChild is optional
const allowChildInsert = (node: ProgramNode, childType: string): OptionalPromise<boolean> => true;

// allowedInContext is optional
const allowedInsert = (insertionContext: InsertionContext): OptionalPromise<boolean> => true;

// upgradeNode is optional
const nodeUpgrade = (loadedNode: ProgramNode): MyPgNode => loadedNode as MyPgNode;

const behaviors: ProgramBehaviors<MyPgNode> = {
    programNodeLabel: createProgramNodeLabel,
    factory: createProgramNode,
    generateCodeBeforeChildren: generateScriptCodeBefore,
    generateCodeAfterChildren: generateScriptCodeAfter,
    generateCodePreamble: generatePreambleScriptCode,
    validator: validate,
    allowsChild: allowChildInsert,
    allowedInContext: allowedInsert,
    upgradeNode: nodeUpgrade
};

registerProgramBehavior(behaviors);
