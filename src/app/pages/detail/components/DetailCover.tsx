import React from 'react';
import { Link } from 'react-router-dom';

type DetailCoverProps = {
  cover: string;
  title: string;
  authAvatar: string;
  authName: string;
  datePost: Date;
};

const DetailCover = ({ cover, title, authAvatar, authName, datePost }: DetailCoverProps) => {
  return (
    <section className="section section-detail-cover">
      <div className="detail-cover">
        <div className="cover-img">
          <img src={cover} aria-hidden alt={title} />
        </div>
        <div className="cover-content d-flex flex-column justify-end">
          <h2 className="cover-title">{title}</h2>
          <div className="cover-info d-flex justify-between item-center">
            <Link to="/" className="cover-auth d-flex item-center">
              <div className="auth-ava">
                <img src={authAvatar} alt={authName + ' Avatar'} />
              </div>
              <span className="auth-name">{authName}</span>
            </Link>
            <div className="cover-date d-flex item-center">
              <i className="icon icon-small icon-date-20"></i>
              <p className="cover-date-title">
                {datePost.getDate() + '-' + datePost.getMonth() + '-' + datePost.getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailCover;
