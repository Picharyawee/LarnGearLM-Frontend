import api from './axios';

export async function getNotes() {
  return api.get('/notes/');
}

export async function uploadNote(title: string, content: string) {
  return api.post('/notes/', {
    title,
    content
  });
}

export async function updateNote(id: number, title: string, content: string) {
  return api.put(`/notes/${id}`, {
    title,
    content
  });
}

export async function deleteNote(id: number) {
  return api.delete(`/notes/${id}`);
}
