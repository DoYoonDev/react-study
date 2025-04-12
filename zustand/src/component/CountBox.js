import React from 'react'
import countStore from '../store/Store'

const CountBox = () => {
  const {count} = countStore();
  return (
    <div>
      <h2>CountBox : {count}</h2>      
    </div>
  )
}

export default CountBox
