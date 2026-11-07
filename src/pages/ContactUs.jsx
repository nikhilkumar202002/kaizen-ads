import { useSearchParams } from 'react-router-dom'
import ContactBanner from '../components/contact/ContactBanner'
import ContactCards from '../components/contact/ContactCards'
import ChatContactForm from '../components/contact/ChatContactForm'

const ContactUs = () => {
  const [searchParams] = useSearchParams()
  const initialGoal = searchParams.get('goal') || ''
  const initialStage = searchParams.get('stage') || ''

  return (
    <>
      <ContactBanner />
      
      {/* 2-Column Section on Pure Black Background */}
      <section className="dark relative w-full bg-black text-white py-16 sm:py-24 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            
            {/* Left Column: Contact Info Cards */}
            <div className="lg:col-span-5 flex flex-col justify-center w-full">
              <ContactCards />
            </div>

            {/* Right Column: Chat Contact Form */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
              <ChatContactForm initialGoal={initialGoal} initialStage={initialStage} />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default ContactUs
