import { getAllOurServices, addOurServices, deleteOurServicesById, updateOurServicesById } from "../../../services/our-services";

// Tüm ourservisleri getiren GET isteği
export async function GET() {
  const ourservices = await getAllOurServices();
  return Response.json({ ourservices });
}

// Yeni ourservisleri ekleyen POST isteği
export async function POST(req) {
  const body = await req.json();
  const newOurServices = await addOurServices(body);
  return Response.json(newOurServices);
}
// İd'ye göre ourservices silme  isteği
export async function DELETE(req) {
  try {
    const { id } = await req.json(); 
    if (!id) {
      return new Response('Servis ID\'si gerekli', { status: 400 });
    }
    await deleteOurServicesById(id); 
    return new Response('Servis başarıyla silindi.', { status: 200 });
  } catch (error) {
    return new Response(`Servis silinirken bir hata oluştu: ${error.message}`, { status: 500 });
  }
}

// İd'ye göre ourservices güncelleme  isteği
export async function PUT(req) {
  try {
    const { id, ourServicesName, icon } = await req.json();
    if (!id) {
      return new Response('Servis ID\'si gerekli', { status: 400 });
    }
    const data = { ourServicesName, icon};
    await updateOurServicesById(id, data);
    return new Response('Servis başarıyla güncellendi.', { status: 200 });
  } catch (error) {
    return new Response(`Servis güncellenirken bir hata oluştu: ${error.message}`, { status: 500 });
  }
}