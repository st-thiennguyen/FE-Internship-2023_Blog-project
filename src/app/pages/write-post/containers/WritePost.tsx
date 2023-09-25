import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-quill/dist/quill.bubble.css';

import ToastMessage from '../../../shared/components/ToastMessage';
import EditorImageCover from '../components/EditorImageCover';
import EditorPostTags from '../components/EditorPostTags';
import TextEditor from '../components/TextEditor';
import WritePostHeader from '../components/WritePostHeader';
import { RootState } from '../../../stores/store';
import { createPost, updatePost } from '../write-post.action';
import { fetchDetailBlog } from '../../detail-post/detail-post.actions';
import EditorPostVisibility from '../components/EditorPostVisibility';
import EditorImageCoverPreview from '../components/EditorImageCoverPreview';
import EditorPostActions from '../components/EditorPostActions';

const schema = yup
  .object({
    title: yup
      .string()
      .required('Title must not be null!')
      .min(20, 'Title must not be less than 20 characters')
      .max(200, 'Title must not be more than 200 characters!'),
  })
  .required();

type FormData = {
  title: string;
};

interface writePostProps {
  isUpdate: boolean;
}

const WritePost = ({ isUpdate }: writePostProps) => {
  const [statusPost, setStatusPost] = useState('public');
  const [errorCoverMessage, setErrorCoverMessage] = useState('');
  const [errorContentMessage, setErrorContentMessage] = useState('');
  const [content, setContent] = useState<string>('');
  const [isShowToast, setIsShowToast] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  const cover = useSelector((state: any) => state.imageSign.data.url);
  const isSuccess = useSelector((state: any) => state.writePost.isSuccess);
  const isError = useSelector((state: any) => state.writePost.isError);
  const message = useSelector((state: any) => state.writePost.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  const detailPost: any = useSelector((state: RootState) => state.detail.data);
  const accessToken: string = useSelector((state: RootState) => state.auth.auth?.accessToken);

  const { id } = useParams();

  const handleDescriptionChange = (event: any) => {
    const inputValue = event.target.value;
    setDescription(inputValue);

    if (inputValue.length < 30) {
      setErrorDescription('Text must be at least 30 characters.');
    } else if (inputValue.length > 200) {
      setErrorDescription('Text must not exceed 200 characters.');
    } else {
      setErrorDescription('');
    }
  };


  const handleReset = (data: any) => {
    formRef.current!.reset();
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

  const handleUpdatePost = handleSubmit((data: any) => {
    dispatch(updatePost({...data, content: content, status: statusPost}, detailPost.id) as any);
    setIsShowToast(true);
    setTimeout(() => {
      navigate(`/posts/detail/${id}`);
    }, 3000);
  });

  const handleSubmitForm = handleSubmit((data: any) => {
    if (validate()) {
      dispatch(createPost({ ...data, content: content, cover: cover, status: statusPost, tags: tags, description: description }) as any);
      navigate(`/posts/detail/${id}`);
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

  useEffect(() => {
    dispatch(fetchDetailBlog(Number(id)) as any);
  }, []);

  useEffect(() => {
    if (detailPost.content && isUpdate) {
      setContent(detailPost.content);
    }
  }, [detailPost.content]);

  return (
    <>
      {isUpdate ? (
        <>
          <WritePostHeader handleUpdatePost={handleUpdatePost} isUpdate={isUpdate}/>
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
                            photoPreview={detailPost.cover}
                            setPhotoPreview={setPhotoPreview}
                            setErrorCoverMessage={setErrorCoverMessage}
                            isUpdate= {isUpdate}
                          />
                          <p className="editor-detail-error">{errorCoverMessage}</p>
                          <div className="editor-detail">
                            <h5 className="editor-detail-title">Post detail</h5>
                            <textarea
                              rows={1}
                              {...register('title')}
                              className="editor-detail-input"
                              placeholder="Title of your story ..."
                              defaultValue={detailPost.title}
                            />
                            <p className="editor-detail-error">{errors.title?.message}</p>
                            <textarea
                              rows={1}
                              value={detailPost.description}
                              className="editor-detail-input"
                              placeholder="Description of your story ..."
                              defaultValue={detailPost.description}
                              onChange={handleDescriptionChange}
                            />
                            {errorDescription && <p style={{ color: 'red' }}>{errorDescription}</p>}
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
                        {photoPreview && (
                          <EditorImageCoverPreview
                            photoPreview={photoPreview}
                            onRemovePreview={() => setPhotoPreview('')}
                            isUpdate={isUpdate}
                          />
                        )}
                        <EditorPostTags tags={detailPost.tags ? detailPost.tags : tags} setTags={setTags} isUpdate={isUpdate} />
                        <EditorPostActions onPublish={onPublishPost} onSaveDraft={() => alert('COMMING SOON')} />
                      </aside>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </>
      ) : (
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
                              rows={1}
                              {...register('title')}
                              className="editor-detail-input"
                              placeholder="Title of your story ..."
                            />
                            <p className="editor-detail-error">{errors.title?.message}</p>
                            <textarea
                              rows={1}
                              className="editor-detail-input"
                              placeholder="Description of your story ..."
                              onChange={handleDescriptionChange}
                            />
                            {errorDescription && <p style={{ color: 'red' }}>{errorDescription}</p>}


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
                        {photoPreview && (
                          <EditorImageCoverPreview
                            photoPreview={photoPreview}
                            onRemovePreview={() => setPhotoPreview('')}
                            isUpdate={isUpdate}
                          />
                        )}
                        <EditorPostTags tags={tags} setTags={setTags} isUpdate={isUpdate} />
                        <EditorPostActions onPublish={onPublishPost} onSaveDraft={() => alert('COMMING SOON')} />
                      </aside>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </main>
        </>
      )}

      {isShowToast && isSuccess && (
        <ToastMessage
          isSuccess={isSuccess}
          isShow={isSuccess}
          title="success"
          subtitle={message}
        />
      )}
      {isShowToast && isError && (
        <ToastMessage 
          isSuccess={isError} 
          isShow={isError} 
          title={'Error'} 
          subtitle={message} />
      )}
    </>
  );
};

export default WritePost;
