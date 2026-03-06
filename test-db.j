// test-db.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

async function testConnection() {
  console.log('🔍 Testing MongoDB Connection...');
  console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Found' : '❌ Missing');
  
  if (!process.env.MONGODB_URI) {
    console.log('❌ MONGODB_URI is not defined in .env file');
    return;
  }
  
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    // Get database info
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log('📊 Collections:', collections.map(c => c.name));
    
    await client.close();
    console.log('👋 Connection closed');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
