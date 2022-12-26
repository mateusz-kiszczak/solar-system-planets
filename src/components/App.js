import React from "react";
import { OrbsContainer } from '../containers/OrbsContainer';
import { OrbsNavigationContainer } from '../containers/OrbsNavigationContainer';
import { LoadingContainer } from '../containers/LoadingContainer';
import { BackgroundContainer } from '../containers/BackgroundContainer';

export const App = (props) => {
  return (
    <div>
      <LoadingContainer 
        isFirstLoading={ props.isFirstLoading }
      />
      <div id='user-view'>
        <BackgroundContainer 
          currentIndex={ props.currentIndex }
          upcomingIndex={ props.upcomingIndex }
          screenSize={ props.screenSize }
          isAnimationRunning={ props.isAnimationRunning }
          />
        <OrbsContainer 
          screenSize={ props.screenSize }
          currentIndex={ props.currentIndex }
          upcomingIndex={ props.upcomingIndex }
          updateCurrentIndex={ props.updateCurrentIndex }
          increaseUpcomingIndex={ props.increaseUpcomingIndex }
          decreaseUpcomingIndex={ props.decreaseUpcomingIndex }
          isAnimationRunning={ props.isAnimationRunning }
          toggleIsAnimationRunning={ props.toggleIsAnimationRunning }
        />
      </div>
      <OrbsNavigationContainer 
        screenSize={ props.screenSize }
        currentIndex={ props.currentIndex }
        upcomingIndex={ props.upcomingIndex }
        increaseUpcomingIndex={ props.increaseUpcomingIndex }
        decreaseUpcomingIndex={ props.decreaseUpcomingIndex }
        isAnimationRunning={ props.isAnimationRunning }
        toggleIsAnimationRunning={ props.toggleIsAnimationRunning }
      />
    </div>
  );
};
