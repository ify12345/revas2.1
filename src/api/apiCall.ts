
import { ErrorResponse, RejectValue } from '@/types/api';
import {AxiosResponse} from 'axios';


interface ErrorPayload {
  response: {
    data: {
      error: string;
      message: string;
      token: string;
      user: null;
    };
    status: number;
  };
}
type RejectedWithValue = {
  rejectWithValue(rejectValue: RejectValue): {payload: RejectValue};
};

async function apiCall(
  asyncFn: Promise<AxiosResponse>,
  thunkAPI: RejectedWithValue,
  route?: string,
) {
  try {
    const {data} = await asyncFn;
    console.log('data', data);
    if (route === 'auth') {
      const {token} = data;
      const key = 'revas';
      localStorage.setItem(key,token)
    }
    return data;
  } catch (err) {
    const error = err as ErrorPayload;
    if (!error?.response) {
      return thunkAPI.rejectWithValue({msg: 'Network Error', status: 500});
    }
    if (error?.response?.status === 500) {
      return thunkAPI.rejectWithValue({msg: 'Server Error', status: 500});
    }
    const responseData = error.response.data;
    const errorMsg = responseData?.error || responseData|| 'An error occurred';
    
    return thunkAPI.rejectWithValue({
      msg: errorMsg,
      status: error?.response?.status,
    } as ErrorResponse);
  }
}


export default apiCall;
