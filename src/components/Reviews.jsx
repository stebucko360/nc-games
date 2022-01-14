import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { fetchReviews } from './utils/utils'
import { Link } from "react-router-dom";

export const Reviews = () => {

    const { category_name } = useParams();
    const [reviews, setReviews] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    const [sort_by, setSort_by] = useState('review_id')

    useEffect(()=>{
        fetchReviews(category_name, pageNumber, sort_by).then((res)=>{
            setReviews(res)
            setIsLoading(false)
        })
    }, [category_name, pageNumber, sort_by]);

    const handleClick = (num) => {
        if (num === 1) {
           setPageNumber(pageNumber + 1) 
        } else {
            setPageNumber(pageNumber - 1)
        }
    };

    const optionChosen = (event) => {
        console.log(event.target.value);
        setSort_by(event.target.value);
      };

    return (
        <div className='homePage'>
            <h2>{category_name.charAt(0).toUpperCase() + category_name.slice(1)}</h2>
            <nav>
                <Link to={`/reviews/postNewReview/${category_name}`}>
                <button>Post A New {category_name} Review</button>
                </Link>
            </nav>
            <form>
                <select value="sort_selection" name="sort_selection" onChange={optionChosen}>
                    <option value='default'>sort by: {sort_by}</option>
                    <option value="review_id">Review ID</option>
                    <option value="title">Title</option>
                    <option value="owner">Author</option>
                    <option value="votes">Votes</option>
                    <option value="count">Comment Count</option>
                </select>
            </form>
            {isLoading ? <p>Loading page contents, shouldn't be long!</p> :
            <div className='reviewCardList'>
               { reviews.map(review => {
                    return (
                        <div className='reviewObject' key={review.review_id}>
                        <Link to={`/review/${review.review_id}`}>
                            <div className='reviewCardContents'>
                                <h3>{review.title}</h3>
                                <img className='reviewImage' src={`${review.review_img_url}`} alt='game board'></img>
                                <p>Author: {review.owner}</p>
                                <p>Votes: {review.votes}</p>  
                            </div>
                        
                        </Link>
                        </div>   
                    )
                })}
            </div>
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
