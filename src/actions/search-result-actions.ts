import dispatcher from './app-dispatcher';
import actionTypes from './action-types';
import api from '../apis';
import { SearchParams, SearchResult } from '../types/search';

export default async function getSearchResult(searchParams: SearchParams) {
  searchParams.delete('part');
  searchParams.delete('maxResults');
  searchParams.append('part', 'snippet');
  searchParams.append('maxResults', '5');
  dispatcher.dispatch({
    actionTypes: actionTypes.SET_LOADING,
    loading: true,
  });
  const res: SearchResult = await api.search.get(searchParams.toString());
  dispatcher.dispatch({
    actionTypes: actionTypes.GET_SEARCH_RESULT,
    searchResult: res,
  });
}
