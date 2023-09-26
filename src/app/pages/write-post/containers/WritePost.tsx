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
import { RootState } from '../../../stores/store';
import { createPost, updatePost } from '../write-post.action';
import { fetchDetailBlog } from '../../detail-post/detail-post.actions';
import EditorPostVisibility from '../components/EditorPostVisibility';
import EditorImageCoverPreview from '../components/EditorImageCoverPreview';
import EditorPostActions from '../components/EditorPostActions';
import { getLocalStorage } from '../../../shared/utils';
import { StorageKey } from '../../../shared/constants';
import { Auth } from '../../../models/auth';

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

  const cover = useSelector((state: RootState) => state.imageSign.data.url);
  const isSuccess = useSelector((state: RootState) => state.writePost.isSuccess);
  const isError = useSelector((state: RootState) => state.writePost.isError);
  const message = useSelector((state: RootState) => state.writePost.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const detailPost: any = useSelector((state: RootState) => state.detail.data);
  const localStorageAuth  = getLocalStorage(StorageKey.AUTH, {} as Auth);
  const accessToken = localStorageAuth?.accessToken;

  const { id } = useParams();

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
    dispatch(updatePost({ ...data, content: content, status: statusPost }, detailPost.id) as any);
    setIsShowToast(true);
    setTimeout(() => {
      navigate(`/posts/${id}`);
    }, 3000);
  });

  const handleCreatePost = handleSubmit((data: any) => {
    if (validate()) {
      dispatch(createPost({ ...data, content: content, cover: cover, status: statusPost, tags: tags }) as any);
      setIsShowToast(true);
      setTimeout(() => {
        navigate(`/`);
      }, 3000);
    }
  });

  const onPublishPost = () => {
    validate();
    handleCreatePost();
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
                      isUpdate={isUpdate}
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
                        {...register('description')}
                        className="editor-detail-input"
                        placeholder="Description of your story ..."
                        defaultValue={detailPost.description}
                        readOnly
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
                  {photoPreview && (
                    <EditorImageCoverPreview
                      photoPreview={photoPreview}
                      onRemovePreview={() => setPhotoPreview('')}
                      isUpdate={isUpdate}
                    />
                  )}
                  <EditorPostTags
                    tags={detailPost.tags ? detailPost.tags : tags}
                    setTags={setTags}
                    isUpdate={isUpdate}
                  />
                  <EditorPostActions
                    isUpdate={isUpdate}
                    onPublish={handleUpdatePost}
                    onSaveDraft={() => alert('COMMING SOON')}
                  />
                </aside>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
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
                        {...register('description')}
                        className="editor-detail-input"
                        placeholder="Description of your story ..."
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
                  {photoPreview && (
                    <EditorImageCoverPreview
                      photoPreview={photoPreview}
                      onRemovePreview={() => setPhotoPreview('')}
                      isUpdate={isUpdate}
                    />
                  )}
                  <EditorPostTags tags={tags} setTags={setTags} isUpdate={isUpdate} />
                  <EditorPostActions
                    isUpdate={false}
                    onPublish={onPublishPost}
                    onSaveDraft={() => alert('COMMING SOON')}
                  />
                </aside>
              </div>
            </div>
          </section>
        </>
      )}

      {isShowToast && isSuccess && (
        <ToastMessage isSuccess={isSuccess} isShow={isSuccess} title="success" subtitle={message} />
      )}
      {isShowToast && isError && (
        <ToastMessage isSuccess={isError} isShow={isError} title={'Error'} subtitle={message} />
      )}
    </>
  );
};

export default WritePost;
