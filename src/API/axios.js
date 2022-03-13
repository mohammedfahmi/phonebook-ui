import axios from 'axios';

//Interceptor to set Authorization with all requests to api
axios.interceptors.request.use(config => {
    config.headers.Authorization = "Basic YWRtaW46YWRtaW4=";
    return config;
});

export default axios;
