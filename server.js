// server.js - Original with Decap CMS support
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the current directory - THIS IS CRITICAL
app.use(express.static(__dirname));

// Handle contact form submission
app.post('/submit-contact', (req, res) => {
    const { name, email, message } = req.body;
    
    console.log('📧 New Contact Form Submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    
    // Save to messages.json
    const messageData = {
        name,
        email,
        message,
        date: new Date().toISOString()
    };
    
    let messages = [];
    try {
        if (fs.existsSync('messages.json')) {
            const fileData = fs.readFileSync('messages.json');
            messages = JSON.parse(fileData);
        }
    } catch (err) {
        console.log('Creating new messages file');
    }
    
    messages.push(messageData);
    fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));
    console.log('✅ Message saved to messages.json');
    console.log('------------------------');
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Message Sent</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <header>
                <h1>LearnSmart Tutoring</h1>
                <p>Your Path to Academic Success</p>
            </header>
            <nav>
                <a href="index.html">Home</a>
                <a href="subjects.html">Subjects</a>
                <a href="tutors.html">Our Tutors</a>
                <a href="contact.html">Contact</a>
                <a href="/admin">Admin</a>
            </nav>
            <main>
                <h2>✅ Message Sent Successfully!</h2>
                <p>Thank you <strong>${name}</strong>! We've received your message.</p>
                <p>We'll respond to <strong>${email}</strong> within 24 hours.</p>
                <br>
                <a href="contact.html">Send Another Message</a>
            </main>
            <footer>
                <p>&copy; 2026 LearnSmart Tutoring. All rights reserved.</p>
            </footer>
        </body>
        </html>
    `);
});

// View messages page
app.get('/view-messages', (req, res) => {
    try {
        let messages = [];
        if (fs.existsSync('messages.json')) {
            const fileData = fs.readFileSync('messages.json');
            messages = JSON.parse(fileData);
        }
        
        let html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Messages</title>
                <link rel="stylesheet" href="style.css">
                <style>
                    .message { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px; }
                    .date { color: #666; font-size: 0.9em; }
                </style>
            </head>
            <body>
                <header><h1>Contact Form Messages</h1></header>
                <nav>
                    <a href="index.html">Home</a>
                    <a href="subjects.html">Subjects</a>
                    <a href="tutors.html">Our Tutors</a>
                    <a href="contact.html">Contact</a>
                    <a href="/admin">Admin</a>
                </nav>
                <main>
                    <h2>Messages (${messages.length})</h2>
        `;
        
        if (messages.length === 0) {
            html += '<p>No messages yet.</p>';
        } else {
            messages.reverse().forEach(msg => {
                html += `
                    <div class="message">
                        <h3>${msg.name}</h3>
                        <p><strong>Email:</strong> ${msg.email}</p>
                        <p><strong>Message:</strong> ${msg.message}</p>
                        <p class="date">Received: ${new Date(msg.date).toLocaleString()}</p>
                    </div>
                `;
            });
        }
        
        html += `
                </main>
                <footer><p>&copy; 2026 LearnSmart Tutoring</p></footer>
            </body>
            </html>
        `;
        
        res.send(html);
    } catch (err) {
        res.send('<h1>Error loading messages</h1>');
    }
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Local: http://localhost:${PORT}`);
    console.log(`📁 Admin: http://localhost:${PORT}/admin`);
});