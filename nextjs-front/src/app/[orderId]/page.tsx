// app/ordenes/[orderId]/page.tsx
import OrderDetails from "../../components/order-details";

type Props = {
  params: {
    orderId: string;
  };
};

export default function OrderDetailsPage({ params }: Props) {
  return <OrderDetails orderId={params.orderId} />;
}
