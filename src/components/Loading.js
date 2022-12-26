import React from "react";
import { PropTypes } from 'prop-types';

export const Loading = (props) => {
  return (
    <div 
      id={ props.loadingId }
      className={ props.loadingClass }
      onAnimationEnd={ () => props.handleOnAnimationEnd() }
    >
      <p id="loading-text">
        <span>Loading</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </p>
    </div>
  );
};

Loading.propTypes = {
  loadingId: PropTypes.string,
  loadingClass: PropTypes.string,
  handleOnAnimationEnd: PropTypes.func
};
