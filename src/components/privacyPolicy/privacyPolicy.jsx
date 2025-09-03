import React from "react";
import "./privacyPolicy.css"

export default function PrivacyPolicy() {
  return (
    <>
      <div className="checkout-header">
        <div className="checkout-logo">
        </div>
      </div>
      <div className="page-container">
        <h1>Privacy Policy</h1>
        <p>
          At <strong>Delco Farmers Market</strong>, we value your trust and are
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, and safeguard the data you share with us
          when shopping on our website.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We may collect personal details such as your name, email address,
          billing/shipping information, and payment details when you place an
          order.
        </p>
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To process and deliver your orders securely</li>
          <li>To provide customer support and order updates</li>
          <li>To improve our website experience and product offerings</li>
          <li>To send promotional offers (only if you opt-in)</li>
        </ul>
        <h2>Data Protection</h2>
        <p>
          All transactions are processed through secure payment gateways. We
          never store your card details. Your information is encrypted and
          safeguarded with the latest security measures.
        </p>
        <p>
          For any concerns, please contact us at
          <a href="mailto:support@delcofarmersmarket.com">
            {" "}
            support@delcofarmersmarket.com
          </a>
          .
        </p>
      </div>
    </>
  );
}
