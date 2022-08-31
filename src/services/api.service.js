import axios from "axios";

const API_KEY = process.env.MICROSOFT_API_KEY;
const apiService = axios.create({
    baseURL: "https://microsoft-translator-text.p.rapidapi.com",
})

// [FREE] GET YOUR API KEY: https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/
apiService.interceptors.request.use((config) => {
    config.headers['content-type'] = 'application/json';
    config.headers['X-RapidAPI-Key'] = API_KEY;
    config.headers['X-RapidAPI-Host'] = 'microsoft-translator-text.p.rapidapi.com';
    config.params = {
        ...config.params,
        'api-version': '3.0',
    }
    return config;
})

export default apiService;
