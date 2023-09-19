import { memo, useEffect, useState } from 'react';

import { PostModel } from '../../../models/post';
import { pageSize } from '../../../shared/constants/post';
import { getPublicPosts } from '../../../shared/services';
import PostItemLoading from './PostItemLoading';
import PostList from './PostList';
import EmptyPost from './recommend/EmptyPost';

const LatestPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getData = async () => {
    setIsLoading(true);
    const response: any = await getPublicPosts(currentPage, pageSize);
    setTotalPage(response.totalPage);
    setCurrentPage(currentPage + 1);
    setPosts([...posts, ...response.data] || []);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const threshold = 400;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - threshold && !isLoading && currentPage + 1 <= totalPage) {
      getData();
    }
  };

  useEffect(() => {
    if (posts.length) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  return (
    <section className="section section-latest-post">
      <h2 className="section-title">Latest Post</h2>
      {posts.length ? <PostList posts={posts} /> : <EmptyPost />}
      {currentPage > 1 && isLoading && (
        <div className="row">
          {Array.from({ length: 6 }, (item, index) => (
            <li className="post-item col col-6 col-md-12" key={index}>
              <PostItemLoading />
            </li>
          ))}
        </div>
      )}
    </section>
  );
};

export default memo(LatestPost);
