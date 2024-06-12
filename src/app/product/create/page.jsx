import Form from "@/app/product/_components/form";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";

export default async function CreateProductPage() {
  const categories = await db.category.findMany();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Product" />
      <Form categories={categories} />
    </DefaultLayout>
  );
}
