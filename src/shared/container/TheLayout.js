import React from 'react';
import { useSelector } from 'react-redux';
import TheContent from './TheContent';
import TheSidebar from './TheSidebar';

const TheLayout = () => {
  const darkMode = useSelector((state) => state.darkModeMLS);

  return (
    // <div className={`c-app c-default-layout ${darkMode && 'c-dark-theme'}`}>
    <div className={`c-app c-default-layout ${darkMode ? 'customDarkMode' : ''}`}>
      <TheSidebar />
      {/* <TheAside /> */}
      <div className="c-wrapper">
        <div className="c-body">
          <TheContent />
        </div>
        {/* <TheFooter/> */}
      </div>
    </div>
  );
};

export default TheLayout;
