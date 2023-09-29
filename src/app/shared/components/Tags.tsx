import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface TagsProps {
  tags: string[];
}
const Tags = ({ tags }: TagsProps) => {
  const [randomColor, setRandomColor] = useState<string[]>([]);
  const colorList = ['red', 'orange', 'lime', 'green', 'blue', 'purple'];

  const randomColorTag = () => {
    let arrRandomColor: string[] = [];
    let count = 0;
    do {
      let color = colorList[Math.floor(Math.random() * colorList.length)];
      if (!arrRandomColor.includes(color)) {
        arrRandomColor.push(color);
        count++;
      }
    } while (count < 3);
    setRandomColor(arrRandomColor);
  };

  const sliceTagList = () => {
    return tags.slice(0, 3);
  };

  useEffect(() => {
    randomColorTag();
  }, []);
  return (
    <>
      <ul className="tag-list d-flex">
        {sliceTagList().map((tag, index) => {
          return (
            <Link to={`/posts?tags=${tag}`} key={index} className="d-flex item-center">
              <li className={`tag tag-${randomColor[index]}`}>{tag}</li>
            </Link>
          );
        })}
        {tags.length > 3 && (
          <Link to="#" className="d-flex item-center tag-disabled">
            <li className="tag tag-red">+{tags.length - 3}</li>
          </Link>
        )}
      </ul>
    </>
  );
};

export default Tags;
