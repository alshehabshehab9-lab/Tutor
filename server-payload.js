// server.js - COMPLETE WORKING VERSION with static file serving
const express = require('express');
const payload = require('payload');
const path = require('path');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files from the current directory - THIS IS THE KEY ADDITION!
app.use(express.static(__dirname));

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Initialize Payload
const start = async () => {
  try {
    console.log('🚀 Initializing Payload...');
    console.log('🔑 MONGODB_URI:', process.env.MONGODB_URI ? '✅ Found' : '❌ Missing');
    console.log('🔑 PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✅ Found' : '❌ Missing');
    
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      mongoURL: process.env.MONGODB_URI,
      express: app,
      onInit: async () => {
        console.log('✅✅✅ Payload initialized successfully!');
        console.log(`🔐 Admin URL: http://localhost:${PORT}/admin`);
      },
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅✅✅ Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌❌❌ Payload initialization failed:');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  }
};

start();