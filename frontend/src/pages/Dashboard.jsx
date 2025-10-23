import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'
import '../styles/Dashboard.css'

const Dashboard = () => {
  const location = useLocation()
  
  const stats = {
    blogs: 10,
    drafts: 0
  }

  const latestBlogs = [
    {
      id: 1,
      title: 'The Rise of Artificial Intelligence in Modern Technology',
      date: 'Wed May 28 2025',
      status: 'Published'
    },
    {
      id: 2,
      title: 'Importance of Tourism',
      date: 'Wed May 28 2025',
      status: 'Published'
    },
    {
      id: 3,
      title: 'The New Way of Study',
      date: 'Wed May 28 2025',
      status: 'Published'
    },
    {
      id: 4,
      title: 'Taxes on Luxury Houses',
      date: 'Wed May 28 2025',
      status: 'Published'
    },
    {
      id: 5,
      title: 'Maximizing returns by minimizing resources in your startup',
      date: 'Wed May 28 2025',
      status: 'Published'
    }
  ]

  return (
    <div className="dashboard">
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

      <div className="dashboard-content">
        <div className="dashboard-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blogs-icon">
                <img src={assets.dashboard_icon_1} alt="Blogs" />
              </div>
              <div className="stat-info">
                <h3 className="stat-number">{stats.blogs}</h3>
                <p className="stat-label">Blogs</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon drafts-icon">
                <img src={assets.dashboard_icon_3} alt="Drafts" />
              </div>
              <div className="stat-info">
                <h3 className="stat-number">{stats.drafts}</h3>
                <p className="stat-label">Drafts</p>
              </div>
            </div>
          </div>

          <div className="latest-blogs-section">
            <div className="section-header">
              <img src={assets.dashboard_icon_4} alt="Latest Blogs" />
              <h2>Latest Blogs</h2>
            </div>

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
                  {latestBlogs.map((blog, index) => (
                    <tr key={blog.id}>
                      <td>{index + 1}</td>
                      <td className="blog-title-cell">{blog.title}</td>
                      <td>{blog.date}</td>
                      <td>
                        <span className="status-badge">{blog.status}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="unpublish-btn">Unpublish</button>
                          <button className="delete-btn">×</button>
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
    </div>
  )
}

export default Dashboard