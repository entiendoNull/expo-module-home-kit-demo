import Foundation
import HomeKit

class ExpoHomeKitPermissionRequester: NSObject, HMHomeManagerDelegate {
  // Callback for permission request
  private var callback: ((String) -> Void)?
  
  // Request permission - will trigger the system prompt
  func requestPermissionAsync(callback: @escaping (String) -> Void) {
    self.callback = callback
    
    // Get the manager from the singleton and set delegate
    let manager = HomeKitManagerSingleton.getInstance().getHomeManager()
    manager.delegate = self
  }
  
  // Called when permission is granted or denied
  func homeManagerDidUpdateHomes(_ manager: HMHomeManager) {
    // Map the HomeKit authorization status to Expo's permission format
    let status = ExpoHomeKitPermissionRequester.mapAuthorizationStatus(manager.authorizationStatus)
    
    UserDefaults.standard.set(status, forKey: "ExpoHomekitStatus")
    
    // Execute the callback with the determined status
    callback?(status)
    
    // Clear the callback to prevent multiple calls
    callback = nil
  }
  
  // Check permission status without triggering a prompt
  static func getCachedPermissionStatus() -> String {
    // First check if permission was ever requested
    let wasPromptShown = UserDefaults.standard.string(forKey: "ExpoHomekitStatus") != nil
    
    if !wasPromptShown {
      // If never requested, report 'undetermined'
      return "undetermined"
    }
    
    // Permission was requested before, so checking status won't trigger prompt
    let status = HomeKitManagerSingleton.getInstance().getAuthorizationStatus()
    let currentStatus = mapAuthorizationStatus(status)
    
    // Update cached status if it changed
    UserDefaults.standard.set(currentStatus, forKey: "ExpoHomekitStatus")
    
    return currentStatus
  }
  
  // Map HomeKit status to Expo permission format
  private static func mapAuthorizationStatus(_ status: HMHomeManagerAuthorizationStatus) -> String {
    switch true {
    case status.contains(.authorized):
      return "granted"
    case status.contains(.restricted):
      fallthrough
    case status.contains(.determined):
      return "denied"
    default:
      return "undetermined"
    }
  }
}
