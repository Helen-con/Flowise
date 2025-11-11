import { Request, Response, NextFunction } from 'express'
import settingsService from '../../services/settings'

const getSettingsList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workspaceId = typeof req.query.workspaceId === 'string' ? req.query.workspaceId : undefined
        const apiResponse = await settingsService.getSettings(workspaceId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const updateSettings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workspaceId = typeof req.query.workspaceId === 'string' ? req.query.workspaceId : undefined
        const apiResponse = await settingsService.updateSettings(req.body ?? {}, workspaceId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    getSettingsList,
    updateSettings
}
