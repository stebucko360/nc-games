import React, { useEffect, useState } from 'react'
import { fetchReviewsSortBy } from './utils/utils'
import { Link } from "react-router-dom";

export const HomePage = ({ userDetails, isLoggedIn }) => {

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
                    <h3>Most popular review : </h3>
                    <p>{reviewsByVotes[0].title}</p>
                    <img src={reviewsByVotes[0].review_img_url} width='30%' alt='gameboard'></img>
                    <nav>
                        <Link to={`/review/${reviewsByVotes[0].review_id}`}>
                            <p>Read this review now!</p>
                        </Link>
                    </nav>
                </div>
                <div className='recReview'>
                <h3>Recommended review : </h3>
                    <p>{reviewsByVotes[Math.floor(Math.random() * (reviewsByVotes.length - 0) + 0)].title}</p>
                    <img src={reviewsByVotes[Math.floor(Math.random() * (reviewsByVotes.length - 0) + 0)].review_img_url} width='30%' alt='gameboard'></img>
                    <nav>
                        <Link to={`/review/${reviewsByVotes[Math.floor(Math.random() * (reviewsByVotes.length - 0) + 0)].review_id}`}>
                            <p>Read this review now!</p>
                        </Link>
                    </nav>
                </div>
                <div className='topUser'>
                    <p>box 3</p>
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
