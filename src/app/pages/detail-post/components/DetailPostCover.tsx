type DetailPostCoverProps = {
  cover: string;
};

const DetailPostCover = ({ cover }: DetailPostCoverProps) => {
  return (
    <section className="section section-detail-cover">
      <div className="detail-cover">
        <div className="cover-img">
          <img src={cover} alt="background cover" className="cover-background" />
        </div>
      </div>
    </section>
  );
};

export default DetailPostCover;
