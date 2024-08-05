import { ProductReviewsPageView } from "../../../../../pages-sections/vendor-dashboard/products/page-view"; 

import api from "../../../../../utils/__api__/dashboard";
export const metadata = {
  title: "Ürün Yorumları - TZV Market",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: []
};
export default async function ProductReviews() {
  const comments = await api.comments();
  return <ProductReviewsPageView reviews={comments} />;
}