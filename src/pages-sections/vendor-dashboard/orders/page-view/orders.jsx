"use client";

import OrderRow from "../../../vendor-dashboard/orders/order-row";
import Pagination from "../pagination";
import PageWrapper from "../../../vendor-dashboard/page-wrapper";
import { Box } from "@mui/material";

export default function OrdersPageView({ orders }) {
  return (
    <Box px={4} pt={1}>
      {" "}
      <PageWrapper title="Siparişler">
        {orders.map((order) => (
          <OrderRow order={order} key={order.id} />
        ))}

        <Pagination count={5} onChange={(data) => console.log(data)} />
      </PageWrapper>
    </Box>
  );
}
