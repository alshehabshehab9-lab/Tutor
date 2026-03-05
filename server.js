// server.js - With Email Notifications
const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Email configuration (using Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alshehabshehab9@gmail.com', // YOUR GMAIL
        pass: 'your-app-password-here' // You'll create this
    }
});

// Handle contact form submission
app.post('/submit-contact', async (req, res) => {
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
    
    // Send email notification
    try {
        await transporter.sendMail({
            from: '"Tutoring Platform" <alshehabshehab9@gmail.com>',
            to: 'alshehabshehab9@gmail.com', // Your email
            subject: `New Contact from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message: ${message}
Time: ${new Date().toLocaleString()}
            `,
            html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong> ${message}</p>
<p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            `
        });
        console.log('✅ Email notification sent');
        
        // Send auto-reply to customer
        await transporter.sendMail({
            from: '"LearnSmart Tutoring" <alshehabshehab9@gmail.com>',
            to: email,
            subject: 'Thank you for contacting LearnSmart Tutoring',
            text: `
Dear ${name},

Thank you for reaching out to LearnSmart Tutoring!

We've received your message and will get back to you within 24 hours.

Your message: "${message}"

Best regards,
The LearnSmart Team
            `
        });
        console.log('✅ Auto-reply sent to customer');
        
    } catch (emailErr) {
        console.log('❌ Email error:', emailErr.message);
    }
    
    console.log('------------------------');
    
    // Send response
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
                <a href="/view-messages">View Messages</a>
            </nav>
            <main>
                <h2>✅ Message Sent Successfully!</h2>
                <p>Thank you <strong>${name}</strong>! We've received your message.</p>
                <p>A confirmation email has been sent to <strong>${email}</strong>.</p>
                <p>We'll respond within 24 hours.</p>
                <br>
                <a href="contact.html" style="display: inline-block; background-color: #2c3e50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Send Another Message</a>
            </main>
            <footer>
                <p>&copy; 2024 LearnSmart Tutoring. All rights reserved.</p>
            </footer>
        </body>
        </html>
    `);
});

// View messages page (same as before)
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
                    .message {
                        border: 1px solid #ddd;
                        padding: 15px;
                        margin: 10px 0;
                        border-radius: 5px;
                        background-color: #f9f9f9;
                    }
                    .date {
                        color: #666;
                        font-size: 0.9em;
                    }
                </style>
            </head>
            <body>
                <header>
                    <h1>Contact Form Messages</h1>
                </header>
                <nav>
                    <a href="index.html">Home</a>
                    <a href="subjects.html">Subjects</a>
                    <a href="tutors.html">Our Tutors</a>
                    <a href="contact.html">Contact</a>
                    <a href="/view-messages">View Messages</a>
                </nav>
                <main>
                    <h2>Messages (${messages.length})</h2>
        `;
        
        if (messages.length === 0) {
            html += '<p>No messages yet.</p>';
        } else {
            messages.reverse().forEach(msg => {
                const date = new Date(msg.date).toLocaleString();
                html += `
                    <div class="message">
                        <h3>${msg.name}</h3>
                        <p><strong>Email:</strong> ${msg.email}</p>
                        <p><strong>Message:</strong> ${msg.message}</p>
                        <p class="date">Received: ${date}</p>
                    </div>
                `;
            });
        }
        
        html += `
                </main>
                <footer>
                    <p>&copy; 2024 LearnSmart Tutoring. All rights reserved.</p>
                </footer>
            </body>
            </html>
        `;
        
        res.send(html);
    } catch (err) {
        res.send('<h1>Error loading messages</h1>');
    }
});

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 View messages at: http://localhost:${PORT}/view-messages`);
});
