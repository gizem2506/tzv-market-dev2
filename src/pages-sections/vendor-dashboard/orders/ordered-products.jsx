import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { format } from "date-fns";
import { H6, Paragraph } from "../../../components/Typography";
import { FlexBetween, FlexBox } from "../../../components/flex-box";
import { currency } from "../../../lib";

export default function OrderedProducts({ order }) {
  const { id, createdAt, items, deliveredAt } = order || {};
  return (
    <Card
      sx={{
        p: 0,
        mb: "30px",
      }}
    >
      <FlexBetween px={3} py={2} flexWrap="wrap" bgcolor="grey.200">
        <Item title="Sipariş ID:" value={id} />
   

      </FlexBetween>

      {items.map((item, ind) => (
        <FlexBetween px={2} py={1} flexWrap="wrap" key={ind}>
          <FlexBox gap={2.5} alignItems="center">
            <Avatar
              alt={item.product_name}
              src={item.product_img}
              sx={{
                height: 64,
                width: 64,
              }}
            />

            <div>
              <H6>{item.product_name}</H6>
            </div>
          </FlexBox>

          <Button variant="text" color="primary">
            {currency(item.product_price)} x {item.product_quantity}
          </Button>
        </FlexBetween>
      ))}
    </Card>
  );
}

function Item({ title, value }) {
  return (
    <FlexBox gap={1} alignItems="center">
      <Paragraph color="grey.600">{title}</Paragraph>
      <Paragraph>{value}</Paragraph>
    </FlexBox>
  );
}
