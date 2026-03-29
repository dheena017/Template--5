import React, { useState, useEffect } from 'react'
import { 
  CreditCard, Zap, Shield, 
  ArrowUpRight, History, Check,
  ChevronRight, Plus, ExternalLink,
  Crown, Star, Rocket
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../../services/api'
import '../../styles/pages/about-us/Billing.css'

const Billing = () => {
  const [billingData, setBillingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showTopUp, setShowTopUp] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState(5000)
  const [isProcessing, setIsProcessing] = useState(false)


   const fetchBalance = async () => {
    const res = await api.billing.getBalance()
    if (!res.error) {
      setBillingData(res)
    }
    setLoading(false)
  }

   useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchBalance()
   }, [])
  const handleTopUp = async () => {
    setIsProcessing(true)
    // Simulate payment gateway delay
    await new Promise(r => setTimeout(r, 2000))
    
    const res = await api.billing.topUp(topUpAmount)
    if (!res.error) {
       await fetchBalance()
       setShowTopUp(false)
    }
    setIsProcessing(false)
  }

  const handleUpgrade = async (tier) => {
    setIsProcessing(true)
    const res = await api.billing.upgrade(tier)
    if (!res.error) {
      await fetchBalance()
    }
    setIsProcessing(false)
  }

  const plans = [
    { 
        name: 'Trial', 
        price: '$0', 
        credits: '500', 
        icon: <Star size={24} />, 
        features: ['SD Quality', 'Watermark', 'Basic Support'],
        active: billingData?.subscription === 'Trial'
    },
    { 
        name: 'Standard', 
        price: '$29', 
        credits: '5,000', 
        icon: <Rocket size={24} />, 
        features: ['4K Quality', 'No Watermark', 'Priority Processing', 'API Access'],
        active: billingData?.subscription === 'Standard'
    },
    { 
        name: 'Pro', 
        price: '$99', 
        credits: '25,000', 
        icon: <Crown size={24} />, 
        features: ['8K Quality', 'Dedicated Support', 'Custom Avatars', 'Early Features'],
        active: billingData?.subscription === 'Pro'
    }
  ]

  if (loading) return <div className="p-loader">Loading billing records...</div>

  return (
    <div className="billing-container">
      <div className="b-header">
         <div className="b-title">
            <h1>Billing & Subscriptions</h1>
            <p>Manage your credits and subscription tiers</p>
         </div>
         <button className="primary-btn" onClick={() => setShowTopUp(true)}>
            <Plus size={18} /> Add Credits
         </button>
      </div>

      <div className="b-main-grid">
         <div className="b-left">
            {/* Futuristic Balance Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="balance-card-refined"
            >
               <div className="bc-info">
                  <label>Available Credits</label>
                  <motion.h2>
                    {Math.round(billingData?.credits || 0).toLocaleString()}
                  </motion.h2>
               </div>
               <div className="zap-visual">
                  <Zap size={40} fill="currentColor" />
               </div>
            </motion.div>

            {/* Pricing Tiers Grid */}
            <div className="plans-grid">
               {plans.map((plan, idx) => (
                 <motion.div 
                   key={plan.name} 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className={`plan-card-refined ${plan.active ? 'active' : ''}`}
                 >
                    <div className="plan-header">
                       {plan.icon}
                       <h3>{plan.name}</h3>
                    </div>
                    <div className="plan-price">
                       <span>{plan.price}</span>
                       <small>/month</small>
                    </div>
                    <ul className="plan-features">
                       {plan.features.map(f => (
                         <li key={f}><Check size={14} className="check" /> {f}</li>
                       ))}
                    </ul>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={plan.active ? 'active-btn' : 'secondary-btn'}
                      onClick={() => !plan.active && handleUpgrade(plan.name)}
                    >
                       {plan.active ? 'Current Plan' : 'Select Tier'}
                    </motion.button>
                 </motion.div>
               ))}
            </div>
         </div>

         <div className="b-right">
            {/* Transaction History */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="history-card-refined"
            >
               <div className="h-head">
                  <History size={20} />
                  <h3>Transaction History</h3>
               </div>
               <div className="h-list">
                  {billingData?.history?.length > 0 ? (
                    billingData.history.map((tx, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i} 
                        className="tx-item-refined"
                      >
                         <div className={`tx-icon ${tx.amount > 0 ? 'up' : 'down'}`}>
                            {tx.amount > 0 ? <Plus size={14} /> : <Zap size={14} />}
                         </div>
                         <div className="tx-info">
                            <strong>{tx.type} {tx.tool ? `(${tx.tool})` : ''}</strong>
                            <span>{tx.date}</span>
                         </div>
                         <div className={`tx-amount ${tx.amount > 0 ? 'pos' : 'neg'}`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount}
                         </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="empty-history">No recent transactions.</div>
                  )}
               </div>
            </motion.div>

            <div className="security-note">
               <Shield size={16} />
               <span>Secure payments via Stripe. End-to-end encrypted.</span>
            </div>
         </div>
      </div>

      <AnimatePresence>
         {showTopUp && (
           <motion.div 
             className="modal-overlay"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
           >
              <motion.div 
                className="modal-box premium-card"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
              >
                 <h2>Top Up Credits</h2>
                 <p>Purchase additional compute credits for your AI generations.</p>
                 
                 <div className="amount-grid">
                    {[1000, 5000, 10000, 50000].map(amt => (
                      <button 
                        key={amt}
                        className={`amt-btn ${topUpAmount === amt ? 'active' : ''}`}
                        onClick={() => setTopUpAmount(amt)}
                      >
                         {amt.toLocaleString()}
                      </button>
                    ))}
                 </div>

                 <div className="modal-actions">
                    <button className="secondary-btn" onClick={() => setShowTopUp(false)}>Cancel</button>
                    <button className="primary-btn" onClick={handleTopUp} disabled={isProcessing}>
                       {isProcessing ? 'Processing Payment...' : 'Purchase Now'}
                    </button>
                 </div>
              </motion.div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  )
}

export default Billing




