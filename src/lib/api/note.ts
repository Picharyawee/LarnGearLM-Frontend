// import api from './axios';

export interface NoteAPIResponse {
  id: number;
  title: string;
  url: string;
  bucket_name: string;
  content_type: string;
  size: number;
  created_at: string;
}

// export async function getNotes() {
//   return api.get('/notes/');
// }

//`http://localhost:8000/notes`

export async function fetchNotes(): Promise<NoteAPIResponse[]>{
  const response = await fetch(`http://localhost:8000/notes/`);

  if(!response.ok) throw new Error("Failed to fetch notes");

  const data = await response.json();

  return data.notes;
}

export async function uploadNote(title: string, content: string) {
  const response = await fetch(`http://localhost:8000/notes/?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`, 
    {
      method: "POST",
    }
  );

  if(!response.ok) throw new Error("Failed to add note");

  return response.json();
}

export async function updateNote(id: number, title: string, content: string) {
  const response = await fetch(`http://localhost:8000/notes/${id}?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`, 
    {
      method: "PUT",
    }
  );

  if(!response.ok) throw new Error("Failed to update note");
}

export async function deleteNote(id: number) {
  const response = await fetch(`http://localhost:8000/notes/${id}`, 
    {
      method: "DELETE",
    }
  );

  if(!response.ok) throw new Error("Failed to delete note");
}
