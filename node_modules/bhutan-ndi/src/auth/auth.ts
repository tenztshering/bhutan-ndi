import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface AuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

let cachedToken: AuthResponse | null = null;

export async function authenticate(): Promise<string> {
  if (cachedToken && !isTokenExpired(cachedToken)) {
    return cachedToken.access_token;
  }

  const response = await axios.post<AuthResponse>(
    process.env.BHUTAN_NDI_AUTH_URL!,
    {
      client_id: process.env.BHUTAN_NDI_CLIENT_ID,
      client_secret: process.env.BHUTAN_NDI_CLIENT_SECRET,
      grant_type: 'client_credentials'
    },
    {
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*'
      }
    }
  );

  cachedToken = response.data;
  return cachedToken.access_token;
}

function isTokenExpired(token: AuthResponse): boolean {
  // Assuming token expires in 1 hour (3600 seconds)
  return Date.now() >= (token.expires_in * 1000) - 60000; // 1 minute buffer
}