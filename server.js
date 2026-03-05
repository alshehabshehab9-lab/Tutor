const express = require('express');
const app = express();
const PORT = 10000;

// Middleware to parse form data - THIS IS CRITICAL!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve all static files (HTML, CSS, JS)
app.use(express.static('.'));

// Handle contact form submission
app.post('/submit-contact', (req, res) => {
    // Get the form data
    const { name, email, message } = req.body;
    
    console.log('📧 New Contact Form Submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('------------------------');
    
    // Send a nice response
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

// Health check for Render
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Live at: https://tutor-app-iaec.onrender.com`);
});
