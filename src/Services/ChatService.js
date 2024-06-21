import APICaller from "../APICaller/APICaller";

class ChatService {
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
  async GetWithParams(url, inputParams) {
    return await this.APICaller.GetWithParams(url, inputParams);
  }
}

export default ChatService;
