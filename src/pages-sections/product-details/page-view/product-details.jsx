import Container from "@mui/material/Container";
import ProductIntro from "../product-intro";

export default function ProductDetailsPageView({ product }) {
  return (
    <Container className="mt-2 mb-2">
      <ProductIntro product={product} />
    </Container>
  );
}
