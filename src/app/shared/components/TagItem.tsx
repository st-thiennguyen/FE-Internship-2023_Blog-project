import React from 'react';
import { Link } from 'react-router-dom';

const TagItem = () => {
  return (
    <Link to="/" className="tag-item">
      <div className="tag-item-wrapper">
        <span className="tag-item-txt">Developer</span>
      </div>
    </Link>
  );
};

export default TagItem;
