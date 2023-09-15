import { PostModel } from '../../../models/post';
import PostItem from '../../../shared/components/PostItem';

interface PostListProps {
  posts: PostModel[];
}
const PostList = ({ posts }: PostListProps) => {
  return (
    <ul className="post-list">
      <div className="row">
        {posts.map((post) => {
          return (
            <div className="col col-6 col-md-12" key={post.id}>
              <PostItem post={post} />
            </div>
          );
        })}
      </div>
    </ul>
  );
};

export default PostList;
