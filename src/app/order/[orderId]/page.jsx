import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import DetailTable from "@/app/order/_components/detail-table";

export default async function OrderIdPage({ params, searchParams }) {
  const { orderId } = params;

  const order = await db.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      order_items: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  console.log(order);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Order Detail"} />
      <DetailTable order={order} />
    </DefaultLayout>
  );
}
