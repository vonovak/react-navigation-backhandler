declare module "react-navigation-backhandler" {
  import { FC, PropsWithChildren } from "react";

  export interface AndroidBackHandlerProperties {
    onBackPress: () => boolean;
  }

  export const AndroidBackHandler: FC<PropsWithChildren<AndroidBackHandlerProperties>>;

  export function useAndroidBackHandler(onBackPress: () => boolean);
}
