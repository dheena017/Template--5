/**
 * useConversionHistory - Hook for managing conversion history in the frontend
 * 
 * Usage:
 *   const { history, loading, error, recentConversions, getRecent, clearOldEntries } = useConversionHistory()
 */

import { useState, useCallback, useEffect } from 'react'
import { api } from '../services/api'

export const useConversionHistory = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [stats, setStats] = useState(null)

  // Fetch recent conversions
  const getRecent = useCallback(async (conversionKey = null, limit = 20, days = 30) => {
    setLoading(true)
    setError('')
    try {
      const data = await api.pdf.getHistory(conversionKey, limit, days)
      if (data.status === 'success') {
        setHistory(data.items || [])
        return data.items || []
      } else {
        throw new Error(data.message || 'Failed to fetch history')
      }
    } catch (err) {
      const msg = err?.message || 'Unknown error'
      setError(msg)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  // Save a conversion to history
  const saveConversion = useCallback(async (conversion) => {
    try {
      const {
        conversionKey,
        fromFormat,
        toFormat,
        fileName,
        fileSizeBytes = null,
        outputUrl = null,
        outputSizeBytes = null,
        processingTimeMs = null
      } = conversion
      
      const result = await api.pdf.saveToHistory(
        conversionKey,
        fromFormat,
        toFormat,
        fileName,
        fileSizeBytes,
        outputUrl,
        outputSizeBytes,
        processingTimeMs
      )
      
      if (result.status === 'success') {
        return { success: true, id: result.id }
      } else {
        throw new Error(result.message || 'Failed to save conversion')
      }
    } catch (err) {
      console.error('[useConversionHistory] Save failed:', err)
      return { success: false, error: err.message }
    }
  }, [])

  // Get conversion history statistics
  const getStats = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.pdf.getHistoryStats()
      if (data.status === 'success') {
        setStats(data)
        return data
      } else {
        throw new Error(data.message || 'Failed to fetch stats')
      }
    } catch (err) {
      console.error('[useConversionHistory] Get stats failed:', err)
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Clean up old history entries
  const clearOldEntries = useCallback(async (days = 90) => {
    setLoading(true)
    try {
      const result = await api.pdf.cleanupHistory(days)
      if (result.status === 'success') {
        return { success: true, deletedCount: result.deleted_count }
      } else {
        throw new Error(result.message || 'Failed to cleanup history')
      }
    } catch (err) {
      console.error('[useConversionHistory] Cleanup failed:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  // Find a conversion in history
  const findInHistory = useCallback((key) => {
    return history.find(item => item.id === key || item.conversion_key === key)
  }, [history])

  // Filter history by conversion key
  const filterByConversionKey = useCallback((key) => {
    return history.filter(item => item.conversion_key === key)
  }, [history])

  // Get most recent conversion for a specific key
  const getMostRecent = useCallback((conversionKey) => {
    const filtered = history.filter(item => item.conversion_key === conversionKey)
    return filtered.length > 0 ? filtered[0] : null
  }, [history])

  // Calculate total size of all conversions
  const getTotalSize = useCallback(() => {
    return history.reduce((sum, item) => sum + (item.output_size_bytes || 0), 0)
  }, [history])

  return {
    // State
    history,
    loading,
    error,
    stats,
    
    // Methods
    getRecent,
    saveConversion,
    getStats,
    clearOldEntries,
    findInHistory,
    filterByConversionKey,
    getMostRecent,
    getTotalSize
  }
}

export default useConversionHistory
