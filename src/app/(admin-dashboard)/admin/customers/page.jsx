import { CustomersPageView } from "../../../../pages-sections/vendor-dashboard/customers/page-view"; 
// API FUNCTIONS

import api from "../../../../utils/__api__/dashboard";
export const metadata = {
  title: "Kullanıcılar - TZV Market",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: []
};
export default async function Customers() {
  const customers = await api.customers();
  return <CustomersPageView customers={customers} />;
}