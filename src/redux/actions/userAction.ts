import { LOGGED_IN, LOGGED_OUT, OTP_VERIFY } from "../../utilities/constants"

export const userLoggedIn = (data: any) => {
    return {
        type: LOGGED_IN,
        payload: data
    }
};

export const userLoggedOut = () => {
    return {
        type: LOGGED_OUT
    }
}
export const otpVerification = () => {
    return {
        type: OTP_VERIFY
    }
}