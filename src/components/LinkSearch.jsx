import React from 'react';
// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import validator from 'validator';
import {  Routes,  Route,  Link} from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
            <label htmlFor="link" >
            Post Your Link here: 
            </label>
            <input type="search" id="link" onChange={(e)=> acceptLinkId(e)} />
            <button type="submit" onClick ={(e) => shortenLink(e)}> Submit</button>
        </div>
        <p><small>{errorMessage}</small></p>
      </form>
    <p>Other message : {message} </p>
    </div>
    
  );
};

LinkSearch.propTypes = {
  // Define prop types here
};

export default LinkSearch;
