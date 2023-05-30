const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const chalk = require("chalk");

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: "./secrets"
    }),
});

client.on('qr', (qr) => {
    // Generate and display the QR code
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above with your phone to log in.');
});

client.on('authenticated', (session) => {
    console.log('Authenticated successfully !');
});

client.on('ready', async () => {
    console.log("Login Successfull!")
    client.destroy();
});
client.initialize();