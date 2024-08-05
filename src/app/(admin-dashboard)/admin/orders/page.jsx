import { OrdersPageView } from "../../../../pages-sections/vendor-dashboard/orders/page-view"; 

import api from "../../../../utils/__api__/dashboard";
export const metadata = {
  title: "Siparişler - TZV Market",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: []
};
export default async function Orders() {
  const orders = await api.orders();
  return <OrdersPageView orders={orders} />;
}