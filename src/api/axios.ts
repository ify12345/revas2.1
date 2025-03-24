import axios from 'axios';

const token = localStorage.getItem('revas');
console.log('Token', token)

async function AxiosBase() {
  try {
    const token = localStorage.getItem('revas');
    console.log('Token', token)
    
    const axiosInstance = axios.create({
      baseURL: 'https://revas.onrender.com/api',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}), 
      },
      timeout: 20000,
    });

    return axiosInstance;
  } catch (error) {
    console.error('Error retrieving token in AxiosBase:', error);
    throw error;
  }
}

export default AxiosBase;


