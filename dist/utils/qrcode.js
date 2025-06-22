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
const canvas_1 = require("canvas");
function generateQRCode(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a canvas
            const canvas = (0, canvas_1.createCanvas)(300, 300);
            // Generate basic QR code
            yield qrcode_1.default.toCanvas(canvas, url, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#124143', // Bhutan NDI dark teal
                    light: '#FFFFFF' // White background
                }
            });
            // Convert to base64
            return canvas.toDataURL('image/png');
        }
        catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            throw new Error(`QR generation failed: ${errMsg}`);
        }
    });
}
