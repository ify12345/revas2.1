/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';

// Create axios instance
function createAxiosInstance(): AxiosInstance {
  const localUrl = 'http://localhost:3001/api';
  const prodUrl = 'https://revas.onrender.com/api';
  
  const instance = axios.create({
    baseURL: prodUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 20000,
  });
  
  // Add request interceptor to dynamically include the token on every request
  instance.interceptors.request.use(
    (config) => {
      // Get the most up-to-date token for each request
      const token = localStorage.getItem('revas');
      console.log(token);
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  return instance;
}

// Singleton instance
let axiosInstance: AxiosInstance | null = null;

// Create or return the existing axios instance
function AxiosBase() {
  if (!axiosInstance) {
    axiosInstance = createAxiosInstance();
  }
  
  return Promise.resolve(axiosInstance);
}

export default AxiosBase;