import { createPermissionHook, PermissionResponse } from "expo-modules-core";
import ExpoHomeKitModule from "./src/ExpoHomeKitModule";
import { HomeKitAccessory } from "./src/ExpoHomeKit.types";

export async function getHomeKitPermissionsAsync(): Promise<PermissionResponse> {
  return await ExpoHomeKitModule.getPermissionsAsync();
}

export async function requestHomeKitPermissionsAsync(): Promise<PermissionResponse> {
  return await ExpoHomeKitModule.requestPermissionsAsync();
}

export const useHomeKitPermissions = createPermissionHook({
  getMethod: getHomeKitPermissionsAsync,
  requestMethod: requestHomeKitPermissionsAsync
});

export async function getAccessoriesAsync(): Promise<HomeKitAccessory[]> {
  return await ExpoHomeKitModule.getAccessoriesAsync();
}
