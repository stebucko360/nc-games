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

export const fetchReviews = (category, pageNum) => {
    return ncGamesAPI.get(`/reviews?category=${category}&limit=4&page=${pageNum}`).then((res)=>{
        return res.data.reviews
    });
};