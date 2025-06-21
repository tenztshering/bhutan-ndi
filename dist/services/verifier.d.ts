import { ProofAttribute, ProofRequestOptions } from '../types';
export declare function createProofRequest(proofName: string, attributes: ProofAttribute[], options?: ProofRequestOptions): Promise<any>;
export declare function getProofRequest(threadId: string): Promise<any>;
