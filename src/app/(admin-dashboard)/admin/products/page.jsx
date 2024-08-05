import { ProductsPageView } from "../../../../pages-sections/vendor-dashboard/products/page-view"; 
// API FUNCTIONS

import api from "../../../../utils/__api__/dashboard";
export const metadata = {
  title: "Ürünler - TZV Market",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: []
};
export default async function Products() {
  const products = await api.products();
  return <ProductsPageView products={products} />;
}