import React, { useState, useEffect } from 'react'
import { Categories } from './Categories';
import { fetchUserByName } from './utils/utils'

export const Sidebar = ({setUserDetails, userDetails, setIsLoggedIn, isLoggedIn}) => {

const [ userInput, setUserInput ] = useState('');

const handleSubmit = (event) => {
    event.preventDefault();
    fetchUserByName(userInput).then((result)=>{
        setUserDetails(result)
    });
    setIsLoggedIn(true);
    setUserInput("");
  };

const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

const handleLogout = () => {
    setUserDetails([])
    setIsLoggedIn(false)
};

    return (
        <div className='sidebar'>
            {isLoggedIn ?  
            <>
            <img className='avatarPic' src={userDetails.avatar_url}></img>
            <p className='userName'>{userDetails.username}</p>
            <button className='logoutButton' onClick={handleLogout}>Logout</button>
            </>
            :
             <form className='loginInput' onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter username' onChange={handleInputChange} value={userInput}>
                </input>
                <button type='submit'>Login</button>
            </form>
            }
            <Categories />
        </div>
    )
};
