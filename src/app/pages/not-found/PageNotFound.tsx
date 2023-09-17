import React from 'react';
import { useNavigate } from 'react-router-dom';

import banner from '../../../assets/images/banner-404.svg';
import Button from '../../shared/components/Button';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-404">
      <div className="container">
        <div className="page-404-wrapper text-center d-flex justify-between item-center">
          <div className="page-404-content">
            <h3 className="page-404-status">404</h3>
            <p className="page-404-title text-center">
              OOOps! <br /> Page Not Found
            </p>
            <Button label="Back to Home Page" handleClick={() => navigate('/')} />
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
