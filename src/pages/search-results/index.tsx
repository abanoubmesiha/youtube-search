import React, { useState, useEffect } from 'react';
import searchResultsStore from '../../stores/searchResultsStore';
import getSearchResults from '../../actions/searchResultsActions';

function SearchResults() {
  const [searchResults, setSearchResults] = useState(searchResultsStore.getSearchResults());

  function onChange() {
    setSearchResults(searchResultsStore.getSearchResults());
  }

  useEffect(() => {
    searchResultsStore.addChangeListener(onChange);
    if (searchResultsStore.getSearchResults()?.length === 0) getSearchResults();
    return () => searchResultsStore.removeChangeListener(onChange);
  }, []);
  console.log(searchResults);
  return <h1>search results</h1>;
}

export default SearchResults;
