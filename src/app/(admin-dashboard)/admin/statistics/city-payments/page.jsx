import { CityPaymentsPageView } from "../../../../../pages-sections/vendor-dashboard/statistics/page-view"; 
// API FUNCTIONS

import api from "../../../../../utils/__api__/dashboard";
export const metadata = {
  title: "Şehre Göre Ödemeler - TZV Market",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: []
};
export default async function CityPaymentsPage() {
  const statistics = await api.statistics1();
  return <CityPaymentsPageView statistics={statistics} />;
}


