import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import { postNewReview } from './utils/utils';

export const PostNewReview = ({userDetails, isLoggedIn}) => {

    const { category_name } = useParams();
    const [ commentPosted, setCommentPosted ] = useState(false);

    const handleSubmit = (event) => {
        setCommentPosted(false)
        const title = event.target[0].value
        const designer = event.target[1].value
        const reviewBody = event.target[2].value
        event.preventDefault()
        postNewReview(userDetails.username, category_name, title, designer, reviewBody).then((res)=>{
            setCommentPosted(true)
        })
    }

    return (
        <div className='homePage'>
            <h2>Post a New {category_name} Review</h2>
            
            {isLoggedIn ? <form onSubmit={handleSubmit}>
                <label for='title'>Enter Review Title : </label><br/>
                <input type='text' id='Title'></input> <br/>
                <label for='designer'>Enter the game designer : </label><br/>
                <input type='text' id='designer'></input> <br/>
                <label for='review_body'>Write your review for this game : </label><br/>
                <input type='text' id='review_body'></input> <br/>
                <button type='submit'> Post review</button>
            </form> : <p>Must be logged in to post a comment</p>}
            {commentPosted ? <p>Review Posted Successfully</p> : null}
        </div>
    )
}
