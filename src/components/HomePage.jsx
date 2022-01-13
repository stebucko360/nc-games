import React, { useEffect, useState } from 'react'
import { fetchReviewsSortBy } from './utils/utils'
import { Link } from "react-router-dom";
import { CSSTransitionGroup } from 'react-transition-group'

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
            <CSSTransitionGroup 
           transitionName="welcomeMessage"
           transitionAppear={true}
           transitionAppearTimeout={500}
           transitionEnter={false}
           transitionLeave={false}>   
            <h2 className='welcomeDash'>Welcome {userDetails.username} to your dashboard : </h2>
            </CSSTransitionGroup>
            <CSSTransitionGroup 
           transitionName="dashboard"
           transitionAppear={true}
           transitionAppearTimeout={500}
           transitionEnter={false}
           transitionLeave={false}>   
            <div className='homePageContents'>
                {isLoading ? <p>Loading contents...</p> :
                <>
                <div className='mostVotedGame'>
                    <h3>Most Popular Review : </h3>
                    <h4>{reviewsByVotes[0].title}</h4>
                    <img src={reviewsByVotes[0].review_img_url} width='70%' alt='gameboard'></img>
                    <nav>
                        <Link to={`/review/${reviewsByVotes[0].review_id}`}>
                            <p1>Read this review now!</p1>
                        </Link>
                    </nav>
                </div>
                <div className='recReview'>
                <h3>Recommended Review : </h3>
                    <h4>{reviewsByVotes[Math.floor(Math.random() * (reviewsByVotes.length - 0) + 0)].title}</h4>
                    <img src={reviewsByVotes[Math.floor(Math.random() * (reviewsByVotes.length - 0) + 0)].review_img_url} width='70%' alt='gameboard'></img>
                    <nav>
                        <Link to={`/review/${reviewsByVotes[Math.floor(Math.random() * (reviewsByVotes.length - 0) + 0)].review_id}`}>
                            <p1>Read this review now!</p1>
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
            </CSSTransitionGroup>
            </> 
            
            
            :
            <>
            <h2>Welcome to NC Board Game reviews,</h2>
            <h2> if you wish to post or comment on this site please login</h2>
            </> 
        }
        </div>
    )
}
