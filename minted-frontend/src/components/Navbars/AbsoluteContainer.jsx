import React from 'react'

const AbsoluteContainer = ({ children }) => {
  return (
    <div className="nav-container position-absolute w-100">
      {
        children
      }
    </div>
  )
}

export default AbsoluteContainer