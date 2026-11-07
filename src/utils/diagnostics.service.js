import apiClient from './axios.service'

/**
 * @typedef {Object} DiagnosticPayload
 * @property {'launch' | 'grow'} selected_option - Selected business route ('launch' or 'grow')
 * @property {string[]} selected_steps - Array of chosen strategic priorities / steps
 * @property {string} [phone] - Prospect contact phone number
 * @property {string} [email] - Prospect email address
 */

/**
 * @typedef {Object} DiagnosticSuccessResponse
 * @property {boolean} success - true
 * @property {string} message - Success message
 * @property {Object} data
 * @property {number} data.id - Diagnostic record ID
 * @property {string} [data.reference_id] - Reference tracking ID (e.g. DIA-20261107-0001)
 * @property {string} [data.status] - Status e.g. 'new'
 */

/**
 * Submit business assessment / diagnostic lead to /diagnostic-leads
 *
 * @param {DiagnosticPayload} payload
 * @returns {Promise<DiagnosticSuccessResponse>}
 */
export const submitDiagnosticLead = async (payload) => {
  const formattedPayload = {
    selected_option: payload.selected_option || payload.selectedOption || 'grow',
    selected_steps: Array.isArray(payload.selected_steps)
      ? payload.selected_steps
      : Array.isArray(payload.selectedSteps)
      ? payload.selectedSteps
      : [],
    phone: payload.phone?.trim() || '',
    email: payload.email?.trim() || '',
  }

  return apiClient.post('/diagnostic-leads', formattedPayload)
}

export const createDiagnosticLead = submitDiagnosticLead

export const diagnosticService = {
  submit: submitDiagnosticLead,
  create: createDiagnosticLead,
}

export default diagnosticService

