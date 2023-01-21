import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
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
    let now = new Date();
    const yesterday = now.getDate() - 1;
    const today = new Date(now.setDate(yesterday));
    now = new Date();
    const lastWeekDay = now.getDate() - 6;
    const lastWeek = new Date(now.setDate(lastWeekDay));
    now = new Date();
    const lastMonthNum = now.getMonth() - 1;
    const lastMonth = new Date(now.setMonth(lastMonthNum));
    now = new Date();
    const lastYearNum = now.getFullYear() - 1;
    const lastYear = new Date(now.setFullYear(lastYearNum));
    return {
      today: today.toISOString(),
      lastWeek: lastWeek.toISOString(),
      lastMonth: lastMonth.toISOString(),
      lastYear: lastYear.toISOString(),
    };
  }, []);

  const closestDate = useCallback((date: string | null) => {
    if (!date) return null;
    if (date < dates.today && date < dates.lastWeek && date < dates.lastMonth) {
      return dates.lastYear;
    }
    if (date < dates.today && date < dates.lastWeek) {
      return dates.lastMonth;
    }
    if (date < dates.today) {
      return dates.lastWeek;
    }
    return dates.today;
  }, [dates.today, dates.lastWeek, dates.lastMonth, dates.lastYear]);

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

  const dateOption = closestDate(searchParams.get('publishedAfter'));

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
              className={`value ${searchParams.get('type') === '' || searchParams.get('type') === null ? 'selected' : ''}`}
              onClick={() => filterBy('type', '')}
            >
              All
            </button>
            <button
              type="button"
              className={`value ${searchParams.get('type') === 'channel' ? 'selected' : ''}`}
              onClick={() => filterBy('type', 'channel')}
            >
              Channel
            </button>
            <button
              type="button"
              className={`value ${searchParams.get('type') === 'playlist' ? 'selected' : ''}`}
              onClick={() => filterBy('type', 'playlist')}
            >
              Playlist
            </button>
            <button
              type="button"
              className={`value ${searchParams.get('type') === 'video' ? 'selected' : ''}`}
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
              className={`value ${dateOption === null || dateOption === undefined ? 'selected' : ''}`}
              onClick={() => filterBy('publishedAfter', '')}
            >
              Anytime
            </button>
            <button
              type="button"
              className={`value ${dateOption === dates.today ? 'selected' : ''}`}
              onClick={() => filterBy('publishedAfter', dates.today)}
            >
              Today
            </button>
            <button
              type="button"
              className={`value ${dateOption === dates.lastWeek ? 'selected' : ''}`}
              onClick={() => filterBy('publishedAfter', dates.lastWeek)}
            >
              This week
            </button>
            <button
              type="button"
              className={`value ${dateOption === dates.lastMonth ? 'selected' : ''}`}
              onClick={() => filterBy('publishedAfter', dates.lastMonth)}
            >
              This month
            </button>
            <button
              type="button"
              className={`value ${dateOption === dates.lastYear ? 'selected' : ''}`}
              onClick={() => filterBy('publishedAfter', dates.lastYear)}
            >
              This year
            </button>
          </span>
        </div>
        <hr />
        <div className="mobile-filter-options">
          <select
            name="type"
            onChange={(e) => filterBy(e.target.name, e.target.value)}
            value={searchParams.get('type') ?? undefined}
          >
            <option value="">All</option>
            <option value="channel">Channel</option>
            <option value="playlist">Playlist</option>
            <option value="video">Video</option>
          </select>
          <select
            name="publishedAfter"
            onChange={(e) => filterBy(e.target.name, e.target.value)}
            value={dateOption ?? undefined}
          >
            <option value="">Anytime</option>
            <option value={dates.today}>Today</option>
            <option value={dates.lastWeek}>This week</option>
            <option value={dates.lastMonth}>This month</option>
            <option value={dates.lastYear}>This year</option>
          </select>
        </div>
        <hr />
        {
          searchResult?.items?.map(
            (item: SearchResultItem) => (
              <VideoCard
                key={item.id.videoId ?? item.id.channelId ?? item.id.playlistId}
                item={item}
              />
            ),
          )
        }
      </div>
    </section>
  );
}

export default SearchResult;
