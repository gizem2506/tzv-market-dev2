import { CategoriesPageView } from "../../../../pages-sections/vendor-dashboard/categories/page-view"; 

import api from "../../../../utils/__api__/dashboard";
export const metadata = {
  title: "Kategoriler - TZV Market",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: []
};
export default async function Categories() {
  const categories = await api.category();
  return <CategoriesPageView categories={categories} />;
}