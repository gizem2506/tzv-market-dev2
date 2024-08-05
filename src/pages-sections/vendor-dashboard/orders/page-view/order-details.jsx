"use client";

import { Fragment } from "react";
import OrderSummery from "../order-summery";
import OrderProgress from "../order-progress";
import OrderedProducts from "../ordered-products";


export default function OrderDetailsPageView({
  order
}) {
  return <Fragment>
     
      <OrderProgress />
      <OrderedProducts order={order} />

      <OrderSummery order={order} />

    </Fragment>;
}