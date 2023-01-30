import { getSession, ACCESS_TOKEN} from "@/util/MemoryCommon";
import {baseURL} from "@/api/api";
import axios from "axios";

export const fetchClient = () => {
    const defaultOptions = {
        baseURL: baseURL,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const token = getSession(ACCESS_TOKEN);
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
    });

    return instance;
};

export default fetchClient();
