import { Link } from 'react-router-dom';

import { PostModel } from '../../../../models/post';
import { useEffect, useState } from 'react';
import { isImageUrlValid } from '../../../../shared/utils';

import NoImg from '../../../../../assets/images/no-image.png';

interface RecommendItemProps {
  post: PostModel;
}
const RecommendItem = ({ post }: RecommendItemProps) => {
  const [isErrImg, setIsErrImg] = useState(false);

  useEffect(() => {
    isImageUrlValid(post.cover).then((result) => setIsErrImg(!result));
  }, [isErrImg, post.cover]);

  return (
    <Link to={'/'} className="recommend-link">
      <div className="recommend-item">
        <div
          className="recommend d-flex flex-column"
          style={{ background: `url(${isErrImg ? NoImg : post.cover}) top center / cover no-repeat` }}
        >
          <div className="recommend-content">
            <h3 className="recommend-title">{post.title}</h3>
            <span className="recommend-author">By {post.user.lastName}</span>
            <div className="recommend-footer d-flex justify-between">
              <ul className="reaction-list d-flex">
                <li className="reaction-item d-flex">
                  <i className="icon icon-small icon-like"></i>
                  <span className="reaction-number">{post.likes}</span>
                </li>
                <li className="reaction-item d-flex">
                  <i className="icon icon-small icon-comment"></i>
                  <span className="reaction-number">{post.comments}</span>
                </li>
              </ul>
              <ul className="tag-list d-flex">
                {post.tags.map((tag) => {
                  return (
                    <li className="tag-item" key={tag}>
                      <span className="tag">{tag}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecommendItem;
