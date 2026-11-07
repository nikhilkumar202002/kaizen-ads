export * from './axios.service'
export * from './enquiries.service'
export * from './diagnostics.service'
export * from './newsletter.service'
export * from './tracking.service'

import apiClient from './axios.service'
import enquiryService from './enquiries.service'
import diagnosticService from './diagnostics.service'
import newsletterService from './newsletter.service'
import trackingService from './tracking.service'

const api = {
  client: apiClient,
  enquiries: enquiryService,
  diagnostics: diagnosticService,
  newsletter: newsletterService,
  tracking: trackingService,
}

export default api
