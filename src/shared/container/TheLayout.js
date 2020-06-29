import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import TheContent from './TheContent'
import TheSidebar from './TheSidebar'
import TheAside from './TheAside'
// import TheFooter from './TheFooter'

const TheLayout = () => {
  const darkMode = useSelector(state => state.darkMode)
  const classes = classNames(
    'c-app c-default-layout',
    darkMode && 'c-dark-theme'
  )

  return (
    <div className={classes}>
      <TheSidebar />
      <TheAside />
      <div className="c-wrapper">
        <div className="c-body">
          <TheContent />
        </div>
        {/* <TheFooter/> */}
      </div>
    </div>
  )
}

export default TheLayout
