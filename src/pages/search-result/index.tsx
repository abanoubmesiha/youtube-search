import React, { useState, useEffect } from 'react';
import searchResultStore from '../../stores/searchResultStore';
import getSearchResult from '../../actions/searchResultActions';
import { SearchResultItem } from '../../types/search';
import './index.css';
import VideoCard from '../../reusable/video-card';

function SearchResult() {
  const [searchResult, setSearchResult] = useState(searchResultStore.getSearchResult());

  function onChange() {
    setSearchResult(searchResultStore.getSearchResult());
  }

  useEffect(() => {
    searchResultStore.addChangeListener(onChange);
    if (searchResultStore.getSearchResult()?.items.length === 0) getSearchResult('spongebob');
    return () => searchResultStore.removeChangeListener(onChange);
  }, []);

  return (
    <section className="search-results">
      <div className="filter-bar">
        <h4>hi</h4>
      </div>
      <br />
      <div className="content">
        {
          searchResult.items.map(
            (item: SearchResultItem) => <VideoCard key={item.id.videoId} item={item} />,
          )
        }
      </div>
    </section>
  );
}

export default SearchResult;
