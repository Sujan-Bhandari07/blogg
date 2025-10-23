import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useGetallpostQuery } from '../services/Blogapi.jsx'
import "../styles/Blogs.css"
import Loader from './Loader.jsx'
import { useSelector } from 'react-redux'

const Card = () => {
  const navigate = useNavigate()
  const { category, searchTerm } = useSelector(state => state.blog)
  const { data: d, isFetching, isError, isSuccess, error } = useGetallpostQuery()

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || 'Failed to load blogs')
    }
  }, [isError, error])

  // Filter blogs based on both category and search term
  const filteredBlogs = d?.data?.filter((item) => {
    const matchesCategory = category === "all" || item.category.toLowerCase() === category.toLowerCase()
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })
  

  return !isFetching && isSuccess ? (
    <>
      {filteredBlogs && filteredBlogs.length > 0 ? (
        filteredBlogs.map((item) => (
          <div key={item._id} onClick={() => navigate(`/blog/${item._id}`)} className="card">
            <img src={item.image} alt={item.title} />
            <div className="tala">
              <div className="cat">{item.category}</div>
              <p className="title">{item.title}</p>
              <div className="desc">{item.subtitle}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results" style={{ textAlign: 'center', padding: '2rem', width: '100%' }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>No blogs found matching your search.</p>
        </div>
      )}
    </>
  ) : <Loader />
}

export default Card