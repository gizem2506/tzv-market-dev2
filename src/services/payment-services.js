"use server";

import axios from "axios";

const paymentURL = process.env.PAYMENT_URL;
const paymentToken = process.env.PAYMENT_TOKEN;
const paymentSuccessUrl = process.env.PAYMENT_SUCCESS_URL;
const paymentErrorUrl = process.env.PAYMENT_ERROR_URL;

export const receivePaid = async (payment) => {
  console.log("DATA", {
    paymentURL,
    paymentToken,
    paymentErrorUrl,
    paymentSuccessUrl,
  });
  const result = await axios.post(
    `${paymentURL}payments/checkout`,
    {
      ...payment,
      success_callback: paymentSuccessUrl,
      error_callback: paymentErrorUrl,
      token: paymentToken,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return result;
};
