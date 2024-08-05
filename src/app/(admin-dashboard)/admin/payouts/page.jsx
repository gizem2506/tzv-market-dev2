import { PayoutsPageView } from "../../../../pages-sections/vendor-dashboard/payouts/page-view"; 
// API FUNCTIONS

import api from "../../../../utils/__api__/dashboard";
export const metadata = {
  title: "Ödemeler - TZV Market",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: []
};
export default async function Payouts() {
  const payouts = await api.payouts();
  return <PayoutsPageView payouts={payouts} />;
}