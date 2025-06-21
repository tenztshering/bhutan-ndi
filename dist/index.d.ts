import { createProofRequest, getProofRequest } from './services/verifier';
import { registerWebhook, subscribeToWebhook, unsubscribeFromWebhook } from './services/webhook';
import { subscribeToThread, closeNATSConnection } from './services/nats';
import { generateQRCode } from './utils/qrcode';
import { ProofAttribute, ProofRequestOptions, WebhookResponse, ProofRequestResponse, WebhookRegistrationResponse, QRCodeResponse } from './types';
/**
 * Bhutan NDI Proof Generator - Static Methods Version
 * Provides static methods for direct usage
 */
export declare class BhutanNDIProofGenerator {
    /**
     * Create a new proof request
     * @param proofName Name of the proof request
     * @param attributes Array of proof attributes
     * @param options Optional proof request options
     * @returns Promise<ProofRequestResponse>
     */
    static createProofRequest(proofName: string, attributes: ProofAttribute[], options?: ProofRequestOptions): Promise<ProofRequestResponse>;
    /**
     * Get proof request details
     * @param threadId The proof request thread ID
     * @returns Promise<ProofRequestResponse>
     */
    static getProofRequest(threadId: string): Promise<ProofRequestResponse>;
    /**
     * Register a webhook endpoint
     * @param webhookId Unique identifier for the webhook
     * @param webhookUrl URL of the webhook endpoint
     * @param authToken Optional authentication token
     * @returns Promise<WebhookRegistrationResponse>
     */
    static registerWebhook(webhookId: string, webhookUrl: string, authToken?: string): Promise<WebhookRegistrationResponse>;
    /**
     * Subscribe to webhook notifications
     * @param webhookId Registered webhook ID
     * @param threadId The thread ID to subscribe to
     * @returns Promise<void>
     */
    static subscribeToWebhook(webhookId: string, threadId: string): Promise<void>;
    /**
     * Unsubscribe from webhook notifications
     * @param threadId The thread ID to unsubscribe from
     * @returns Promise<void>
     */
    static unsubscribeFromWebhook(threadId: string): Promise<void>;
    /**
     * Subscribe to NATS notifications
     * @param threadId The thread ID to subscribe to
     * @param callback Callback function for received messages
     * @returns Promise<void>
     */
    static subscribeToNATS(threadId: string, callback: (response: WebhookResponse) => void): Promise<void>;
    /**
     * Close NATS connection
     * @returns Promise<void>
     */
    static closeNATSConnection(): Promise<void>;
    /**
     * Generate QR code for a URL
     * @param url URL to encode in QR code
     * @returns Promise<QRCodeResponse> Base64 encoded QR code image
     */
    static generateQRCode(url: string, options?: {
        format?: 'png' | 'jpeg' | 'svg';
        size?: number;
    }): Promise<QRCodeResponse>;
}
/**
 * BhutanNDIService - Instance Methods Version
 * Recommended for dependency injection systems like NestJS
 */
export declare class BhutanNDIService {
    private readonly config?;
    constructor(config?: {
        apiKey?: string;
        endpoint?: string;
    } | undefined);
    createProofRequest(proofName: string, attributes: ProofAttribute[], options?: ProofRequestOptions): Promise<ProofRequestResponse>;
    getProofRequest(threadId: string): Promise<ProofRequestResponse>;
    registerWebhook(webhookId: string, webhookUrl: string, authToken?: string): Promise<WebhookRegistrationResponse>;
    subscribeToWebhook(webhookId: string, threadId: string): Promise<void>;
    unsubscribeFromWebhook(threadId: string): Promise<void>;
    subscribeToNATS(threadId: string, callback: (response: WebhookResponse) => void): Promise<void>;
    closeNATSConnection(): Promise<void>;
    generateQRCode(url: string): Promise<QRCodeResponse>;
}
export { createProofRequest, getProofRequest, registerWebhook, subscribeToWebhook, unsubscribeFromWebhook, subscribeToThread as subscribeToNATS, closeNATSConnection, generateQRCode };
export * from './types';
