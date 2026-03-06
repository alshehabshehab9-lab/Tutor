// test-payload.js
require('dotenv').config();
const payload = require('payload');

console.log('🔍 Testing Payload...');
console.log('Payload version:', require('./node_modules/payload/package.json').version);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Found' : '❌ Missing');
console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✅ Found' : '❌ Missing');

// Try to initialize payload
async function testPayload() {
  try {
    const result = await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'test-secret',
      mongoURL: process.env.MONGODB_URI,
      local: true // Don't start express server
    });
    console.log('✅ Payload initialized successfully!');
  } catch (error) {
    console.error('❌ Payload init failed:', error.message);
  }
}

testPayload();
