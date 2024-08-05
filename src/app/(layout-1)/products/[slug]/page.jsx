"use server";
import { notFound } from "next/navigation";
import { ProductDetailsPageView } from "../../../../pages-sections/product-details/page-view";
import { getProductBySlug } from "@/src/services/products-services";

export default async function ProductDetails({ params }) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }
  
  return <ProductDetailsPageView product={product} />;
}
