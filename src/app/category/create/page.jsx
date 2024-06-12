import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Form from "@/app/category/_components/form";
export default function CreateCategoryPage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Category" />
      <Form />
    </DefaultLayout>
  );
}
