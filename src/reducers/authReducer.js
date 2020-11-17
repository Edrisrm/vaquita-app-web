import { types } from "../types/types";

const initialState = {
  checking: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case types.GET_GOOGLE_IDENTITY:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case types.CHECK_LOGIN_FINISH:
      return {
        ...state,
        checking: false,
      };

    case types.LOGOUT:
      return {
        checking: false,
      };

    default:
      return state;
  }
};
