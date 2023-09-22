import { useDispatch, useSelector } from 'react-redux';
import CommentItem from './CommentItem';
import { RootState } from '../../../stores/store';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { postCommentAction } from '../detail-post.actions';

const DetailPostComment = () => {
  const listComment = useSelector((state: RootState) => state.detail.comments);
  const currentUser = useSelector((state: RootState) => state.auth.auth?.userInfo);
  const dispatch = useDispatch();
  const { postId } = useParams();

  const inputComment = useRef<HTMLTextAreaElement>(null);
  const handleKeyDown = (e: any) => {
    e.target.style.height = 'inherit';
    const computed = window.getComputedStyle(e.target);

    const height =
      parseInt(computed.getPropertyValue('border-top-width'), 10) +
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      e.target.scrollHeight +
      parseInt(computed.getPropertyValue('padding-bottom'), 10) +
      parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    e.target.style.height = `${height}px`;
  };

  function handleComment(): void {
    const comment = inputComment.current?.value.trim();
    if (postId && comment) {
      dispatch(postCommentAction(postId, comment, currentUser) as any);
    }
  }

  function handleBlur(): void {
    inputComment.current!.value = inputComment.current!.value.trim();
  }

  return (
    <section className="section section-comment">
      <h2 className="comment-title">Comments {`(${listComment.length})`}</h2>
      <div className="comment-wrapper">
        <div className="comment-input-wrapper d-flex flex-column">
          <textarea
            placeholder="Add comment"
            ref={inputComment}
            className="comment-input"
            onBlur={handleBlur}
            onChange={handleKeyDown}
          />
          <button className="btn btn-primary btn-comment" onClick={handleComment}>
            Comment
          </button>
        </div>
        <ul className="comment-list">
          {listComment.length > 0 &&
            listComment.map((commentItem, index) => {
              return (
                <li className="comment-item">
                  <CommentItem key={index} commentItem={commentItem} />
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default DetailPostComment;
