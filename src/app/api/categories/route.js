import { getAllCategories, addCategory,deleteCategoryById, updateCategoryById } from "../../../services/categories-services";

// Tüm kategorileri getiren GET isteği
export async function GET() {
  const categories = await getAllCategories();
  return Response.json({ categories });
}

// Yeni kategori ekleyen POST isteği
export async function POST(req) {
  const body = await req.json();
  const newCategory = await addCategory(body);
  return Response.json(newCategory);
}

// Kategori silme isteği
export async function DELETE(req) {
  try {
    const { id } = await req.json(); 
    if (!id) {
      return new Response('Kategori ID\'si gerekli', { status: 400 });
    }
    await deleteCategoryById(id); 
    return new Response('Kategori başarıyla silindi.', { status: 200 });
  } catch (error) {
    return new Response(`Kategori silinirken bir hata oluştu: ${error.message}`, { status: 500 });
  }
}
// İd'ye göre Kategori güncelleme  isteği
export async function PUT(req) {
  try {
    const {id, categoryName, categorySlug  } = await req.json();
    if (!id) {
      return new Response('Kategori ID\'si gerekli', { status: 400 });
    }
    const data = { categoryName, categorySlug  };
    await updateCategoryById(id, data);
    return new Response('Kategori başarıyla güncellendi.', { status: 200 });
  } catch (error) {
    return new Response(`Kategori güncellenirken bir hata oluştu: ${error.message}`, { status: 500 });
  }
}