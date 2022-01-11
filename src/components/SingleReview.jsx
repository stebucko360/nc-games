import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { fetchReviewById, fetchCommentsById, postCommentByID, patchReviewVotes } from './utils/utils';

export const SingleReview = ({userDetails, isLoggedIn}) => {

    const { review_id } = useParams();
    const [ review, setReview ] = useState([]);
    const [ comments, setComments ] = useState([]);
    const [ userInput, setUserInput ] = useState('');
    const [ isError, setIsError ] = useState(false);

    useEffect(()=>{
        fetchReviewById(review_id).then((res)=>{
            setReview(res)
        });
        fetchCommentsById(review_id).then((res)=>{
            setComments(res)
        });
    }, [] );

    const handleSubmit = (event) => {
        setIsError(false);
        event.preventDefault();
        postCommentByID(userDetails.username, userInput, review_id).then((res)=>{
            setComments((currentComments)=>{
                let newComments = [...currentComments, res]
                return newComments
            })
        })
        .catch((err)=>{
            setIsError(true)
        })
        setUserInput("");
      };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
      };

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

    return (
        <div className='homePage'>
            <div className='reviewBody'> {   
            <>
            <h2>{review.title}</h2>
            <img className='singleReviewPic' src={review.review_img_url}></img>
            <p>Designer : {review.designer}</p>
            <p>{review.review_body}</p>
            <p>Review written by : {review.username}</p>
            <p>Votes : {review.votes}</p>
            <button className='upVote' onClick={()=>{handleClick(1)}}>👍</button><button className='downVote' onClick={()=>{handleClick(-1)}}>👎</button>
            </>  
                } 
            </div>
            <div>
                <h3>Comments : </h3>
                {
                    comments.map(comment=>{
                        return (
                            <>
                            <p>{comment.author}</p>
                            <p>{comment.body}</p>
                            <p>{comment.created_at.slice(0, 10)}</p>
                            </> 
                        )
                    })
                }
                {isError ? <p>Sorry there was an error, please try again</p> : null}
                <h3>Add Comment : </h3>
                 { isLoggedIn ? 
                    <form className='addComment' onSubmit={handleSubmit}>
                        <input type='text' placeholder='Your comment' onChange={handleInputChange} value={userInput}>
                        </input>
                        <button type='submit'>Post Comment</button>
                    </form> 
                 : <p>Must be Logged in to comment</p>}
            </div>
            
        </div>
    )
}
