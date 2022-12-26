import React, { forwardRef } from "react";
import { PropTypes } from 'prop-types';

export const SingleOrb = forwardRef((props, ref) => {
  return (
    <section className='single-orb-container'>
      <h2 className="orb-header">{ props.orbName }</h2>
      <div 
        className={`orb-description-container ${props.orbDescriptionClass}`}
        onAnimationEnd={() => props.handleDescriptionOnAnimaitonEnd()}
      >
        <button 
          className="orb-description-button"
          onClick={ () => props.handleCloseButtonOnclick() }
          style={{ cursor: props.orbDescriptionClass === 'orb-description-open' ? 'pointer' : 'default' }}
        >
          <span className="button-string">close</span>
          <span className="angle-bracket">{'\u2716'}</span>
        </button>
        <hr className="horizontal-line"></hr>
        <p className="orb-description">{props.orbDescription}</p>
      </div>
      <img 
        ref={ ref } 
        onClick={ () => props.handleImageOnClick() }
        onAnimationEnd={ () => props.handleOnAnimaitonEnd() }
        className={`orb-image ${ props.helperAnimation }`}
        style={ props.isOrbZoomed ? props.orbImageStyleZoomed : props.orbImageStyle }
        src={ props.orbImageSrc } 
        alt={ props.orbName }/>
    </section>
  );
});

SingleOrb.propTypes = {
  orbName: PropTypes.string,
  orbDescriptionClass: PropTypes.string,
  handleDescriptionOnAnimaitonEnd: PropTypes.func,
  handleCloseButtonOnclick: PropTypes.func,
  orbDescription: PropTypes.string,
  handleImageOnClick: PropTypes.func,
  handleOnAnimaitonEnd: PropTypes.func,
  helperAnimation: PropTypes.string,
  isOrbZoomed: PropTypes.bool,
  orbImageStyleZoomed: PropTypes.object,
  orbImageStyle: PropTypes.object,
  orbImageSrc: PropTypes.string
};
