/**
 * Generates complete HTML for Bhutan NDI web verification popup
 * @param params Contains QR code, deeplink, and threadId
 * @returns string HTML markup
 */
export declare function webPopupTemplate(params: {
    qrCode: string;
    deepLink: string;
    threadId: string;
}): string;
/**
 * Generates React Native component for Bhutan NDI mobile popup
 * @param params Contains QR code, deeplink, and threadId
 * @returns string JSX
 */
export declare function mobilePopupComponent(params: {
    qrCode: string;
    deepLink: string;
    threadId: string;
}): string;
