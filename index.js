const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { parsePhoneNumber } = require('awesome-phonenumber');

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: "./secrets"
    }),
});

async function getWhatsappUser(phoneNumber) {
    client.on('authenticated', async () => {
        console.log('Authenticated successfully !\n');
    });

    client.on('ready', async () => {
        const id = await client.getNumberId(phoneNumber);

        let isRegistered = await client.isRegisteredUser(phoneNumber);
        if (isRegistered) {
            console.log(`${phoneNumber} has a WhatsApp account.`);
            console.log(`id : ${id._serialized}\n`);

            console.log("Profile Pic Link :", await client.getProfilePicUrl(id._serialized))
            let contact = await client.getContactById(phoneNumber + '@c.us')
            if (contact) {
                console.log("\n");
                console.log(`Name: ${contact.name}`);
                console.log(`Short name: ${contact.shortName}`);
                console.log(`Push name: ${contact.isBusiness}`);
                console.log(`Verified name: ${contact.verifiedName}`);
                console.log(`Business: ${contact.isBusiness}`);
            } else {
                console.log('Contact not found.');
            }
        } else {
            console.log(`${phoneNumber} does not have a WhatsApp account.`);
        }
        client.destroy();
    });
    client.initialize();
}

const pn = parsePhoneNumber('7018899999', { regionCode: 'IN' });

getWhatsappUser(pn.number.e164.slice(1))