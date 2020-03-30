declare module "react-navigation-backhandler" {
  import { Component } from "react";

  export interface AndroidBackHandlerProperties {
    onBackPress: () => boolean;
  }

  export class AndroidBackHandler extends Component<
    AndroidBackHandlerProperties
  > {}

  export function useAndroidBackHandler(onBackPress: () => boolean);
}
