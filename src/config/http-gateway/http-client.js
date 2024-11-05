import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AxiosCLient = axios.create({
    baseURL: SERVER_URL,
    withCredentials: false
})

const requestHandler = (request) => {
    request.headers["Accept"] = "application/json";
    request.headers["Content-Type"] = "application/json";
    /*
    const session = JSON.parse(localStorage.getItem("user")) || null;

    if (session?.token) 
        request.headers["Authorization"] = `Bearer ${session.token}`;
        return request
    */
};

AxiosCLient.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => Promise.reject(error)
)

AxiosCLient.interceptors.response.use(
    (response) => Promise.resolve(response.data),
    (error) => Promise.reject(error)
)

export default AxiosCLient;