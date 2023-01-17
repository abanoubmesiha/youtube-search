import axios, { AxiosInstance } from 'axios';

class HttpHelpers {
  apiBaseUrl: string | undefined;

  baseAxios: AxiosInstance;

  constructor() {
    this.apiBaseUrl = process.env.REACT_APP_BASE_URL;

    this.baseAxios = axios.create({
      baseURL: this.apiBaseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default new HttpHelpers();
