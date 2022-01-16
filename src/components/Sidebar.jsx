import React, { useState, useContext } from 'react'
import { Categories } from './Categories';
import { fetchUserByName } from './utils/utils'
import { UserDetailsContext } from './contexts/userDetails';

export const Sidebar = ({ setIsLoggedIn, isLoggedIn}) => {

const [ userInput, setUserInput ] = useState('tickle122');
const { userDetails, setUserDetails } = useContext(UserDetailsContext);

const handleSubmit = (event) => {
    event.preventDefault();
    fetchUserByName(userInput).then((result)=>{
        setUserDetails(result)
        setIsLoggedIn(true);
    });
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
            <img className='avatarPic' src={userDetails.avatar_url} alt='userpic'></img>
            <p className='userName'>{userDetails.username}</p>
            <button className='logoutButton' onClick={handleLogout}>Logout</button>
            </>
            :
             <form className='loginInput' onSubmit={handleSubmit}>
                <input className='loginbar' type='text' placeholder='username' onChange={handleInputChange} value={userInput}>
                </input>
                <button type='submit'>Login</button>
            </form>
            }
            <Categories />
        </div>
    )
};
