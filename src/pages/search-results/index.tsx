import React, { useState, useEffect } from 'react';
import searchResultsStore from '../../stores/searchResultsStore';
import getSearchResults from '../../actions/searchResultsActions';
import { SearchResultItem } from '../../types/search';

function SearchResults() {
  const [searchResults, setSearchResults] = useState(searchResultsStore.getSearchResults());

  function onChange() {
    setSearchResults(searchResultsStore.getSearchResults());
  }

  useEffect(() => {
    searchResultsStore.addChangeListener(onChange);
    if (searchResultsStore.getSearchResults()?.length === 0) getSearchResults('abc');
    return () => searchResultsStore.removeChangeListener(onChange);
  }, []);

  return searchResults
    ?.map((item: SearchResultItem) => <div key={item.id.videoId}>{item.id.videoId}</div>);
}

export default SearchResults;
