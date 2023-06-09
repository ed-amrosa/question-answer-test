import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import FixedButton from './FixedButton';

//listens to scroll event when a certain offset is reached, shows a button that scrolls to top of the window
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <FixedButton 
      isVisible={isVisible} 
      label="Back to Top" 
      callback={scrollToTop} 
      iconComponent={<FaArrowCircleUp/>}
    />
  );
};

export default ScrollToTopButton;