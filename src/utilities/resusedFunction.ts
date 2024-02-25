import { postRequest } from "../Authentication/axiosrequest";

export const getTalukasFromApi = async (value: string) => {
    let res = await postRequest("getDistinctTaluk", {
        district: value,
    });
    if (res.code === 200) {
        return res.data;
    } else {
        alert("Something went wrong. Please try again");
    }
};

export const getSubCentersFromApi = async (value: string) => {
    let res = await postRequest("getDistinctSubCenter", {
        taluk: value,
    });
    if (res.code === 200) {
        return res.data;
    } else {
        alert("Something went wrong. Please try again");
    }
};