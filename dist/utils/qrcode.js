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
exports.generateQRCode = generateQRCode;
const qrcode_1 = __importDefault(require("qrcode"));
function generateQRCode(url, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const format = (options === null || options === void 0 ? void 0 : options.format) || 'png';
            const size = (options === null || options === void 0 ? void 0 : options.size) || 200;
            if (format === 'svg') {
                return yield qrcode_1.default.toString(url, { type: 'svg' });
            }
            return yield qrcode_1.default.toDataURL(url, {
                type: 'image/png',
                width: size,
                margin: 2
            });
        }
        catch (err) {
            throw new Error('Failed to generate QR code');
        }
    });
}
