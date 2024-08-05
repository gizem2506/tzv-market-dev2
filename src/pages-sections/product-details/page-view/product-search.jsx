"use client";

import Container from "@mui/material/Container";
import ProductsGridView from "../../../components/products-view/products-grid-view";
import { getProductsByCategorySlug } from "@/src/services/products-services";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductSearchPageView() {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (slug) {
        const result = await getProductsByCategorySlug(slug);

        if (result.success) {
          setProducts(result.products);
        } else {
          console.error(result.message);
        }
        setLoading(false);
      }
    }

    fetchProducts();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white pt-2 pb-4">
      <Container>
        <ProductsGridView products={products} />
      </Container>
    </div>
  );
}
