import React from 'react';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-overlay">
        <div className="loading-container">
          <div className="loading-inner line-one" />
          <div className="loading-inner line-two" />
          <div className="loading-inner line-three" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
