const initialState = {
    connected: false,
    connection: null,
    channels: [],
  };
  
  const actionCableReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CONNECT_ACTIONCABLE':
        return;
        // Connect to ActionCable server and update state
      case 'DISCONNECT_ACTIONCABLE':
        return;
        // Disconnect from ActionCable server and update state
      case 'SUBSCRIBE_TO_CHANNEL':
        return;
        // Subscribe to a channel and update state
      default:
        return state;
    }
  };
  
  export default actionCableReducer;