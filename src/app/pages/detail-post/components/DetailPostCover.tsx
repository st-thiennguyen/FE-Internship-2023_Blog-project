import { Link } from 'react-router-dom';

import { convertDateToString } from '../../../shared/utils/date';

type DetailPostCoverProps = {
  cover: string;
  title: string;
  authorAvatar: string;
  authorName: string;
  datePost: any;
  authorId: number;
};

const DetailPostCover = ({ cover, authorAvatar, authorName, datePost, authorId }: DetailPostCoverProps) => {
  return (
    <section className="section section-detail-cover">
      <div className="detail-cover">
        <div className="cover-img">
          <img src={cover} />
        </div>
        <div className="cover-content d-flex flex-column justify-end">
          <div className="cover-info d-flex justify-between item-center">
            <Link to={`/profile/${authorId}`} className="cover-author d-flex item-center">
              <div className="author-ava">
                <img src={authorAvatar} alt={authorName + ' Avatar'} />
              </div>
              <span className="author-name">{authorName}</span>
            </Link>
            <div className="cover-date d-flex item-center">
              <i className="icon icon-small icon-date-20"></i>
              <p className="cover-date-title">{convertDateToString(datePost, '-')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailPostCover;
