const BASE_URL = 'https://demo.crayoninfotech.com/cocacola/api/';

export const LoginApi = async (isMobileNumber) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

        var formdata = new FormData();
        formdata.append("mobile", isMobileNumber);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "Auth/checkUserExists", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const ValidateOtpApi = async (isMobileOTP, isWaiter_id, isMobileNumber) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

        var formdata = new FormData();
        formdata.append("otp", isMobileOTP);
        formdata.append("waiter_id", isWaiter_id);
        formdata.append("mobile", isMobileNumber);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "Auth/validateotp", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const ReSendOtpApi = async (isMobileNumber) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

        var formdata = new FormData();
        formdata.append("mobile", isMobileNumber);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "Auth/resendotp", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const UserDataApi = async (waiterId) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
        myHeaders.append("Cookie", "off_cc=0cd9b8b379f8a2e15bfe71f7816a1c53b37a7e7e");

        var formdata = new FormData();
        formdata.append("waiter_id", waiterId);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch("https://demo.crayoninfotech.com/cocacola/api/user/getuserInfo", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};


export const GenerateQRApi = async (isWaiter_id, isStore_id) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

        var formdata = new FormData();
        formdata.append("waiter_id", isWaiter_id);
        formdata.append("store_id", isStore_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "user/generateNewScan", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};


export const SavefeedbackApi = async (isWaiter_id, isStore_id, isUserName, isMobileNumber, isUserEmail, isMessage) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

        var formdata = new FormData();
        formdata.append("waiter_id", isWaiter_id);
        formdata.append("store_id", isStore_id);
        formdata.append("fldv_name", isUserName);
        formdata.append("fldv_mobile", isMobileNumber);
        formdata.append("fldv_email", isUserEmail);
        formdata.append("fldt_msg", isMessage);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "feedback/savefeedback", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const MyRewardsApi = async (waiterId) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

        var formdata = new FormData();
        formdata.append("waiter_id", waiterId);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "winner/myRewards", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};



