import HttpHelper from './helpers';

const key = process.env.REACT_APP_YOUTUBE_API_KEY;

export default {
  get: (paramsUrl: string) => HttpHelper.baseAxios
    .get(`search?key=${key}&regionCode=us&${paramsUrl}`)
    .then((res) => res.data)
    .catch((err) => err.response.data),
};
