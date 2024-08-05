import { FlexBetween } from "../../../components/flex-box";
import { Paragraph, Span } from "../../../components/Typography";
import { currency } from "../../../lib";

export default function CartItem({ name, price, qty }) {
  return (
    <FlexBetween mb={1.5}>
      <Paragraph>
        <Span fontWeight="700">{qty}</Span> x {name}
      </Paragraph>

      <Paragraph>{currency(price)}</Paragraph>
    </FlexBetween>
  );
}
