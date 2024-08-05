import { getAllComments, addComment, deleteCommentById, updateCommentById, getCommentsByUserId, getCommentsByProductId } from "../../../services/comment-services";

// Tüm yorumları getiren GET isteği
export async function GET() {
  const comments = await getAllComments();
  return Response.json({ comments });
}

// Yeni yorum ekleyen POST isteği
export async function POST(req) {
  const body = await req.json();
  const newAddComment = await addComment(body);
  return Response.json(newAddComment);
}

// İd'ye göre yorum silme isteği
export async function DELETE(req) {
  try {
    const { id } = await req.json(); 
    if (!id) {
      return new Response('Yorum ID\'si gerekli', { status: 400 });
    }
    await deleteCommentById(id); 
    return new Response('Yorum başarıyla silindi.', { status: 200 });
  } catch (error) {
    return new Response(`Yorum silinirken bir hata oluştu: ${error.message}`, { status: 500 });
  }
}

// İd'ye göre yorum güncelleme isteği
export async function PUT(req) {
  try {
    const { id, comment, rating } = await req.json();
    if (!id) {
      return new Response('Yorum ID\'si gerekli', { status: 400 });
    }
    const data = { comment, rating };
    await updateCommentById(id, data);
    return new Response('Yorum başarıyla güncellendi.', { status: 200 });
  } catch (error) {
    return new Response(`Yorum güncellenirken bir hata oluştu: ${error.message}`, { status: 500 });
  }
}
