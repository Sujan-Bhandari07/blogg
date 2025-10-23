import { useEffect } from 'react'
import { toast } from "react-hot-toast"
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loader from "../components/Loader.jsx"
import '../styles/List.css'

import moment from 'moment'
import { useGetownpostQuery } from '../services/Blogapi'

const List = () => {
  const location = useLocation()

  const {data,isError,isFetching,error}=useGetownpostQuery(null,{
    refetchOnMountOrArgChange:false
  })
  console.log(data,error)




  useEffect(() => {
if(isError){
  toast.error(error?.data?.message)}
  

  }, [isError])
  
  
  // Sample blog data (UI only - no functionality)
  

  return isFetching?<Loader /> :(
    <div className="list">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-menu">
          <Link to="/dashboard" className={`sidebar-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <img src={assets.home_icon} alt="Dashboard" />
            <span>Dashboard</span>
          </Link>
          <Link to="/add" className={`sidebar-item ${location.pathname === '/add' ? 'active' : ''}`}>
            <img src={assets.add_icon} alt="Add blogs" />
            <span>Add blogs</span>
          </Link>
          <Link to="/list" className={`sidebar-item ${location.pathname === '/list' ? 'active' : ''}`}>
            <img src={assets.list_icon} alt="Blog lists" />
            <span>Blog lists</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="list-content">
        <div className="list-container">
          <h2 className="list-title">All blogs</h2>
          
          {/* Table */}
          <div className="table-wrapper">
            <table className="blog-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>BLOG TITLE</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{index + 1}</td>
                    <td className="blog-title-cell">{blog.title}</td>
                    <td>{moment(blog.createdAt).format("MMM DD YYYY")   }</td>
                    <td>
                      <span className="status-badge">{blog.ispublished?"Published":"Unpublish"}</span>
                    </td>
                    <td>

                      <div className="action-buttons">
                        <button className={blog.ispublished ? "delete-btn" : "publish-btn"}>
                          {blog.ispublished ? "x" : <img src={assets.tick_icon} alt="publish" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List