import React, { useState } from 'react';
import { PaymentElement, useXpay } from '@xstak/xpay-element';
import { Button } from 'antd';

import './index.css'

export const Payment = () => {
    const [loading, setLoading] = useState(false);
    const options = {
        override: true,
        fields: {
          creditCard: {
            placeholder: "1234 1234 1234 1234",
            label: "Enter your credit card",
          },
          exp: {
            placeholder: "Exp. Date",
          },
        },
        style: {
          ".input": {},
          ".invalid": {},
          ".label": {},
          ":focus": {},
          ":hover": {},
          "::placeholder": {},
          "::selection": {},
        },
      };

    const xpay = useXpay();
    const payNow = async() => {
    let customer = { name: 'abc'};
        try {
            setLoading(true);
            const { clientSecret, encryptionKey } = await fetch("http://localhost:4242/create-payment-intent", {
              method: "post",
            })
              .then((res) => res.json())
              .then((res) => res);
              const { message } = await xpay.confirmPayment("card", clientSecret, customer, encryptionKey);
            setLoading(false);
            alert(
              message === "SUCCESS"
                    ? "You payment is successful"
                    : message
            );
          } catch (e) {
            setLoading(false);
            alert(e.message === "FAILURE" ? "Your payment has been declined!" : e.message);
          }
    }
    return(
        <div id="payment-form">
        <PaymentElement options={options} onReady={(event) => {
            console.log("ready event", event);
          }} />
        <Button type="primary" onClick={payNow} loading={loading}>
          Pay Now
        </Button>
        </div>
    )
}