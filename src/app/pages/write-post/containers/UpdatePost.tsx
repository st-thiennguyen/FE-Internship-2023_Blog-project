import { useEffect } from "react";
import WritePost from "../components/PostForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailBlog } from "../../detail-post/detail-post.actions";
import { PostModel } from "../../../models/post";
import { RootState } from "../../../stores/store";

const UpdatePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post: PostModel = useSelector((state: RootState) => state.detail.data) || {};
  useEffect(() => {
    dispatch(fetchDetailBlog(Number(id)) as any)
  }, []);

  return (
    <section className="section section-write-post">
      <div className="container">
        <WritePost post={post} />
      </div>
    </section>
  );
}
export default UpdatePost;
