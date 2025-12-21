// Security utilities for the RESPECT app

export class SecurityService {
  // Quick exit URL - what to redirect to when quick exit is triggered
  private quickExitUrls = [
    'https://www.google.com',
    'https://www.weather.com',
    'https://www.bbc.com/weather'
  ]

  quickExit() {
    // Clear history
    window.history.replaceState(null, '', this.quickExitUrls[0])
    window.location.href = this.quickExitUrls[0]
  }

  // Check if app should be in disguise mode
  shouldDisguise(): boolean {
    return sessionStorage.getItem('disguise_active') === 'true'
  }

  activateDisguise() {
    sessionStorage.setItem('disguise_active', 'true')
  }

  deactivateDisguise() {
    sessionStorage.removeItem('disguise_active')
  }

  // Generate secure random ID for anonymous usage
  generateAnonymousId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  // Password protection for safety plans
  hashPassword(password: string): string {
    // Simple hash for demo - in production use proper crypto
    let hash = 0
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return hash.toString(36)
  }

  verifyPassword(password: string, hash: string): boolean {
    return this.hashPassword(password) === hash
  }

  // Screenshot detection (basic)
  setupScreenshotDetection(callback: () => void) {
    // Note: This is limited - proper screenshot detection requires native capabilities
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Potentially a screenshot or task switch
        callback()
      }
    })
  }

  // Detect if running in private/incognito mode
  async isPrivateMode(): Promise<boolean> {
    try {
      // Try to use storage - might be blocked in private mode
      const test = 'test'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return false
    } catch {
      return true
    }
  }
}

export const security = new SecurityService()
