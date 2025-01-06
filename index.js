import { makeWASocket, DisconnectReason, useMultiFileAuthState, Browsers } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';

async function startWhatsAppBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true, 
        browser: Browsers.macOS('Desktop'),
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect =
                lastDisconnect &&
                lastDisconnect.error &&
                lastDisconnect.error.output &&
                lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;

            console.log('Koneksi terputus. Reconnect:', shouldReconnect);
            if (shouldReconnect) {
                startWhatsAppBot();
            }
        } else if (connection === 'open') {
            console.log('Bot berhasil terhubung ke WhatsApp!');
        }
    });

    sock.ev.on('messages.upsert', async (messageUpdate) => {
        for (const message of messageUpdate.messages) {
            if (!message.key.fromMe && message.message) {
                const sender = message.key.remoteJid;
                console.log(`Pesan dari ${sender}`);

                const keywords = ['', '', '', '', '', '']; 
                let messageText = '';

                if (message.message.conversation) {
                    messageText = message.message.conversation;
                } else if (message.message.extendedTextMessage) {
                    messageText = message.message.extendedTextMessage.text;
                }

                console.log('Pesan teks:', messageText);
                console.log('Mengecek apakah pesan mengandung kata kunci:', messageText);

                const foundKeyword = keywords.find(keyword => messageText.toLowerCase().includes(keyword));

                if (foundKeyword) {
                    console.log('Kata kunci ditemukan:', foundKeyword);
                    await sock.sendMessage(sender, { text: 'apa?. chat dibalas ama bot, mohon rechat jika 5 menit tidak dibalas.' });
                } else {
                    console.log('Pesan tidak mengandung kata kunci, tidak ada balasan.');
                }
            }
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

startWhatsAppBot().catch((err) => {
    console.error('Terjadi kesalahan:', err);
});
