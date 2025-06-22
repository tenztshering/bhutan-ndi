/**
 * Generates complete HTML for Bhutan NDI web verification popup
 * @param params Contains QR code, deeplink, and threadId
 * @returns string HTML markup
 */
interface WebPopupParams {
    qrCode: string;
    deepLink: string;
    threadId: string;
}
export declare function webPopupTemplate(params: WebPopupParams): string;
/**
 * Generates React Native component for mobile verification
 * @param params Contains QR code, deeplink, and threadId
 * @returns string React Native JSX code
 */
interface PopupParams {
    qrCode: string;
    deepLink: string;
    threadId: string;
}
export declare function mobilePopupComponent(params: PopupParams): string;
export {};
