import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { postCommentAction } from '../detail-post.actions';
import { getLocalStorage } from '../../../shared/utils';
import { StorageKey } from '../../../shared/constants';

import CommentItem from './CommentItem';

const DetailPostComment = React.forwardRef<HTMLDivElement>((props, ref) => {
  const listComment = useSelector((state: RootState) => state.detail.comments);
  const currentUser = useSelector((state: RootState) => state.auth.userInfo);
  const isLogin = getLocalStorage(StorageKey.ACCESS_TOKEN, '');

  const dispatch = useDispatch();
  const { id } = useParams();

  const inputComment = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleComment = () => {
    const comment = inputComment.current!.value.trim();
    if (comment) {
      dispatch(postCommentAction(id!, comment, currentUser) as any);
      inputComment.current!.value = '';
    }
  };

  const handleTrimInput = () => {
    inputComment.current!.value = inputComment.current!.value.trim();
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey && e.key === 'Enter') {
      handleComment();
    }
  };

  return (
    <section ref={ref} className="section section-comment">
      <h3 className="comment-title">Comments {`(${listComment.length})`}</h3>
      <div className="comment-wrapper">
        {isLogin ? (
          <div className="comment-input-wrapper d-flex flex-column">
            <textarea
              placeholder="Add comment"
              ref={inputComment}
              rows={4}
              className="comment-input"
              onBlur={handleTrimInput}
              onChange={handleKeyDown}
              onKeyUp={handleEnter}
            />
            <button className="btn btn-primary btn-comment" onClick={handleComment}>
              Comment
            </button>
          </div>
        ) : (
          <div className="comment-input-hidden text-center">
            <Link to="/auth/login" className="text-primary text-bold">
              Login
            </Link>
            <span> to comment on this post</span>
          </div>
        )}
        <ul className="comment-list">
          {listComment.length > 0 &&
            listComment.map((commentItem, id) => {
              return (
                <li className="comment-item" key={id}>
                  <CommentItem commentItem={commentItem} userId={currentUser?.id} />
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
});

export default DetailPostComment;
