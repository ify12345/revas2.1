import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

async function AxiosBase() {
  try {
    const token = await SecureStore.getItemAsync('iso');
    console.log('Token', token)
    
    const axiosInstance = axios.create({
      baseURL: ' https://i-one-server.onrender.com/i-one',
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


