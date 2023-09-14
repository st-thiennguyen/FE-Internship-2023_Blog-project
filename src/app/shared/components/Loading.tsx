import React from 'react';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-overlay">
        <div className="loader">
          <div className="inner one"></div>
          <div className="inner two"></div>
          <div className="inner three"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
