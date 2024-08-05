import { ProductSearchPageView } from "../../../../../pages-sections/product-details/page-view";
export const metadata = {
  title: "Türkiye Zeka Vakfı - Ürünler",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: [""]
};
export default async function ProductSearch({
  params
}) {
  return <ProductSearchPageView />;
}