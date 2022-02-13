import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import { API_ENDPOINT_URL } from 'configs/configs';
import { FacilityEntity } from 'models/Facility';
import FacilityMockStorageService from 'services/FacilityMockStorageService';

function mockApi(httpService: AxiosInstance) {
  const facilitiesRegex = /\/facilities\//;

  const HttpMockService = new MockAdapter(httpService, { delayResponse: 1000 });

  // Get one
  HttpMockService.onGet(facilitiesRegex).reply(config => {
    const id = getIdFromUrl(config.url!);
    const data = FacilityMockStorageService.getOne(id);

    return [data ? 200 : 404, data];
  });

  // Create
  HttpMockService.onPost(API_ENDPOINT_URL + '/facilities').reply(config => {
    FacilityMockStorageService.put(JSON.parse(config.data));

    return [201, config.data];
  });

  // Update
  HttpMockService.onPut(facilitiesRegex).reply(config => {
    const id = getIdFromUrl(config.url!);

    FacilityMockStorageService.put(JSON.parse(config.data), id);

    return [200, config.data];
  });

  // Delete
  HttpMockService.onDelete(facilitiesRegex).reply(config => {
    const id = getIdFromUrl(config.url!);

    if (id) {
      FacilityMockStorageService.remove(id);
    }

    return [200, undefined];
  });

  // Get all
  HttpMockService.onGet(API_ENDPOINT_URL + '/facilities').reply(() => {
    return [200, FacilityMockStorageService.getSortedArray()];
  });
}

function getIdFromUrl(url: string) {
  return url.replace(API_ENDPOINT_URL + '/facilities/', '');
}

export { mockApi };
