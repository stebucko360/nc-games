import React, { useEffect, useState } from 'react'
import { fetchReviewsSortBy } from './utils/utils'
import boardGames from './pictures/boardgames.jpg'
import { Link } from "react-router-dom";

export const HomePage = ({ userDetails, isLoggedIn, gamesList }) => {

    const [reviewsByVotes, setReviewsByVotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
        fetchReviewsSortBy('votes').then((res)=>{
            setReviewsByVotes(res)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className='homePage'>
            {isLoggedIn ?
            <>
            <h2>Welcome {userDetails.username} to your dashboard : </h2>
            <div className='homePageContents'>
                {isLoading ? <p>Loading contents...</p> :
                <>
                <div className='mostVotedGame'>
                    <h3>Most Popular Review : </h3>
                    <p>{reviewsByVotes[0].title}</p>
                    <img src={reviewsByVotes[0].review_img_url} width='60%' alt='gameboard'></img>
                    <nav>
                        <Link to={`/review/${reviewsByVotes[0].review_id}`}>
                            <p>Read this review now!</p>
                        </Link>
                    </nav>
                </div>
                <div>
                    <img className='boardGamePic' src={boardGames}></img>
                </div>
                <div className='recReview'>
                <h3>Recommended Review : </h3>
                    <p>{reviewsByVotes[Math.floor(Math.random() * (reviewsByVotes.length - 0) + 0)].title}</p>
                    <img src={reviewsByVotes[Math.floor(Math.random() * (reviewsByVotes.length - 0) + 0)].review_img_url} width='30%' alt='gameboard'></img>
                    <nav>
                        <Link to={`/review/${reviewsByVotes[Math.floor(Math.random() * (reviewsByVotes.length - 0) + 0)].review_id}`}>
                            <p>Read this review now!</p>
                        </Link>
                    </nav>
                </div>
                <div className='topUser'>
                    <h3>Your Games List :</h3>
                    <ul>
                        {gamesList.map(game=>{
                            return (
                                <li>{game}</li>
                            )
                        })}
                    </ul>
                </div>
                </>
                }
                </div> 
            </> 
            
            
            :
            <h2>Welcome to NC Board Game reviews, if yopu wish to post or comment on this site please login</h2>    
        }
        </div>
    )
}
