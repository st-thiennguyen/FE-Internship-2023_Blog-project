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
  const [isErrAvt, setIsErrAvt] = useState(false);

  useEffect(() => {
    isImageUrlValid(post.cover).then((result) => setIsErrImg(!result));
  }, [isErrImg, post.cover]);

  const sliceTags = post.tags.slice(0, 3).map((tag) => {
    return (
      <li className="tag-item" key={tag}>
        <span className="tag">#{tag}</span>
      </li>
    );
  });

  return (
    <Link to={'/'} className="recommend-link">
      <div className="recommend-item">
        <div
          className="recommend d-flex flex-column"
          style={{ background: `url(${isErrImg ? NoImg : post.cover}) center / cover no-repeat` }}
        >
          <div className="recommend-content">
            <h3 className="recommend-title">{post.title}</h3>
            <div className="recommend-author d-flex item-center flex-row">
              <div className="author-avatar">
                <img
                  onError={() => setIsErrAvt(true)}
                  src={!isErrAvt ? post.user.picture : require('../../../../../assets/images/user-default.png')}
                  alt={post.user.displayName}
                />
              </div>
              <span className="author-name">{post.user.displayName}</span>
            </div>
            <div className="recommend-footer d-flex justify-between">
              <ul className="reaction-list d-flex">
                <li className="reaction-item d-flex">
                  <i className="icon icon-small icon-fire-20"></i>
                  <span className="reaction-number">{post.likes}</span>
                </li>
                <li className="reaction-item d-flex">
                  <i className="icon icon-small icon-comment"></i>
                  <span className="reaction-number">{post.comments}</span>
                </li>
              </ul>
              <ul className="tag-list d-flex">
                {post.tags.length > 3 ? (
                  <>
                    {sliceTags}
                    <li className="tag-item" key="more">
                      <span className="tag">+{post.tags.length - 3}</span>
                    </li>
                  </>
                ) : (
                  post.tags.map((tag) => {
                    return (
                      <li className="tag-item" key={tag}>
                        <span className="tag">#{tag}</span>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecommendItem;
