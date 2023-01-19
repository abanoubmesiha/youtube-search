import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BiFilter } from 'react-icons/bi';
import searchResultStore from '../../stores/search-result-store';
import { SearchResultItem } from '../../types/search';
import VideoCard from '../../reusable/video-card';
import Loader from '../../reusable/loader';
import getSearchResult from '../../actions/search-result-actions';
import './index.css';

function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState(searchResultStore.getSearchResult());
  const [isWebFiltersOpen, setIsWebFiltersOpen] = useState(false);

  function onChange() {
    setSearchResult(searchResultStore.getSearchResult());
  }

  const dates = useMemo(() => {
    const now = new Date();
    const yesterday = now.getDate() - 1;
    const today = new Date(now.setDate(yesterday));
    const lastWeekDay = now.getDate() - 6;
    const lastWeek = new Date(now.setDate(lastWeekDay));
    const lastMonthNum = today.getMonth() - 1;
    const lastMonth = new Date(now.setMonth(lastMonthNum));
    const lastYearNum = today.getFullYear() - 1;
    const lastYear = new Date(now.setFullYear(lastYearNum));
    return {
      today: today.toJSON(),
      lastWeek: lastWeek.toJSON(),
      lastMonth: lastMonth.toJSON(),
      lastYear: lastYear.toJSON(),
    };
  }, []);

  useEffect(() => {
    searchResultStore.addChangeListener(onChange);
    return () => searchResultStore.removeChangeListener(onChange);
  }, []);

  const filterBy = (name: string, value: string) => {
    const currentParams = searchParams;
    currentParams.delete(name);
    currentParams.append(name, value);
    setSearchParams(currentParams);
    getSearchResult(currentParams);
  };

  if (searchResult.loading) {
    return (
      <section className="search-results loading">
        <Loader />
      </section>
    );
  }
  if (searchResult?.error?.code) {
    return (
      <section className="search-results">
        {searchResult.error.message}
      </section>
    );
  }
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
          <button
            type="button"
            className="filter-btn"
            onClick={() => setIsWebFiltersOpen((prev) => !prev)}
          >
            <BiFilter size={25} />
            FILTER
          </button>
        </div>
        <hr />
        <div className={`web-filter-options ${isWebFiltersOpen ? 'show' : 'hide'}`}>
          <span className="option">
            <p className="type">TYPE</p>
            <hr />
            <button
              type="button"
              className="value"
              onClick={() => filterBy('type', 'all')}
            >
              All
            </button>
            <button
              type="button"
              className="value"
              onClick={() => filterBy('type', 'channel')}
            >
              Channel
            </button>
            <button
              type="button"
              className="value"
              onClick={() => filterBy('type', 'playlist')}
            >
              Playlist
            </button>
            <button
              type="button"
              className="value"
              onClick={() => filterBy('type', 'video')}
            >
              Video
            </button>
          </span>
          <span className="option">
            <p className="type">UPLOAD DATE</p>
            <hr />
            <button
              type="button"
              className="value"
              onClick={() => filterBy('publishedAfter', '')}
            >
              Anytime
            </button>
            <button
              type="button"
              className="value"
              onClick={() => filterBy('publishedAfter', dates.today)}
            >
              Today
            </button>
            <button
              type="button"
              className="value"
              onClick={() => filterBy('publishedAfter', dates.lastWeek)}
            >
              This week
            </button>
            <button
              type="button"
              className="value"
              onClick={() => filterBy('publishedAfter', dates.lastMonth)}
            >
              This month
            </button>
            <button
              type="button"
              className="value"
              onClick={() => filterBy('publishedAfter', dates.lastYear)}
            >
              This year
            </button>
          </span>
        </div>
        <hr />
        <div className="mobile-filter-options">
          <select>
            <option value="All">All</option>
            <option value="channel">Channel</option>
            <option value="playlist">Playlist</option>
            <option value="video">Video</option>
          </select>
          <select>
            <option value="Anytime">Anytime</option>
            <option value="Today">Today</option>
            <option value="This week">This week</option>
            <option value="This month">This month</option>
            <option value="This year">This year</option>
          </select>
        </div>
        <hr />
        {
          searchResult?.items?.map(
            (item: SearchResultItem) => <VideoCard key={item.id.videoId} item={item} />,
          )
        }
      </div>
    </section>
  );
}

export default SearchResult;
