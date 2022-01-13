import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Comments } from './Comments';
import { fetchReviewById, patchReviewVotes } from './utils/utils';

export const SingleReview = ({userDetails, isLoggedIn, setGamesList}) => {

    const { review_id } = useParams();
    const [ review, setReview ] = useState([]);

    useEffect(()=>{
        fetchReviewById(review_id).then((res)=>{
            setReview(res)
        });
        
    }, [review_id] );

    const handleClick = (increment) => {
        setReview((currValue)=>{
            let newValue = {...currValue}
            newValue.votes += increment
            return newValue
        })
        patchReviewVotes(increment, review_id).catch((err)=>{
            setReview((currValue)=>{
                let newValue = {...currValue}
                newValue.votes -= increment
                return newValue
            })
        })
    };

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
            <div className='reviewBody'> {   
            <>
            <h2>{review.title}</h2>
            <img className='singleReviewPic' src={review.review_img_url} alt='gameboard'></img>
            <p>Designer : {review.designer}</p>
            <p>{review.review_body}</p>
            <p>Review written by : {review.username}</p>
            <p>Votes : {review.votes}</p>
            <button className='upVote' onClick={()=>{handleClick(1)}}>👍</button><button className='downVote' onClick={()=>{handleClick(-1)}}>👎</button>
            {isLoggedIn ? <button onClick={()=>{handleAddGame()}}>Add game to your list</button> : null}
            
            </>  
                } 
            </div>
            <Comments userDetails={userDetails} isLoggedIn={isLoggedIn} setGamesList={setGamesList} review_id={review_id} setReview={setReview}/>
            
        </div>
    )
}
