import React, { useState, useRef, useEffect } from 'react'
import '../styles/Verifyotp.css'
import { useSendverifyotpMutation, useCheckverifyotpMutation } from '../services/Userapi.jsx'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Verifyotp = () => {
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpInputs = useRef([])
  const navigate = useNavigate()

  const [sendotp, { data: sendotpdata, isError: sendotpiserr, error: sendotperr, isSuccess: sendotpsuccess, isLoading: sendotpisloading }] = useSendverifyotpMutation()
  const [verifyotp, { data: verifyotpdata, isError: verifyotpiserr, error: verifyotperr, isSuccess: verifyotpissuccess, isLoading: verifyotpisloading }] = useCheckverifyotpMutation()
console.log(verifyotpdata,verifyotperr)
  // Handle send OTP response
  useEffect(() => {
    let tid;
    
    if (sendotpisloading) {
      tid = toast.loading('Sending OTP...');
    }
    
    if (sendotpiserr) {
      toast.error(sendotperr?.data?.message || 'Failed to send OTP');
    }
    
    if (sendotpsuccess) {
      setShowOtpInput(true)
      toast.success(sendotpdata?.message || 'OTP sent successfully!');
    }

    return () => {
      if (tid) {
        toast.dismiss(tid);
      }
    };
  }, [sendotpiserr, sendotpisloading, sendotpsuccess]);

  // Handle verify OTP response
  useEffect(() => {
    let id;
    
    if (verifyotpisloading) {
      id = toast.loading('Verifying OTP...');
    }
    
    if (verifyotpiserr) {
      toast.error(verifyotperr?.data?.message || 'Invalid OTP');
    }
    
    if (verifyotpissuccess) {
      toast.success(verifyotpdata?.message || 'Account verified successfully!');
      // Reset OTP inputs
      setOtp(['', '', '', '', '', ''])
      setShowOtpInput(false)
      // Navigate to home or dashboard after verification
      navigate("/")
    }

    return () => {
      if (id) {
        toast.dismiss(id);
      }
    };
  }, [verifyotpiserr, verifyotpisloading, verifyotpissuccess]);

  // Auto-focus first OTP input when shown
  useEffect(() => {
    if (showOtpInput && otpInputs.current[0]) {
      otpInputs.current[0].focus()
    }
  }, [showOtpInput])

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow single digit numbers
    if (!/^[0-9]?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus()
    }
  }

  // Handle keyboard navigation
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      // If current input is empty, move to previous input
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

  // Handle paste functionality
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

  // Handle send OTP button click
  const handleSendOtp = (e) => {
    e.preventDefault()
    // You might want to get the email from user state or props
    // For now, sending the request without email (backend should handle getting user from session)
    sendotp({})
  }

  // Handle verify OTP submission
  const handleVerifyOtp = (e) => {
    e.preventDefault()
    const otpValue = otp.join('')
    
    if (otpValue.length !== 6) {
      toast.error('Please enter complete 6-digit OTP')
      return
    }
    
    verifyotp({ otp: otpValue })
  }

  // Handle resend OTP
  const handleResendOtp = (e) => {
    e.preventDefault()
    setOtp(['', '', '', '', '', ''])
    sendotp({})
  }

  return (
    <div className="verifyotp-page">
      <div className="verifyotp-container">
        <div className="verifyotp-form-section">
          <div className="form-wrapper">
            {!showOtpInput ? (
              <>
                {/* Initial Send OTP View */}
                <div className="form-header">
                  <h2>Verify Your Account</h2>
                  <p>Click the button below to receive a verification code</p>
                </div>

                <form onSubmit={handleSendOtp} className="auth-form">
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={sendotpisloading}
                  >
                    Send OTP
                  </button>
                </form>

                <div className="form-footer">
                  <p>
                    <button
                      type="button"
                      className="toggle-form-btn"
                      onClick={() => navigate("/")}
                    >
                      ← Back to Home
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* OTP Input View */}
                <div className="form-header">
                  <h2>Enter Verification Code</h2>
                  <p>Enter the 6-digit code we sent to your email</p>
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

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={verifyotpisloading}
                  >
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
                        setOtp(['', '', '', '', '', ''])
                      }}
                    >
                      ← Back
                    </button>
                  </p>
                  <p style={{ marginTop: '1rem' }}>
                    Didn't receive code?{' '}
                    <button
                      type="button"
                      className="toggle-form-btn"
                      onClick={handleResendOtp}
                      disabled={sendotpisloading}
                    >
                      Resend OTP
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

export default Verifyotp
