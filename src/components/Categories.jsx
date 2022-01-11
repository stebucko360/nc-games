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
        <div className='categoriesList'>
            <nav className='cats'>
                <Link to='/' className='homeButton'>Home</Link> <br/><br/>
                {categories.map(category=>{
                    return (
                        <>
                        <Link className='indiCat' to={`/reviews/${category.slug}`}>{category.slug.charAt(0).toUpperCase() + category.slug.slice(1)}</Link> <br/><br/>
                        </>
                    )
                })}
            </nav>
        </div>
    )
}
