// test-env.js
require('dotenv').config();
console.log('🔍 Testing dotenv:');
console.log('Current directory:', __dirname);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Found' : '❌ Missing');
console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✅ Found' : '❌ Missing');
