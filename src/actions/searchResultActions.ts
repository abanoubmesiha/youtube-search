import dispatcher from './appDispatcher';
import actionTypes from './actionTypes';
import api from '../apis';
import { SearchResult } from '../types/search';

export default async function getSearchResult(q: string | undefined) {
  dispatcher.dispatch({
    actionTypes: actionTypes.SET_LOADING,
    loading: true,
  });
  const res: SearchResult = await api.search.get({ part: 'snippet', maxResults: 5, q });
  dispatcher.dispatch({
    actionTypes: actionTypes.GET_SEARCH_RESULT,
    searchResult: res,
  });
}
