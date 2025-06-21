"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQRCode = exports.closeNATSConnection = exports.subscribeToNATS = exports.unsubscribeFromWebhook = exports.subscribeToWebhook = exports.registerWebhook = exports.getProofRequest = exports.createProofRequest = exports.BhutanNDIService = exports.BhutanNDIProofGenerator = void 0;
const verifier_1 = require("./services/verifier");
Object.defineProperty(exports, "createProofRequest", { enumerable: true, get: function () { return verifier_1.createProofRequest; } });
Object.defineProperty(exports, "getProofRequest", { enumerable: true, get: function () { return verifier_1.getProofRequest; } });
const webhook_1 = require("./services/webhook");
Object.defineProperty(exports, "registerWebhook", { enumerable: true, get: function () { return webhook_1.registerWebhook; } });
Object.defineProperty(exports, "subscribeToWebhook", { enumerable: true, get: function () { return webhook_1.subscribeToWebhook; } });
Object.defineProperty(exports, "unsubscribeFromWebhook", { enumerable: true, get: function () { return webhook_1.unsubscribeFromWebhook; } });
const nats_1 = require("./services/nats");
Object.defineProperty(exports, "subscribeToNATS", { enumerable: true, get: function () { return nats_1.subscribeToThread; } });
Object.defineProperty(exports, "closeNATSConnection", { enumerable: true, get: function () { return nats_1.closeNATSConnection; } });
const qrcode_1 = require("./utils/qrcode");
Object.defineProperty(exports, "generateQRCode", { enumerable: true, get: function () { return qrcode_1.generateQRCode; } });
/**
 * Bhutan NDI Proof Generator - Static Methods Version
 * Provides static methods for direct usage
 */
class BhutanNDIProofGenerator {
    /**
     * Create a new proof request
     * @param proofName Name of the proof request
     * @param attributes Array of proof attributes
     * @param options Optional proof request options
     * @returns Promise<ProofRequestResponse>
     */
    static createProofRequest(proofName, attributes, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, verifier_1.createProofRequest)(proofName, attributes, options);
        });
    }
    /**
     * Get proof request details
     * @param threadId The proof request thread ID
     * @returns Promise<ProofRequestResponse>
     */
    static getProofRequest(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, verifier_1.getProofRequest)(threadId);
        });
    }
    /**
     * Register a webhook endpoint
     * @param webhookId Unique identifier for the webhook
     * @param webhookUrl URL of the webhook endpoint
     * @param authToken Optional authentication token
     * @returns Promise<WebhookRegistrationResponse>
     */
    static registerWebhook(webhookId, webhookUrl, authToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, webhook_1.registerWebhook)(webhookId, webhookUrl, authToken);
        });
    }
    /**
     * Subscribe to webhook notifications
     * @param webhookId Registered webhook ID
     * @param threadId The thread ID to subscribe to
     * @returns Promise<void>
     */
    static subscribeToWebhook(webhookId, threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, webhook_1.subscribeToWebhook)(webhookId, threadId);
        });
    }
    /**
     * Unsubscribe from webhook notifications
     * @param threadId The thread ID to unsubscribe from
     * @returns Promise<void>
     */
    static unsubscribeFromWebhook(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, webhook_1.unsubscribeFromWebhook)(threadId);
        });
    }
    /**
     * Subscribe to NATS notifications
     * @param threadId The thread ID to subscribe to
     * @param callback Callback function for received messages
     * @returns Promise<void>
     */
    static subscribeToNATS(threadId, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, nats_1.subscribeToThread)(threadId, callback);
        });
    }
    /**
     * Close NATS connection
     * @returns Promise<void>
     */
    static closeNATSConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, nats_1.closeNATSConnection)();
        });
    }
    /**
     * Generate QR code for a URL
     * @param url URL to encode in QR code
     * @returns Promise<QRCodeResponse> Base64 encoded QR code image
     */
    static generateQRCode(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const qrCode = yield (0, qrcode_1.generateQRCode)(url);
            return {
                data: qrCode,
                format: (options === null || options === void 0 ? void 0 : options.format) || 'png',
                size: (options === null || options === void 0 ? void 0 : options.size) || 200
            };
        });
    }
}
exports.BhutanNDIProofGenerator = BhutanNDIProofGenerator;
/**
 * BhutanNDIService - Instance Methods Version
 * Recommended for dependency injection systems like NestJS
 */
class BhutanNDIService {
    constructor(config) {
        this.config = config;
    }
    createProofRequest(proofName, attributes, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return BhutanNDIProofGenerator.createProofRequest(proofName, attributes, options);
        });
    }
    getProofRequest(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            return BhutanNDIProofGenerator.getProofRequest(threadId);
        });
    }
    registerWebhook(webhookId, webhookUrl, authToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return BhutanNDIProofGenerator.registerWebhook(webhookId, webhookUrl, authToken);
        });
    }
    subscribeToWebhook(webhookId, threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            return BhutanNDIProofGenerator.subscribeToWebhook(webhookId, threadId);
        });
    }
    unsubscribeFromWebhook(threadId) {
        return __awaiter(this, void 0, void 0, function* () {
            return BhutanNDIProofGenerator.unsubscribeFromWebhook(threadId);
        });
    }
    subscribeToNATS(threadId, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return BhutanNDIProofGenerator.subscribeToNATS(threadId, callback);
        });
    }
    closeNATSConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return BhutanNDIProofGenerator.closeNATSConnection();
        });
    }
    generateQRCode(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return BhutanNDIProofGenerator.generateQRCode(url);
        });
    }
}
exports.BhutanNDIService = BhutanNDIService;
// Type exports
__exportStar(require("./types"), exports);
