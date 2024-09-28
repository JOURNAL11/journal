const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import path module

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider
    auth: {
        user: 'urjournal.cloud@gmail.com', // Your email
        pass: 'psrg jwqm euhw fmxd', // Your email password or app password
    },
});

// POST endpoint to send emails
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'urjournal.cloud@gmail.com', // Your email to receive messages
        subject: `Contact form submission from ${name}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error.message); // Log the error message
            return res.status(500).send('Failed to send message: ' + error.message); // Return the error message
        }
        res.status(200).send('Message sent: ' + info.response);
    });
    
    
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
