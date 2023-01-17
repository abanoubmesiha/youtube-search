import dispatcher from './appDispatcher';
import actionTypes from './actionTypes';
import api from '../apis';

export default async function getSearchResults(q: string) {
  const res = await api.search.get({ part: 'snippet', maxResults: 5, q });
  dispatcher.dispatch({
    actionTypes: actionTypes.GET_SEARCH_RESULTS,
    searchResults: res.items,
  });
}
