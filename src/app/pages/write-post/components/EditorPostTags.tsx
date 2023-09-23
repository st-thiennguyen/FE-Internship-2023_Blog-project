import React, { useRef, useState } from 'react';
import { regexSpace } from '../../../shared/constants';

interface EditorPostTagsProps {
  tags: string[];
  setTags: (value: string[]) => void;
}

const EditorPostTags = ({ tags, setTags }: EditorPostTagsProps) => {
  const tagRef = useRef<HTMLInputElement>(null);
  const [tagValue, setTagValue] = useState('');
  const [validationError, setValidationError] = useState('');


  const handleTagChange = (e: any) => {
    const tagValue = e.target.value;
    setTagValue(tagValue);
    if (regexSpace.test(tagValue)) {
      setValidationError('Input cannot be just spaces');
    } else {
      setValidationError('');
    }
  };

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && !tags.includes(tagRef.current!.value) && !regexSpace.test(tagValue)) {
      setTags([...tags, tagRef.current!.value.trim()]);
      setTagValue('')
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
        onKeyUp={handleAddTag}
        onChange={(e) => handleTagChange(e)}
        value={tagValue}
        placeholder="Enter your tags ..."
      />
      {validationError ? <p className="write-post-form-error">{validationError}</p> : null}
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
