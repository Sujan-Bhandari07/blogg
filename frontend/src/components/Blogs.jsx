import React from 'react'
import {blogCategories} from "../assets/assets.js"
import "../styles/Blogs.css"
import Card from './Card.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setcategory } from '../services/Blogslice.jsx'

const Blogs = () => {
  const dispatch = useDispatch()
  const { category } = useSelector(state => state.blog)
  
  return (
    <div className="blogs">
      <div className="category">
        {blogCategories?.map((item, id) => (
          <button 
            className={category.toLowerCase() === item.toLowerCase() ? "asdf" : ""} 
            onClick={() => dispatch(setcategory({ cat: item.toLowerCase() }))} 
            key={id}
          >
            {item}
          </button>
        ))}
      </div>
  <div className="cards">

<Card />

    </div>
  </div>

  )
}

export default Blogs