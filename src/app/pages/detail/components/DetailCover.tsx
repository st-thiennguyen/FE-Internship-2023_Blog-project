import React from 'react';
import { Link } from 'react-router-dom';

type DetailCoverProps = {
  cover: string;
  title: string;
  authAvatar: string;
  authName: string;
};

const DetailCover = ({ cover, title, authAvatar, authName }: DetailCoverProps) => {
  return (
    <section className="section section-detail-cover">
      <div className="container">
        <div className="detail-cover">
          <div className="cover-img">
            <img src={cover} aria-hidden alt={title} />
          </div>
          <div className="cover-content d-flex flex-column justify-end">
            <h2 className="cover-title">{title}</h2>
            <Link to="/" className="cover-auth d-flex item-center">
              <div className="auth-ava">
                <img src={authAvatar} alt={authName + 'Avatar'} />
              </div>
              <span className="auth-name">{authName}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailCover;
