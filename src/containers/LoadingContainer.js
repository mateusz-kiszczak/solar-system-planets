import React, { useEffect, useState } from "react";
import { Loading } from '../components/Loading';
import { PropTypes } from 'prop-types';

export const LoadingContainer = (props) => {
  const [loadingId, setLoadingId] = useState('loading-container-open');
  const [loadingClass, setLoadingClass] = useState('');

  useEffect(() => {
    if (!props.isFirstLoading) {
      setLoadingClass('loading-fade-out-animation');
    }
  }, [props.isFirstLoading]);

  const handleOnAnimationEnd = () => {
    setLoadingId('loading-container-closed');
    setLoadingClass('');
  };

  return (
    <Loading 
    loadingId={ loadingId }
    loadingClass={ loadingClass }
    handleOnAnimationEnd={ handleOnAnimationEnd }
    />
  );
};

LoadingContainer.propTypes = {
  isFirstLoading: PropTypes.bool
};
