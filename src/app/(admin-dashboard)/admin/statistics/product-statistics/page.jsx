import { ProductStatisticsPageView } from "../../../../../pages-sections/vendor-dashboard/statistics/page-view"; 
import api from "../../../../../utils/__api__/dashboard";

export const metadata = {
  title: "Ürün İstatistikler - TZV Market",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: []
};
export default async function ProductStatisticsPage() {
  const statistics = await api.statistics();
  return <ProductStatisticsPageView statistics={statistics} />;
}