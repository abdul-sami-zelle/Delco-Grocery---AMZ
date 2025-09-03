import Footer from '../../components/Footer/Footer'
import TermsOfUse from '../../components/TermsOfUse/TermsOfUse'
import React from 'react'

const page = () => {
  return (
    <div>
      <TermsOfUse/>
       <div style={{ maxWidth: "80%", margin: "auto" }}>
        <Footer />
      </div>
    </div>
  )
}

export default page
