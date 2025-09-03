import React from "react";
import TermsAndConditions from "../../components/TermsCondition/TermsCondition";
import Footer from "../../components/Footer/Footer";
const page = () => {
  return (
    <div>
      <TermsAndConditions />
      <div style={{ maxWidth: "80%", margin: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default page;
