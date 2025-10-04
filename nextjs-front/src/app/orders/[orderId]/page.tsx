// app/ordenes/[orderId]/page.tsx
// import OrderDetails from "../../../components/order-details";

import React from "react";

type Props = {
  params: {
    orderId: string;
  };
};

export default function OrderDetailsPage({ params }: Props) {
  return <React.Fragment><div></div></React.Fragment>
  // return <OrderDetails orderId={params.orderId} />;
}
