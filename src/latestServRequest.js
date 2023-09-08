import React,{useEffect, useState} from 'react'
import {GetToken} from '../src/Api/auth'

import LatestServReqHome from './LatestSerReqHome'


function LatestServRequest() {
  const [toggle,setToggle]=useState(true )
  const Toggle=()=>{
    setToggle(!toggle)
  }
  return (
    <>
      <LatestServReqHome/>
      </>
  )
}

export default LatestServRequest
