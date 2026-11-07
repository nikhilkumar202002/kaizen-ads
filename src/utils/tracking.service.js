import apiClient from './axios.service'

/**
 * @typedef {'phone_click' | 'whatsapp_click' | 'email_click'} TrackEventType
 */

/**
 * @typedef {Object} TrackEventPayload
 * @property {TrackEventType | string} event_type - Type of event
 * @property {string} event_value - Value being clicked (e.g. phone number or email)
 * @property {string} [contact_value] - Backward/forward compatibility value
 * @property {string} [page_url] - Current page URL (defaults to window.location.href)
 */

/**
 * Track an interaction event to /track-events
 *
 * @param {TrackEventPayload} payload
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const trackEvent = async (payload) => {
  const value = payload.event_value || payload.contact_value || ''
  const pageUrl =
    payload.page_url || (typeof window !== 'undefined' ? window.location.href : '')

  const formattedPayload = {
    event_type: payload.event_type,
    event_value: value,
    contact_value: value, // satisfies backend validation rule
    page_url: pageUrl,
  }

  // Tracking should be non-blocking and never throw uncaught errors to UI
  try {
    return await apiClient.post('/track-events', formattedPayload)
  } catch (err) {
    console.warn('Track event notification:', err)
    return { success: false, message: 'Event logging skipped' }
  }
}

/**
 * Quick helper: Track phone number click
 * @param {string} phone
 * @param {string} [pageUrl]
 */
export const trackPhoneClick = (phone = '+919605281668', pageUrl) =>
  trackEvent({
    event_type: 'phone_click',
    event_value: phone,
    page_url: pageUrl,
  })

/**
 * Quick helper: Track WhatsApp click
 * @param {string} phone
 * @param {string} [pageUrl]
 */
export const trackWhatsAppClick = (phone = '+919605281668', pageUrl) =>
  trackEvent({
    event_type: 'whatsapp_click',
    event_value: phone,
    page_url: pageUrl,
  })

/**
 * Quick helper: Track email address click
 * @param {string} email
 * @param {string} [pageUrl]
 */
export const trackEmailClick = (email = 'info@kaizenads.in', pageUrl) =>
  trackEvent({
    event_type: 'email_click',
    event_value: email,
    page_url: pageUrl,
  })

export const trackingService = {
  track: trackEvent,
  phoneClick: trackPhoneClick,
  whatsappClick: trackWhatsAppClick,
  emailClick: trackEmailClick,
}

export default trackingService

