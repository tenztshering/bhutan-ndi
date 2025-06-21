import axios from 'axios';
import { authenticate } from '../auth/auth';
import { ProofAttribute, ProofRequestOptions } from '../types';

export async function createProofRequest(
  proofName: string,
  attributes: ProofAttribute[],
  options?: ProofRequestOptions
) {
  const token = await authenticate();
  
  const response = await axios.post(
    `${process.env.BHUTAN_NDI_VERIFIER_URL}/proof-request`,
    {
      proofName,
      proofAttributes: attributes,
      forRelationship: options?.relationshipDid
    },
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