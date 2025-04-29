import Foundation
import HomeKit

// A lightweight manager to access HomeKit accessories
class HomeKitDeviceManager: NSObject, HMHomeManagerDelegate {
  // The HomeKit manager, responsible for discovering homes and accessories.
  public var manager: HMHomeManager?
  
  // Callback to return the list of accessories after HomeKit has finished loading.
  private var callback: (([Dictionary<String, Any>]?, String?) -> Void)?
  
  // Fetch accessories, checking permissions first
  func fetchAccessoriesAsync(callback: @escaping ([Dictionary<String, Any>]?, String?) -> Void) {
    self.callback = callback
    
    // Return error if no permissions
    if ExpoHomeKitPermissionRequester.getCachedPermissionStatus() != "granted" {
      callback(nil, "HomeKit permissions not granted")
      return
    }
    
    // Get manager from singleton
    self.manager = HomeKitManagerSingleton.getInstance().getHomeManager()
    self.manager?.delegate = self
    
    // If the manager already has homes loaded, process them immediately
    if let manager = self.manager, manager.primaryHome != nil {
      homeManagerDidUpdateHomes(manager)
    }
  }
  
  // Process HomeKit data when available
  func homeManagerDidUpdateHomes(_ manager: HMHomeManager) {
    guard let primaryHome = manager.primaryHome else {
      callback?([], nil)
      return
    }
    
    let accessories = primaryHome.accessories.map { accessory in
      return [
        "name": accessory.name,
        "isReachable": accessory.isReachable,
        "uniqueIdentifier": accessory.uniqueIdentifier.uuidString,
      ]
    }
    
    callback?(accessories, nil)
  }
}
