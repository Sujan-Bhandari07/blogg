
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import Blogs from "../components/Blogs"
import Hero from '../components/Hero'

import { useGetuserQuery } from '../services/Userapi'
import { setuser } from '../services/Userslice'

const Home = () => {
  const { data, error, isSuccess: usersucc, isError } = useGetuserQuery()
  console.log(error)
  const dispatch = useDispatch()


  useEffect(() => {
    if (usersucc && data) {
      dispatch(setuser({ success: true }))
    }
    if (isError && error) {
      console.error('User authentication check failed:', error)
      toast.error(error?.data?.message || 'Authentication failed')
    }
  }, [usersucc, isError, error, data, dispatch])

console.log(useSelector(state=>state.user.isauth))

  return (
    <div className="home">
      <Hero />
      <Blogs  />
    </div>
  )
}

export default Home
