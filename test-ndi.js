const { BhutanNDIProofGenerator } = require('bhutan-ndi');
require('dotenv').config();

async function testNDI() {
  try {
    // 1. Test Authentication (if your package handles it)
    console.log("Testing NDI Proof Generation...");

    // 2. Generate a Proof Request
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
    );

    console.log("Proof Request Generated:", proofRequest)

    // 3. Generate a QR Code (optional)
    const qrCode = await BhutanNDIProofGenerator.generateQRCode(
      proofRequest.proofRequestURL
    );
    console.log("QR Code (Base64):", qrCode.slice(0, 50) + "...");

    // 4. Simulate Webhook/NATS Subscription (if implemented)
    if (proofRequest.proofRequestThreadId) {
      console.log("Subscribing to verification updates...");
      await BhutanNDIProofGenerator.subscribeToNATS(
        proofRequest.proofRequestThreadId,
        (update) => {
          console.log("Received Verification Update:", update);
        }
      );
    }
  } catch (error) {
    console.error("Test Failed:", error.message);
  }
}

testNDI();