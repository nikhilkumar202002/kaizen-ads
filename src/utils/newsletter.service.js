import apiClient from './axios.service'

/**
 * @typedef {Object} NewsletterPayload
 * @property {string} email - Subscriber email address
 */

/**
 * @typedef {Object} NewsletterSuccessResponse
 * @property {boolean} success - true
 * @property {string} message - e.g. "You have successfully subscribed to our newsletter."
 * @property {Object} [data]
 * @property {number} [data.id] - Subscriber ID
 * @property {string} data.email - Subscriber email
 * @property {string} data.status - e.g. "subscribed"
 */

/**
 * Subscribe an email address to the newsletter at /newsletter
 *
 * @param {string | NewsletterPayload} data
 * @returns {Promise<NewsletterSuccessResponse>}
 */
export const subscribeNewsletter = async (data) => {
  const email = typeof data === 'string' ? data.trim() : data.email?.trim() || ''

  return apiClient.post('/newsletter', { email })
}

export const newsletterService = {
  subscribe: subscribeNewsletter,
}

export default newsletterService

