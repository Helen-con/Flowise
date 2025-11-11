import client from './client'

const getSettings = (workspaceId) =>
    client.get('/settings', {
        params: workspaceId ? { workspaceId } : undefined
    })

const updateSettings = (payload, workspaceId) =>
    client.put('/settings', payload, {
        params: workspaceId ? { workspaceId } : undefined
    })

export default {
    getSettings,
    updateSettings
}
