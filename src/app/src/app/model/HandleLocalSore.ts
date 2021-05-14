export const Constant = {
    LOCALVARIABLENAME: {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        // smsOtpToken: 'smsOtpToken'
    }
};

export const HandleLocalStore = {
    writeaccessToken: (accessToken: any) => {
        localStorage.setItem(Constant.LOCALVARIABLENAME.accessToken, accessToken);
    },

    writerefreshToken: (refreshToken) => {
        localStorage.setItem(Constant.LOCALVARIABLENAME.refreshToken, refreshToken);
    },
    // writesmsOtpToken: (smsOtpToken) => {
    //     localStorage.setItem(Constant.LOCALVARIABLENAME.smsOtpToken, smsOtpToken);
    // },
    getToken(): string | null {
        return localStorage.getItem(Constant.LOCALVARIABLENAME.accessToken);
    }
};
