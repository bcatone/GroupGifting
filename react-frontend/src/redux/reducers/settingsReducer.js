const initialState = {};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SETTINGS':
        return {
          ...state,
          ...action.payload
        };
      case 'UPDATE_SETTING':
        const { name, value } = action.payload;
        return {
          ...state,
          [name]: value,
        };
      case 'CLEAR_SETTINGS':
        return {
          ...initialState
        }
      default:
        return state;
    }
  };

  export default settingsReducer;