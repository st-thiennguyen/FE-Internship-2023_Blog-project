import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'code',
  'color',
  'background',
  'code-block',
  'align',
];

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value: string;
  placeholder: string;
  onChange: OnChangeHandler;
};

const TextEditor: React.FC<Props> = ({ value, onChange, placeholder }) => {
  const reactQuillRef = useRef<ReactQuill>(null);

  // const imageHandler = () => {};

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          [{ color: [] }, { background: [] }, { align: [] }],
          ['clean'],
        ],
        handlers: {
          // image: imageHandler,
        },
      },
    }),
    [],
  );

  return (
    <>
      <ReactQuill
        ref={reactQuillRef}
        className="quill-text-editor"
        theme="snow"
        value={value || ''}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextEditor;
