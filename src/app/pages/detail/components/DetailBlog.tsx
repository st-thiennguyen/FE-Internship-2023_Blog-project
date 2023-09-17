import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import avaDefault from '../../../../assets/images/user-default.png';
import { PostModel } from '../../../models/post';
import { isImageUrlValid } from '../../../shared/utils';

interface DetailBlogProps {
  post: PostModel;
}

const DetailBlog = ({ post }: DetailBlogProps) => {
  const [errorImage, setErrorImage] = useState(false);

  useEffect(() => {
    isImageUrlValid(post.user?.picture).then((value) => setErrorImage(!value));
  }, [post.user?.picture]);

  return (
    <>
      <div className="detail-action">
        <ul className="action-list">
          <li className="action-item d-flex item-center">
            <button className="btn btn-post-action">
              <i className="icon icon-small icon-fire-ouline-20"></i>
            </button>
            <span className="action-count">{post.likes}</span>
          </li>
          <li className="action-item d-flex item-center">
            <button className="btn btn-post-action">
              <i className="icon icon-small icon-comment-20"></i>
            </button>
            <span className="action-count">{post.comments}</span>
          </li>
          <li className="action-item d-flex item-center">
            <button className="btn btn-post-action">
              <i className="icon icon-small icon-bookmark-20"></i>
            </button>
          </li>
        </ul>
      </div>
      <div className="detail-post">
        <div className="detail-post-body">
          <p className="post-desc">{post.description}</p>
          <p className="post-content">{post.content}</p>
        </div>
        <div className="post-tag">
          <ul className="tag-list d-flex flex-wrap justify-end">
            {post.tags?.length > 0 &&
              post.tags?.map((item, index) => (
                <li className="tag-item" key={index}>
                  <Link to="/" className="tag">
                    #{item}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="detail-author text-center d-flex justify-center">
          <Link to="/" className="detail-author-action d-flex flex-column item-center">
            <div className="author-img d-flex">
              <img src={!errorImage ? post.user?.picture : avaDefault} alt={post.user?.displayName} />
            </div>
            <p className="author-name">{post.user?.firstName + ' ' + post.user?.lastName}</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DetailBlog;
