const express = require("express");
const crypto = require("crypto");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const payload = {
    amount: 1,
    currency: "PKR",
    payment_method_types: "card",
    customer: {
      email: "",
      name: "",
      phone: "",
    },
  };
  const signature = crypto
    .createHmac("SHA256", "hmac_secret")
    .update(JSON.stringify(payload))
    .digest("hex");
  try {
    const paymentIntent = await axios.post(
      "https://xstak-pay-stg.xstak.com/public/v1/payment/intent",
      payload,
      {
        headers: {
          "x-api-key": "secret_key",
          "Content-Type": "application/json",
          "x-signature": signature,
          "x-account-id": "account_id",
        },
      }
    );
    res.json({
      clientSecret: paymentIntent.data.data.pi_client_secret,
    });
  } catch (e) {
    console.log(e);
    throw { e };
  }
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
