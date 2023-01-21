import React from 'react';
import { SearchResultItem } from '../../types/search';
import './index.css';

type Props = { item: SearchResultItem };

function SearchResultItemCard(props: Props) {
  const {
    item: {
      snippet: {
        channelTitle,
        description,
        thumbnails: {
          high: {
            url,
          },
        },
        title,
      },
    },
  } = props;

  return (
    <div className="search-result-item-card">
      <img src={url} alt="video-thumbnail" height={200} width={300} />
      <div className="details">
        <h4>{title}</h4>
        <span className="channel-title">{channelTitle}</span>
        <div className="seperator" />
        <span className="views">54M views</span>
        <div className="seperator" />
        <span className="since">1 year ago</span>
        <p className="description">{description}</p>
      </div>
    </div>
  );
}

export default SearchResultItemCard;
