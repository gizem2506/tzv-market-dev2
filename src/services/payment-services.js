

const HALICI_PAYMENT_HOST = "https://halici-payment.herokuapp.com";

export const createPaymentRowAndGetUrl = functions.https.onRequest(
    async (req, res) => {
      res.set("Access-Control-Allow-Origin", "*");
      // res.set("Access-Control-Allow-Origin", "https://kongre-basvuru.web.app");
      // res.set("Access-Control-Allow-Origin", "http://localhost:5173");
      return cors(req, res, async () => {
        const { receipt, requester_url } = req.body;
  
        // TODO: Total price doğru mu kontrol et
        // const isTotalPriceCorrect = await isTotalPriceWronglyCalculated(receipt);
        // if (!isTotalPriceCorrect) {
        //   res.json({
        //     errorMessage: `Toplam ücret hesaplanırken bir hata meydana geldi.`,
        //   });
        //   return;
        // }
  
        const marketPaymentToken = "UztwkXN-5AoChSe4AO9YPQ"; //functions.config().keys.kongre_payment_token; // TODO: Bu environment secret variable olmalı
        const receiptProductsList = [];
  
        receipt.receipt_products.map((p) => {
          if (p.title === "Kongre Katılım") return null;
          receiptProductsList.push({
            name: "Atölye: " + p.title,
            price: p.price,
            kdv: 20,
            count: 1,
          });
        });
  
        const requestBody = {
          token: marketPaymentToken,
          product_name: "1722513502",
          price: receipt.total_price * 100,
          cargo_price: 0,
          success_callback:
            requester_url +
            "/payment_result?firebase_receipt_id=" +
            receipt.firebase_receipt_id,
          error_callback:
            requester_url + "/payment_result?firebase_receipt_id=error",
          order_id: receipt.random_integer_user_id,
          user_id: receipt.random_integer_order_id,
          products: receiptProductsList,
          user_name: receipt.name,
          email: receipt.email,
        };
  
        let response = undefined;
        let payment_url = "";
  
        try {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          };
  
          const url = HALICI_PAYMENT_HOST + "/payments/checkout";
          response = await fetch(url, requestOptions);
          const responseJson = await response.json();
          payment_url = responseJson.payment_url;
        } catch (error) {
          console.log("----- FETCH APİ ÇALIŞMADIIII ------");
          console.log(error);
        }
  
        res.json({ url: payment_url });
      });
    }
  );