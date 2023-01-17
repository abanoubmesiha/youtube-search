import HttpHelpers from './helpers';
import { SearchParams } from '../types/search';

const key = process.env.REACT_APP_YOUTUBE_API_KEY;

export default {
  get: (params: SearchParams) => HttpHelpers.baseAxios
    .get(`search?key=${key}`, { params })
    .then((res) => res.data)
    .catch((err) => err.response.data),
};
