import api from './axios';

export async function uploadResource(formData: FormData) {
  return api.post('/upload-resource', formData);
}

export async function getResources() {
  return api.get('/get-resources');
}

export async function getResource(filename: string) {
  return api.get(`/get-resource/${filename}`);
}

export async function deleteResource(filename: string) {
  return api.delete(`/delete-resource/${filename}`);
}
