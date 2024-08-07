// pages/api/receivePaid.js
import axios from 'axios';

const paymentURL = 'https://halici-payment.herokuapp.com/';
const paymentToken = 'UztwkXN-5AoChSe4AO9YPQ';
const paymentSuccessUrl = 'https://tzv-market-dev2.vercel.app/payments/success';
const paymentErrorUrl = 'https://tzv-market-dev2.vercel.app/payments/error';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const result = await axios.post(
        `${paymentURL}payments/checkout`,
        {
          ...req.body,
          success_callback: paymentSuccessUrl,
          error_callback: paymentErrorUrl,
          token: paymentToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      res.status(200).json(result.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
