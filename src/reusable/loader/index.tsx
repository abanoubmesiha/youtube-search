import React from 'react';
import './index.css';

function Loader() {
  return (
    <div className="loading-wrapper">
      <div className="lds-default">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
