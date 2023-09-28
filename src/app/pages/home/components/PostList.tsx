import { PostModel } from '../../../models/post';

import PostItem from '../../../shared/components/PostItem';
import EmptyPost from '../../../shared/components/EmptyPost';

interface PostListProps {
  posts: PostModel[];
  isLoading?: Boolean;
  cols?: number;
}
const PostList = ({ cols, posts, isLoading }: PostListProps) => {
  return posts.length > 0 || isLoading ? (
    <ul className="post-list row">
      {posts.map((post, index) => {
        return (
          <li className={`post-item col col-${cols || '6'} col-md-12`} key={index}>
            <PostItem post={post} />
          </li>
        );
      })}
    </ul>
  ) : (
    <EmptyPost />
  );
};
export default PostList;
