import localforage from 'localforage'

// Privacy-first local storage utility
// No cloud sync - all data stays on device

const storage = localforage.createInstance({
  name: 'RESPECTApp',
  storeName: 'user_data',
  description: 'Privacy-first local storage for RESPECT Learning App'
})

export interface UserProgress {
  respectCheck: {
    completed: string[]
    currentScenario: number
  }
  flagQuiz: {
    score: number
    completed: boolean
    answers: Record<string, string>
  }
  consentScenarios: {
    completed: string[]
    choices: Record<string, any>
  }
  controlMapper: {
    identified: string[]
  }
  safetyPlan: {
    created: boolean
    exitPlan: any
  }
}

class StorageService {
  async getUserProgress(): Promise<UserProgress | null> {
    return await storage.getItem<UserProgress>('progress')
  }

  async setUserProgress(progress: Partial<UserProgress>): Promise<void> {
    const existing = await this.getUserProgress() || {} as UserProgress
    await storage.setItem('progress', { ...existing, ...progress })
  }

  async clearAllData(): Promise<void> {
    await storage.clear()
  }

  async getDisguiseMode(): Promise<string> {
    return await storage.getItem<string>('disguiseMode') || 'calculator'
  }

  async setDisguiseMode(mode: string): Promise<void> {
    await storage.setItem('disguiseMode', mode)
  }

  async getSafetyPlan(): Promise<any> {
    return await storage.getItem('safetyPlan')
  }

  async setSafetyPlan(plan: any): Promise<void> {
    await storage.setItem('safetyPlan', plan)
  }

  // Quick delete for emergency situations
  async emergencyWipe(): Promise<void> {
    await this.clearAllData()
    console.log('All data wiped for safety')
  }
}

export const storageService = new StorageService()
