import QRCode from 'qrcode';
import { createCanvas, loadImage } from 'canvas';

export async function generateQRCode(url: string): Promise<string> {
  try {
    // Create a canvas
    const canvas = createCanvas(300, 300);
    
    // Generate basic QR code
    await QRCode.toCanvas(canvas, url, {
      width: 300,
      margin: 2,
      color: {
        dark: '#124143', // Bhutan NDI dark teal
        light: '#FFFFFF' // White background
      }
    });

    // Convert to base64
    return canvas.toDataURL('image/png');
    
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    throw new Error(`QR generation failed: ${errMsg}`);
  }
}
