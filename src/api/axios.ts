/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';

// Singleton instance
let axiosInstance: AxiosInstance | null = null;

// Create or return the existing axios instance
function AxiosBase() {
  if (axiosInstance) {
    return Promise.resolve(axiosInstance);
  }

  try {
    const token = localStorage.getItem('revas');
    console.log('Token initialization:', token);
    
    
    axiosInstance = axios.create({
      baseURL: 'https://revas.onrender.com/api',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      timeout: 20000,
    });
    
    return Promise.resolve(axiosInstance);
  } catch (error) {
    console.error('Error retrieving token in AxiosBase:', error);
    return Promise.reject(error);
  }
}



export default AxiosBase;