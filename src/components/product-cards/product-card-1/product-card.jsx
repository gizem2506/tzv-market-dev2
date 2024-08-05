"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import LazyImage from "../../../components/LazyImage";
import useProduct from "../use-product"; 
import ProductPrice from "../product-price";
import ProductTitle from "../product-title";

import { ImageWrapper, ContentWrapper, StyledBazaarCard } from "./styles"; 
import { Span } from "../../Typography";
export default function ProductCard1({
  id,
  slug,
  title,
  price,
  imgUrl,
  hoverEffect,
  showProductSize
}) {
  const {
    isFavorite,
    openModal,
    cartItem,
    toggleDialog,
    toggleFavorite,
    handleCartAmountChange
  } = useProduct(slug);



  return <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {/* <Link href={`/products/${slug}`}> */}
          <LazyImage priority src={imgUrl} width={500} height={500} alt={title} />
        {/* </Link> */}
      </ImageWrapper>

      
      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
          
          <ProductTitle title={title} slug={slug} />

      
          {showProductSize ? <Span color="grey.600" mb={1} display="block">
          Litre
            </Span> : null}

          {
          /* PRODUCT PRICE WITH DISCOUNT */
        }
          <ProductPrice  price={price} />
        </Box>

       
      </ContentWrapper>
    </StyledBazaarCard>;
}