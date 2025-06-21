# Bhutan NDI Proof Generator

[![npm version](https://img.shields.io/npm/v/bhutan-ndi)](https://www.npmjs.com/package/bhutan-ndi)
[![License](https://img.shields.io/npm/l/bhutan-ndi)](LICENSE)

Node.js package for Bhutan National Digital Identity (NDI) integration. Generate proof requests and verify identities through Bhutan's NDI system.

## Installation

```bash
npm install bhutan-ndi

# Authentication
BHUTAN_NDI_AUTH_URL=
BHUTAN_NDI_CLIENT_ID=
BHUTAN_NDI_CLIENT_SECRET=

# Verification
BHUTAN_NDI_VERIFIER_URL=
BHUTAN_NDI_SCHEMA_ID=

# NATS (for real-time updates)
BHUTAN_NDI_NATS_URL=
BHUTAN_NDI_NATS_SEED=

Basic Usage
1. Generate Proof Request
javascript
const { BhutanNDIProofGenerator } = require('bhutan-ndi');
require('dotenv').config();

async function createProof() {
  try {
    const proof = await BhutanNDIProofGenerator.createProofRequest(
      "KYC Verification",
      [
        {
          name: "ID Number",
          restrictions: [{ schema_name: process.env.BHUTAN_NDI_SCHEMA_ID }]
        },
        {
          name: "Full Name", 
          restrictions: [{ schema_name: process.env.BHUTAN_NDI_SCHEMA_ID }]
        }
      ]
    );
    
    console.log("Proof Request:", proof.data);
    return proof;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
2. Handle Verification Responses
Subscribe to NATS for real-time updates:

javascript
if (proof.data.proofRequestThreadId) {
  await BhutanNDIProofGenerator.subscribeToNATS(
    proof.data.proofRequestThreadId,
    (update) => {
      console.log("Verification Update:", update);
      // Handle: update.type === "present-proof/presentation-result"
    }
  );
}
API Reference
createProofRequest(name, attributes, options)
Parameter	Type	Description
name	string	Proof request name (e.g., "KYC")
attributes	Array	Attributes to verify (see below)
options	Object	Optional settings (expiry, etc.)
Attribute Structure:

javascript
{
  name: "AttributeName", 
  restrictions: [{
    schema_name: "schema-id"  // From BHUTAN_NDI_SCHEMA_ID
  }]
}
Response Format
javascript
{
  statusCode: 201,
  message: "Proof URL created successfully",
  data: {
    proofRequestName: string,
    proofRequestThreadId: string, // Track verification
    deepLinkURL: string,         // bhutanndi://...
    proofRequestURL: string      // https://...
  }
}
Error Handling
Common error cases:

javascript
try {
  await BhutanNDIProofGenerator.createProofRequest(...);
} catch (error) {
  if (error.response?.status === 401) {
    console.error("Authentication failed - check credentials");
  }
  if (error.code === "INVALID_SCHEMA") {
    console.error("Verify BHUTAN_NDI_SCHEMA_ID is correct");
  }
}
Example Workflow
Frontend: Display proofRequestURL as QR code

User: Scans with Bhutan NDI Wallet

Backend: Receive verification via:

NATS subscription (preferred)

Webhook callback

Complete: Grant access after successful verification

Security Notes
Never commit .env to version control

Store NATS seed securely (use secret management)

Set appropriate expiration (default: 15 minutes)

License
MIT © RomTech

text

Key features included:
- All required environment variables
- Code examples for core functionality
- API reference with parameter details
- Error handling guidance
- Security best practices
- Clear workflow diagram

The QR code generation is intentionally omitted since it's not currently working in your tests. You can add it later with a "Experimental" disclaimer when stabilized.
