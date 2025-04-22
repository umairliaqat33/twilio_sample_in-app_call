require('dotenv').config();
const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// Create the voice grant and add Push Credential SID
const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: process.env.TWIML_APP_SID,
    incomingAllow: true,
    pushCredentialSid: process.env.TWILIO_PUSH_CREDENTIAL_SID,  // ✅ Add this
});

const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    { identity: 'BobId' }
);

token.addGrant(voiceGrant);

console.log('Access Token:');
console.log(token.toJwt());
