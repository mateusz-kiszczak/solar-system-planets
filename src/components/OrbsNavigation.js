import React, { forwardRef } from "react";
import { PropTypes } from 'prop-types';

export const OrbsNavigation = forwardRef((props, ref) => {
  return (
    <div ref={ref} id="orbs-navigation-container" style={{ height: props.navHight }}>
      <div id="highlight" style={{ height: props.navHight, width: props.navHight }}></div>
      <div id="nav-overflow">
        <nav id="orbs-navigation">
          <div id="nav-buttons-container">
            <button 
              id="prev-orb"
              className="nav-button"
              style={{ width: Math.floor(props.navHight / 2) }}
              onClick={ () => props.handleOnClickPrevButton() }
              ><span>{`\u2770`}</span></button>
            <button 
              id="next-orb"
              className="nav-button"
              style={{ width: Math.floor(props.navHight / 2) }}
              onClick={ () => props.handleOnClickNextButton() }
              ><span>{`\u2771`}</span></button>
          </div>
          <div 
            id="orbs-miniatures"
            style={{ marginLeft: `${(props.navHight * props.currentIndex - props.navHight * 1.5) * -1}px` }}
          >
            {
              props.orbsCollection.map(item => {
                return (
                  <div 
                    style={{ 
                      width: props.navHight,
                      height: props.navHight,
                      backgroundImage: `url(${item.pathMini})`,
                    }}
                    className='orb-miniature'
                    key={`mini_${item.name}`}
                  >
                  </div>
                )
              })
            }
          </div>
        </nav>
      </div>
    </div>
  );
});

OrbsNavigation.propTypes = {
  navHight: PropTypes.number,
  currentIndex: PropTypes.number,
  handleOnClickPrevButton: PropTypes.func,
  handleOnClickNextButton: PropTypes.func,
  orbsCollection: PropTypes.array
};
