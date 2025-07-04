import api from './axios';
/**
 * 2 July 2025
 * The axios can't handle streaming response, so we use fetch instead.
 */
export async function giveInstructions(instruction: string, selected_files: string[], stream: boolean = false) {
  const queryParams = new URLSearchParams({
    instruction,
    stream: stream ? 'true' : 'false',
  });
  return await fetch(`http://localhost:8000/generate/?${queryParams.toString()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selected_files),
  });
}

export async function createArticle() {
  const res = await api.post('/generate/article/');
  
  return res.data;
}