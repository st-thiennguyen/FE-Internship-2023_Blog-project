import NoPost from '../../../assets/images/no-post.png';

interface EmptyPostProps {
  desc?: string;
}

const EmptyPost = ({ desc }: EmptyPostProps) => {
  return (
    <div className="empty-post d-flex item-center flex-column">
      <img src={NoPost} alt="No post found" className="empty-post-img" />
      <h2 className="empty-post-title">No Posts Available</h2>
      <p className="empty-post-desc">{desc}</p>
    </div>
  );
};

export default EmptyPost;
