import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import noImage from '../../../../assets/images/no-image.png';
import avaDefault from '../../../../assets/images/user-default.png';
import { isImageUrlValid } from '../../../shared/utils/';
import { convertDateToString } from '../../../shared/utils/date';

type DetailCoverProps = {
  cover: string;
  title: string;
  authorAvatar: string;
  authorName: string;
  datePost: any;
};

const DetailCover = ({ cover, title, authorAvatar, authorName, datePost }: DetailCoverProps) => {
  const [isErrorCover, setIsErrorCover] = useState(false);
  const [isErrorAvatar, setIsErrorAvatar] = useState(false);

  useEffect(() => {
    isImageUrlValid(cover).then((value) => setIsErrorCover(!value));
    isImageUrlValid(authorAvatar).then((value) => setIsErrorAvatar(!value));
  }, [cover, authorAvatar]);

  return (
    <section className="section section-detail-cover">
      <div className="detail-cover">
        <div className="cover-img">
          <img src={!isErrorCover ? cover : noImage} alt={title} />
        </div>
        <div className="cover-content d-flex flex-column justify-end">
          <h2 className="cover-title">{title}</h2>
          <div className="cover-info d-flex justify-between item-center">
            <Link to="/" className="cover-author d-flex item-center">
              <div className="author-ava">
                <img src={!isErrorAvatar ? authorAvatar : avaDefault} alt={authorName + ' Avatar'} />
              </div>
              <span className="author-name">{authorName}</span>
            </Link>
            <div className="cover-date d-flex item-center">
              <i className="icon icon-small icon-date-20"></i>
              <p className="cover-date-title">{convertDateToString(datePost)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailCover;
