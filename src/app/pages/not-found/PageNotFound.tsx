import { useNavigate } from 'react-router-dom';

import Button from '../../shared/components/Button';
import banner from '../../../assets/images/banner-404.svg';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-404">
      <div className="container">
        <div className="page-404-wrapper  d-flex justify-between item-center">
          <div className="page-404-content">
            <h3 className="page-404-status">404</h3>
            <p className="page-404-title">
              OOOps! <br /> Page Not Found
            </p>
            <p className="page-404-subtitle">This page doesn’t exist or was removed! We suggest you back to home</p>
            <Button label="Back to Home Page" optionClassName="btn-primary" handleClick={() => navigate('/')} />
          </div>
          <div className="page-404-banner d-flex justify-center item-center">
            <div className="page-404-img">
              <img src={banner} alt="Page 404 not found banner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
