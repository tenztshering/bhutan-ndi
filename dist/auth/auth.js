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
exports.authenticate = authenticate;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let cachedToken = null;
function authenticate() {
    return __awaiter(this, void 0, void 0, function* () {
        if (cachedToken && !isTokenExpired(cachedToken)) {
            return cachedToken.access_token;
        }
        const response = yield axios_1.default.post(process.env.BHUTAN_NDI_AUTH_URL, {
            client_id: process.env.BHUTAN_NDI_CLIENT_ID,
            client_secret: process.env.BHUTAN_NDI_CLIENT_SECRET,
            grant_type: 'client_credentials'
        }, {
            headers: {
                'Content-Type': 'application/json',
                accept: '*/*'
            }
        });
        cachedToken = response.data;
        return cachedToken.access_token;
    });
}
function isTokenExpired(token) {
    // Assuming token expires in 1 hour (3600 seconds)
    return Date.now() >= (token.expires_in * 1000) - 60000; // 1 minute buffer
}
