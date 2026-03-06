// payload.config.js - FIXED
const { buildConfig } = require('payload/config');
const path = require('path');

// Import your collections
const Subjects = require('./collections/Subjects');
const Tutors = require('./collections/Tutors');
const Media = require('./collections/Media');

module.exports = buildConfig({
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
  },
  collections: [Subjects, Tutors, Media], // ← This must be inside!
  localization: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    fallback: true,
  },
});
