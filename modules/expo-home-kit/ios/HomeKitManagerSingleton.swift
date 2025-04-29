import Foundation
import HomeKit

// A pure singleton with exactly one HMHomeManager instance
class HomeKitManagerSingleton: NSObject {
  // Singleton instance
  private static let shared = HomeKitManagerSingleton()
  
  // The single HomeKit manager - created exactly once
  private let homeManager: HMHomeManager
  
  // Private initializer creates the manager once
  private override init() {
    // Create the manager exactly once during initialization
    homeManager = HMHomeManager()
    super.init()
  }
  
  // Get shared instance
  static func getInstance() -> HomeKitManagerSingleton {
    return shared
  }
  
  // Get the HomeKit manager - never creates a new instance
  func getHomeManager() -> HMHomeManager {
    return homeManager
  }
  
  // Get the current authorization status
  func getAuthorizationStatus() -> HMHomeManagerAuthorizationStatus {
    return homeManager.authorizationStatus
  }
}
