import axios, { AxiosRequestConfig } from "axios";
// const BaseUrl = "https://sevasindhugs1.karnataka.gov.in/MysoreTicket/admin/";
// const BaseUrl = "http://103.138.197.190/GuranteeScheme/admin/";
const BaseUrl = "https://gss.karnataka.gov.in/GuranteeScheme/admin/";
const BaseURlForUser = "https://gss.karnataka.gov.in/GuranteeScheme/user/";
// const BaseUrl = "http://localhost:8886/GuranteeScheme/admin/";

export const postRequest = async (url: string, body: any) => {
    try {
        let getData = await axios.post(BaseUrl + url, body);
        return getData.data;
    } catch (e) {
        return e;
    }
};
export const postRequestWithHeaders = async (url: string, body: any, headers: any) => {
    try {
        let getData = await axios.post(BaseURlForUser + url, body, {headers: headers});
        return getData.data;
    } catch (e) {
        return e;
    }
};

export const getRequest = async (url: string, body: any) => {
    try {
        let getData = await axios.get(BaseUrl + url, body);
        return getData.data;
    } catch (e) {
        return e;
    }
};
export const downloadRequest = async (url: string, data: any) => {
    const headers = { "Content-Type": "blob" };
    const config: AxiosRequestConfig = {
      method: "POST",
      data,
      url: BaseUrl + url,
      responseType: "arraybuffer",
      headers,
    };

    try {
      const response = await axios(config);

      const outputFilename = `${Date.now()}.xlsx`;

      // If you want to download file automatically using link attribute.
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", outputFilename);
      document.body.appendChild(link);
      link.click();

      // OR you can save/write file locally.
      // fstat.writeFileSync(outputFilename, response.data);
    } catch (error: any) {
      throw Error(error);
    }
};

