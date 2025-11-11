import platformsettingsApi from '@/api/platformsettings'
import PropTypes from 'prop-types'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ConfigContext = createContext()

export const ConfigProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [isEnterpriseLicensed, setEnterpriseLicensed] = useState(false)
    const [isCloud, setCloudLicensed] = useState(false)
    const [isOpenSource, setOpenSource] = useState(false)

    const normaliseSettings = useCallback((payload = {}) => {
        return {
            ...payload,
            FEATURE_FLAGS: payload.FEATURE_FLAGS ?? {},
            BRANDING: payload.BRANDING ?? {},
            LIMITS: payload.LIMITS ?? {}
        }
    }, [])

    const [config, setConfig] = useState(() => normaliseSettings({}))

    const updatePlatformFlags = useCallback((platformType) => {
        if (platformType === 'enterprise') {
            setEnterpriseLicensed(true)
            setCloudLicensed(false)
            setOpenSource(false)
        } else if (platformType === 'cloud') {
            setCloudLicensed(true)
            setEnterpriseLicensed(false)
            setOpenSource(false)
        } else if (platformType === 'open source') {
            setOpenSource(true)
            setEnterpriseLicensed(false)
            setCloudLicensed(false)
        } else {
            setEnterpriseLicensed(false)
            setCloudLicensed(false)
            setOpenSource(false)
        }
    }, [])

    useEffect(() => {
        const userSettings = platformsettingsApi.getSettings()
        Promise.all([userSettings])
            .then(([currentSettingsData]) => {
                const finalData = normaliseSettings(currentSettingsData.data)
                setConfig(finalData)
                updatePlatformFlags(finalData.PLATFORM_TYPE)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                setLoading(false)
            })
    }, [normaliseSettings, updatePlatformFlags])

    const saveSettings = useCallback(
        async (payload, workspaceId) => {
            const response = await platformsettingsApi.updateSettings(payload, workspaceId)
            const finalData = normaliseSettings(response.data)
            setConfig(finalData)
            updatePlatformFlags(finalData.PLATFORM_TYPE)
            return finalData
        },
        [normaliseSettings, updatePlatformFlags]
    )

    return (
        <ConfigContext.Provider value={{ config, loading, isEnterpriseLicensed, isCloud, isOpenSource, saveSettings }}>
            {children}
        </ConfigContext.Provider>
    )
}

export const useConfig = () => useContext(ConfigContext)

ConfigProvider.propTypes = {
    children: PropTypes.any
}
