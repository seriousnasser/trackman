import HttpService from 'services/Http';

export default abstract class Model<Res, Req> {
  private readonly apiEndpoint: string;

  protected constructor(apiEndPoint: string) {
    this.apiEndpoint = apiEndPoint;
  }

  public get() {
    return HttpService.get<Res>(this.apiEndpoint);
  }

  public getOne(id: string) {
    return HttpService.get<Res>(this.getEndpoint(id));
  }

  public update(id: string, data: Req) {
    return HttpService.put<Res>(this.getEndpoint(id), data);
  }

  public create(data: Req) {
    return HttpService.post<Res>(this.apiEndpoint, data);
  }

  public delete(id: string) {
    return HttpService.delete<Res>(this.getEndpoint(id));
  }

  public getList() {
    return HttpService.get<Res[]>(this.apiEndpoint);
  }

  private getEndpoint(id: string) {
    return `${this.apiEndpoint}${`/${id}`}`;
  }
}
