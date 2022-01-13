import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar'
import { Reviews } from './components/Reviews';
import { HomePage } from './components/HomePage';
import { SingleReview } from './components/SingleReview';
import { PostNewReview } from './components/PostNewReview';
import { ErrorPage } from './components/ErrorPage';


function App() {

  const [userDetails, setUserDetails] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gamesList, setGamesList] = useState([]);

  return (
    <BrowserRouter>
    <div className="App">
      <div className='pageContents'>
      <Sidebar setUserDetails={setUserDetails} userDetails={userDetails} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
      <main className='mainPage'>
        <Header/>
        </main>
        <Routes>
          <Route path='/' element={<HomePage userDetails={userDetails} isLoggedIn={isLoggedIn} gamesList={gamesList}/>} />
          <Route path="/reviews/:category_name" element={<Reviews />} />
          <Route path="/review/:review_id" element={<SingleReview userDetails={userDetails} isLoggedIn={isLoggedIn} setGamesList={setGamesList}/>} />
          <Route path="/reviews/PostNewReview/:category_name" element={<PostNewReview userDetails={userDetails} isLoggedIn={isLoggedIn}/>}/>
          <Route path="/*" element={<ErrorPage/>} />
        </Routes>
      
      </div>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
