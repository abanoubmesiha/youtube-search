import { EventEmitter } from 'events';
import dispatcher from '../actions/appDispatcher';
import actionTypes from '../actions/actionTypes';
import { SearchResult } from '../types/search';

const CHANGE_EVENT = 'change';
let searchResult: SearchResult = { items: [], loading: true };

class SearchResultStore extends EventEmitter {
  addChangeListener(callback: any) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback: any) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  // eslint-disable-next-line class-methods-use-this
  getSearchResult() {
    return searchResult;
  }
}

const store = new SearchResultStore();

dispatcher.register((action: any) => {
  switch (action.actionTypes) {
    case actionTypes.SET_LOADING:
      searchResult = { ...searchResult, loading: action.loading };
      store.emitChange();
      break;
    case actionTypes.GET_SEARCH_RESULT:
      searchResult = action.searchResult;
      store.emitChange();
      break;
    default:
  }
});

export default store;
