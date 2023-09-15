import React from 'react';
import { Link } from 'react-router-dom';

const DetailLoading = () => {
  return (
    <div className="detail-page">
      <section className="section section-detail-cover">
        <div className="skeleton detail-cover"></div>
      </section>
      <section className="section section-detail-content">
        <div className="detail-content d-flex">
          <div className="detail-action">
            <ul className="action-list">
              {Array.from({ length: 3 }, (item, index) => (
                <li className="skeleton action-item d-flex item-center" key={index}></li>
              ))}
            </ul>
          </div>
          <div className="detail-post">
            <article className="post-content">
              {Array.from({ length: 30 }, (item, index) => (
                <p className="skeleton text-row" key={index}></p>
              ))}
            </article>
            <div className="detail-author">
              <Link to="/" className="detail-author-action text-center d-flex flex-column item-center">
                <div className="skeleton author-img"></div>
                <p className="skeleton author-name"></p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailLoading;
