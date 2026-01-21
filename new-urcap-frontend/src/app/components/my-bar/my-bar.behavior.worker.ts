import {
  registerSidebarBehavior,
  SidebarItemBehaviors,
} from "@universal-robots/contribution-api";

const behaviors: SidebarItemBehaviors = {
  factory: () => {
    return {
      type: "funh-new-urcap-my-bar",
      version: "1.0.0",
    };
  },
};

registerSidebarBehavior(behaviors);
