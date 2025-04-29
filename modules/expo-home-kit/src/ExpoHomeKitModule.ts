import { NativeModule, requireNativeModule } from "expo";
import { PermissionResponse } from "expo-modules-core";
import { HomeKitAccessory } from "./ExpoHomeKit.types";

declare class ExpoHomeKitModule extends NativeModule {
  requestPermissionsAsync(): Promise<PermissionResponse>;
  getPermissionsAsync(): Promise<PermissionResponse>;
  getAccessoriesAsync(): Promise<HomeKitAccessory[]>;
}

export default requireNativeModule<ExpoHomeKitModule>("ExpoHomeKit");
