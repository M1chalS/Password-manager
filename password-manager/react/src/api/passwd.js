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

export default passwd;
