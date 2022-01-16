import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom";
import { Comments } from './Comments';
import { fetchReviewById } from './utils/utils';
import { VoteButtons } from './VoteButtons';
import { UserDetailsContext } from './contexts/userDetails';

export const SingleReview = ({ isLoggedIn, setGamesList }) => {

    const { review_id } = useParams();
    const [ review, setReview ] = useState([]);
    const [ isError, setIsError ] = useState(false);
    const { userDetails } = useContext(UserDetailsContext);

    useEffect(()=>{
        setIsError(false)
        fetchReviewById(review_id).then((res)=>{
            setReview(res)
        }).catch((err)=>{
            setIsError(true)
        })
        
    }, [review_id] );

    const handleAddGame = () => {
        setGamesList((currList)=>{
            let loops = 0
            for(let game of currList) {
                if (game !== review.title) {
                    loops++
                }
            }
            if (loops === currList.length) {
                let newList = [...currList, review.title]
                return newList
            } else return currList
        })
    };

    return (
        <div className='homePage'>
            {isError ? <p>Sorry, there seems to be an error, try again!</p> : 
            <>
            <div className='reviewBody'> {   
            <div key={review.title}>
            <h2>{review.title}</h2>
            <img className='singleReviewPic' src={review.review_img_url} alt='gameboard'></img>
            <p>Designer : {review.designer}</p>
            <p>{review.review_body}</p>
            <p>Review written by : {review.username}</p>
            <p>Votes : {review.votes}</p>
            <VoteButtons setReview={setReview} review_id={review_id}/>
            {isLoggedIn ? <button onClick={()=>{handleAddGame()}}>Add game to your list</button> : null}
            </div>  
            } 
            </div>
            <Comments userDetails={userDetails} isLoggedIn={isLoggedIn} setGamesList={setGamesList} review_id={review_id} setReview={setReview}/>
            </>
            }
            
        </div>
    )
}
