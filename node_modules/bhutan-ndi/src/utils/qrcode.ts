import QRCode from 'qrcode';

export async function generateQRCode(
  url: string,
  options?: {
    format?: 'png' | 'jpeg' | 'svg';
    size?: number;
  }
): Promise<string> {
  try {
    const format = options?.format || 'png';
    const size = options?.size || 200;
    
    if (format === 'svg') {
      return await QRCode.toString(url, { type: 'svg' });
    }
    
    return await QRCode.toDataURL(url, {
      type: 'image/png',
      width: size,
      margin: 2
    });
  } catch (err) {
    throw new Error('Failed to generate QR code');
  }
}