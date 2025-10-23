import React from 'react'
import star from "../assets/star_icon.svg"
import gradient from "../assets/gradientBackground.png"
import "../styles/Home.css"
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../services/Blogslice'


const Hero = () => {
  const dispatch = useDispatch()
  const { searchTerm } = useSelector(state => state.blog)

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  return (
<div className="hero">

<img className='absolute' src={gradient} alt="" />
  <div className="ai">New:AI feature integrated <img src={star} alt="" /> </div>
  <div className="title">Your own <span>blogging</span><br />platform.</div>
  <div className="desc">This is your space to think out loud,to share what matters,and to write without filters.Whether its one word or a thousand,your story starts right here.</div>
  <div style={{position:'relative',zIndex:30}} className="input">
    <input 
      onChange={handleSearchChange} 
      value={searchTerm} 
      type="text" 
      placeholder='Search for blogs'
    />
    <button onClick={handleSearchChange}>Search</button>
  </div>
</div>
  )
}

export default Hero