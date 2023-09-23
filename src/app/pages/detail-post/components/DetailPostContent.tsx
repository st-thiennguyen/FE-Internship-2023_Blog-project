import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { PostModel } from '../../../models/post';
import { isImageUrlValid } from '../../../shared/utils';

import avaDefault from '../../../../assets/images/user-default.png';
import DetailPostReaction from './DetailPostReaction';

interface DetailPostProps {
  post: PostModel;
}

const DetailPostContent = ({ post }: DetailPostProps) => {
  const [isErrorCover, setIsErrorCover] = useState(false);

  useEffect(() => {
    isImageUrlValid(post.user?.picture).then((value) => setIsErrorCover(!value));
  }, [post.user?.picture]);

  return (
    <>
      <DetailPostReaction postId={post.id} likeCount={post.likes} commentCount={post.comments} />
      <div className="detail-post">
        <div className="detail-post-body">
          <h2 className="post-title">{post.title}</h2>
          <div className="post-desc" dangerouslySetInnerHTML={{ __html: post.description }}></div>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
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
              <img src={!isErrorCover ? post.user?.picture : avaDefault} alt={post.user?.displayName} />
            </div>
            <p className="author-name">{post.user?.displayName}</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DetailPostContent;
