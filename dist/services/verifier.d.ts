import { ProofAttribute, ProofRequestOptions } from '../types';
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
        };
    };
}
export declare function createProofRequest(proofName: string, attributes: ProofAttribute[], options?: ProofRequestOptions & {
    includeUI?: boolean;
}): Promise<ProofRequestResponse>;
export declare function getProofRequest(threadId: string): Promise<any>;
