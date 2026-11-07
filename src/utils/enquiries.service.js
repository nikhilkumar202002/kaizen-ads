import apiClient from './axios.service'

/**
 * @typedef {Object} EnquiryPayload
 * @property {string} name - Visitor's name (required)
 * @property {string} stage - Business stage e.g. "Growing Business", "Starting New" (required)
 * @property {string} goal - Primary goal / objective (required)
 * @property {'email' | 'whatsapp'} channel - Chosen communication channel (required)
 * @property {string[]} [services] - Array of interested services e.g. ["SEO", "Google Ads"]
 * @property {string} [message] - Detailed enquiry message
 */

/**
 * @typedef {Object} EnquirySuccessResponse
 * @property {boolean} success - true
 * @property {string} message - Success message
 * @property {Object} data
 * @property {number} data.id - Enquiry database ID
 * @property {string} [data.reference_id] - Reference tracking number
 * @property {string} [data.status] - Status e.g. 'new'
 */

/**
 * @typedef {Object} EnquiryErrorResponse
 * @property {boolean} success - false
 * @property {string} message - Validation or error description
 * @property {Record<string, string[]>} [errors] - Field-specific validation errors
 */

/**
 * Submit an enquiry to the /enquiries endpoint
 *
 * @param {EnquiryPayload} payload
 * @returns {Promise<EnquirySuccessResponse>}
 * @throws {EnquiryErrorResponse}
 */
export const submitEnquiry = async (payload) => {
  // Normalize and sanitize payload fields
  const formattedPayload = {
    name: payload.name?.trim() || '',
    stage: payload.stage?.trim() || 'Not sure yet',
    goal: payload.goal?.trim() || '',
    channel: payload.channel === 'whatsapp' ? 'whatsapp' : 'email',
    services: Array.isArray(payload.services) ? payload.services : [],
    message: payload.message?.trim() || payload.goal?.trim() || '',
  }

  return apiClient.post('/enquiries', formattedPayload)
}

/**
 * Alias for submitEnquiry for flexibility
 */
export const createEnquiry = submitEnquiry

/**
 * Enquiry service object
 */
export const enquiryService = {
  submit: submitEnquiry,
  create: createEnquiry,
}

// Re-export other API services for convenience
export { submitDiagnosticLead, createDiagnosticLead } from './diagnostics.service'
export { subscribeNewsletter } from './newsletter.service'
export {
  trackEvent,
  trackPhoneClick,
  trackWhatsAppClick,
  trackEmailClick,
} from './tracking.service'

export default enquiryService
