import { api } from './axios';

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

// DEPRECATED use @/component/lib/api/chat.ts instead
// export async function giveInstructions(instruction: string, selected_files: string[], stream: boolean = false) {
//   return api.post('/generate/', selected_files, {
//     params: { instruction, stream },
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     responseType: 'stream',
//   });
// }

export async function deleteResource(filename: string) {
  return api.delete(`/resources/${filename}`);
}
