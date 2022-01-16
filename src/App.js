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
import { UserDetailsProvider } from './components/contexts/userDetails';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gamesList, setGamesList] = useState([]);

  return (
    <UserDetailsProvider>
    <BrowserRouter>
    <div className="App">
      <div className='pageContents'>
      <Sidebar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
      <main className='mainPage'>
        <Header/>
        </main>
        <Routes>
          <Route path='/' element={<HomePage isLoggedIn={isLoggedIn} gamesList={gamesList}/>} />
          <Route path="/reviews/:category_name" element={<Reviews />} />
          <Route path="/review/:review_id" element={<SingleReview  isLoggedIn={isLoggedIn} setGamesList={setGamesList}/>} />
          <Route path="/reviews/PostNewReview/:category_name" element={<PostNewReview  isLoggedIn={isLoggedIn}/>}/>
          <Route path="/*" element={<ErrorPage/>} />
        </Routes>
      
      </div>
    </div>
    </BrowserRouter>
    </UserDetailsProvider>
    
    
  );
}

export default App;
