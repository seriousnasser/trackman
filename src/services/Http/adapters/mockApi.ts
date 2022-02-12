import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import { API_ENDPOINT_URL } from 'configs/configs';
import { FacilityEntity } from 'models/Facility';
import FacilityMockStorageService from 'services/FacilityMockStorageService';

const facilitiesRegex = /\/facilities\//;

function mockApi(httpService: AxiosInstance) {
  const HttpMockService = new MockAdapter(httpService, { delayResponse: 1000 });

  // Get one
  HttpMockService.onGet(facilitiesRegex).reply(config => {
    const id = config.url?.replace(API_ENDPOINT_URL + '/facilities/', '');
    const data = FacilityMockStorageService.getOne(id as string);

    return [data ? 200 : 404, data];
  });

  // Create
  HttpMockService.onPost(API_ENDPOINT_URL + '/facilities').reply(config => {
    FacilityMockStorageService.put(JSON.parse(config.data) as FacilityEntity);

    return [201, config.data];
  });

  // Update
  HttpMockService.onPut(facilitiesRegex).reply(config => {
    const id = config.url?.replace(API_ENDPOINT_URL + '/facilities/', '');

    FacilityMockStorageService.put(
      JSON.parse(config.data) as FacilityEntity,
      id
    );

    return [200, config.data];
  });

  // Delete
  HttpMockService.onDelete(facilitiesRegex).reply(config => {
    const id = config.url?.replace(API_ENDPOINT_URL + '/facilities/', '');

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

export { mockApi };
