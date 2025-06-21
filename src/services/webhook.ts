import axios from 'axios';
import { authenticate } from '../auth/auth';

export async function registerWebhook(webhookId: string, webhookUrl: string, authToken?: string) {
  const token = await authenticate();
  
  const payload = {
    webhookId,
    webhookURL: webhookUrl,
    ...(authToken && {
      authentication: {
        type: 'OAuth2',
        version: 'v2',
        data: {
          token: authToken
        }
      }
    })
  };

  const response = await axios.post(
    `${process.env.BHUTAN_NDI_WEBHOOK_URL}/register`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: '*/*'
      }
    }
  );

  return response.data;
}

export async function subscribeToWebhook(webhookId: string, threadId: string) {
  const token = await authenticate();
  
  const response = await axios.post(
    `${process.env.BHUTAN_NDI_WEBHOOK_URL}/subscribe`,
    { webhookId, threadId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: '*/*'
      }
    }
  );

  return response.data;
}

export async function unsubscribeFromWebhook(threadId: string) {
  const token = await authenticate();
  
  const response = await axios.post(
    `${process.env.BHUTAN_NDI_WEBHOOK_URL}/unsubscribe`,
    { threadId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: '*/*'
      }
    }
  );

  return response.data;
}