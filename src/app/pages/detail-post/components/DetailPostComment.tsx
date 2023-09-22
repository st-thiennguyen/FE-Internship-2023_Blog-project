import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';
import { RootState } from '../../../stores/store';

const DetailPostComment = () => {
  const listComment = useSelector((state: RootState) => state.detail.comments);

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

  return (
    <section className="section section-comment">
      <h2 className="comment-title">Comments {`(${listComment.length})`}</h2>
      <div className="comment-wrapper">
        <div className="comment-input-wrapper d-flex flex-column">
          <textarea placeholder="Add comment" className="comment-input" onChange={handleKeyDown} />
          <button className="btn btn-primary btn-comment">Comment</button>
        </div>
        <ul className="comment-list">
          {listComment.length > 0 &&
            listComment.map((commentItem) => {
              return (
                <li className="comment-item">
                  <CommentItem commentItem={commentItem} />
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default DetailPostComment;
