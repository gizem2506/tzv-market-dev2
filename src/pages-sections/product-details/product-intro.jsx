"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import useCart from "../../hooks/useCart";
import LazyImage from "../../components/LazyImage";
import { H1, H2, H3, H6 } from "../../components/Typography";
import { FlexBox, FlexRowCenter } from "../../components/flex-box";
import { currency } from "../../lib";
import ProductTabs from "./product-tabs";
import { Avatar } from "@mui/material";

export default function ProductIntro({ product }) {
  const { id, price, product_name, product_slug , product_image } = product || {};
  const { state, dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const cartItem = state.cart?.find((item) => item.id === id);

  const handleCartAmountChange = (amount) => () => {
    console.log("Amount before dispatch:", amount);
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id,
        price,
        quantity: amount,
        product_name: product_name,
        imgUrl: product_image[0].imageName,
        product_slug,
      },
    });
  };

  const handleImageClick = (ind) => () => setSelectedImage(ind);

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox
            borderRadius={3}
            overflow="hidden"
            justifyContent="center"
            mb={6}
          >
            <LazyImage
              alt={product_name}
              width={300}
              height={300}
              loading="eager"
              src={`/uploads/images/${product_image[selectedImage].imageName}`}
              sx={{
                objectFit: "contain",
              }}
            />
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb={1}>{product_name}</H1>

          <FlexBox alignItems="center" gap={1} mb={2}>
            <Box lineHeight="1">Ürün Değerlendirmesi:</Box>
            <Rating color="warn" value={4} readOnly />
            <H6 lineHeight="1">(50)</H6>
          </FlexBox>

          <Box pt={1} mb={3}>
            <H2 color="primary.main" mb={0.5} lineHeight="1">
              {currency(price)}
            </H2>
          </Box>

          {!cartItem?.quantity ? (
            <Button
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
              sx={{
                mb: 4.5,
                px: "1.75rem",
                height: 40,
              }}
            >
              Sepete Ekle
            </Button>
          ) : (
            <FlexBox alignItems="center" mb={4.5}>
              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.quantity - 1)}
              >
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.quantity.toString().padStart(2, "0")}
              </H3>

              <Button
                size="small"
                sx={{
                  p: 1,
                }}
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.quantity + 1)}
              >
                <Add fontSize="small" />
              </Button>
            </FlexBox>
          )}

          <FlexBox>
            {product?.product_image?.map((image, ind) => (
              <FlexRowCenter
                key={ind}
                width={94}
                height={94}
                minWidth={94}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                style={{
                  cursor: "pointer",
                }}
                onClick={handleImageClick(ind)}
                mr={ind === product.product_image.length - 1 ? "auto" : "10px"}
                borderColor={
                  selectedImage === ind ? "primary.main" : "grey.400"
                }
              >
                <Avatar
                  alt={`Product Image ${ind}`}
                  src={`/uploads/images/${image.imageName}`}
                  variant="square"
                  sx={{
                    height: 40,
                    marginRight: 2,
                  }}
                />
              </FlexRowCenter>
            ))}
          </FlexBox>
          <ProductTabs product={product} />
        </Grid>
      </Grid>
    </Box>
  );
}
