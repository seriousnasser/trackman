import Model from './Model';

export interface FacilityEntity {
  id: string;
  createdAt: string;
  name: string;
  type: 'range' | 'indoor';
  address: string;
}

class FacilityModel extends Model<FacilityEntity, Partial<FacilityEntity>> {
  constructor(apiEndPoint = '/facilities') {
    super(apiEndPoint);
  }
}

export default new FacilityModel();
