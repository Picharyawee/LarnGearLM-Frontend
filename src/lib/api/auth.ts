import axios from "axios";

export async function login(username: string, password: string) {
  const response = await axios.post('https://ksp-sit-api.larngeartech.com/auth/signin', {
    username,
    password,
    rememberMe: true,
  });
  return response.data;
}