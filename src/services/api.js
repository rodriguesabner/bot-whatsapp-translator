import axios from "axios";

const API_KEY = process.env.MICROSOFT_API_KEY;
const api = axios.create({
    baseURL: "https://microsoft-translator-text.p.rapidapi.com",
})

// [FREE] GET YOUR API KEY: https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/
api.interceptors.request.use((config) => {
    config.headers['X-RapidAPI-Key'] = API_KEY;
    config.headers['X-RapidAPI-Host'] = 'microsoft-translator-text.p.rapidapi.com';

    return config;
})

export default api;
