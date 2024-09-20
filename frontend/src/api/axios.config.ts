import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  config => {
    config.headers['Access-Control-Allow-Origin'] = import.meta.env.API_URL;
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  res => res,
  async error => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry
    ) {
      try {
        const response = await api.patch('auth/refresh');

        error.config._retry = false;

        localStorage.setItem('session', response.data.session);

        error.config._retry = true;
      } catch (error: any) {
        console.error(error);
      }
    }
  }
);
