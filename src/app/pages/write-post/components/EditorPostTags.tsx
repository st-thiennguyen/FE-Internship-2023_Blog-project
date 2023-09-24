import React, { useRef } from 'react';

import icRemove from '../../../../assets/icons/ic-remove-20.svg';

interface EditorPostTagsProps {
  tags: string[];
  setTags: (value: string[]) => void;
}
const EditorPostTags = ({ tags, setTags }: EditorPostTagsProps) => {
  const tagRef = useRef<HTMLInputElement>(null);

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && tagRef.current!.value !== '' && !tags.includes(tagRef.current!.value)) {
      setTags([...tags, tagRef.current!.value.trim()]);
      tagRef.current!.value = '';
    }
  };

  const handleRemoveTag = (id: number) => {
    const newTags = tags.filter((item, index) => index !== id);
    setTags([...newTags]);
  };
  return (
    <div className="editor-tags">
      <h5 className="editor-tags-title">Post Tags</h5>
      <input
        ref={tagRef}
        className="editor-tags-input"
        type="text"
        onKeyDown={handleAddTag}
        placeholder="Enter your tags ..."
      />
      <span className="tags-hint">Hit 'Enter' to add new tag</span>
      <ul className="editor-tags-list d-flex flex-wrap">
        {tags &&
          tags.map((e, index) => {
            return (
              <li className="editor-tags-item d-flex item-center" key={index}>
                <span className="tag editor-tags-text">{e} </span>
                <img src={icRemove} alt="Icon remove tags" title="Remove" onClick={() => handleRemoveTag(index)} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default EditorPostTags;
