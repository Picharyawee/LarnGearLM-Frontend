import api from './axios';

export async function uploadResource(formData: FormData) {
  return api.post('/resources/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}

export async function createYoutubeTranscript(videoUrl: string) {
  return api.post('/resources/youtube-transcript/', null, {
    params: { 
      video_url: videoUrl 
    },
  });
}

export async function createWebsiteText(url: string) {
  return api.post('/resources/website-text/', null, {
    params: { 
      url: url 
    },
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
