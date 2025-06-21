import { createProofRequest, getProofRequest } from './services/verifier';
import { registerWebhook, subscribeToWebhook, unsubscribeFromWebhook } from './services/webhook';
import { subscribeToThread, closeNATSConnection } from './services/nats';
import { generateQRCode } from './utils/qrcode';
import { ProofAttribute, ProofRequestOptions, WebhookResponse, ProofRequestResponse, WebhookRegistrationResponse, QRCodeResponse } from './types';

/**
 * Bhutan NDI Proof Generator - Static Methods Version
 * Provides static methods for direct usage
 */
export class BhutanNDIProofGenerator {
  /**
   * Create a new proof request
   * @param proofName Name of the proof request
   * @param attributes Array of proof attributes
   * @param options Optional proof request options
   * @returns Promise<ProofRequestResponse>
   */
  static async createProofRequest(
    proofName: string,
    attributes: ProofAttribute[],
    options?: ProofRequestOptions
  ): Promise<ProofRequestResponse> {
    return createProofRequest(proofName, attributes, options);
  }

  /**
   * Get proof request details
   * @param threadId The proof request thread ID
   * @returns Promise<ProofRequestResponse>
   */
  static async getProofRequest(threadId: string): Promise<ProofRequestResponse> {
    return getProofRequest(threadId);
  }

  /**
   * Register a webhook endpoint
   * @param webhookId Unique identifier for the webhook
   * @param webhookUrl URL of the webhook endpoint
   * @param authToken Optional authentication token
   * @returns Promise<WebhookRegistrationResponse>
   */
  static async registerWebhook(
    webhookId: string, 
    webhookUrl: string, 
    authToken?: string
  ): Promise<WebhookRegistrationResponse> {
    return registerWebhook(webhookId, webhookUrl, authToken);
  }

  /**
   * Subscribe to webhook notifications
   * @param webhookId Registered webhook ID
   * @param threadId The thread ID to subscribe to
   * @returns Promise<void>
   */
  static async subscribeToWebhook(
    webhookId: string, 
    threadId: string
  ): Promise<void> {
    return subscribeToWebhook(webhookId, threadId);
  }

  /**
   * Unsubscribe from webhook notifications
   * @param threadId The thread ID to unsubscribe from
   * @returns Promise<void>
   */
  static async unsubscribeFromWebhook(threadId: string): Promise<void> {
    return unsubscribeFromWebhook(threadId);
  }

  /**
   * Subscribe to NATS notifications
   * @param threadId The thread ID to subscribe to
   * @param callback Callback function for received messages
   * @returns Promise<void>
   */
  static async subscribeToNATS(
    threadId: string,
    callback: (response: WebhookResponse) => void
  ): Promise<void> {
    await subscribeToThread(threadId, callback);
  }

  /**
   * Close NATS connection
   * @returns Promise<void>
   */
  static async closeNATSConnection(): Promise<void> {
    return closeNATSConnection();
  }

  /**
   * Generate QR code for a URL
   * @param url URL to encode in QR code
   * @returns Promise<QRCodeResponse> Base64 encoded QR code image
   */
static async generateQRCode(
  url: string, 
  options?: { format?: 'png' | 'jpeg' | 'svg'; size?: number }
): Promise<QRCodeResponse> {
  const qrCode = await generateQRCode(url);
  return {
    data: qrCode,
    format: options?.format || 'png',
    size: options?.size || 200
  };
}
}

/**
 * BhutanNDIService - Instance Methods Version
 * Recommended for dependency injection systems like NestJS
 */
export class BhutanNDIService {
  constructor(private readonly config?: {
    apiKey?: string;
    endpoint?: string;
  }) {}

  async createProofRequest(
    proofName: string,
    attributes: ProofAttribute[],
    options?: ProofRequestOptions
  ): Promise<ProofRequestResponse> {
    return BhutanNDIProofGenerator.createProofRequest(proofName, attributes, options);
  }

  async getProofRequest(threadId: string): Promise<ProofRequestResponse> {
    return BhutanNDIProofGenerator.getProofRequest(threadId);
  }

  async registerWebhook(
    webhookId: string, 
    webhookUrl: string, 
    authToken?: string
  ): Promise<WebhookRegistrationResponse> {
    return BhutanNDIProofGenerator.registerWebhook(webhookId, webhookUrl, authToken);
  }

  async subscribeToWebhook(webhookId: string, threadId: string): Promise<void> {
    return BhutanNDIProofGenerator.subscribeToWebhook(webhookId, threadId);
  }

  async unsubscribeFromWebhook(threadId: string): Promise<void> {
    return BhutanNDIProofGenerator.unsubscribeFromWebhook(threadId);
  }

  async subscribeToNATS(
    threadId: string,
    callback: (response: WebhookResponse) => void
  ): Promise<void> {
    return BhutanNDIProofGenerator.subscribeToNATS(threadId, callback);
  }

  async closeNATSConnection(): Promise<void> {
    return BhutanNDIProofGenerator.closeNATSConnection();
  }

  async generateQRCode(url: string): Promise<QRCodeResponse> {
    return BhutanNDIProofGenerator.generateQRCode(url);
  }
}

// Direct function exports for flexible usage
export {
  createProofRequest,
  getProofRequest,
  registerWebhook,
  subscribeToWebhook,
  unsubscribeFromWebhook,
  subscribeToThread as subscribeToNATS,
  closeNATSConnection,
  generateQRCode
};

// Type exports
export * from './types';