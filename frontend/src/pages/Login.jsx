import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCheckresetotpMutation, useLoginMutation, useRegisteruserMutation, useSendresetotpMutation } from '../services/Userapi.jsx'
import { setuser } from '../services/Userslice.jsx'
import '../styles/Login.css'


const Login = () => {








  const [isSignup, setIsSignup] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpInputs = useRef([])
  const navigate = useNavigate()

  // const[forgetemail,setforgetemail]=useState("")




  const dispatch =  useDispatch()
  const{isauth}= useSelector(state=>state.user)
  console.log(isauth)
  const[register,{data:rd,isLoading:risl,isError:rise,error:re,isSuccess:riss}]= useRegisteruserMutation()

 const[login,{data:ld,isSuccess:liss,isError:lise,error:le,isLoading:lisl}]  =useLoginMutation()


 console.log(le)

 const[sendotp,{data:sendotpdata,isError:sendotpiserr ,error:sendotperr,isSuccess:sendotpsuccess,isLoading:sendotpisloading}]  =useSendresetotpMutation()

 const[verifyotp,{data:verifyotpdata,isError:verifyotpiserr,error:verifyotperr,isSuccess:verifyotpissuccess,isLoading:verifyotpisloading}]   =useCheckresetotpMutation()





  useEffect(() => {
    let tid;
    
    if (risl ) {
      tid = toast.loading('Processing...');
    }
    
    if (rise ) {
      toast.dismiss();
      toast.error(re?.data?.message);
    }
    
    if (riss )  {
      toast.dismiss();
      dispatch(setuser({success:true}))
      setFormData({
        fullname: '',
        username: '',
        email: '',
        password: ''
      })
      navigate("/")
      toast.success(rd?.message);
    }

    return () => {
      if (tid) {
        toast.dismiss(tid);
      }
    };
  }, [rise, risl, riss]);


useEffect(() => {
    let id;
    
    if (lisl ) {
      id = toast.loading('Processing...');
    }
    
    if (lise ) {
      toast.dismiss();
      toast.error(le?.data?.message);
    }
    
    if (liss )  {
      toast.dismiss();
      dispatch(setuser({success:true}))
      setFormData({
        fullname: '',
        username: '',
        email: '',
        password: ''
      })
      navigate("/")
      toast.success(ld?.message);
    }

    return () => {
      if (id) {
        toast.dismiss(id);
      }
    };
  }, [lise, lisl, liss]);





useEffect(() => {
    let tid;
    
    if (sendotpisloading ) {
      tid = toast.loading('Sending OTP...');
    }
    
    if (sendotpiserr ) {
      console.error('Send OTP Error:', sendotperr);
      toast.dismiss(); // Dismiss all toasts first
      toast.error(sendotperr?.data?.message || 'Failed to send OTP');
    }
    
    if (sendotpsuccess )  {
      console.log('OTP sent successfully:', sendotpdata);
      toast.dismiss(); // Dismiss all toasts first
      setShowOtpInput(true)
      toast.success(sendotpdata?.message);
    }

    return () => {
      if (tid) {
        toast.dismiss(tid);
      }
    };
  }, [sendotpiserr, sendotpisloading, sendotpsuccess, sendotperr, sendotpdata]);



useEffect(() => {
    let tid;
    
    if (verifyotpisloading ) {
      tid = toast.loading('Verifying OTP...');
    }
    
    if (verifyotpiserr ) {
      toast.dismiss();
      toast.error(verifyotperr?.data?.message);
    }
    
    if (verifyotpissuccess )  {
      toast.dismiss();
      dispatch(setuser({success:true}))
      navigate("/")
      toast.success(verifyotpdata?.message);
    }

    return () => {
      if (tid) {
        toast.dismiss(tid);
      }
    };
  }, [ verifyotpiserr, verifyotpisloading,verifyotpissuccess]);

console.log(verifyotpdata,verifyotperr)



console.log(otp)

console.log(sendotpdata)



  
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  })

  console.log(formData)

  useEffect(() => {
    if (showOtpInput && otpInputs.current[0]) {
      otpInputs.current[0].focus()
    }
  }, [showOtpInput])

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        otpInputs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      otpInputs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault()
      otpInputs.current[index + 1]?.focus()
    }
  }
  

  const handleOtpPaste = (e, currentIndex) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    
    if (!pastedData) return
    
    const newOtp = [...otp]
    let pasteIndex = 0
    
    // Fill from the current input position onwards
    for (let i = currentIndex; i < 6 && pasteIndex < pastedData.length; i++) {
      newOtp[i] = pastedData[pasteIndex]
      pasteIndex++
    }
    
    setOtp(newOtp)
    
    // Focus on the next empty box or the last filled box
    const nextFocusIndex = Math.min(currentIndex + pastedData.length, 5)
    otpInputs.current[nextFocusIndex]?.focus()
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e,formdata) => {
    e.preventDefault()
    // Handle form submission (no functionality - UI only)
    if(isSignup){

      register(formdata)
    }
    if(!isSignup)
    {

      login(formdata)
    }
    console.log('Form submitted:',formdata)
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    if (!formData.email) {
      toast.error('Please enter your email address');
      return;
    }
    console.log('Sending OTP to:', formData.email);
    sendotp({email: formData.email})
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    const otpValue = otp.join('')
    verifyotp({otp:otpValue,email:formData.email})

  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form-section">
          <div className="form-wrapper">
            {!showForgotPassword ? (
              <>
                {/* Login/Signup Form */}
                <div className="form-header">
                  <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
                  <p>{isSignup ? 'Sign up to get started' : 'Please login to your account'}</p>
                </div>

                <form onSubmit={(e)=>handleSubmit(e,formData)} className="auth-form">
                  {/* Signup Fields */}
                  {isSignup && (
                    <>
                      <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input
                          type="text"
                          id="fullname"
                          name="fullname"
                          placeholder="John Doe"
                          value={formData.fullname}
                          onChange={handleInputChange}

                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          placeholder="johndoe"
                          value={formData.username}
                          onChange={handleInputChange}

                        />
                      </div>
                    </>
                  )}

                  {/* Common Fields */}
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Forgot Password Link - Only for Login */}
                  {!isSignup && (
                    <div className="form-options">
                      <button
                        type="button"
                        className="forgot-password-link"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button  disabled={risl} type="submit" className="submit-btn">
                    {isSignup ? 'Create Account' : 'Login'}
                  </button>
                </form>

                {/* Toggle Login/Signup */}
                <div className="form-footer">
                  <p>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                      type="button"
                      className="toggle-form-btn"
                      onClick={() => setIsSignup(!isSignup)}
                    >
                      {isSignup ? 'Login' : 'Sign Up'}
                    </button>
                  </p>
                </div>
              </>
            ) : showOtpInput ? (
              <>
                <div className="form-header">
                  <h2>RESET OTP</h2>
                  <p>Enter the 6-digit code sent to {formData.email}</p>
                </div>

                <form onSubmit={handleVerifyOtp} className="auth-form">
                  <div className="otp-container">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={(e) => handleOtpPaste(e, index)}
                        className="otp-input"
                      />
                    ))}
                  </div>

                  <button type="submit" className="submit-btn">
                    Verify OTP
                  </button>
                </form>

                <div className="form-footer">
                  <p>
                    <button
                      type="button"
                      className="toggle-form-btn"
                      onClick={() => {
                        setShowOtpInput(false)
                        setShowForgotPassword(false)
                        setOtp(['', '', '', '', '', ''])
                      }}
                    >
                      ← Back to Login
                    </button>
                  </p>
                  <p style={{ marginTop: '1rem' }}>
                    Didn't receive code?{' '}
                    <button
                      type="button"
                      className="toggle-form-btn"
                      onClick={(e) => {handleForgotPassword(e)



                      }}
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="form-header">
                  <h2>Send OTP</h2>
                  <p>Enter your register  email address to receive an OTP</p>
                </div>

                <form onSubmit={handleForgotPassword} className="auth-form">
                  <div className="form-group">
                    <label htmlFor="reset-email">Email Address</label>
                    <input
                      type="email"
                      id="reset-email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Send OTP
                  </button>
                </form>

                <div className="form-footer">
                  <p>
                    <button
                      type="button"
                      className="toggle-form-btn"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      ← Back to Login
                    </button>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login