import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { fetchBookmark, updateBookmark } from '../../detail-post/detail-post.actions';

import PostItem from '../../../shared/components/PostItem';
import EmptyPost from '../../../shared/components/EmptyPost';

const Bookmark = () => {
  const dispatch = useDispatch();
  const postListBookmark = useSelector((state: RootState) => state.bookmark.data);

  const handleUpdateBookmark = (id: number) => {
    dispatch(updateBookmark(Number(id)) as any);
  };

  const isEmptyBookmark = postListBookmark.every((bookmark) => !bookmark.post);

  useEffect(() => {
    dispatch(fetchBookmark() as any);
  }, []);

  return (
    <section className="section section-bookmark">
      <div className="container">
        <h2 className="section-title text-primary">Your Saved Bookmarks</h2>
        <ul className="row">
          {postListBookmark &&
            postListBookmark.map(
              (bookmarkItem, index) =>
                bookmarkItem.post && (
                  <li className="post-item col col-3 col-lg-4 col-md-6 col-sm-12" key={index}>
                    <PostItem
                      post={bookmarkItem.post}
                      onClickBookmark={handleUpdateBookmark}
                      isVertical={true}
                      isInBookmark={true}
                    />
                  </li>
                ),
            )}
          {isEmptyBookmark && <EmptyPost desc="Your bookmark list is empty" />}
        </ul>
      </div>
    </section>
  );
};

export default Bookmark;
