// JWT implementation using Web Crypto API for Edge Runtime compatibility
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Convert string to Uint8Array
function stringToUint8Array(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// Convert Uint8Array to string
function uint8ArrayToString(bytes: Uint8Array): string {
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

// Convert Uint8Array to Base64
function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert Base64 to Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Create HMAC key from secret
async function getKey(): Promise<CryptoKey> {
  const keyData = stringToUint8Array(JWT_SECRET);
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

// Generate JWT token
export async function generateToken(payload: any): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const exp = now + (60 * 60 * 24); // 24 hours

  const finalPayload = {
    ...payload,
    iat: now,
    exp
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(finalPayload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  const key = await getKey();
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    stringToUint8Array(signatureInput)
  );

  const encodedSignature = uint8ArrayToBase64(new Uint8Array(signature));
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<any> {
  try {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');
    
    // Verify signature
    const key = await getKey();
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signature = base64ToUint8Array(encodedSignature);
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      stringToUint8Array(signatureInput)
    );

    if (!isValid) {
      throw new Error('Invalid signature');
    }

    // Decode payload
    const payload = JSON.parse(atob(encodedPayload));

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      throw new Error('Token expired');
    }

    return payload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
} 