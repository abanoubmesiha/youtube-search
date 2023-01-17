import dispatcher from './appDispatcher';
import actionTypes from './actionTypes';

const data = [1, 2, 3];

export default function getSearchResults() {
  dispatcher.dispatch({
    actionTypes: actionTypes.GET_SEARCH_RESULTS,
    payload: data,
  });
}
