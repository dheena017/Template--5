import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Sparkles, Mail, Lock, 
  ChevronRight, Twitter, Github,
  ArrowLeft, ShieldCheck, Zap, AlertCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '../services/api'
import '../styles/pages/Login.css'
import { logger } from '../services/api'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    logger.log('LOGIN', 'Login page mounted')
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    logger.log('LOGIN', 'Login form submitted', { email })
    
    const res = await api.login(email, password)
    
    if (res.success) {
      logger.success('LOGIN', 'Login successful, redirecting to dashboard')
      navigate('/dashboard')
    } else {
      setError(res.error || 'Check your credentials')
      logger.error('LOGIN', 'Login failed', res.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card premium-card"
      >
        <div className="auth-header">
           <div className="brand-badge"><Sparkles size={24} /></div>
           <h1>Welcome Back</h1>
           <p>Continue your creative journey with TextAI</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          {error && <div className="auth-error-message"><AlertCircle size={16} /> {error}</div>}
          
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot-pass"><Link to="#">Forgot Password?</Link></div>
          
          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            <span>{isLoading ? 'Verifying...' : 'Log In'}</span>
            <ChevronRight size={18} />
          </button>
        </form>

        <div className="auth-divider"><span>Or continue with</span></div>

        <div className="social-auth">
           <button className="social-btn"><Twitter size={20} /></button>
           <button className="social-btn"><Github size={20} /></button>
           <button className="social-btn">G</button>
        </div>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create Account</Link>
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

export default Login

