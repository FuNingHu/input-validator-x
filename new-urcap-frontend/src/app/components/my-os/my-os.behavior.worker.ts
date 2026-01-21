/// <reference lib="webworker" />
import {
  OperatorScreenBehaviors,
  registerOperatorScreenBehavior
} from '@universal-robots/contribution-api';

const behaviors: OperatorScreenBehaviors = {
  factory: () => {
    return {
      type: "funh-new-urcap-my-os",
      version: "1.0.0",
    };
  },
};

registerOperatorScreenBehavior(behaviors);
