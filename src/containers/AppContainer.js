import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { App } from '../components/App';

// Screen Dimentions.
const screenWidth = document.body.clientWidth;
const screenHeight = document.body.clientHeight;


export const AppContainer = () => {
  // THE LOADING COMPONENT APPEARANCE.
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  
  const toggleIsFirstLoading = () => {
    setIsFirstLoading( !isFirstLoading );
  }
  
  // Check if all the images loaded and no error accur.
  useEffect(() => {
    Promise.all(Array.from(document.images).map(img => {
      if (img.complete) {
        return Promise.resolve(img.naturalHeight !== 0);
      }
      return new Promise(resolve => {
        img.addEventListener('load', () => resolve(true));
        img.addEventListener('error', () => resolve(false));
      });
      })).then(results => {
        if (results.every(res => res)) {
          toggleIsFirstLoading();
        } else {
          console.log('Images loading completed. Some images failed to load!');
        }
      });
  // toggleIsFirstLoading is NOT included in the dependecies.
  // eslint-disable-next-line
  }, []);
  
  
  // DEVICE SCREEN SIZE.
  const [screenSize, setScreenSize] = useState({
    width: screenWidth,
    height: screenHeight
  });
  
  // __UPDATE WHEN SCREEN SIZE CHANGES.
  // Update dimentions every time the screen size changes.
  useLayoutEffect(() => {
    const screenDimentions = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener("resize", screenDimentions);
    return () => window.removeEventListener("resize", screenDimentions);
  }, []);


  // ANIMATION IN PROGRESS (all animations have same duration).
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);

  const toggleIsAnimationRunning = () => {
    setIsAnimationRunning( !isAnimationRunning );
  };


  // CURRENT DISPLAY INDEX (ORB).
  const [currentIndex, setCurrentIndex] = useState(6);
  const upcomingIndex = useRef(null);

  const increaseUpcomingIndex = () => {
    upcomingIndex.current = currentIndex + 1;
  };

  const decreaseUpcomingIndex = () => {
    upcomingIndex.current = currentIndex - 1;
  };

  const updateCurrentIndex = num => {
    setCurrentIndex(num);
  };


  return (
    <App
      isFirstLoading={ isFirstLoading } 
      currentIndex={ currentIndex }
      upcomingIndex={ upcomingIndex }
      increaseUpcomingIndex={ increaseUpcomingIndex }
      decreaseUpcomingIndex={ decreaseUpcomingIndex }
      updateCurrentIndex={ updateCurrentIndex }
      screenSize={ screenSize }
      isAnimationRunning={ isAnimationRunning }
      toggleIsAnimationRunning={ toggleIsAnimationRunning }
    />
  );
};
