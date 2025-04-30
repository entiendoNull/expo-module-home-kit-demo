import ExpoModulesCore

public class ExpoHomeKitModule: Module {
  private var permissionPromise: Promise?
  private var permissionManager: ExpoHomeKitPermissionRequester?
  private var deviceManager: HomeKitDeviceManager?
  
  public func definition() -> ModuleDefinition {
    Name("ExpoHomeKit")
    
    // Gets current HomeKit permission status without triggering a system prompt.
    AsyncFunction("getPermissionsAsync") { (promise: Promise) in
      let status = ExpoHomeKitPermissionRequester.getCachedPermissionStatus()
      promise.resolve(["status": status, "expires": "never", "granted": status == "granted", "canAskAgain": false])
    }
    
    // HomeKit permission from the user.
    AsyncFunction("requestPermissionsAsync") { (promise: Promise) in
      self.permissionPromise = promise
      
      // Create a new permission manager and request permission
      self.permissionManager = ExpoHomeKitPermissionRequester()
      self.permissionManager?.requestPermissionAsync { status in
        // Once permission status is determined, resolve the promise
        promise.resolve(["status": status])
        
        // Clear the stored promise to avoid keeping a stale reference
        self.permissionPromise = nil
      }
    }
    
    // Get list of HomeKit accessories
    AsyncFunction("getAccessoriesAsync") { (promise: Promise) in
      
      self.deviceManager = HomeKitDeviceManager()
      self.deviceManager?.fetchAccessoriesAsync { accessories, error in
        if let error = error {
          promise.reject("PERMISSIONS", error)
        } else {
          promise.resolve(accessories)
        }
      }
    }
  }
}
