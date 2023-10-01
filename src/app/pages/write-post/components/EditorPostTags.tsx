import React, { useRef, useState } from 'react';

import icRemove from '../../../../assets/icons/ic-remove-20.svg';

interface EditorPostTagsProps {
  tags: string[];
  setTags: (val: string[]) => void;
  isUpdate?: boolean;
}
const EditorPostTags = ({ tags, setTags }: EditorPostTagsProps) => {
  const tagRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState('');

  const validateTags = (): boolean => {
    let valid = true;
    if (tags.includes(tagRef.current!.value.trim())) {
      setErrorMessage('Tags must not be duplicated !');
      valid = false;
    } else if (tags.length >= 4) {
      setErrorMessage('You can only enter a maximum of 4 tags !');
      tagRef.current!.value = '';
      valid = false;
    } else {
      setErrorMessage('');
      valid = true;
    }
    return valid;
  };

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && tagRef.current!.value.trim() !== '') {
      if (validateTags()) {
        setTags([...tags, tagRef.current!.value.trim()]);
        tagRef.current!.value = '';
      }
    }
  };

  const handleRemoveTag = (id: number) => {
    const newTags = tags.filter((item, index: number) => index !== id);
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
        onBlur={() => (tagRef.current!.value = tagRef.current!.value.trim())}
        placeholder="Enter your tags ..."
      />
      <span className="tags-hint">Hit 'Enter' to add new tag</span>
      <p className="editor-detail-error">{errorMessage}</p>
      <ul className="editor-tags-list d-flex flex-wrap">
        {tags.map((tag, index) => {
          return (
            <li className="editor-tags-item d-flex item-center" key={index}>
              <span className="editor-tags-text">{tag} </span>
              <img src={icRemove} alt="Icon remove tag" title="Remove" onClick={() => handleRemoveTag(index)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EditorPostTags;
