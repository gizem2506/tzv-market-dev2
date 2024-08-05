
import { calculateDiscount, currency } from "../../lib"; 
import { FlexBox } from "../flex-box";
import { Paragraph } from "../Typography";

export default function ProductPrice({
  discount,
  price
}) {
  return <FlexBox alignItems="center" gap={1} mt={0.5}>
      <Paragraph fontWeight={600} color="primary.main">
      {currency(price)}
      </Paragraph>

    </FlexBox>;
}