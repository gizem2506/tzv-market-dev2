import {
  getAllProducts,
  addProduct,
  deleteProductsById,
  updateProductById,
} from "../../../services/products-services";

// Tüm ürünleri getiren GET isteği
export async function GET() {
  const products = await getAllProducts();
  return Response.json({ products });
}

// Yeni ürün ekleyen POST isteği
export async function POST(req) {
  const body = await req.json();
  const newProduct = await addProduct(body);
  return Response.json(newProduct);
}

// İd'ye göre ürün silme  isteği
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return new Response("Ürün ID'si gerekli", { status: 400 });
    }
    await deleteProductsById(id);
    return new Response("Ürün başarıyla silindi.", { status: 200 });
  } catch (error) {
    return new Response(`Ürün silinirken bir hata oluştu: ${error.message}`, {
      status: 500,
    });
  }
}
export async function PUT(req) {
  try {
    const {
      id,
      categoryId,
      productName,
      unitPrice,
      rating,
      productImage,
      product_title,
      product_description,
      productSlug,
    } = await req.json();
    if (!id) {
      return new Response("Ürün ID'si gerekli", { status: 400 });
    }
    const data = {
      categoryId,
      productName,
      unitPrice,
      rating,
      productImage,
      product_title,
      product_description,
      productSlug,
    };
    await updateProductById(id, data);

    return new Response("Ürün başarıyla güncellendi.", { status: 200 });
  } catch (error) {
    return new Response(
      `Ürün güncellenirken bir hata oluştu: ${error.message}`,
      { status: 500 }
    );
  }
}
