import React, { useState, useEffect } from 'react'
import { 
  CreditCard, Zap, Shield, 
  ArrowUpRight, History, Check,
  ChevronRight, Plus, ExternalLink,
  Crown, Star, Rocket, LayoutGrid,
  Activity, Download, MessageSquare, ArrowRight,
  TrendingUp, Info, BarChart3, Clock3
} from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '../../services/api'
import '../../styles/pages/about-us/Billing.css'

const Billing = () => {
  const [billingData, setBillingData] = useState(null)
  const [loading, setLoading] = useState(true)
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
    fetchBalance()
  }, [])

  const handleTopUp = async () => {
    setIsProcessing(true)
    await new Promise(r => setTimeout(r, 1500)) // Sync feel
    const res = await api.billing.topUp(topUpAmount)
    if (!res.error) {
       await fetchBalance()
    }
    setIsProcessing(false)
  }

  const handleUpgrade = async (tier) => {
    setIsProcessing(true)
    await new Promise(r => setTimeout(r, 1200)) // Neural processing feel
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
        icon: <Star size={24} className="text-secondary" />, 
        features: ['SD Quality', 'Watermark', 'Basic Support'],
        active: billingData?.subscription === 'Trial'
    },
    { 
        name: 'Standard', 
        price: '$29', 
        icon: <Rocket size={24} className="text-primary" />, 
        features: ['4K Quality', 'No Watermark', 'Priority Processing', 'API Access'],
        active: billingData?.subscription === 'Standard'
    },
    { 
        name: 'Pro', 
        price: '$99', 
        icon: <Crown size={24} className="text-accent" />, 
        features: ['8K Quality', 'Dedicated Support', 'Custom Avatars', 'Early Features'],
        active: billingData?.subscription === 'Pro'
    }
  ]

  if (loading) return <div className="billing-loading">Synchronizing financial node...</div>

  return (
    <div className="billing-page-v4">
      {/* Header with mini-button as per screenshot */}
      <header className="b-page-header">
         <div className="b-titles">
            <h1>Billing & Subscriptions</h1>
            <p>Manage your credits and subscription tiers</p>
         </div>
         <button className="mini-add-credits-btn">
            <Plus size={14} /> Add Credits
         </button>
      </header>

      <div className="b-layout-main">
         <div className="b-primary-content">
            {/* Available Credits Card */}
            <div className="available-credits-card">
               <div className="ac-left">
                  <label>AVAILABLE CREDITS</label>
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="ac-val"
                  >
                    {Math.round(billingData?.credits || 0).toLocaleString()}
                  </motion.div>
               </div>
               <div className="ac-right">
                  <div className="lightning-glow-circle">
                     <Zap size={32} fill="currentColor" />
                  </div>
                  <div className="ac-prediction-badge" title="Projected asset synthesis capacity">
                     <BarChart3 size={12} />
                     ~{Math.floor((billingData?.credits || 0) / 450)} Pro Videos
                  </div>
               </div>
            </div>

            {/* Plans Grid */}
            <div className="tiers-comparison-grid">
                {plans.map((plan, idx) => (
                  <div key={plan.name} className={`tier-card ${plan.active ? 'active' : ''} ${plan.name === 'Pro' ? 'pro-tier-exclusive' : ''}`}>
                     {plan.name === 'Pro' && <div className="pro-glow-border"></div>}
                     <div className="tier-icon-box">{plan.icon}</div>
                     <h3 className="tier-name">{plan.name}</h3>
                     <div className="tier-pricing">
                        <span className="p-val">{plan.price}</span>
                        <span className="p-dur">/month</span>
                     </div>
                     <ul className="tier-perks">
                        {plan.features.map(f => (
                          <li key={f}><Check size={14} /> {f}</li>
                        ))}
                     </ul>
                     <button 
                       className={`tier-select-btn ${plan.active ? 'active-tier' : ''}`}
                       onClick={() => !plan.active && handleUpgrade(plan.name)}
                       disabled={isProcessing}
                     >
                        {plan.active ? 'Active' : isProcessing ? '...' : 'Select Tier'}
                     </button>
                  </div>
                ))}
             </div>
             
             <div className="compare-full-link">
                <span>View full feature comparison</span>
                <ArrowRight size={14} />
             </div>

             {/* Neural Efficiency Matrix - NEW Platinum Enhancement */}
             <div className="efficiency-matrix-wrapper">
                <div className="em-card">
                   <div className="em-main">
                      <div className="em-title">
                         <TrendingUp size={18} /> 
                         <span>Neural Efficiency Matrix</span>
                      </div>
                      <div className="em-row">
                         <div className="em-score">98.4<small>%</small></div>
                         <p>Your credit utilization is optimized for high-density synthesis.</p>
                      </div>
                   </div>
                   <div className="em-metrics">
                      <div className="em-stat">
                         <label>SUCCESS RATE</label>
                         <span>99.2%</span>
                      </div>
                      <div className="em-stat">
                         <label>COST / RENDER</label>
                         <span>~420 CR</span>
                      </div>
                   </div>
                </div>

                <div className="em-secondary-card">
                    <div className="em-mini-header">
                       <Clock3 size={14} />
                       <span>Next Cycle Reset</span>
                    </div>
                    <div className="reset-timer">24d 12h 05m</div>
                    <div className="tier-cap-label">PRO TIER LIMITS APPLIED</div>
                </div>
             </div>

            {/* Usage Analytics - NEW Enhancement */}
            <div className="usage-analytics-section">
               <div className="ua-header">
                  <h3><Activity size={18} /> Usage Intelligence</h3>
                  <span>Last 10 Days</span>
               </div>
               <div className="ua-bars">
                  {[40, 70, 45, 90, 65, 30, 85, 55, 95, 20].map((val, i) => (
                    <div key={i} className="ua-bar-column">
                       <motion.div 
                         className="ua-bar-fill"
                         initial={{ height: 0 }}
                         animate={{ height: `${val}%` }}
                         transition={{ delay: i * 0.05, duration: 1 }}
                       />
                       <span className="ua-day-label">{i + 1} Apr</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Bottom Top Up Section Integrated */}
            <section className="top-up-integrated">
               <div className="tu-info">
                  <div className="tu-title-row">
                     <h3>Top Up Credits</h3>
                     <div className="auto-refill-toggle">
                        <label className="aura-switch">
                           <input type="checkbox" />
                           <span className="aura-slider"></span>
                        </label>
                        <span>Auto-Refill</span>
                     </div>
                  </div>
                  <p>Purchase additional compute credits for your AI generations.</p>
               </div>
               <div className="tu-actions">
                  <div className="tu-amount-row">
                     {[1000, 5000, 10000, 50000].map(amt => (
                       <button 
                         key={amt}
                         className={`tu-amt-btn ${topUpAmount === amt ? 'active' : ''}`}
                         onClick={() => setTopUpAmount(amt)}
                       >
                         {amt.toLocaleString()}
                       </button>
                     ))}
                  </div>
                  <button className="tu-purchase-btn" onClick={handleTopUp} disabled={isProcessing}>
                     {isProcessing ? 'SYNCHRONIZING...' : 'Purchase Now'}
                  </button>
               </div>
            </section>
         </div>

         <aside className="b-sidebar-history">
            {/* Payment Vault - NEW Enhancement */}
            <div className="payment-vault-card">
               <div className="pv-header">
                  <CreditCard size={18} />
                  <span>Payment Vault</span>
               </div>
               <div className="pv-card-item primary">
                  <div className="card-brand">VISA</div>
                  <div className="card-info">
                     <span>•••• 4242</span>
                     <small>Expires 12/28</small>
                  </div>
                  <div className="card-badge">Default</div>
               </div>
               <button className="add-method-link"><Plus size={12} /> Add Method</button>
            </div>

            <div className="history-portal-card">
               <div className="hp-header">
                  <History size={18} />
                  <span>Transaction History</span>
               </div>
                <div className="hp-body">
                   <div className="hp-list">
                      {[
                        { date: 'Mar 15, 2026', amt: '$49.00', status: 'Paid' },
                        { date: 'Feb 15, 2026', amt: '$49.00', status: 'Paid' },
                        { date: 'Jan 15, 2026', amt: '$12.50', status: 'Paid' }
                      ].map((inv, idx) => (
                        <div key={idx} className="hp-invoice-item">
                           <div className="inv-info">
                              <span className="inv-date">{inv.date}</span>
                              <span className="inv-amt">{inv.amt}</span>
                           </div>
                           <button className="inv-download-btn" title="Download PDF">
                              <Download size={14} />
                           </button>
                        </div>
                      ))}
                   </div>
                </div>
            </div>

            <div className="b-security-disclaimer">
               <Shield size={14} />
               <span>Secure payments via Stripe. End-to-end encrypted.</span>
            </div>
         </aside>
      </div>

      {/* Floating Concierge - NEW Enhancement */}
      <motion.button 
        className="billing-concierge-btn"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
         <MessageSquare size={20} />
         <span>Concierge</span>
      </motion.button>
    </div>
  )
}

export default Billing




