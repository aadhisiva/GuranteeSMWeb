import { CLEAR_TIMEOUT_ID, LOGGED_IN, LOGGED_OUT, OTP_VERIFY, SET_TIMEOUT_ID } from "../../utilities/constants";

const initialState = {
    isLoggedIn: false,
    isError: false,
    errorMessage: "",
    timeoutId : null,
    Otp : null,
    Mobile: "",
    Role: "",
    loginCode: "",
    loginRole: ""
};

export const userReducers = (state = initialState, action: any) => {
    const { payload } = action;
    switch (action.type) {
        case SET_TIMEOUT_ID:
            return { ...state, timeoutId: payload };
        case LOGGED_IN:
            return { ...state, Otp: payload.Otp, Role: payload.Role, Mobile: payload.Mobile, loginCode: payload?.loginCode, loginRole: payload?.loginRole };
        case LOGGED_OUT:
            return { ...state, isLoggedIn: false, Otp: null, Role: "", Mobile: "" };
        case OTP_VERIFY:
            return { ...state, isLoggedIn: true};
        case CLEAR_TIMEOUT_ID:
            return initialState;
        default:
            return state;
    }
};