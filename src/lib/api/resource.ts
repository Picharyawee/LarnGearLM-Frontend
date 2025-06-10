import api from './axios';

export async function uploadResource(formData: FormData) {
  return api.post('/upload-resource', formData, {headers: {
    'Content-Type': 'multipart/form-data',
  }});
}

export async function getResources() {
  return api.get('/get-resources');
}

export async function giveInstructions({
  instructions,
  indexSelectedFiles = []
}:{
  instructions: string,
  indexSelectedFiles: number[]
}) {
  return api.post('/give-instructions', { instructions, selected_files: indexSelectedFiles });
}

export async function deleteResource(filename: string) {
  return api.delete(`/delete-resource/${filename}`);
}
