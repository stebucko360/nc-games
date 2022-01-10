import React, {useState, useEffect} from 'react';
import { fetchCategories } from './utils/utils';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        fetchCategories().then((res)=>{
            setCategories(res)
        })
    }, [])

    return (
        <div>
            <nav>
                <Link to='/'>Home</Link>
            <p>Review Categories: </p>
                {categories.map(category=>{
                    return (
                        <>
                        <Link to={`/reviews/${category.slug}`}>{category.slug}</Link> <br/>
                        </>
                    )
                })}
            </nav>
        </div>
    )
}
