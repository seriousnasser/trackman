import { AxiosRequestConfig } from 'axios';
import { API_ENDPOINT_URL } from 'configs/configs';

function setHost(config: AxiosRequestConfig) {
  return {
    ...config,
    url: API_ENDPOINT_URL + config.url,
  };
}

export { setHost };
