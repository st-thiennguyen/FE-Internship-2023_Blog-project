import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { fetchBookmark, updateBookmark } from '../../detail-post/detail-post.actions';

import PostItem from '../../../shared/components/PostItem';
import EmptyPost from '../../../shared/components/EmptyPost';
import SectionTitle from '../../../shared/components/SectionTitle';

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
        <SectionTitle title="Your Saved Bookmarks" subtitle="A list of all your posts. Let’s get you some views! 🚀" />
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
