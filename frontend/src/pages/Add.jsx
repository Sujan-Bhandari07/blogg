import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Add.css'
import { useAddblogMutation } from '../services/Blogapi.jsx'
import toast from 'react-hot-toast'


const Add = () => {
  const location = useLocation()
  const [_image, _setImage] = useState("")
  const [category, setCategory] = useState('')
  const [publishNow, setPublishNow] = useState(false)
  const [desc, setdesc] = useState('')
  const [title, settitle] = useState('')
  const [subtitle, setsubtitle] = useState('')
  const [validationError, setValidationError] = useState('')

  const[addblog, {error,isError, isLoading, isSuccess,data}] = useAddblogMutation()

  // Reset form after successful submission
  useEffect(() => {
    if (isSuccess) {
      _setImage('')
      settitle('')
      setsubtitle('')
      setdesc('')
      setCategory('')
      setPublishNow(false)
      setValidationError('')

      toast.success(data?.message || 'Blog added successfully!')
    }

    if(isError){
      toast.error( error?.data?.message)
    }
    let id;

    if(isLoading){
id = toast.loading("Loading")
    }
return()=>toast.dismiss(id)
  }, [isSuccess,isLoading,isError])

  const validateForm = () => {
    if (!title || title.trim() === '') {
      setValidationError('Blog title is required')
      return false
    }
    if (!subtitle || subtitle.trim() === '') {
      setValidationError('Sub title is required')
      return false
    }
    if (!desc || desc.trim() === '') {
      setValidationError('Blog description is required')
      return false
    }
    if (!category || category === '') {
      setValidationError('Blog category is required')
      return false
    }
    if (!_image) {
      setValidationError('Thumbnail image is required')
      return false
    }
    return true
  }
console.log(isSuccess,data,error)
  const handlesubmit = (e) => {
    e.preventDefault()
    setValidationError('')

    // Validate form
    if (!validateForm()) {
      return
    }

    const form = new FormData()
    form.append('image', _image)
    form.append('title', title)
    form.append('subtitle', subtitle)
    form.append('description', desc)
    form.append('category', category.toLowerCase())

    addblog(form)
  }

  return (
    <div className="add">
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
      <div className="add-content">
        <div className="add-container">
        {/* Status Messages */}
        {validationError && (
          <div className="error-message" style={{
            padding: '12px 16px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            color: '#c33',
            marginBottom: '20px'
          }}>
            ⚠️ {validationError}
          </div>
        )}
        
        {error && (
          <div className="error-message" style={{
            padding: '12px 16px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            color: '#c33',
            marginBottom: '20px'
          }}>
            ❌ Error: {error?.data?.message || 'Failed to add blog. Please try again.'}
          </div>
        )}
        
        {isSuccess && (
          <div className="success-message" style={{
            padding: '12px 16px',
            backgroundColor: '#efe',
            border: '1px solid #cfc',
            borderRadius: '8px',
            color: '#3c3',
            marginBottom: '20px'
          }}>
            ✅ Blog added successfully!
          </div>
        )}

        {/* Upload Thumbnail */}
        <div className="upload-section">
          <label htmlFor="image" className="upload-label">Upload Thumbnail</label>
          <label htmlFor="image" className="upload-box">
          <input onChange={(e)=>_setImage(e.target.files[0])} className='hhh' type="file" id="image" hidden />
        

            <img className='mnb' src={!_image?assets.upload_area:URL.createObjectURL(_image)} alt="Upload" />
          </label>
        </div>

        {/* Blog Title */}
        <div className="input-section">
          <label className="input-label">Blog title</label>
          <input 
            type="text" 
            placeholder="Type here" 
            className="input-field"
            value={title}
            onChange={(e)=>settitle(e.target.value)}
          />
        </div>

        {/* Sub Title */}
        <div className="input-section">
          <label className="input-label">Sub title</label>
          <input 
            type="text" 
            placeholder="Type here" 
            className="input-field"
            value={subtitle}
            onChange={(e)=>setsubtitle(e.target.value)}
          />
        </div>

        {/* Blog Description */}
        <div className="description-section">
          <label className="input-label">Blog Description</label>
          <div className="text-editor">
            {/* Editor Toolbar */}
            <div className="editor-toolbar">
              <select className="format-dropdown">
                <option>Normal</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>
              <button className="toolbar-btn" title="Bold"><strong>B</strong></button>
              <button className="toolbar-btn" title="Italic"><em>I</em></button>
              <button className="toolbar-btn" title="Underline"><u>U</u></button>
              <button className="toolbar-btn" title="Link">🔗</button>
              <button className="toolbar-btn" title="Bullet List">≡</button>
              <button className="toolbar-btn" title="Numbered List">≣</button>
              <button className="toolbar-btn" title="Clear Format">✕</button>
            </div>
            {/* Editor Content Area */}

            <textarea 
              className="editor-content" 
              onChange={(e)=>setdesc(e.target.value)} 
              value={desc || ''}
              placeholder="Write your blog description here..."
            />
            {/* AI Generate Button */}
            <button className="ai-btn">Generate with AI</button>
          </div>
        </div>

        {/* Blog Category */}
        <div className="input-section">
          <label className="input-label">Blog category</label>
          <select 
            className="select-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Technology">Technology</option>
            <option value="Startup">Startup</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        {/* Publish Now Checkbox */}
        <div className="checkbox-section">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={publishNow}
              onChange={(e) => setPublishNow(e.target.checked)}
            />
            <span>Publish Now</span>
          </label>
        </div>

        {/* Add Blog Button */}
        <button  
          onClick={handlesubmit} 
          className="add-blog-btn"
          disabled={isLoading}
          style={{
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Adding Blog...' : 'Add Blog'}
        </button>
        </div>
      </div>
    </div>
  )
}

export default Add