import axios from 'axios'

/**
 * Common API Base URL
 * Default: https://api.kaizenads.in/api/v1
 * Configurable via Vite environment variable VITE_API_BASE_URL
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://api.kaizenads.in/api/v1'

/**
 * Configured Axios Instance for Kaizen Ads API
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
})

/**
 * Request Interceptor
 * Adds authentication tokens or logs if needed
 */
apiClient.interceptors.request.use(
  (config) => {
    // If an auth token is stored in the future, attach it here:
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Response Interceptor
 * Unwraps data or formats API errors consistently
 */
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const errorResponse = error.response
      ? error.response.data
      : {
          success: false,
          message: error.message || 'Network error occurred. Please check your connection.',
        }
    return Promise.reject(errorResponse)
  }
)

/**
 * API Service Helpers for common endpoints
 */
export const enquiryApi = {
  /**
   * Submit Contact / Discovery Enquiry
   * @param {{ name: string, stage: string, goal: string, channel: string }} data
   */
  submit: (data) => apiClient.post('/enquiries', data),
}

export default apiClient
