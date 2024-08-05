import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { FlexBetween } from "../../components/flex-box";
import { H5, H6, Paragraph } from "../../components/Typography";
import { currency } from "../../lib";

function ListItem({ title, value }) {
  return (
    <FlexBetween mb={1}>
      <Paragraph color="grey.600">{title}</Paragraph>
      <H6>{value}</H6>
    </FlexBetween>
  );
}

export default function OrderSummery({ order }) {
  return (
    <Grid container spacing={3}>
      {/* SHIPMENT ADDRESS SECTION */}
      <Grid item lg={6} md={6} xs={12}>
        <Card
          sx={{
            p: 3,
          }}
        >
          <H5 mt={0} mb={2}>
          Gönderim Adresi
          </H5>

          <Paragraph fontSize={14} my={0}>
            {order.shippingAddress}
          </Paragraph>
        </Card>
      </Grid>

      {/* TOTAL SUMMERY SECTION */}
      <Grid item lg={6} md={6} xs={12}>
        <Card
          sx={{
            p: 3,
          }}
        >
          <H5 mt={0} mb={2}>
          Toplam Özet
          </H5>

          <ListItem title="Toplam:" value={currency(order.totalPrice)} />
          {/* <ListItem title="Shipping fee:" value={currency(0)} />
          <ListItem title="Discount:" value={currency(order.discount)} /> */}

          <Divider
            sx={{
              mb: 1,
            }}
          />

      

          <Paragraph>Kredi/Banka Kartı ile Ödeme</Paragraph>
        </Card>
      </Grid>
    </Grid>
  );
}
