import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/store';
import { PostModel } from '../../../models/post';

import PostItem from '../../../shared/components/PostItem';
import PostItemLoading from './PostItemLoading';

interface PostListProps {
  posts: PostModel[];
}
const PostList = ({ posts }: PostListProps) => {
  const currentPage = useSelector((state: RootState) => state.post.currentPage);
  const isLoading = useSelector((state: RootState) => state.post.isLoading);
  return (
    <ul className="post-list row">
      {isLoading && currentPage === 1
        ? Array.from({ length: 6 }, (item, index) => (
            <li className="post-item col col-6 col-md-12" key={index}>
              <PostItemLoading />
            </li>
          ))
        : posts.map((post, index) => {
            return (
              <li className="post-item col col-6 col-md-12" key={index}>
                <PostItem post={post} />
              </li>
            );
          })}
    </ul>
  );
};

export default PostList;
