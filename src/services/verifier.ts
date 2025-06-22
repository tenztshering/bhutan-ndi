import axios from 'axios';
import { authenticate } from '../auth/auth';
import { ProofAttribute, ProofRequestOptions } from '../types';
import { generateQRCode } from '../utils/qrcode';
import { mobilePopupComponent, webPopupTemplate } from '../ui/templates';

export interface ProofRequestResponse {
  statusCode: number;
  message: string;
  data: {
    proofRequestName: string;
    proofRequestThreadId: string;
    deepLinkURL: string;
    proofRequestURL: string;
    renderedUI?: {
      web?: string;
      mobile?: string;
    }
  };
}

export async function createProofRequest(
  proofName: string,
  attributes: ProofAttribute[],
  options?: ProofRequestOptions & { includeUI?: boolean }
): Promise<ProofRequestResponse> {
  const token = await authenticate();
  
  const response = await axios.post(
    `${process.env.BHUTAN_NDI_VERIFIER_URL}/proof-request`,
    {
      proofName,
      proofAttributes: attributes,
      forRelationship: options?.relationshipDid,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: '*/*'
      }
    }
  );

  const result = response.data;

  if (options?.includeUI) {
    const qrCode = await generateQRCode(result.data.proofRequestURL);
    result.data.renderedUI = {
      web: webPopupTemplate({
        qrCode,
        deepLink: result.data.deepLinkURL,
        threadId: result.data.proofRequestThreadId
      }),
      mobile: mobilePopupComponent({
        qrCode,
        deepLink: result.data.deepLinkURL,
        threadId: result.data.proofRequestThreadId
      })
    };
  }

  return result;
}

export async function getProofRequest(threadId: string) {
  const token = await authenticate();
  
  const response = await axios.get(
    `${process.env.BHUTAN_NDI_VERIFIER_URL}/proof-request`,
    {
      params: { threadId },
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*'
      }
    }
  );

  return response.data;
}