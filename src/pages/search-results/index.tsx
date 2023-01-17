import React, { useState, useEffect } from 'react';
import searchResultsStore from '../../stores/searchResultsStore';
import getSearchResults from '../../actions/searchResultsActions';
import { SearchResultItem } from '../../types/search';
import './index.css';
import VideoCard from '../../reusable/video-card';

function SearchResults() {
  const [searchResults, setSearchResults] = useState(searchResultsStore.getSearchResults());

  function onChange() {
    setSearchResults(searchResultsStore.getSearchResults());
  }

  useEffect(() => {
    searchResultsStore.addChangeListener(onChange);
    if (searchResultsStore.getSearchResults()?.length === 0) getSearchResults('spongebob');
    return () => searchResultsStore.removeChangeListener(onChange);
  }, []);

  return (
    <section className="search-results">
      <div className="content">
        {
          searchResults.map(
            (item: SearchResultItem) => <VideoCard key={item.id.videoId} item={item} />,
          )
        }
      </div>
    </section>
  );
}

export default SearchResults;
