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
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return result;
};

/**
 *   "user_id": "6244",
  "user_name": "Gizem Altay",
  "order_id": "9999",
  "product_name": "1722513502",
  "price": 9,
  "email": "gzm@test.com",

 */
