import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Form from "./_components/form";

export const metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function ImagePage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Image" />
      <Form />
    </DefaultLayout>
  );
}
