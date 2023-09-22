import React, { useRef } from 'react';

interface EditorPostTagsProps {
  tags: string[];
  setTags: (value: string[]) => void;
  isUpdate?: boolean
}
const EditorPostTags = ({ tags, setTags, isUpdate }: EditorPostTagsProps) => {
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
      <input
        ref={tagRef}
        className="editor-tags-input"
        type="text"
        onKeyDown={handleAddTag}
        placeholder="Enter your tags ..."
        disabled={isUpdate}

      />
      <span className="tags-hint">Hit 'Enter' to add new tag</span>
      <ul className="editor-tags-list d-flex flex-wrap">
        {tags &&
          tags.map((e, index) => {
            return (
              <li className="editor-tags-item" key={index}>
                <span className="tag editor-tags-text" onClick={() => handleRemoveTag(index)}>
                  #{e}{' '}
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default EditorPostTags;
