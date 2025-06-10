import api from './axios';

export async function uploadResource(formData: FormData) {
  return api.post('/upload-resource', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}

export async function getResources() {
  return api.get('/get-resources');
}

export async function giveInstructions(instruction: string, selected_files: string[]) {
  return api.post('/give-instruction', selected_files, {
    params: { instruction },
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export async function deleteResource(filename: string) {
  return api.delete(`/delete-resource/${filename}`);
}
