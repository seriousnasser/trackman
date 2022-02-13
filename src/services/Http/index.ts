import axios from 'axios';
import { setHost } from './interceptors/setHost';
import { MOCK_API } from 'configs/configs';
import { mockApi } from './adapters/mockApi';

const HttpService = axios.create();
HttpService.interceptors.request.use(setHost);

if (MOCK_API) {
  mockApi(HttpService);
}

export default HttpService;
