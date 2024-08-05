import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "../../../../../pages-sections/vendor-dashboard/orders/page-view"; 
import api from "../../../../../utils/__api__/orders"; 

export const metadata = {
  title: "Sipariş Detay - TZV Market",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: []
};
export default async function OrderDetails({
  params
}) {
  try {
    const order = await api.getOrder(String(params.id));
    return <OrderDetailsPageView order={order} />;
  } catch (error) {
    notFound();
  }
}