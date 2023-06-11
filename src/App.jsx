// eslint-disable-next-line no-unused-vars
import React from 'react';
import './App.css'
import LinkSearch from './components/LinkSearch'
import SideBar from './components/SideBar'
import Heading from './components/Heading'

function App() {

  return (
    <>
    <div>
    <SideBar />
    </div>
    <Heading />

   <LinkSearch/>
    </>
  )
}

export default App
