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

export function webPopupTemplate(params: WebPopupParams): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify with Bhutan NDI</title>
  <style>
    .ndi-popup {
      width: 552px;
      background: #F8F8F8;
      border: 3px solid #5AC994;
      border-radius: 12px;
      font-family: 'Inter', sans-serif;
      padding: 30px;
      text-align: center;
    }
    .ndi-title {
      color: #5AC994;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .ndi-qr-container {
      width: 240px;
      height: 240px;
      margin: 20px auto;
      padding: 15px;
      background: white;
      border: 1px solid #E8EAEB;
      position: relative;
    }
    .ndi-instructions {
      color: #A1A0A0;
      font-size: 14px;
      margin: 20px 0;
    }
    .ndi-video-btn {
      background: #5AC994;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      width: 158px;
      height: 30px;
    }
  </style>
</head>
<body>
  <div class="ndi-popup">
    <h1 class="ndi-title">Scan with <span style="color:#5AC994">Bhutan NDI</span> Wallet</h1>
    
    <div class="ndi-qr-container">
      <img src="${params.qrCode}" alt="NDI Verification QR Code" width="200">
    </div>

    <div class="ndi-instructions">
      <p>1. Open <strong>Bhutan NDI Wallet</strong> on your phone</p>
      <p>2. Tap the <strong>Scan</strong> button and capture this code</p>
    </div>

    <button class="ndi-video-btn" onclick="window.open('#', '_blank')">
      Watch Video Guide
    </button>

    <div style="margin-top: 20px;">
      <a href="${params.deepLink}" style="color: #5AC994; text-decoration: none;">
        Or open directly in Bhutan NDI Wallet
      </a>
    </div>
  </div>
</body>
</html>
  `;
};


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

export function mobilePopupComponent(params: PopupParams): string {
  return `
import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

const NdiVerificationPopup: React.FC = () => {
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
          borderRadius: 4,
          width: 158,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center'
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
}

module.exports = {
  webPopupTemplate,
  mobilePopupComponent
};