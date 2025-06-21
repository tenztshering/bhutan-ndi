"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWebhook = registerWebhook;
exports.subscribeToWebhook = subscribeToWebhook;
exports.unsubscribeFromWebhook = unsubscribeFromWebhook;
const axios_1 = __importDefault(require("axios"));
const auth_1 = require("../auth/auth");
function registerWebhook(webhookId, webhookUrl, authToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield (0, auth_1.authenticate)();
        const payload = Object.assign({ webhookId, webhookURL: webhookUrl }, (authToken && {
            authentication: {
                type: 'OAuth2',
                version: 'v2',
                data: {
                    token: authToken
                }
            }
        }));
        const response = yield axios_1.default.post(`${process.env.BHUTAN_NDI_WEBHOOK_URL}/register`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                accept: '*/*'
            }
        });
        return response.data;
    });
}
function subscribeToWebhook(webhookId, threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield (0, auth_1.authenticate)();
        const response = yield axios_1.default.post(`${process.env.BHUTAN_NDI_WEBHOOK_URL}/subscribe`, { webhookId, threadId }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                accept: '*/*'
            }
        });
        return response.data;
    });
}
function unsubscribeFromWebhook(threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield (0, auth_1.authenticate)();
        const response = yield axios_1.default.post(`${process.env.BHUTAN_NDI_WEBHOOK_URL}/unsubscribe`, { threadId }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                accept: '*/*'
            }
        });
        return response.data;
    });
}
