import React, { useState, useEffect } from 'react';
import { BiFilter } from 'react-icons/bi';
import searchResultStore from '../../stores/searchResultStore';
import getSearchResult from '../../actions/searchResultActions';
import { SearchResultItem } from '../../types/search';
import VideoCard from '../../reusable/video-card';
import './index.css';

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
      <div className="content">
        <div className="filter-bar">
          <p>
            About
            {' '}
            {searchResult.pageInfo?.totalResults}
            {' '}
            filtered results
          </p>
          <span className="filter-btn">
            <BiFilter size={25} />
            FILTER
          </span>
        </div>
        <hr />
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
