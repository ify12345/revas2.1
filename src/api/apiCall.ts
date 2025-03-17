/* eslint-disable @typescript-eslint/no-throw-literal */
const apiCall = async (axiosInstance, method, url, data = null, thunkAPI?: unknown) => {
    try {
      const response = await axiosInstance[method](url, data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      if (!error.response) {
        throw { msg: 'Network Error', status: 500 };
      }
      throw {
        msg: error.response.data?.detail || 'An error occurred',
        status: error.response.status,
      };
    }
  };

  export default apiCall;