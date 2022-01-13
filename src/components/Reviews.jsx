import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { fetchReviews } from './utils/utils'
import { Link } from "react-router-dom";

export const Reviews = () => {

    const { category_name } = useParams();
    const [reviews, setReviews] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        fetchReviews(category_name, pageNumber).then((res)=>{
            setReviews(res)
            setIsLoading(false)
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
            <nav>
                <Link Link to={`/reviews/postNewReview/${category_name}`}>
                <button>Post A New {category_name} Review</button>
                </Link>
            </nav>
            {isLoading ? <p>Loading page contents, shouldn't be long!</p> :
            reviews.map(review => {
                return (
                    <div className='reviewObject'>
                    <Link to={`/review/${review.review_id}`}>
                    <h3>{review.title}</h3>
                    <img className='reviewImage' src={`${review.review_img_url}`} alt='game board'></img>
                    <p>Author: {review.owner}</p>
                    </Link>
                    </div>   
                )
            })
        }
            {pageNumber === 1 ? <button onClick={()=>{handleClick(1)}}>Next Page</button> : 
            <>
            <button onClick={()=>{handleClick(-1)}}>Previous Page</button>
            <button onClick={()=>{handleClick(1)}}>Next Page</button> 
            </>
            }
        </div>
    )
}
