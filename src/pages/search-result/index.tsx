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
        <div className="filter-options">
          <span className="option">
            <p className="type">TYPE</p>
            <hr />
            <p className="value">All</p>
            <p className="value">Channel</p>
            <p className="value">Playlist</p>
          </span>
          <span className="option">
            <p className="type">UPLOAD DATE</p>
            <hr />
            <p className="value">Anytime</p>
            <p className="value">Today</p>
            <p className="value">This week</p>
            <p className="value">This month</p>
            <p className="value">This year</p>
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
