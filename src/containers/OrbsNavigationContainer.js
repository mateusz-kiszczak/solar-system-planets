import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { OrbsNavigation } from "../components/OrbsNavigation";
import { orbsCollection } from "../utilities/orbsCollection";
import { PropTypes } from 'prop-types';

export const OrbsNavigationContainer = (props) => {
  const targetRef = useRef(null);
  const [navHight, setNavHight] = useState(null);

  useLayoutEffect(() => {
    setNavHight( Math.floor(targetRef.current.clientWidth / 4) )
  }, [props.screenSize]);

  // Next/prev Orb on mouse scroll is declared in "OrbsContainer" component.
  const handleOnClickNextButton = () => {
    if (((orbsCollection.length - 1) > props.currentIndex) && !props.isAnimationRunning) {
      props.increaseUpcomingIndex();
      props.toggleIsAnimationRunning();
    }
  };
  
  const handleOnClickPrevButton = () => {
    if ((0 < props.currentIndex) && !props.isAnimationRunning) {
      props.decreaseUpcomingIndex();
      props.toggleIsAnimationRunning();
    }
  };

  // Move the mini orbs belt when 'big' orb animation run (when switch orbs).
  useEffect(() => {
    if (props.isAnimationRunning) {
      const keyFrames = [
        { marginLeft: `${(navHight * props.currentIndex - navHight * 1.5) * -1}px` },
        { marginLeft: `${(navHight * props.upcomingIndex.current - navHight * 1.5) * -1}px` }
      ];

      const timing = {
        duration: 500,
        iterations: 1,
        fill: 'forwards',
        easing: 'ease-out'
      }

      // Ref is already defined. DOM accessed by JS document method.
      const miniOrbsContainer = document.getElementById('orbs-miniatures')
      miniOrbsContainer.animate(keyFrames, timing);
      
    }
  // currentIndex is NOT included in the dependecies.
  // eslint-disable-next-line
  }, [props, props.isAnimationRunning]);

  return (
    <OrbsNavigation 
      ref={ targetRef }
      navHight={ navHight }
      handleOnClickNextButton={ handleOnClickNextButton }
      handleOnClickPrevButton={ handleOnClickPrevButton }
      currentIndex={ props.currentIndex }
      orbsCollection={ orbsCollection }
    />
  );
};

OrbsNavigationContainer.propTypes = {
  screenSize: PropTypes.object,
  currentIndex: PropTypes.number,
  upcomingIndex: PropTypes.object,
  isAnimationRunning: PropTypes.bool,
  increaseUpcomingIndex: PropTypes.func,
  decreaseUpcomingIndex: PropTypes.func,
  toggleIsAnimationRunning: PropTypes.func
};
