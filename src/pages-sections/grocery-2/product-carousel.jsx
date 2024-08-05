"use client" 
import Box from "@mui/material/Box";
import { H3 } from "../../components/Typography";
import { Carousel } from "../../components/carousel";
import ProductCard1 from "../../components/product-cards/product-card-1";
import { getAllProducts } from "@/src/services/products-services";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductCarousel({ title }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const responsive = [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
      },
    },
  ];

  return (
    <div className="mb-3">
      <H3 fontSize={25} mb={3}>
        {title}
      </H3>

      <Carousel slidesToShow={4} responsive={responsive}>
        {products.map((item) => (
          <Box py={0.5} key={item.id}>
            <Link href={`/products/${item.product_slug}`}>
              <ProductCard1
                hideRating
                id={item.id}
                slug={item.product_slug}
                price={item.price}
                title={item.product_name}
                imgUrl={`/uploads/images/${item.product_image[0].imageName}`}
              />
            </Link>
          </Box>
        ))}
      </Carousel>
    </div>
  );
}
