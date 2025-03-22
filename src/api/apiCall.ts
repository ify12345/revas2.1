/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosInstance, AxiosResponse } from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface ApiError {
  msg: string;
  status: number;
}

const apiCall = async <T>(
  axiosInstance: AxiosInstance,
  method: HttpMethod,
  url: string,
  data: unknown = null,
  thunkAPI?: unknown
): Promise<T> => {

    try {
      const axiosMethod = axiosInstance[method] as (
        url: string,
        data?: unknown
      ) => Promise<AxiosResponse<T>>;
  
      const response = await axiosMethod(
        url,
        ...(method === 'get' ? [] : [data])
      );
    return response.data;
  } catch (error: any) {
    console.error('Error:', error);
    if (!error.response) {
      throw { msg: 'Network Error', status: 500 } as ApiError;
    }
    throw {
      msg: error.response.data?.detail || 'An error occurred',
      status: error.response.status,
    } as ApiError;
  }
};

export default apiCall;
