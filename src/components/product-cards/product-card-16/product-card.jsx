import Link from "next/link";
import Rating from "@mui/material/Rating";
import { H6 } from "../../../components/Typography";
import LazyImage from "../../../components/LazyImage";
import { FlexBetween, FlexBox } from "../../../components/flex-box";
import { PriceText } from "./styles";
import QuantityButtons from "./components/quantity-buttons";
import useProduct from "../use-product";
import { currency } from "@/src/lib";

export default function ProductCard16({ product }) {
  const {
    product_slug,
    product_name,
    product_image,
    price,
    rating,
    id
  } = product || {};

  const {
    cartItem,
    handleCartAmountChange
  } = useProduct(product_slug);

  const handleIncrementQuantity = () => {
    const updatedProduct = {
      id,
      product_slug,
      price,
      product_name,
      imgUrl: product_image[0].imageName,
      quantity: (cartItem?.quantity || 0) + 1
    };
    handleCartAmountChange(updatedProduct);
  };

  const handleDecrementQuantity = () => {
    const updatedProduct = {
      id,
      product_slug,
      price,
      product_name,
      imgUrl: product_image[0].imageName,
      quantity: (cartItem?.quantity || 0) - 1
    };
    handleCartAmountChange(updatedProduct, "remove");
  };

  return (
    <div>
      <Link href={`/products/${product_slug}`}>
        <FlexBox position="relative" bgcolor="grey.50" borderRadius={3} mb={2}>
          <LazyImage
            alt={product_name}
            width={380}
            height={379}
            src={`/uploads/images/${product_image[0].imageName}`}
          />
        </FlexBox>
      </Link>

      <FlexBetween alignItems="flex-end">
        <div>
          <Link href={`/products/${product_slug}`}>
            <H6 fontWeight={700} mb={1}>
              {product_name}
            </H6>
          </Link>
          <Rating readOnly value={rating} size="small" precision={0.5} />
          <PriceText> {currency(price)}</PriceText>
        </div>

        {/* PRODUCT QUANTITY HANDLER BUTTONS */}
        <QuantityButtons
          quantity={cartItem?.quantity || 0}
          handleIncrement={handleIncrementQuantity}
          handleDecrement={handleDecrementQuantity}
        />
      </FlexBetween>
    </div>
  );
}
