const express = require('express');
const app = express();
const PORT = 3000;

app.get('/view-messages', (req, res) => {
    res.send('<h1>Messages Page</h1><p>This is working!</p>');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
