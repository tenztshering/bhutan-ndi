# Bhutan NDI Proof Generator

[![npm version](https://img.shields.io/npm/v/bhutan-ndi)](https://www.npmjs.com/package/bhutan-ndi)
[![License](https://img.shields.io/npm/l/bhutan-ndi)](LICENSE)

A Node.js package for seamless integration with Bhutan's National Digital Identity (NDI) system. Generate proof requests, verify identities, and manage the entire verification flow with minimal setup.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)
- [Error Handling](#error-handling)
- [Example Workflow](#example-workflow)
- [Security Best Practices](#security-best-practices)
- [License](#license)

## Installation

```bash
npm install bhutan-ndi
```

## Configuration

Create a `.env` file in your project root with the following variables:

```env
# Authentication
BHUTAN_NDI_AUTH_URL=https://staging.bhutanndi.com/authentication
BHUTAN_NDI_CLIENT_ID=your_client_id
BHUTAN_NDI_CLIENT_SECRET=your_client_secret

# Verification
BHUTAN_NDI_VERIFIER_URL=https://demo-client.bhutanndi.com/verifier
BHUTAN_NDI_SCHEMA_ID=your_schema_id

# NATS (for real-time updates)
NATS_URL=wss://natsdemoclient.bhutanndi.com
NATS_SEED=your_nats_seed
```

## Basic Usage

### 1. Generate a Proof Request

```javascript
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
```

### 2. Generate QR Code for the Proof Request

```javascript
// Generate QR code from proof request URL
const qrCode = await BhutanNDIProofGenerator.generateQRCode(
  proof.data.proofRequestURL
);

// The QR code is returned as a Base64 encoded string that can be used in an <img> tag
// <img src="qrCode" alt="Scan with Bhutan NDI Wallet" />
```

### 3. Handle Verification Responses

```javascript
// Subscribe to NATS for real-time updates
if (proof.data.proofRequestThreadId) {
  await BhutanNDIProofGenerator.subscribeToNATS(
    proof.data.proofRequestThreadId,
    (update) => {
      console.log("Verification Update:", update);
      
      // Handle verification result
      if (update.type === "present-proof/presentation-result") {
        if (update.verification_result === "verified") {
          // Access granted - user verified successfully
          // Extract user data from update.requested_presentation.revealed_attrs
        }
      }
    }
  );
}
```

## API Reference

### `createProofRequest(name, attributes, options)`

| Parameter | Type | Description |
|-----------|------|-------------|
| name | string | Proof request name (e.g., "KYC Verification") |
| attributes | Array | Attributes to verify (see structure below) |
| options | Object | Optional settings (expiry, relationshipDid) |

**Attribute Structure:**

```javascript
{
  name: "AttributeName", 
  restrictions: [{
    schema_name: "schema-id"  // From BHUTAN_NDI_SCHEMA_ID
  }]
}
```

**Response Format:**

```javascript
{
  statusCode: 201,
  message: "Proof URL created successfully",
  data: {
    proofRequestName: string,
    proofRequestThreadId: string, // Use to track verification
    deepLinkURL: string,          // Mobile direct link format: bhutanndi://...
    proofRequestURL: string       // Web format: https://...
  }
}
```

### `generateQRCode(url, options)`

| Parameter | Type | Description |
|-----------|------|-------------|
| url | string | The URL to encode (usually proofRequestURL) |
| options | Object | Optional: `{ format: 'png'|'svg', size: number }` |

**Returns:** A Base64-encoded string representation of the QR code

### `subscribeToNATS(threadId, callback)`

| Parameter | Type | Description |
|-----------|------|-------------|
| threadId | string | The proofRequestThreadId to monitor |
| callback | Function | Function called when updates arrive |

## Error Handling

Common error cases:

```javascript
try {
  await BhutanNDIProofGenerator.createProofRequest(...);
} catch (error) {
  if (error.response?.status === 401) {
    console.error("Authentication failed - check credentials");
  }
  if (error.response?.status === 400) {
    console.error("Invalid request format or parameters");
  }
  if (error.code === "INVALID_SCHEMA") {
    console.error("Verify BHUTAN_NDI_SCHEMA_ID is correct");
  }
}
```

## Example Workflow

1. **Backend**: Create proof request, generate QR code
2. **Frontend**: Display QR code to the user
3. **User**: Scans QR with Bhutan NDI Wallet app
4. **Backend**: Receives verification via:
   - NATS subscription (real-time, preferred)
   - Webhook callback (alternative)
5. **Application**: Grants access after successful verification

## Security Best Practices

- Never commit `.env` file to version control
- Store NATS seed securely (use secret management services)
- Set appropriate proof request expiration (default: 15 minutes)
- Validate all incoming webhook data before trusting
- Use HTTPS for all API endpoints

## License

MIT © RomTech
