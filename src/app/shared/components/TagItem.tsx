import { Link } from 'react-router-dom';

interface TagItemProps {
  tagName: string;
  color: string;
  linkTo?: string;
}
const TagItem = ({ tagName, color, linkTo }: TagItemProps) => {
  return (
    <Link to={linkTo || `/posts?tags=${tagName}`} className="d-flex item-center">
      <li className={`tag tag-${color}`}>
        <span>{tagName}</span>
      </li>
    </Link>
  );
};

export default TagItem;
