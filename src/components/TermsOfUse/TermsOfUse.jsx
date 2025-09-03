import React from "react";
import "./TermsOfUse.css"

export default function TermsOfUse() {
  return (
    <>
      <div className="checkout-header">
        <div className="checkout-logo"></div>
      </div>
      <div className="page-container">
        <h1>Terms of Use</h1>
        <p>
          Welcome to <strong>Delco Farmers Market</strong>. By accessing or
          using our website, you agree to comply with the following terms and
          conditions.
        </p>
        <h2>Website Access</h2>
        <p>
          You may use our site for browsing products, placing orders, and
          accessing customer services. Unauthorized use is strictly prohibited.
        </p>
        <h2>Account Responsibility</h2>
        <p>
          Customers are responsible for maintaining the confidentiality of their
          accounts and passwords.
        </p>
        <h2>Product Information</h2>
        <p>
          While we strive to provide accurate product descriptions and pricing,
          errors may occur. We reserve the right to correct inaccuracies.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          Delco Farmers Market is not liable for damages resulting from misuse
          of our products or website.
        </p>
      </div>
    </>
  );
}
