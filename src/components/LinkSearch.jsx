// eslint-disable-next-line no-unused-vars
import React from 'react';
// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import validator from 'validator';
// import {  Routes,  Route,  Link} from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaCopy } from "react-icons/fa";

// eslint-disable-next-line no-unused-vars
const LinkSearch = (props) => {
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [message ,setMessage] =useState("");
  // const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then((res) => setMessage(res.data.message))
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  }, []);
  

  const acceptLinkId = (e) => {
    console.log(e.target.value);
    if(validator.isURL(e.target.value) && e.target.value !=="" ){
      setErrorMessage("This is a valid URL");
    }else if(e.target.value){
      setErrorMessage("Please Set to a valid URL!");
    }else{
      setErrorMessage("");
      setMessage("");
    }
    setLink(e.target.value);
  };

  const shortenLink = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(link);
  
    if (link) { 
      sendData();
    }
  };


  const sendData = () => {
    fetch('http://localhost:8000/minify', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ link }) 
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMessage(result.message);
      })
      .catch((error) => {
        console.log(error); 
      });
  };
  
  

  return (
    <div>
      <form action="/minify" method="post">
        <div>
            <label htmlFor="link"  className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Post Your Link here: 
            </label>
            <input type="search" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="http://Example.com/wee" onChange={(e)=> acceptLinkId(e)} />
            <button type="submit" className=" mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick ={(e) => shortenLink(e)}> Submit</button>
        </div>
        <p><small className="text-xs text-gray-900 dark:text-white">{errorMessage}</small></p>
      </form>
    <p>Other message : <a href="{message}">{message}</a>  <button className="" onClick={() => {navigator.clipboard.writeText(message)}}> <FaCopy/> </button>  </p>
    </div>
    
  );
};



export default LinkSearch;
