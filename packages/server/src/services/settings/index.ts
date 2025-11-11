import { StatusCodes } from 'http-status-codes'
import { IsNull } from 'typeorm'
import { Platform, SettingValueType } from '../../Interface'
import { getRunningExpressApp } from '../../utils/getRunningExpressApp'
import { Setting } from '../../database/entities/Setting'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { getErrorMessage } from '../../errors/utils'

const RESERVED_KEYS = new Set(['PLATFORM_TYPE'])

const parseSettingValue = (value: string | null, valueType: SettingValueType) => {
    if (value === null || value === undefined) return null
    switch (valueType) {
        case 'boolean':
            return value === 'true'
        case 'number':
            if (value === '') return 0
            const parsedNumber = Number(value)
            if (Number.isNaN(parsedNumber)) {
                throw new InternalFlowiseError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'Error: settingsService.parseSettingValue - invalid stored number'
                )
            }
            return parsedNumber
        case 'json':
            try {
                return JSON.parse(value)
            } catch (error) {
                throw new InternalFlowiseError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    `Error: settingsService.parseSettingValue - ${getErrorMessage(error)}`
                )
            }
        default:
            return value
    }
}

const serialiseSettingValue = (value: any): { value: string | null; valueType: SettingValueType } => {
    if (value === null) {
        return { value: null, valueType: 'string' }
    }

    const valueType = typeof value

    switch (valueType) {
        case 'boolean':
            return { value: value ? 'true' : 'false', valueType: 'boolean' }
        case 'number':
            if (!Number.isFinite(value)) {
                throw new InternalFlowiseError(
                    StatusCodes.BAD_REQUEST,
                    'Error: settingsService.serialiseSettingValue - invalid number value'
                )
            }
            return { value: value.toString(), valueType: 'number' }
        case 'object':
            try {
                return { value: JSON.stringify(value), valueType: 'json' }
            } catch (error) {
                throw new InternalFlowiseError(
                    StatusCodes.BAD_REQUEST,
                    `Error: settingsService.serialiseSettingValue - ${getErrorMessage(error)}`
                )
            }
        case 'string':
        default:
            return { value: String(value), valueType: 'string' }
    }
}

const resolvePlatformType = (platformType: Platform, isLicenseValid: () => boolean) => {
    switch (platformType) {
        case Platform.ENTERPRISE:
            if (!isLicenseValid()) {
                return null
            }
            return Platform.ENTERPRISE
        case Platform.CLOUD:
            return Platform.CLOUD
        default:
            return Platform.OPEN_SOURCE
    }
}

const getSettings = async (workspaceId?: string) => {
    const appServer = getRunningExpressApp()
    try {
        const platformType = resolvePlatformType(
            appServer.identityManager.getPlatformType(),
            () => appServer.identityManager.isLicenseValid()
        )

        if (!platformType) {
            return {}
        }

        const repository = appServer.AppDataSource.getRepository(Setting)

        const globalSettings = await repository.find({ where: { workspaceId: IsNull() } })
        const workspaceSettings = workspaceId ? await repository.find({ where: { workspaceId } }) : []

        const aggregatedSettings: Record<string, any> = {}

        for (const setting of globalSettings) {
            aggregatedSettings[setting.key] = parseSettingValue(setting.value, setting.valueType)
        }

        for (const setting of workspaceSettings) {
            aggregatedSettings[setting.key] = parseSettingValue(setting.value, setting.valueType)
        }

        return {
            PLATFORM_TYPE: platformType,
            ...aggregatedSettings
        }
    } catch (error) {
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: settingsService.getSettings - ${getErrorMessage(error)}`
        )
    }
}

const updateSettings = async (payload: Record<string, any>, workspaceId?: string) => {
    if (!payload || typeof payload !== 'object') {
        throw new InternalFlowiseError(StatusCodes.BAD_REQUEST, 'Error: settingsService.updateSettings - invalid payload')
    }

    const appServer = getRunningExpressApp()
    const repository = appServer.AppDataSource.getRepository(Setting)

    try {
        for (const [key, rawValue] of Object.entries(payload)) {
            if (RESERVED_KEYS.has(key)) continue
            if (typeof rawValue === 'undefined') continue

            const whereCondition = workspaceId ? { key, workspaceId } : { key, workspaceId: IsNull() }
            const existingSetting = await repository.findOne({ where: whereCondition })

            if (rawValue === null) {
                if (existingSetting) {
                    await repository.remove(existingSetting)
                }
                continue
            }

            const { value, valueType } = serialiseSettingValue(rawValue)

            if (existingSetting) {
                existingSetting.value = value
                existingSetting.valueType = valueType
                await repository.save(existingSetting)
            } else {
                const newSetting = repository.create({
                    key,
                    value,
                    valueType,
                    workspaceId: workspaceId ?? null
                })
                await repository.save(newSetting)
            }
        }

        return await getSettings(workspaceId)
    } catch (error) {
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: settingsService.updateSettings - ${getErrorMessage(error)}`
        )
    }
}

export default {
    getSettings,
    updateSettings
}
