import React from 'react';
import { SearchResultItem } from '../../types/search';

type Props = { item: SearchResultItem };

function VideoCard(props: Props) {
  const { item: { id: { videoId } } } = props;

  return (
    <div>{videoId}</div>
  );
}

export default VideoCard;
