import Image from "next/image"; 
import { FlexBox } from "../../../components/flex-box";
import { Paragraph } from "../../../components/Typography";
export default function EmptyCartView() {
  return <FlexBox alignItems="center" flexDirection="column" justifyContent="center" height="calc(100% - 74px)">
      <Image width={90} height={100} alt="banner" src="/assets/images/logos/shopping-bag.svg" />

      <Paragraph fontSize={15} mt={2} color="grey.600" textAlign="center" maxWidth={200}>
      Alışveriş çantanız boş. Alışverişe başlayın.
      </Paragraph>
    </FlexBox>;
}