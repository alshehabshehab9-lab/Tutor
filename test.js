// Simple test server
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/view-messages', (req, res) => {
    res.send('<h1>Success!</h1><p>The server is working correctly!</p>');
});

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/view-messages">View Messages</a>');
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log(`Test the messages page at http://localhost:${PORT}/view-messages`);
});