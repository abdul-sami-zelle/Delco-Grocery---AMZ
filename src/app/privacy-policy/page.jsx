import Footer from '../../components/Footer/Footer'
import PrivacyPolicy from '../../components/privacyPolicy/privacyPolicy'
import React from 'react'

const page = () => {
  return (
    <div>
      <PrivacyPolicy/>
       <div style={{ maxWidth: "80%", margin: "auto" }}>
        <Footer />
      </div>
    </div>
  )
}

export default page
