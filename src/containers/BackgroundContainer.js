import React, { useState, useRef, useEffect, useCallback } from "react";
import { orbsCollection } from '../utilities/orbsCollection';
import { Background } from '../components/Background';
import { PropTypes } from 'prop-types';

const orbsLength = orbsCollection.length;

export const BackgroundContainer = (props) => {
  // SPACE BACKGROUND DIMENTIONS. 
  const targetRef = useRef();
  const [bgDimentions, setBgDimentions] = useState({});

  const setCurrentBgDimentions = () => {
    if (targetRef.current) {
      setBgDimentions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  };
  

  // BACKGROUND SCROLLABLE PARTS.
  const [bgData, setBgData] = useState([]);

  const updateBgData = useCallback(() => {
    let screenHeight = props.screenSize.height;
    let bgHeight = bgDimentions.height;
    let bgDifference = bgHeight - screenHeight;
    let bgDifferencePart = Math.floor( bgDifference / orbsLength );
    let bgPartsTopValues = [];

    for (let i = 0; i < orbsLength; i++) {
      bgPartsTopValues.push((bgDifferencePart > 0) ? (bgDifferencePart * i) : 0);
    }

    setBgData(bgPartsTopValues);
  }, [props.screenSize.height, bgDimentions.height]);

  // When screen size changes, update background dimentions.
  useEffect(() => {
    setCurrentBgDimentions();
  }, [props, props.screenSize, updateBgData]);

  // When background dimentions updated, update other background data.
  useEffect(() => {
    updateBgData();
  }, [bgDimentions, updateBgData])
  
  // __HANDLE OnLOAD IN BACKGROUND COMPONENT.
  const handleOnLoad = () => {
    setCurrentBgDimentions();
    updateBgData();
  };


  // BACKGROUND ANIMATION.
  useEffect(() => {
    if (props.isAnimationRunning) {
      const keyFrames = [
        { top: `-${bgData[props.currentIndex]}px` },
        { top: `-${bgData[props.upcomingIndex.current]}px` }
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

  return (    
    <Background 
      ref={ targetRef }
      handleOnLoad={ handleOnLoad }
      currentIndex={ props.currentIndex }
      bgData={ bgData }
    />
  );
};

BackgroundContainer.propTypes = {
  screenSize: PropTypes.object,
  currentIndex: PropTypes.number,
  upcomingIndex: PropTypes.object,
  isAnimationRunning: PropTypes.bool
};
