import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { 
  Sparkles, Mail, Lock, 
  ChevronRight, Share2, Code2,
  ArrowLeft, User, ShieldCheck, Zap
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../styles/pages/Register.css'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const res = await api.register({
      email: formData.email,
      password: formData.password,
      display_name: `${formData.firstName} ${formData.lastName}`,
      username: formData.email.split('@')[0]
    })

    if (res.success) {
      navigate('/login', { state: { message: 'Account created! Please log in.' } })
    } else {
      setError(res.error)
      setIsLoading(false)
    }
  }

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
            perspective: 1000,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
        }}
        className="auth-card premium-card"
      >
        <div className="auth-header" style={{ transformStyle: "preserve-3d" }}>
           <div className="brand-badge" style={{ translateZ: 80 }}><Sparkles size={24} /></div>
           <h1 style={{ translateZ: 60 }}>Create Your Account</h1>
           <p style={{ translateZ: 40 }}>Start your 7-day free trial on the Pro Plan</p>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="input-row">
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="First Name" 
                required 
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="Last Name" 
                required 
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          {error && <div className="auth-error-msg">{error}</div>}

          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
            {!isLoading && <ChevronRight size={18} />}
          </button>
        </form>

        <div className="auth-divider"><span>Or continue with</span></div>

        <div className="social-auth">
           <button className="social-btn"><Share2 size={20} /></button>
           <button className="social-btn"><Code2 size={20} /></button>
           <button className="social-btn">G</button>
        </div>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>

        <div className="auth-footer-badges">
          <span><ShieldCheck size={14} /> SOC2 Secure</span>
          <span><Zap size={14} /> 256-bit Encryption</span>
        </div>
      </motion.div>

      <Link to="/" className="back-home"><ArrowLeft size={16} /> Back to Home</Link>
    </div>
  )
}

export default Register

