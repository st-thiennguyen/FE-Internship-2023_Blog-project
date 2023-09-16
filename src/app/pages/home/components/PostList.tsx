import { useSelector } from 'react-redux';

import { PostModel } from '../../../models/post';
import { RootState } from '../../../redux/store';
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
        ? Array.from({ length: 6 }, (item, idx) => (
            <li className="post-item col col-6 col-md-12" key={idx}>
              <PostItemLoading />
            </li>
          ))
        : posts.map((post, idx) => {
            return (
              <li className="post-item col col-6 col-md-12" key={idx}>
                <PostItem post={post} />
              </li>
            );
          })}
    </ul>
  );
};

export default PostList;
