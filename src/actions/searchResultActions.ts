import dispatcher from './appDispatcher';
import actionTypes from './actionTypes';
import api from '../apis';
import { SearchResult } from '../types/search';

export default async function getSearchResult(q: string) {
  const res: SearchResult = await api.search.get({ part: 'snippet', maxResults: 5, q });
  dispatcher.dispatch({
    actionTypes: actionTypes.GET_SEARCH_RESULT,
    searchResult: res,
  });
}
