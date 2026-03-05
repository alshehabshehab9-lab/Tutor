const express = require('express');
const app = express();
const PORT = 10000;

// Serve all your static files (HTML, CSS, JS)
app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Your site is live!`);
});