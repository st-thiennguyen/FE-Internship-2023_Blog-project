import { Link } from 'react-router-dom';

import logo from '../../../../assets/images/logo.svg';

interface WritePostHeaderProps {
  onPublishPost?: () => void;
  isUpdate?: boolean;
  handleUpdatePost?: () => void;
}

const WritePostHeader = ({ onPublishPost, isUpdate, handleUpdatePost }: WritePostHeaderProps) => {
  return (
    <header className="header header-write-post">
      <div className="container">
        <div className="header-wrapper d-flex justify-between item-center">
          <h1 className="header-logo d-flex justify-between item-center">
            <Link to="/">
              <img src={logo} alt="Supremethod" />
            </Link>
          </h1>
          {!isUpdate ? (
            <button className="btn btn-primary btn-rounded" onClick={onPublishPost}>
              Publish
            </button>
          ) : (
            <button className="btn btn-primary btn-rounded" onClick={handleUpdatePost}>
              Update
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default WritePostHeader;
