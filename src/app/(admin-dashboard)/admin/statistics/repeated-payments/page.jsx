import { RepeatedPaymentsPageView } from "../../../../../pages-sections/vendor-dashboard/statistics/page-view"; 
// API FUNCTIONS

import api from "../../../../../utils/__api__/dashboard";
export const metadata = {
  title: "Tekrarlı Ödemeler - TZV Market",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: []
};
export default async function RepeatedPaymentsPage() {
  const statistics = await api.statistics();
  return <RepeatedPaymentsPageView statistics={statistics} />;
}