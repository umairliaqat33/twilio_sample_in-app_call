require('dotenv').config();
const express = require('express');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route: Handle Twilio Voice call webhook
app.post('/voice', (req, res, next) => {
    try {
        const VoiceResponse = require('twilio').twiml.VoiceResponse;


        const twiml = new VoiceResponse();
        const dial = twiml.dial();
        // const client = dial.client();
        // client.identity('BobId');

        // You can replace this with logic to forward to specific user
        // twiml.dial('03134146206'); // e.g., 'client:bob'
        dial.client('BobId');
        // twiml.dial('AliceId'); // e.g., 'client:bob'

        console.log('[INFO] TwiML generated successfully');
        res.type('text/xml');
        res.send(twiml.toString());
        console.log(twiml.toString());
    } catch (error) {
        console.error('[ERROR] /voice route failed:', error);
        next(error); // Pass to error handler
    }
});

// Route: Handle generic Twilio webhook for debugging
app.post('/twilio-webhook', (req, res, next) => {
    try {
        console.log('[INFO] Twilio webhook received:', req.body);
        res.send('<Response></Response>');
    } catch (error) {
        console.error('[ERROR] /twilio-webhook route failed:', error);
        next(error);
    }
});

// Route: Home (debug)
app.get('/', (req, res) => {
    res.send('Ngrok is working!');
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('[GLOBAL ERROR]', err);
    res.status(500).json({
        message: 'An unexpected error occurred on the server.',
        error: err.message,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
