import React from "react";
import "./TermsCondition.css";

export default function TermsAndConditions() {
  return (
    <>
      <div className="checkout-header">
        <div className="checkout-logo">
        </div>
      </div>
      <div className="page-container">
        <h1>Terms & Conditions</h1>
        <p>
          These Terms & Conditions govern your interaction with
          <strong> Delco Farmers Market</strong>. By purchasing from our
          website, you agree to abide by these terms.
        </p>
        <h2>Orders & Payments</h2>
        <p>
          All orders must be placed through our official website. Payments are
          securely processed via trusted gateways.
        </p>
        <h2>Shipping & Delivery</h2>
        <p>
          We aim to deliver fresh, high-quality products on time. Delivery times
          may vary based on location and availability.
        </p>
        <h2>Returns & Refunds</h2>
        <p>
          If you are unsatisfied with your purchase, you may request a return or
          exchange within 7 days of delivery.
        </p>
        <h2>Governing Law</h2>
        <p>
          These terms are governed by applicable laws of your region. Disputes
          will be resolved through arbitration or local courts.
        </p>
        <p>
          For queries, contact us at
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
