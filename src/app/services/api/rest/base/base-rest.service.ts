export class BaseRestService {
  private Url = 'https://localhost:44380/api/';

  public get url() {
    return this.Url;
  }

  constructor(endpoint: string) {
    this.Url = this.Url + endpoint;
  }
}
