import React, { forwardRef } from "react";
import { SingleOrbContainer } from '../containers/SingleOrbContainer';
import { PropTypes } from 'prop-types';

export const Orbs = forwardRef((props, ref) => {
  return (
    <section 
      ref={ ref }
      id='orbs-container' 
      className={ props.helperAnimation }
      style={{ top: `-${props.orbsData[props.currentIndex]}px` }}
      onAnimationEnd={ () => props.handleOnAnimaitonEnd() }
      onWheel={ (e) => props.handleOnWheel(e) }
      onTouchStart={ (e) => props.handleOnTouchStart(e) }
      onTouchMove={ (e) => props.handleOnTouchMove(e) }
      onTouchEnd={ () => props.handleOnTouchEnd() }
    >   
      <h1 style={{ display: 'none' }}>Solar system</h1>
      <div className='orbs-collection'>
      {props.orbsCollection.map((obj) => {
        return (
          <SingleOrbContainer 
            key={`${obj.name}`}
            orbName={ obj.name }
            orbDescription={ obj.description }
            orbImageSrc={ obj.path }
            isAnimationRunning={ props.isAnimationRunning }
          />
          );
        })}
        </div>
    </section>
  );
});

Orbs.propTypes = {
  helperAnimation: PropTypes.string,
  // orbsData: PropTypes.array,
  currentIndex: PropTypes.number,
  orbsCollection: PropTypes.array,
  isAnimationRunning: PropTypes.bool,
  handleOnAnimaitonEnd: PropTypes.func,
  handleOnWheel: PropTypes.func,
  handleOnTouchStart: PropTypes.func,
  handleOnTouchMove: PropTypes.func,
  handleOnTouchEnd: PropTypes.func
};
