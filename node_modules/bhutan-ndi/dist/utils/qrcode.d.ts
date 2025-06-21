export declare function generateQRCode(url: string, options?: {
    format?: 'png' | 'jpeg' | 'svg';
    size?: number;
}): Promise<string>;
