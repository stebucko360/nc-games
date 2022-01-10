import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { fetchReviews } from './utils/utils'

export const Reviews = () => {

    const { category_name } = useParams();
    const [reviews, setReviews] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(()=>{
        fetchReviews(category_name, pageNumber).then((res)=>{
            setReviews(res)
        })
    }, [category_name, pageNumber]);

    const handleClick = (num) => {
        if (num === 1) {
           setPageNumber(pageNumber + 1) 
        } else {
            setPageNumber(pageNumber - 1)
        }
    };

    return (
        <div className='homePage'>
            <h2>{category_name.charAt(0).toUpperCase() + category_name.slice(1)}</h2>
            {reviews.map(review => {
                return (
                    <>
                    <h3>{review.title}</h3>
                    <img className='reviewImage' src={`${review.review_img_url}`}></img>
                    <p></p>
                    </>
                )
            })}
            {pageNumber === 1 ? <button onClick={()=>{handleClick(1)}}>Next Page</button> : 
            <>
            <button onClick={()=>{handleClick(-1)}}>Previous Page</button>
            <button onClick={()=>{handleClick(1)}}>Next Page</button> 
            </>
            }
        </div>
    )
}
