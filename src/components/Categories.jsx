import React, {useState, useEffect} from 'react';
import { fetchCategories } from './utils/utils';
import { Link } from "react-router-dom";
import { CSSTransitionGroup } from 'react-transition-group'

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
                <CSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {categories.map(category=>{
                    return (
                        <React.Fragment  key={category.slug}>
                        <Link className='indiCat' to={`/reviews/${category.slug}`}>{category.slug.charAt(0).toUpperCase() + category.slug.slice(1)}</Link> <br/><br/>
                        </React.Fragment>
                    )
                })}
        </CSSTransitionGroup>
                
            </nav>
        </div>
    )
}
