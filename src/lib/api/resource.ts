import api from './axios';

export async function uploadResource(formData: FormData) {
  return api.post('/upload-resource', formData, {headers: {
    'Content-Type': 'multipart/form-data',
  }});
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
