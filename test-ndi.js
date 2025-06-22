const { BhutanNDIProofGenerator } = require('./dist/index');

const fs = require('fs');
require('dotenv').config();

async function testNDIWithUI() {
  try {
    console.log("Testing NDI Proof Generation with UI...");

    // Generate proof request with UI templates
    const proofRequest = await BhutanNDIProofGenerator.createProofRequest(
      "Verify Identity",
      [
        {
          name: "ID Number",
          restrictions: [{ schema_name: process.env.BHUTAN_NDI_SCHEMA_ID }],
        },
        {
          name: "Full Name",
          restrictions: [{ schema_name: process.env.BHUTAN_NDI_SCHEMA_ID }],
        },
      ],
      { 
        includeUI: true
      }
    );

    console.log("Proof Request Generated:", {
      statusCode: proofRequest.statusCode,
      threadId: proofRequest.data.proofRequestThreadId,
      hasWebUI: !!proofRequest.data.renderedUI?.web,
      hasMobileUI: !!proofRequest.data.renderedUI?.mobile
    });

    if (proofRequest.data.renderedUI) {
      // Verify the UI content
        const uiChecks = {
        hasExactTitle: proofRequest.data.renderedUI.web.includes('Scan with Bhutan NDI Wallet'),
        hasExactInstructions: (
          proofRequest.data.renderedUI.web.includes('Open Bhutan NDI Wallet on your phone') &&
          proofRequest.data.renderedUI.web.includes('Tap the Scan button located on the menu bar and capture code')
        ),
        hasQRCode: proofRequest.data.renderedUI.web.includes('data:image/png;base64'),
        hasVideoButton: proofRequest.data.renderedUI.web.includes('Watch Video Guide'),
        hasDownloadSection: proofRequest.data.renderedUI.web.includes('Download Now!')
      };

      console.log("Strict UI Validation Results:", uiChecks);

      // Save outputs for manual inspection
      if (uiChecks.hasQRCode) {
        fs.writeFileSync('ndi-web-verification.html', proofRequest.data.renderedUI.web);
        console.log("Web UI saved to ndi-web-verification.html");
        
        const qrMatch = proofRequest.data.renderedUI.web.match(/src="(data:image\/[^;]+;base64[^"]+)"/);
        if (qrMatch) {
          fs.writeFileSync('ndi-qr-code.png', qrMatch[1].split(',')[1], 'base64');
          console.log("QR code saved to ndi-qr-code.png");
        }
      }

      fs.writeFileSync('ndi-mobile-verification.jsx', proofRequest.data.renderedUI.mobile);
      console.log("Mobile component saved to ndi-mobile-verification.jsx");
    }

  } catch (error) {
    console.error("Test Failed:", error.message);
    if (error.response) {
      console.error("API Response:", error.response.data);
    }
  }
}

// Run the test
testNDIWithUI();