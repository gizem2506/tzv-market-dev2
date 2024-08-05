import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";
import { getAllCategories } from "../../../../services/categories-services";

export default async function ProductCreatePageView() {
  const categories = await getAllCategories();
  return (
    <PageWrapper title="Yeni Ürün Ekle">
      <ProductForm categories={categories} />
    </PageWrapper>
  );
}
