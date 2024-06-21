import APICaller from "../../src/APICaller/APICaller";

class SettingsService {
  constructor() {
    this.APICaller = new APICaller();
  }
  async Post(url) {
    return await this.APICaller.Post(url);
  }
  async PostWithData(url, inputData) {
    return await this.APICaller.PostWithData(url, inputData);
  }
  async PostWithParams(url, inputParams) {
    return await this.APICaller.PostWithParams(url, inputParams);
  }
  async PostWithHeaderandParams(url, header,inputParams) {
    return await this.APICaller.PostWithHeaderandParams(url, header,inputParams);
  }
}

export default SettingsService;
