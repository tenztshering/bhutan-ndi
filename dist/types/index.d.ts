export interface ProofAttribute {
    name: string;
    restrictions: {
        schema_name: string | undefined;
    }[];
}
export interface ProofRequestOptions {
    relationshipDid?: string;
    expirationInSeconds?: number;
    forRelationship?: string;
}
export interface ProofRequestResponse {
    statusCode: number;
    message: string;
    data: {
        proofRequestName: string;
        proofRequestThreadId: string;
        deepLinkURL: string;
        proofRequestURL: string;
    };
}
export interface WebhookRegistrationResponse {
    statusCode: number;
    message: string;
    data: {
        id: number;
        webhookId: string;
        webhookURL: string;
        createdAt: string;
    };
}
export interface WebhookSubscriptionResponse {
    statusCode: number;
    message: string;
    data: {
        threadId: string;
    };
}
export interface WebhookResponse {
    type: string;
    thid: string;
    verification_result?: string;
    requested_presentation?: {
        unrevealed_attrs?: Record<string, unknown>;
        predicates?: Record<string, unknown>;
        identifiers?: Array<{
            schema_id: string;
            cred_def_id: string | null;
        }>;
        self_attested_attrs?: Record<string, unknown>;
        revealed_attrs?: Record<string, Array<{
            value: string;
            identifier_index: number;
        }>>;
    };
    relationshipDid?: string;
    holder_did?: string;
}
export interface QRCodeResponse {
    data: string;
    format: 'png' | 'jpeg' | 'svg';
    size?: number;
}
export interface NATSConfig {
    url: string;
    seed: string;
    timeout?: number;
}
export interface CredentialData {
    [key: string]: string | number | boolean;
}
export interface IssueCredentialResponse {
    statusCode: number;
    message: string;
    data: {
        credInviteURL: string;
        deepLinkURL: string;
        revocationId: string;
        relationshipDid: string;
        issueCredThreadId: string;
    };
}
export interface RevocationStatusResponse {
    statusCode: number;
    message: string;
    data: {
        id: number;
        revocationId: string;
        status: 'ACTIVE' | 'REVOKED' | 'SUSPENDED';
        updatedAt: string;
        relationshipDid: string;
        issuedAt: string;
    };
}
