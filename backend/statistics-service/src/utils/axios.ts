// utils/axios.ts
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
  retries: 2,
  retryDelay: (retryCount) => retryCount * 500,
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error),
});

export default axios;
