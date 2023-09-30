import { useEffect, useState } from 'react';
import TagItem from './TagItem';

interface TagsProps {
  tags: string[];
  showAll?: boolean;
}
const Tags = ({ tags, showAll = false }: TagsProps) => {
  const [randomColor, setRandomColor] = useState<string[]>([]);
  const colorList = ['red', 'orange', 'lime', 'green', 'blue', 'purple'];

  const randomColorTag = () => {
    if (tags?.length) {
      let arrRandomColor: string[] = [];
      let count = 0;
      do {
        let color = colorList[Math.floor(Math.random() * colorList.length)];
        if (!arrRandomColor.includes(color)) {
          arrRandomColor.push(color);
          count++;
        }
      } while (count < tags.length);
      setRandomColor(arrRandomColor);
    }
  };

  const sliceTagList = () => {
    return !showAll ? tags?.slice(0, 3) : tags;
  };

  useEffect(() => {
    randomColorTag();
  }, [tags]);
  return (
    <>
      <ul className="tag-list d-flex">
        {sliceTagList()?.map((tag, index) => {
          return <TagItem key={index} tagName={tag} color={randomColor[index]} />;
        })}
      </ul>
    </>
  );
};

export default Tags;
