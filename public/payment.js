const xpay = new Xpay("publishable_key", "account_id", "hmac_secret");
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
    ".input:focus": {
      "border-color": "blue",
      "box-shadow": "none",
    },
    ":hover": {},
    "::placeholder": {},
    "::selection": {},
  },
};

const app = xpay.element("#form", options);

const submit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    const { clientSecret } = await fetch(
      "http://localhost:4242/create-payment-intent",
      {
        method: "post",
      }
    )
      .then((res) => res.json())
      .then((res) => res);
    const { message } = await xpay.createPaymentMethod("card", clientSecret);
    setLoading(false);
    await showMessage(
      message === "SUCCESS" ? "You payment is successful" : message
    );
  } catch (e) {
    setLoading(false);
    showMessage(
      e.message === "FAILURE" ? "Your payment has been declined!" : e.message
    );
  }
};

document.querySelector("#payment-form").addEventListener("submit", submit);

function setLoading(isLoading) {
  if (isLoading) {
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}

async function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;
}
