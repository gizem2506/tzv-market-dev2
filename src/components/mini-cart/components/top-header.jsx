import IconButton from "@mui/material/IconButton";
import Clear from "@mui/icons-material/Clear"; 


import { FlexBetween, FlexBox } from "../../flex-box";
import CartBag from "../../../icons/CartBag";
import { Paragraph } from "../../Typography";
export default function TopHeader({
  toggle,
  total
}) {
  return <FlexBetween mx={3} height={74}>
      <FlexBox gap={1} alignItems="center" color="secondary.main">
        <CartBag color="inherit" />

        <Paragraph lineHeight={0} fontWeight={600}>
          {total} Öğe
        </Paragraph>
      </FlexBox>

      <IconButton onClick={toggle}>
        <Clear />
      </IconButton>
    </FlexBetween>;
}