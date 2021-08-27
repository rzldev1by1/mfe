import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TheContent from './TheContent';
import TheSidebar from './TheSidebar';
import TheHeader from './TheHeader';

const TheLayout = () => {
  const dispatch = useDispatch();
  const [expired, setExpired] = useState(useSelector((state) => state.expired));
  // const darkMode = useSelector((state) => state.darkMode);
  const darkMode = useSelector((state) => state.darkModeMLS);
  const onActive = () => {
    dispatch({ type: 'EXPIRED' });
  };
  // const { reset } = useIdleTimer({
  //   events: ['mousedown'],
  //   timeout: (1000 * 60 * 60 * 2) - 60000, // 2 hours
  //   onIdle: () => { setExpired(!expired)},
  //   onActive: onActive
  // })

  return (
    // <div className={`c-app c-default-layout ${darkMode && 'c-dark-theme'}`}>
    <div className={`c-app c-default-layout ${darkMode ? 'customDarkMode' : ''}`}>
      <TheSidebar />
      <TheHeader />
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
