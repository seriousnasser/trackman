import StorageService from './Storage';
import { FacilityEntity } from 'models/Facility';

const KEY = 'facilities';

const FacilityMockStorageService = {
  get(): Record<string, FacilityEntity> {
    const facilitiesHashMap = StorageService.get(KEY);
    return facilitiesHashMap ?? {};
  },
  getOne(id: string): FacilityEntity {
    const facilities = this.get();

    return facilities[id];
  },
  put(item: FacilityEntity, id?: string) {
    const facilities = this.get();
    const generatedId = this.generateNextId();

    facilities[id || generatedId] = {
      ...item,
      id: id || generatedId,
      createdAt: new Date().toUTCString(),
    };

    StorageService.set(KEY, facilities);
  },
  remove(id: string) {
    const facilities = this.get();

    Reflect.deleteProperty(facilities, id);

    StorageService.set(KEY, facilities);
  },
  getArray() {
    return Object.values(this.get());
  },
  getSortedArray() {
    return this.sortByCreatedDate(this.getArray());
  },
  sortByCreatedDate(facilities: FacilityEntity[]) {
    return facilities.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  generateNextId(): string {
    const facilities = this.getSortedArray();

    if (facilities.length > 0) {
      return String(Number(facilities[0].id) + 1);
    }

    return String(1);
  },
};

export default FacilityMockStorageService;
