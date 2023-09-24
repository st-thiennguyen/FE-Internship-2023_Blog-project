import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.bubble.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import ToastMessage from '../../../shared/components/ToastMessage';
import { RootState } from '../../../stores/store';
import EditorImageCover from '../components/EditorImageCover';
import EditorPostActions from '../components/EditorPostActions';
import EditorPostTags from '../components/EditorPostTags';
import EditorPostVisibility from '../components/EditorPostVisibility';
import TextEditor from '../components/TextEditor';
import WritePostHeader from '../components/WritePostHeader';
import { createPost } from '../write-post.action';

const isValidFileType = (fileName: string): boolean => {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Add more extensions as needed
  const ext = fileName.substr(fileName.lastIndexOf('.')).toLowerCase();
  return validExtensions.includes(ext);
};
const schema = yup
  .object({
    title: yup
      .string()
      .required('Title must not be null!')
      .min(20, 'Title must not be less than 20 characters')
      .max(200, 'Title must not be more than 200 characters!'),
    description: yup
      .string()
      .required('Description must not be null!')
      .min(50, 'Description must not be less than 100 characters')
      .max(300, 'Description must not be more than 300 characters!'),
  })
  .required();

type FormData = {
  title: string;
  description: string;
};

const WritePost = () => {
  const [statusPost, setStatusPost] = useState('public');
  const [errorCoverMessage, setErrorCoverMessage] = useState('');
  const [errorContentMessage, setErrorContentMessage] = useState('');
  const [content, setContent] = useState<string>('');
  const [isShowToast, setIsShowToast] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string>();
  const formRef: any = useRef(null);

  let cover = useSelector((state: any) => state.imageSign.data.url);
  const isSuccess = useSelector((state: any) => state.writePost.isSuccess);
  const isError = useSelector((state: any) => state.writePost.isSuccess);
  const message = useSelector((state: any) => state.writePost.message);
  const accessToken: string = useSelector((state: RootState) => state.auth.auth?.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReset = (data: any) => {
    formRef.current.reset();
    data.description = '';
    data.title = '';
    setPhotoPreview('');
    setTags([]);
    setContent('');
    setErrorContentMessage('');
    setErrorCoverMessage('');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const validate = (): boolean => {
    let isValid = true;
    if (!photoPreview) {
      setErrorCoverMessage('Image cover is required !');
      isValid = false;
    }
    if (!content) {
      setErrorContentMessage('Content must not be null !');
      isValid = false;
    }
    if (errorContentMessage || errorCoverMessage) {
      isValid = false;
    }
    return isValid;
  };

  const handleSubmitForm = handleSubmit((data: any) => {
    if (validate()) {
      dispatch(createPost({ ...data, content: content, cover: cover, status: statusPost, tags: tags }) as any);
      setIsShowToast(true);
      handleReset(data);
    }
  });

  const onPublishPost = () => {
    validate();
    handleSubmitForm();
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  return (
    <>
      <WritePostHeader onPublishPost={onPublishPost} />
      <main className="main main-editor-post">
        <div className="container">
          <div className="main-body">
            <section className="section section-write-post">
              <div className="container">
                <h2 className="section-title text-primary section-title-editor">What's for today ? </h2>
                <div className="section-body row">
                  <div className="col col-9">
                    <form className="write-post-form d-flex flex-column" ref={formRef}>
                      <EditorImageCover
                        photoPreview={photoPreview}
                        setPhotoPreview={setPhotoPreview}
                        setErrorCoverMessage={setErrorCoverMessage}
                      />
                      <p className="editor-detail-error">{errorCoverMessage}</p>
                      <div className="editor-detail">
                        <h5 className="editor-detail-title">Post detail</h5>
                        <textarea
                          {...register('title')}
                          className="editor-detail-input"
                          placeholder="Title your story ..."
                        />
                        <p className="editor-detail-error">{errors.title?.message}</p>
                        <textarea
                          {...register('description')}
                          className="editor-detail-input"
                          placeholder="Description your story ..."
                        />
                        <p className="editor-detail-error">{errors.description?.message}</p>

                        <div className="editor-detail-area">
                          <TextEditor
                            value={content}
                            placeholder={'Write your story ...'}
                            setError={setErrorContentMessage}
                            setContent={setContent}
                          />
                          <p className="editor-detail-error">{errorContentMessage}</p>
                        </div>
                      </div>
                    </form>
                  </div>
                  <aside className="aside aside-write-post d-flex flex-column  col col-3">
                    <EditorPostVisibility onChangeValue={setStatusPost} />
                    <EditorPostTags tags={tags} setTags={setTags} />
                    <EditorPostActions onPublish={onPublishPost} onSaveDraft={() => alert('COMMING SOON')} />
                  </aside>
                </div>
              </div>
            </section>

            {isShowToast && isSuccess && (
              <ToastMessage isSuccess={isSuccess} isShow={isSuccess} title="success" subtitle="Create post success" />
            )}
            {isShowToast && isError && (
              <ToastMessage isSuccess={isSuccess} isShow={isError} title={'Error'} subtitle={message} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default WritePost;
