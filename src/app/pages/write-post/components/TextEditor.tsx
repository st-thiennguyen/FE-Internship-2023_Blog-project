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
  setContent: OnChangeHandler;
  setError: (value: string) => void;
};

const TextEditor: React.FC<Props> = ({ value, setContent, placeholder, setError }) => {
  const reactQuillRef = useRef<ReactQuill>(null);

  const onChange = (content: string) => {
    const contentLength = content.replace(/<(.|\n)*?>/g, '').trim().length;

    const isValidMinContent = contentLength >= 50;
    const isValidMaxContent = contentLength <= 5000;

    if (content.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      setError('Content must not be null !');
    } else if (!isValidMinContent) {
      setError('Content must not be less than 50 characters !');
    } else if (isValidMinContent && !isValidMaxContent) {
      setError('Content must not be more than 5000 characters');
    } else {
      setError('');
    }
    setContent(content);
  };

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
        onChange={(content) => onChange(content)}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextEditor;
