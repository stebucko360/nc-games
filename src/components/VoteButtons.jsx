import React, {useState} from 'react'
import { patchReviewVotes } from './utils/utils';

export const VoteButtons = ({setReview, review_id}) => {

    const [ isError, setIsError ] = useState(false);
    const [ voteStatus, setVoteStatus ] = useState(0)

    const handleClick = (increment) => {
        setIsError(false)
        if (increment === 1) {
            setVoteStatus(voteStatus + 1)
        } else {
            setVoteStatus(voteStatus -1)
        }
        setReview((currValue)=>{
            let newValue = {...currValue}
            newValue.votes += increment
            return newValue
        })
        patchReviewVotes(increment, review_id).catch((err)=>{
            setVoteStatus("")
            setIsError(true)
            setReview((currValue)=>{
                let newValue = {...currValue}
                newValue.votes -= increment
                return newValue
            })
        })
    };


    return (
        <div>
            {isError ? <p>Sorry, there seems to be an issue, try again</p> : null}
            {voteStatus === 0 ?
            <>
            <button className='upVote' onClick={()=>{handleClick(1)}}>👍</button><button className='downVote' onClick={()=>{handleClick(-1)}}>👎</button>
            </> :
            voteStatus === -1 ? 
            <>
            <button className='upVote' onClick={()=>{handleClick(1)}}>👍</button>
            </> :
            <>
            <button className='downVote' onClick={()=>{handleClick(-1)}}>👎</button>
            </>
             }
        </div>
    )
}
