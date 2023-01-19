/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import VideoCard from '.';
import { SearchResultItem } from '../../types/search';

const item: SearchResultItem = {
  id: { videoId: '1' },
  snippet: {
    channelTitle: 'channelTitle',
    description: 'description',
    thumbnails: {
      high: {
        url: 'http://google.com/img.png',
      },
    },
    title: 'title',
  },
};

describe('Video Card', () => {
  it('renders video details', () => {
    const { container } = render(<VideoCard item={item} />);
    const title = container.getElementsByTagName('h4')[0];
    const img = container.getElementsByTagName('img')[0];
    const channelTitle = container.getElementsByClassName('channel-title')[0];
    const description = container.getElementsByClassName('description')[0];

    expect(title.innerHTML).toBe(item.snippet.title);
    expect(img.src).toBe(item.snippet.thumbnails.high.url);
    expect(channelTitle.innerHTML).toBe(item.snippet.channelTitle);
    expect(description.innerHTML).toBe(item.snippet.description);
  });
});
