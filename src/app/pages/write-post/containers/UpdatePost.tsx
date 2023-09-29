import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import WritePost from '../components/PostForm';
import { RootState } from '../../../stores/store';
import { showToast } from '../../../shared/components/toast/toast.actions';
import { ToastType } from '../../../models/toast';
import { getDetailPost } from '../../../shared/services';

const UpdatePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector((state: RootState) => state.auth.userInfo.id);
  const [postData, setPostData] = useState<any>([])

  useEffect(() => {
    (async () => {
      try {
        const res: any = await getDetailPost(Number(id));
        if (Number(res.user.id) !== Number(userID)) {
          dispatch(showToast('This article is not yours !', ToastType.ERROR));
          navigate('/');
        } else {
          setPostData(res);
        }
      } catch (error) {
        dispatch(showToast('This article is not exist !', ToastType.ERROR));
        navigate('/')
      }
    }
    )()
  }, []);

  return (
    <section className="section section-write-post">
      <div className="container">
        <WritePost post={postData} />
      </div>
    </section>
  );
};
export default UpdatePost;
