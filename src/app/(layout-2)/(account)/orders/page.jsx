import { OrdersPageView } from "../../../../pages-sections/orders/page-view"; 
// API FUNCTIONS

import api from "../../../../utils/__api__/orders";
export const metadata = {
  title: "Satın Aldıklarım",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: []
};
export default async function Orders() {
  const orders = await api.getOrders();
  return <OrdersPageView orders={orders} />;
}