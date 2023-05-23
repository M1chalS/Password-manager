import axios from 'axios';

const passwd = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
    accept: 'application/json',
    contentType: 'application/json'
});

passwd.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

passwd.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('ACCESS_TOKEN');
    } else if (response.status === 404) {
        console.log('404 - Not Found'); // TODO zrobić Not found page
    }

    throw error;
});

export default passwd;
