import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { fetchReviewById, fetchCommentsById } from './utils/utils';

export const SingleReview = () => {

    const { review_id } = useParams();
    const [ review, setReview ] = useState([]);
    const [ comments, setComments ] = useState([]);

    useEffect(()=>{
        fetchReviewById(review_id).then((res)=>{
            setReview(res)
        });
        fetchCommentsById(review_id).then((res)=>{
            setComments(res)
        });
    }, [] );

    return (
        <div className='homePage'>
            <div className='reviewBody'> {   
            <>
            <h2>{review.title}</h2>
            <img className='singleReviewPic' src={review.review_img_url}></img>
            <p>Designer : {review.designer}</p>
            <p>{review.review_body}</p>
            <p>Review written by : {review.username}</p>
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
            </div>
            
        </div>
    )
}
