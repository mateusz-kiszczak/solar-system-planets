import React, { useEffect, useState, useCallback, useRef } from "react";
import { Orbs } from '../components/Orbs';
import { orbsCollection } from '../utilities/orbsCollection';
import { PropTypes } from 'prop-types';

const orbsLength = orbsCollection.length;

export const OrbsContainer = (props) => {
  // ORBS CONTAINER SCROLLABLE PARTS.
  const [orbsData, setOrbsData] = useState({});

  const updateOrbsData = useCallback(() => {
    let screenHeight = props.screenSize.height;
    let orbsTopValues = [];

    for (let i = 0; i < orbsLength; i++) {
      orbsTopValues.push(screenHeight * i);
    }

    setOrbsData(orbsTopValues);
  }, [props.screenSize.height]);

  useEffect(() => {
    updateOrbsData();
  }, [props, props.screenSize, updateOrbsData]);


  // ORBS CONTAINER ANIMATION.
  const targetRef = useRef();
  const [helperAnimation, setHelperAnimation] = useState('');
  const changeHelperAnimation = str => {
    setHelperAnimation(str);
  };

  useEffect(() => {
    if (props.isAnimationRunning) {
      const keyFrames = [
        { top: `-${orbsData[props.currentIndex]}px` },
        { top: `-${orbsData[props.upcomingIndex.current]}px` }
      ];

      const timing = {
        duration: 500,
        iterations: 1,
        fill: 'forwards',
        easing: 'ease-out'
      }

      targetRef.current.animate(keyFrames, timing);
      
    }
  // currentIndex is NOT included in the dependecies.
  // eslint-disable-next-line
  }, [props, props.isAnimationRunning]);

  useEffect(() => {
    if (props.isAnimationRunning) {
      changeHelperAnimation('helper-animation');
    }
  }, [props.isAnimationRunning, helperAnimation]);

  const handleOnAnimaitonEnd = () => {
    if (props.isAnimationRunning) {
      changeHelperAnimation(''); 
      props.updateCurrentIndex(props.upcomingIndex.current);
      props.toggleIsAnimationRunning();
    }
  };

  // Prevent from mouse scroll when cursor is above obr's description.
  const [mouseOverDescription, setMouseOverDescription] = useState(false);

  const handleOnMouseOver = () => {
    setMouseOverDescription(true);
  };

  const handleOnMouseOut = () => {
    setMouseOverDescription(false);
  };

  // Handle next or previous orb when using mouse scroll.
  const handleOnWheel = (e) => {
    if (e.deltaY >= 0 && !mouseOverDescription) {
      if (((orbsLength - 1) > props.currentIndex) && !props.isAnimationRunning) {
        props.increaseUpcomingIndex();
        props.toggleIsAnimationRunning();
      }
    } else if (!mouseOverDescription) {
      if ((0 < props.currentIndex) && !props.isAnimationRunning) {
        props.decreaseUpcomingIndex();
        props.toggleIsAnimationRunning();
      }
    }
  };

  // Handle next or previous orb when swipe on mobile devices.
  const touchStartYposition = useRef(null);
  const touchEndYposition = useRef(null);

  const handleOnTouchStart = (e) => {
    touchStartYposition.current = e.touches[0].pageY;
  };

  const handleOnTouchMove = (e) => {
    touchEndYposition.current = e.touches[0].pageY;
  };

  const handleOnTouchEnd = () => {
    let touchDifference = 0;

    // If touch start and end has a value other than 0 (null).
    if (touchStartYposition.current !== null && touchEndYposition.current !== null) {
      touchDifference = touchStartYposition.current - touchEndYposition.current;
    }
    // Minimum length of touch move to works is 10% of screen height.
    const minimumTouch = Math.floor(props.screenSize.height / 10);

    if (Math.abs(touchDifference) > minimumTouch) {
      if (touchDifference > 0) {
        if (((orbsLength - 1) > props.currentIndex) && !props.isAnimationRunning) {
          props.increaseUpcomingIndex();
          props.toggleIsAnimationRunning();
        }
      } else if (touchDifference < 0) {
        if ((0 < props.currentIndex) && !props.isAnimationRunning) {
          props.decreaseUpcomingIndex();
          props.toggleIsAnimationRunning();
        }
      }
      console.log(touchStartYposition);
      console.log(touchEndYposition);
      console.log(touchDifference)
    } 

    // Reset touch position values.
    touchStartYposition.current = null;
    touchEndYposition.current = null;
  }

  return (
    <Orbs 
      ref={ targetRef }
      orbsCollection={ orbsCollection }
      orbsData={ orbsData }
      currentIndex={ props.currentIndex }
      isAnimationRunning={ props.isAnimationRunning }
      upcomingIndex={ props.upcomingIndex }
      helperAnimation={ helperAnimation }
      handleOnAnimaitonEnd={ handleOnAnimaitonEnd }
      handleOnWheel={ handleOnWheel }
      handleOnTouchStart={ handleOnTouchStart }
      handleOnTouchMove={ handleOnTouchMove }
      handleOnTouchEnd={ handleOnTouchEnd }
      handleOnMouseOver={ handleOnMouseOver }
      handleOnMouseOut={ handleOnMouseOut }
    />
  );
};

OrbsContainer.propTypes = {
  screenSize: PropTypes.object,
  currentIndex: PropTypes.number,
  upcomingIndex: PropTypes.object,
  isAnimationRunning: PropTypes.bool,
  updateCurrentIndex: PropTypes.func,
  toggleIsAnimationRunning: PropTypes.func
};
