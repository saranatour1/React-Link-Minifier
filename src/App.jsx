import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
