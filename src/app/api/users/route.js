import {  addUser, updateUserById } from "../../../services/user-services";



// Yeni kullanıcı ekleyen POST isteği
export async function POST(req) {
  const body = await req.json();
  const newUser = await addUser(body);
  return Response.json(newUser);
}

// İd'ye göre kullanıcı güncelleme  isteği
export async function PUT(req) {
  try {
    const { id,email,name } = await req.json();
    if (!id) {
      return new Response('Kullanıcı ID\'si gerekli', { status: 400 });
    }
    const data = { email,name};
    await updateUserById(id, data);
    return new Response('Kullanıcı başarıyla güncellendi.', { status: 200 });
  } catch (error) {
    return new Response(`Kullanıcı güncellenirken bir hata oluştu: ${error.message}`, { status: 500 });
  }
}