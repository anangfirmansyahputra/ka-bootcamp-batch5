import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "./_components/table";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { db } from "@/lib/db";

export default async function OrderPage() {
  const orders = await db.order.findMany({
    include: {
      user: true,
    },
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order" />

      <Table orders={orders} />
    </DefaultLayout>
  );
}
