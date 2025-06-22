/**
 * Generates complete HTML for Bhutan NDI web verification popup
 * @param params Contains QR code, deeplink, and threadId
 * @returns string HTML markup
 */
export function webPopupTemplate(params: {
  qrCode: string;
  deepLink: string;
  threadId: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify with Bhutan NDI</title>
  <style>
    :root {
      --ndi-green: #5AC994;
      --ndi-dark: #124143;
      --ndi-light: #F8F8F8;
      --ndi-gray: #A1A0A0;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      background-color: var(--ndi-light);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .ndi-popup {
      max-width: 90%;
      width: 100%;
      max-width: 552px;
      background: #fff;
      border: 3px solid var(--ndi-green);
      border-radius: 16px;
      padding: 24px 20px;
      text-align: center;
      box-shadow: 0 8px 16px rgba(0,0,0,0.05);
    }

    .ndi-title {
      font-size: 20px;
      font-weight: 600;
      color: var(--ndi-green);
      margin-bottom: 24px;
    }

    .ndi-title span {
      color: var(--ndi-dark);
      font-weight: 700;
    }

    .ndi-qr-container {
      margin-bottom: 24px;
    }

    .ndi-qr-container img {
      width: 220px;
      height: 220px;
    }

    .ndi-instructions p {
      margin: 4px 0;
      color: var(--ndi-gray);
      font-size: 14px;
    }

    .ndi-video-btn {
      background-color: var(--ndi-green);
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      margin-top: 20px;
    }

    .ndi-download {
      margin-top: 30px;
    }

    .ndi-download p {
      margin: 0;
      font-size: 14px;
      color: var(--ndi-dark);
    }

    .ndi-stores {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 10px;
    }

    .ndi-store-link {
      font-size: 14px;
      color: var(--ndi-green);
      text-decoration: none;
      border: 1px solid var(--ndi-green);
      padding: 6px 12px;
      border-radius: 6px;
    }

    @media (max-width: 480px) {
      .ndi-qr-container img {
        width: 180px;
        height: 180px;
      }

      .ndi-popup {
        padding: 16px;
      }

      .ndi-video-btn {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="ndi-popup">
    <h1 class="ndi-title">Scan with <span>Bhutan NDI</span> Wallet</h1>

    <div class="ndi-qr-container">
      <img src="${params.qrCode}" alt="NDI QR Code">
    </div>

    <div class="ndi-instructions">
      <p>1. Open Bhutan NDI Wallet on your phone</p>
      <p>2. Tap the <strong>Scan</strong> button and capture code</p>
    </div>

    <button class="ndi-video-btn" onclick="window.open('#', '_blank')">Watch Video Guide</button>

    <div class="ndi-download">
      <p>Download Now!</p>
      <div class="ndi-stores">
        <a href="#" class="ndi-store-link">App Store</a>
        <a href="#" class="ndi-store-link">Google Play</a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * Generates React Native component for Bhutan NDI mobile popup
 * @param params Contains QR code, deeplink, and threadId
 * @returns string JSX
 */
export function mobilePopupComponent(params: {
  qrCode: string;
  deepLink: string;
  threadId: string;
}): string {
  return `
import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

const NdiVerificationPopup = () => {
  return (
    <View style={{
      padding: 20,
      backgroundColor: '#F8F8F8',
      borderWidth: 3,
      borderColor: '#5AC994',
      borderRadius: 12,
      alignItems: 'center'
    }}>
      <Text style={{
        color: '#5AC994',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20
      }}>
        Scan with Bhutan NDI Wallet
      </Text>

      <View style={{
        width: 200,
        height: 200,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E8EAEB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <Image 
          source={{ uri: "${params.qrCode}" }}
          style={{ width: 180, height: 180 }}
        />
      </View>

      <Text style={{ color: '#A1A0A0', marginBottom: 5 }}>
        1. Open Bhutan NDI Wallet
      </Text>
      <Text style={{ color: '#A1A0A0', marginBottom: 20 }}>
        2. Tap the <Text style={{ fontWeight: 'bold' }}>Scan</Text> button
      </Text>

      <TouchableOpacity 
        style={{
          backgroundColor: '#5AC994',
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 4
        }}
        onPress={() => Linking.openURL('#')}
      >
        <Text style={{ color: 'white' }}>Watch Video Guide</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={{ marginTop: 15 }}
        onPress={() => Linking.openURL('${params.deepLink}')}
      >
        <Text style={{ color: '#5AC994' }}>
          Or open in Bhutan NDI Wallet
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NdiVerificationPopup;
  `;
};


module.exports = {
  webPopupTemplate,
  mobilePopupComponent
};