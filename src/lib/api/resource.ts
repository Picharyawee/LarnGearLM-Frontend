import api from './axios';

export async function uploadResource(formData: FormData) {
  return api.post('/resources/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}

export async function getResources() {
  return api.get('/resources/');
}

export async function giveInstructions(instruction: string, selected_files: string[]) {
  return api.post('/generate/', selected_files, {
    params: { instruction },
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export async function deleteResource(filename: string) {
  return api.delete(`/resources/${filename}`);
}
