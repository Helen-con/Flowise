// Privacy-first analytics
// No personal data collection, no tracking, only anonymous usage stats stored locally

interface AnalyticsEvent {
  event: string
  timestamp: number
  module?: string
  metadata?: Record<string, any>
}

class AnalyticsService {
  private events: AnalyticsEvent[] = []
  private readonly MAX_EVENTS = 100 // Keep only last 100 events
  private readonly STORAGE_KEY = 'analytics_events'

  constructor() {
    this.loadEvents()
  }

  private loadEvents() {
    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (stored) {
      try {
        this.events = JSON.parse(stored)
      } catch (e) {
        this.events = []
      }
    }
  }

  private saveEvents() {
    // Keep only the last MAX_EVENTS
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(-this.MAX_EVENTS)
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.events))
  }

  track(event: string, module?: string, metadata?: Record<string, any>) {
    // No personal data - only anonymous event tracking
    this.events.push({
      event,
      timestamp: Date.now(),
      module,
      metadata
    })
    this.saveEvents()
  }

  getStats() {
    return {
      totalEvents: this.events.length,
      moduleUsage: this.getModuleUsage(),
      lastActivity: this.events.length > 0 ? this.events[this.events.length - 1].timestamp : null
    }
  }

  private getModuleUsage() {
    const usage: Record<string, number> = {}
    this.events.forEach(event => {
      if (event.module) {
        usage[event.module] = (usage[event.module] || 0) + 1
      }
    })
    return usage
  }

  clearAnalytics() {
    this.events = []
    localStorage.removeItem(this.STORAGE_KEY)
  }
}

export const analytics = new AnalyticsService()
