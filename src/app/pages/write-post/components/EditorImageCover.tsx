import { useRef, useState } from 'react';

import iconImage from '../../../../assets/icons/ic-image-25.svg';
import iconImageLocal from '../../../../assets/icons/ic-image-computer.svg';
import iconImageNetwork from '../../../../assets/icons/ic-image-network.svg';

interface EditorImageCoverProps {
  photoPreview: string | undefined;
  setPhotoPreview: (value: string) => void;
}

const EditorImageCover = ({ photoPreview, setPhotoPreview }: EditorImageCoverProps) => {
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [isOpenInputLink, setIsOpenInputLink] = useState(false);

  const coverImageRef = useRef<HTMLInputElement>(null);
  const coverLinkRef = useRef<HTMLInputElement>(null);

  const clickSelectCover = () => {
    coverImageRef.current?.click();
  };

  const handleEnterLinkCover = () => {
    setIsOpenInputLink(!isOpenInputLink);
  };

  const handleUploadCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    } else {
      setPhotoPreview('');
    }
  };

  const handleLinkCover = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      setPhotoPreview(coverLinkRef.current!.value);
      coverLinkRef.current!.value = '';
      setIsOpenInputLink(false);
    }
  };

  return (
    <div className="editor-cover">
      <button className="btn btn-add-cover" type="button" onClick={() => setIsOpenImage(!isOpenImage)}>
        <img src={iconImage} alt="Icon add image cover" width={18} height={18} />
      </button>

      {isOpenImage && (
        <div className="editor-cover-select d-flex">
          <button className="btn btn-pick-cover" type="button" onClick={clickSelectCover}>
            <img src={iconImageLocal} alt="Icon add image cover" width={16} height={16} />
          </button>
          <button className="btn btn-pick-cover" type="button" onClick={handleEnterLinkCover}>
            <img src={iconImageNetwork} alt="Icon add image cover" width={16} height={16} />
          </button>
        </div>
      )}

      <input
        ref={coverImageRef}
        type="file"
        className="editor-cover-file"
        id="post-cover-file"
        onChange={handleUploadCover}
        accept="image/png, image/jpeg"
      />

      {isOpenInputLink && (
        <input
          ref={coverLinkRef}
          onKeyDown={handleLinkCover}
          type="text"
          className="editor-cover-link"
          placeholder="Enter the cover link here ..."
        />
      )}

      {photoPreview && (
        <div className="editor-cover-preview d-flex justify-center">
          <img src={photoPreview} alt="Image of preview of title" />
        </div>
      )}
    </div>
  );
};

export default EditorImageCover;
