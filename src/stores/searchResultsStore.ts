import { EventEmitter } from 'events';
import dispatcher from '../actions/appDispatcher';
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'change';
let searchResults: any[] = [];

class SearchResultsStore extends EventEmitter {
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
  getSearchResults() {
    return searchResults;
  }
}

const store = new SearchResultsStore();

dispatcher.register((action: any) => {
  switch (action.actionTypes) {
    case actionTypes.GET_SEARCH_RESULTS:
      searchResults = action.searchResults;
      store.emitChange();
      break;
    default:
  }
});

export default store;
