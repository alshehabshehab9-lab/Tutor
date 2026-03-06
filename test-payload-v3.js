// test-payload-v3.js
require('dotenv').config();
const { getPayload } = require('payload');
const path = require('path');

async function testPayload() {
  console.log('🔍 Testing Payload v3...');
  
  try {
    const payload = await getPayload({
      secret: process.env.PAYLOAD_SECRET,
      mongoURL: process.env.MONGODB_URI,
      local: true
    });
    console.log('✅ Payload initialized successfully!');
  } catch (error) {
    console.error('❌ Payload init failed:', error.message);
  }
}

testPayload();
