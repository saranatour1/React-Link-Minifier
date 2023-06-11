
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaGithub } from "react-icons/fa";
import './SideBar.css';

function SideBar() {
  return (
      <div className="fork-corner fc-size-small fc-pos-tl fc-animate-grow fc-theme-github"  id="fork-corner">
      <a href="https://github.com/saranatour1/Link-Minifier" rel="noreferrer" target="_blank" >
      <FaGithub className="ix"/>
      </a>
      </div>


  )
}

export default SideBar;
