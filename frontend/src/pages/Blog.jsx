import moment from 'moment'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import gradient from "../assets/gradientBackground.png"
import { useGetidpostMutation, useSendcommentMutation } from '../services/Blogapi.jsx'
import "../styles/Blog.css"
const Blog = () => {


  const{id}= useParams()
  console.log(id)


  const [first, setfirst] = useState("")

const [bid, { data: blogData }] = useGetidpostMutation()
const [sid] = useSendcommentMutation()


const handlec = async ()=>{
  try {
    await sid({blogid:id,message:first}).unwrap()
    setfirst("")
    // Refetch blog data to get updated comments
    bid({ blogid: id })
    toast.success("Commented")
  } catch (error) {
    toast.error(error?.message || "Failed to post comment")
  }

}


useEffect(() => {
  bid({ blogid: id })
}, [id])

console.log(blogData)


  return (
<div className="blog">
  <div className="post">
    <div className="top">
      <img src={gradient} alt="" />

      <div className="publis">{blogData?.data?.updatedAt && moment(blogData.data.updatedAt).format('YYYY MMM DD')}</div>
      <div className="title">{blogData?.data?.title}</div>
      <div className="subtitle">{blogData?.data?.subtitle}</div>
      <div className="author">{blogData?.data?.author?.fullname}</div>
    </div>
    <div className="middle">
      <img className='ayp' src={blogData?.data?.image} alt="" />
      <div className="description" dangerouslySetInnerHTML={{__html:blogData?.data?.description}}></div>
    </div>
    <div className="bottom">
      <div className="commentbox">

        <div className="commentcount">Comments({blogData?.data?.comments?.length || 0})</div>
<div className="comments">
  
  {blogData?.data?.comments?.map((item)=>(
    <>
    
    <div className="comment">
      <img  className="commentuserprof" src={item.sender.profilepic} alt="" />
    {/* <div className="commentuserprof">{item.sender.profilepic}</div> */}
    <div className="aaa">

    <div className="commentuser">{item.sender.fullname}</div>
    <div className="message">{item.message}</div>
    </div>
    <div className="time">{moment(item.createdAt).fromNow()}</div>
  </div>
    
    </>



  ))}
  
</div>
<div className="sendcomment">
  <p></p>
  <textarea value={first} onChange={(e)=>setfirst(e.target.value)} name="" id=""></textarea>
  <button onClick={handlec}>Submit</button>

</div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Blog