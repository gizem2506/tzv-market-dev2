import { addUserAddress, deleteUserAddressById, getAllUserAddresses, updateUserAddressById } from "../../../services/useraddress_services";

// Tüm adresleri getiren GET isteği
export async function GET() {
  const addresses = await getAllUserAddresses();
  return Response.json({ addresses });
}

// Yeni adres ekleyen POST isteği
export async function POST(req) {
  try {
    const body = await req.json();
    const newAddress = await addUserAddress(body);
    return Response.json(newAddress);
  } catch (error) {
    return new Response(`Adres eklenirken bir hata oluştu: ${error.message}`, { status: 500 });
  }
}

// Adres silme isteği
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return new Response('Adres ID\'si gerekli', { status: 400 });
    }
    await deleteUserAddressById(id);
    return new Response('Adres başarıyla silindi.', { status: 200 });
  } catch (error) {
    return new Response(`Adres silinirken bir hata oluştu: ${error.message}`, { status: 500 });
  }
}

// İd'ye göre adres güncelleme isteği
export async function PUT(req) {
  try {
    const { id, ...data } = await req.json();
    if (!id) {
      return new Response('Adres ID\'si gerekli', { status: 400 });
    }
    await updateUserAddressById(id, data);
    return new Response('Adres başarıyla güncellendi.', { status: 200 });
  } catch (error) {
    return new Response(`Adres güncellenirken bir hata oluştu: ${error.message}`, { status: 500 });
  }
}
