#!/usr/bin/env node

/**
 * Test script for the revalidation webhook
 * Run with: node scripts/test-webhook.js
 */

const https = require('https');
const http = require('http');

const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3000/api/revalidate';
const SECRET = process.env.SANITY_REVALIDATE_SECRET || 'test-secret';

// Mock Sanity webhook payload
const mockPayload = {
  _type: 'post',
  slug: { current: 'test-post-slug' },
  _id: 'test-post-id'
};

// Create signature (this is a simplified version for testing)
const payload = JSON.stringify(mockPayload);
const signature = Buffer.from(SECRET).toString('base64');

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    'Authorization': `Bearer ${SECRET}`
  }
};

console.log('Testing webhook at:', WEBHOOK_URL);
console.log('Payload:', mockPayload);

const client = WEBHOOK_URL.startsWith('https') ? https : http;

const req = client.request(WEBHOOK_URL, options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
    if (res.statusCode === 200) {
      console.log('✅ Webhook test successful!');
    } else {
      console.log('❌ Webhook test failed!');
    }
  });
});

req.on('error', (err) => {
  console.error('Request error:', err);
});

req.write(payload);
req.end();
