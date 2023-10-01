const RecommendItemLoading = ({ isVertical }: { isVertical?: boolean }) => {
  return (
    <div className={`post d-flex item-center ${isVertical && 'post-vertical'}`}>
      <div className="post-content-wrapper d-flex flex-column justify-between">
        <div className="skeleton skeleton-text mb-5"></div>

        <div className="post-content-body d-flex justify-between flex-column">
          <div className="d-flex flex-column post-content">
            <div className="skeleton skeleton-title"></div>

            <div className="skeleton skeleton-text"></div>
          </div>
          <div className="post-info ">
            <div className="post-author d-flex item-center">
              <div className="skeleton author-avatar"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
            <span className="post-date skeleton"></span>
          </div>
        </div>
      </div>
      <div className="post-img-wrapper d-flex item-center">
        <div className="post-link skeleton">
          <div className="post-cover skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default RecommendItemLoading;
