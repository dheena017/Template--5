/**
 * usePreferences - Custom hook for managing user preferences in localStorage
 * 
 * Usage:
 *   const { getPreference, setPreference, clearPreferences } = usePreferences()
 *   
 *   // Save conversion settings
 *   setPreference('pdf_conversions', { selectedKey: 'pdf_to_word', compressionLevel: 'medium' })
 *   
 *   // Retrieve settings
 *   const settings = getPreference('pdf_conversions', {})
 *   
 *   // Clear all preferences
 *   clearPreferences()
 */

const PREFERENCES_KEY = 'textai_user_preferences'

export const usePreferences = () => {
  const getAllPreferences = () => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch (err) {
      console.warn('Failed to parse stored preferences:', err)
      return {}
    }
  }

  const getPreference = (category, defaultValue = null) => {
    try {
      const all = getAllPreferences()
      return all[category] !== undefined ? all[category] : defaultValue
    } catch (err) {
      console.warn(`Failed to get preference for "${category}":`, err)
      return defaultValue
    }
  }

  const setPreference = (category, value) => {
    try {
      const all = getAllPreferences()
      all[category] = value
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(all))
      return true
    } catch (err) {
      console.warn(`Failed to set preference for "${category}":`, err)
      return false
    }
  }

  const clearPreference = (category) => {
    try {
      const all = getAllPreferences()
      delete all[category]
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(all))
      return true
    } catch (err) {
      console.warn(`Failed to clear preference for "${category}":`, err)
      return false
    }
  }

  const clearAllPreferences = () => {
    try {
      localStorage.removeItem(PREFERENCES_KEY)
      return true
    } catch (err) {
      console.warn('Failed to clear all preferences:', err)
      return false
    }
  }

  return {
    getAllPreferences,
    getPreference,
    setPreference,
    clearPreference,
    clearAllPreferences
  }
}

export default usePreferences
