import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../../../shared/components/PostItem';
import { fetchBookmark, updateBookmark } from '../../detail-post/detail-post.actions';
import { RootState } from '../../../stores/store';
import { useEffect } from 'react';

const Bookmark = () => {
  const dispatch = useDispatch();
  const postListBookmark = useSelector((state: RootState) => state.bookmark.data);

  const handleUpdateBookmark = (id: number) => {
    dispatch(updateBookmark(Number(id))as any);
  };
  useEffect(() => {
    dispatch(fetchBookmark() as any);
  }, [])


  return (
    <section className="section section-bookmark">
      <div className="container">
        <div className="section-header d-flex item-center justify-between">
          <h2 className="section-title">Your Saved Bookmarks</h2>
          <p className="bookmark-count">Total: {postListBookmark.length}</p>
        </div>
        <ul className="row">
          {postListBookmark && postListBookmark.map((bookmarkItem, index) => (
            bookmarkItem.post &&
            <li className="post-item col col-4" key={index}>
              <PostItem post={bookmarkItem.post} onClickBookmark={handleUpdateBookmark} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Bookmark;
