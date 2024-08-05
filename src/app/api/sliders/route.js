import { getAllSlider, addSlider, deleteSliderById, updateSliderById } from "../../../services/slider-services";

// Tüm sliderları getiren GET isteği
export async function GET() {
  const sliders = await getAllSlider();
  return Response.json({ sliders });
}

// Yeni slider ekleyen POST isteği
export async function POST(req) {
  const body = await req.json();
  const newSlider = await addSlider(body);
  return Response.json(newSlider);
}

// İd'ye göre slider silme  isteği
export async function DELETE(req) {
  try {
    const { id } = await req.json(); 
    if (!id) {
      return new Response('Slider ID\'si gerekli', { status: 400 });
    }
    await deleteSliderById(id); 
    return new Response('Slider başarıyla silindi.', { status: 200 });
  } catch (error) {
    return new Response(`Slider silinirken bir hata oluştu: ${error.message}`, { status: 500 });
  }
}

// İd'ye göre slider güncelleme  isteği
export async function PUT(req) {
  try {
    const { id, sliderImage, sliderTitle } = await req.json();
    if (!id) {
      return new Response('Slider ID\'si gerekli', { status: 400 });
    }
    const data = { sliderImage, sliderTitle };
    await updateSliderById(id, data);
    return new Response('Slider başarıyla güncellendi.', { status: 200 });
  } catch (error) {
    return new Response(`Slider güncellenirken bir hata oluştu: ${error.message}`, { status: 500 });
  }
}
