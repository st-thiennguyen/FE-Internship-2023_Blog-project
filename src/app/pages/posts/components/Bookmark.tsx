import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { fetchBookmark, updateBookmark } from '../../detail-post/detail-post.actions';

import PostItem from '../../../shared/components/PostItem';
import EmptyPost from '../../../shared/components/EmptyPost';
import SectionTitle from '../../../shared/components/SectionTitle';
import PostItemLoading from '../../home/components/PostItemLoading';

const Bookmark = () => {
  const dispatch = useDispatch();
  const postListBookmark = useSelector((state: RootState) => state.bookmark.data);
  const isLoading = useSelector((state: RootState) => state.post.isLoading);

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
        <SectionTitle title="Bookmarks" subtitle="A list of all your saved posts." />
        <ul className="post-list row">
          {postListBookmark &&
            postListBookmark.map(
              (bookmarkItem, index) =>
                bookmarkItem.post && (
                  <li className="post-item col col-4 col-md-6 col-sm-12" key={index}>
                    <PostItem
                      post={bookmarkItem.post}
                      onClickBookmark={handleUpdateBookmark}
                      isVertical={true}
                      isInBookmark={true}
                    />
                  </li>
                ),
            )}
          {isLoading && postListBookmark.length === 0 && (
            <ul className="row">
              {Array.from({ length: 6 }, (item, index) => (
                <li className="post-item col col-3 col-lg-4 col-md-6 col-sm-12" key={index}>
                  <PostItemLoading />
                </li>
              ))}
            </ul>
          )}
          {isEmptyBookmark && <EmptyPost desc="Your bookmark list is empty" />}
        </ul>
      </div>
    </section>
  );
};

export default Bookmark;
