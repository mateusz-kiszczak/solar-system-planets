import React, { useEffect, useState, useRef } from 'react';
import { SingleOrb } from '../components/SingleOrb';
import { PropTypes } from 'prop-types';

export const SingleOrbContainer = (props) => {
  const [orbImageStyle, setOrbImageStyle] = useState({
    width: '80%',
    top: '25%',
    left: '10%',
  });

  const [orbImageStyleZoomed, setOrbImageStyleZoomed] = useState({
    width: '200%',
    top: '60%',
    left: '-50%',
  });

  const [isOrbZoomAnimationRun, setIsOrbZoomAnimationRun] = useState(false);
  const [isOrbZoomed, setIsOrbZoomed] = useState(false);

  useEffect(() => {
    if (props.orbName === 'sun') {
      setOrbImageStyle({
        width: '100%',
        top: '21%',
        left: '0',
      });
    }
    if (props.orbName === 'saturn') {
      setOrbImageStyle({
        width: '80%',
        top: '35%',
        left: '10%',
      });
    }
  }, [props.orbName]);

  useEffect(() => {
    if (props.orbName === 'sun') {
      setOrbImageStyleZoomed({
        width: '220%',
        top: '56%',
        left: '-60%',
      });
    }
    if (props.orbName === 'saturn') {
      setOrbImageStyleZoomed({
        width: '400%',
        top: '60%',
        left: '-150%',
      });
    }
  }, [props.orbName]);

  // ORB IMAGE ANIMATION.
  const targetImg = useRef();
  const [helperAnimation, setHelperAnimation] = useState('');
  const changeHelperAnimation = str => {
    setHelperAnimation(str);
  };

  useEffect(() => {
    if (isOrbZoomAnimationRun) {
      const keyFrames = !isOrbZoomed ?
        [orbImageStyle, orbImageStyleZoomed] :
        [orbImageStyleZoomed, orbImageStyle];

      const timing = {
        duration: !isOrbZoomed ? 500 : 100,
        iterations: 1,
        fill: 'forwards',
        easing: 'ease-out'
      }

      targetImg.current.animate(keyFrames, timing);
      
    }
  // eslint-disable-next-line
  }, [isOrbZoomAnimationRun]);

  useEffect(() => {
    if (isOrbZoomAnimationRun) {
      changeHelperAnimation(!isOrbZoomed ? 'helper-animation' : 'helper-animation-fast');
    }
  // isOrbZoomed is NOT included in the dependecies.
  // eslint-disable-next-line
  }, [isOrbZoomAnimationRun, helperAnimation]);

  const handleOnAnimaitonEnd = () => {
    if (isOrbZoomAnimationRun) {
      changeHelperAnimation(''); 
      setIsOrbZoomAnimationRun(false);
      if (!isOrbZoomed) {
        setIsOrbZoomed(true);
      } else {
        setIsOrbZoomed(false);
      }
    }
  };

  const handleImageOnClick = () => {
    setIsOrbZoomAnimationRun(true);
    //Fade in description.
    if (!isOrbZoomed) {
      setOrbDescriptionClass('orb-description-open-fade-in');
    } else if (isOrbZoomed) {
      setOrbDescriptionClass('orb-description-open-fade-out');
    }
  };

  // When the orb (planet) is changed through the navigation button.
  // The Planets image is zoomed out and the description fades out.
  // Section backs to its state from the begining.
  useEffect(() => {
    if (isOrbZoomed) {
      setIsOrbZoomAnimationRun(true);
      setOrbDescriptionClass('orb-description-open-fade-out');
    }
  // isOrbZoomed is NOT included in the dependecies.
  // eslint-disable-next-line
  }, [props.isAnimationRunning]);


  //ORB DESCRIPTION.
  // We used isOrbZoomed to check whenever description is visible or not.
  const [orbDescriptionClass, setOrbDescriptionClass] = useState('orb-description-closed');

  const handleDescriptionOnAnimaitonEnd = () => {
    if (orbDescriptionClass === 'orb-description-open-fade-in') {
      setOrbDescriptionClass('orb-description-open');
    } else if (orbDescriptionClass === 'orb-description-open-fade-out') {
      setOrbDescriptionClass('orb-description-closed');
    }
  };

  const handleCloseButtonOnclick = () => {
    if (isOrbZoomed) {
      setIsOrbZoomAnimationRun(true);
      setOrbDescriptionClass('orb-description-open-fade-out');
    }
  }

  return (
    <SingleOrb
      ref={ targetImg }
      orbName={ props.orbName }
      orbDescription={ props.orbDescription }
      orbImageSrc={ props.orbImageSrc }
      orbImageStyle={ orbImageStyle }
      orbImageStyleZoomed={ orbImageStyleZoomed }
      helperAnimation={ helperAnimation }
      isOrbZoomed={ isOrbZoomed }
      orbDescriptionClass={ orbDescriptionClass }
      handleImageOnClick={ handleImageOnClick }
      handleOnAnimaitonEnd={ handleOnAnimaitonEnd }
      handleDescriptionOnAnimaitonEnd={ handleDescriptionOnAnimaitonEnd }
      handleCloseButtonOnclick={ handleCloseButtonOnclick }
      handleOnMouseOver={ props.handleOnMouseOver }
      handleOnMouseOut={ props.handleOnMouseOut }
    />
  );
};

SingleOrbContainer.propTypes = {
  orbName: PropTypes.string,
  isAnimationRunning: PropTypes.bool
};
