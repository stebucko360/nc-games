import axios from 'axios';

const ncGamesAPI = axios.create({
    baseURL: 'https://stephen-board-game-api.herokuapp.com/api',
});

export const fetchUserByName = (username) => {
    return ncGamesAPI.get(`/users/${username}`).then((res)=>{
        return res.data.user
    });
};

export const fetchCategories = () => {
    return ncGamesAPI.get(`/categories`).then((res)=>{
        return res.data.categories
    });
};

export const fetchReviews = (category, pageNum, sort_by) => {
    return ncGamesAPI.get(`/reviews?category=${category}&limit=4&page=${pageNum}&sort_by=${sort_by}`).then((res)=>{
        return res.data.reviews
    });
};

export const fetchReviewsSortBy = (sort) => {
    return ncGamesAPI.get(`/reviews?sort_by=${sort}`).then((res)=>{
        return res.data.reviews
    });
};

export const fetchReviewById = (review_id) => {
    return ncGamesAPI.get(`/reviews/${review_id}`).then((res)=>{
        return res.data.review
    });
};

export const fetchCommentsById = (review_id) => {
    return ncGamesAPI.get(`/reviews/${review_id}/comments`).then((res)=>{
        return res.data.comments
    });
};

export const postCommentByID = (username, body, review_id) => {
    return ncGamesAPI.post(`/reviews/${review_id}/comments`, {username: username, body: body}).then((res)=>{
        return res.data.review
    });
};

export const patchReviewVotes = (increment, review_id) => {
    return ncGamesAPI.patch(`/reviews/${review_id}`, {inc_votes: increment}).then((res)=>{
        return res.data.review
    });
};

export const patchCommentVote = (increment, comment_id) => {
    return ncGamesAPI.patch(`/comments/${comment_id}`, {inc_votes: increment}).then((res)=>{
        return res.data.comment
    });
};

export const postNewReview = (username, category, title, designer, reviewBody) => {
    return ncGamesAPI.post(`/reviews`, {owner: username, category: category, title: title, designer: designer, review_body: reviewBody}).then((res)=>{
        return res.data.review
    });
};

export const deleteCommentById = (comment_id) =>{
    return ncGamesAPI.delete(`/comments/${comment_id}`)
};