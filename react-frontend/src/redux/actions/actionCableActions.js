export const connectActionCable = () => ({ type: 'CONNECT_ACTIONCABLE' });

export const disconnectActionCable = () => ({ type: 'DISCONNECT_ACTIONCABLE' });

export const subscribeToChannel = (channelName) => ({ type: 'SUBSCRIBE_TO_CHANNEL', payload: channelName });