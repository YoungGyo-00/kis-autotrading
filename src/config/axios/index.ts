import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { BASE_URL } from "@env";

const axiosConfig: AxiosRequestConfig = {
    baseURL: BASE_URL,
};

class Client {
    public client: AxiosInstance;
    constructor() {
        this.client = axios.create(axiosConfig);
    }
}

export default new Client().client;
