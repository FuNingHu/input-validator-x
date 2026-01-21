/// <reference lib="webworker" />
import {
    AdvancedTranslatedProgramLabel,
    InsertionContext,
    OptionalPromise,
    ProgramBehaviors,
    ProgramNode,
    registerProgramBehavior,
    ScriptBuilder,
    ValidationContext,
    ValidationResponse
} from '@universal-robots/contribution-api';
import { MyPgNode } from './my-pg.node';

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
        },
    ];
};

// factory is required
const createProgramNode = (): OptionalPromise<MyPgNode> => ({
    type: 'funh-new-urcap-my-pg',
    version: '1.0.0',
    lockChildren: false,
    allowsChildren: false,
    parameters: {
        waitTime: 2.5,
        header: 'Header',
    },
});

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore = (node: MyPgNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: MyPgNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

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
const nodeUpgrade = (loadedNode: ProgramNode): ProgramNode => loadedNode;

const behaviors: ProgramBehaviors = {
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
