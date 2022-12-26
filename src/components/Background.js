import React, { forwardRef } from 'react';
import bgLarge from '../images/background/space-bg-large.jpg';
import bgSmall from '../images/background/space-bg-small.jpg';
import { PropTypes } from 'prop-types';

export const Background = forwardRef((props, ref) => {
  
  return (    
    <picture 
      ref={ ref }
      id='background-container'
      style={{ top: `-${props.bgData[props.currentIndex]}px` }} 
      onLoad={ () => props.handleOnLoad() } 
    >
      <source srcSet={ bgSmall} media="(min-width: 1200px)" />
      <img src={ bgLarge } alt="space background" />
    </picture>
  );
});

Background.propTypes = {
  bgData: PropTypes.array,
  currentIndex: PropTypes.number,
  handleOnLoad: PropTypes.func
};
