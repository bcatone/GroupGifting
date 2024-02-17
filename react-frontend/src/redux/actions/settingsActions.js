export const setSettings = (settings) => ({
    type: 'SET_SETTINGS',
    payload: settings,
});

export const updateSetting = (name, value) => ({
    type: 'UPDATE_SETTING',
    payload: { name, value },
});

export const clearSettings = () => ({
    type: 'CLEAR_SETTINGS'
});