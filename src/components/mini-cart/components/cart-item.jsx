import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";
import { FlexBox } from "../../../components/flex-box";
import { H6, Tiny } from "../../../components/Typography";
import { currency } from "../../../lib";
export default function MiniCartItem({ item, handleCartAmountChange }) {

  console.log("item",item)
  return (
    <FlexBox
      py={2}
      px={2.5}
      key={item.id}
      alignItems="center"
      borderBottom="1px solid"
      borderColor="divider"
    >
      <FlexBox alignItems="center" flexDirection="column">
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={handleCartAmountChange(item.quantity + 1, item)}
          sx={{
            height: 28,
            width: 28,
            borderRadius: 50,
          }}
        >
          <Add fontSize="small" />
        </Button>

        <H6 my="3px">{item.quantity}</H6>

        <Button
          size="small"
          color="primary"
          variant="outlined"
          disabled={item.quantity === 1}
          onClick={handleCartAmountChange(item.quantity - 1, item)}
          sx={{
            height: 28,
            width: 28,
            borderRadius: 50,
          }}
        >
          <Remove fontSize="small" />
        </Button>
      </FlexBox>
     
      <Avatar
        alt={item.product_name}
        src={`/uploads/images/${item.imgUrl}`}
        sx={{
          mx: 1,
          width: 75,
          height: 75,
        }}
      />

      <Box
        flex="1"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        <Link href={`/products/${item.product_slug}`}>
          <H6 ellipsis className="title">
            {item.product_name}
          </H6>
        </Link>

        <Tiny color="grey.600">
          {currency(item.price)} x {item.quantity}
        </Tiny>

        <H6 color="primary.main" mt={0.5}>
          {currency(item.quantity * item.price)}
        </H6>
      </Box>

      <IconButton
        size="small"
        onClick={handleCartAmountChange(0, item)}
        sx={{
          marginLeft: 2.5,
        }}
      >
        <Close fontSize="small" />
      </IconButton>
    </FlexBox>
  );
}
