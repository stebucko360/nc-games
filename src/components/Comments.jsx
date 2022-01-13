import React, { useEffect, useState } from 'react'
import { fetchCommentsById, postCommentByID, patchCommentVote, deleteCommentById } from './utils/utils';

export const Comments = ({ userDetails, isLoggedIn, setGamesList, review_id, setReview }) => {

    const [ comments, setComments ] = useState([]);
    const [ userInput, setUserInput ] = useState('');
    const [ isError, setIsError ] = useState(false);

    useEffect(()=>{
        fetchCommentsById(review_id).then((res)=>{
            setComments(res)
        });
    }, [review_id])

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


    const handleCommentVote = (increment, comment_id) => {
        setIsError(false);
        setComments((currValue)=>{
            const valAdded = currValue.map(comment=> {
                if(comment.comment_id === comment_id){
                    let newComment = {...comment}
                    newComment.votes += increment
                    return newComment
                } else return comment})
            return valAdded
        })
        patchCommentVote(increment, comment_id).catch((err)=>{
            if (err) {
                setIsError(true)
                setComments((currValue)=>{
                    const valAdded = currValue.map(comment=> {
                        if(comment.comment_id === comment_id){
                            let newComment = {...comment}
                            newComment.votes -= increment
                            return newComment
                        } else return comment})
                    return valAdded
                })
            }
        })
    };

    const deleteComment = (comment_id) => {
        setComments((currComments)=>{
            let newComments = currComments.filter(comment=>{
                return comment.comment_id !== comment_id
            })
            return newComments
        })
        deleteCommentById(comment_id)
    };


    return (
        <div>
                <h3>Comments : </h3>
                {
                    comments.map(comment=>{
                        return (
                            <>
                            <p>{comment.author}</p>
                            <p>{comment.body}</p>
                            <p>{comment.created_at.slice(0, 10)}</p>
                            <p>Votes: {comment.votes}</p>
                            <button className='upVote' onClick={()=>{handleCommentVote(1, comment.comment_id)}}>👍</button><button className='downVote' onClick={()=>{handleCommentVote(-1, comment.comment_id)}}>👎</button>
                            {comment.author === userDetails.username ? <button onClick={()=>{deleteComment(comment.comment_id)}}>Delete comment</button> : null}
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
    )
}
