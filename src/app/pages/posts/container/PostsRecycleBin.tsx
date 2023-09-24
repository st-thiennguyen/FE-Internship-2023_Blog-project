import React from 'react';
import GoToTopBtn from '../../../shared/components/GoToTopBtn';
import PostItemHorizontal from '../../../shared/components/PostItemHorizontal';

const PostsRecycleBin = () => {
  return (
    <div className="post-recyclebin">
      <div className="row">
        <div className="col col-12">
          <PostItemHorizontal />
        </div>
      </div>
      <GoToTopBtn />
    </div>
  );
};

export default PostsRecycleBin;
