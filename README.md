# Auto Reply with Keyword
Auto Reply chat with keyword.


## Tools and components required
1. [Node.js](https://nodejs.org/) (v14 or higher recommended).
2. VPS for run 24/7. (optional if u wanna bot running 24/7)
3. termux (if u wanna running with mobile)


## Installation 
Follow these steps to set up the WhatsApp bot:

### 1. Clone the repository

```bash
git clone https://github.com/XsyCodee/bot-wa-auto-reply.git
cd bot-wa-auto-reply
```

```bash
npm install
```

## Run the Bot

- Windows and Termux:
```bash
npm run start
```
- Unix:
```bash
npm run start
```

## Configurating
1. Customize Keywords
    You can customize the bot's keywords by modifying the following line in index.js:
    const keywords = ['halo', 'hello', 'bro']; // Replace with your own keywords

2. Customize Reply Text
    You can modify the reply message the bot sends by editing the following line:
    await sock.sendMessage(sender, { text: 'apa? chat dibalas ama bot, mohon rechat jika 5 menit tidak dibalas.' });

3. then u open whatsapp > Go to Settings > Linked Devices > Link a Device > scan.

4. Then test your bot with keyword

# Example output 
Pesan dari: +62xxxx
Pesan teks: "Halo, saya xxxx"
Kata kunci ditemukan: halo
Bot mengirim balasan: "apa? chat dibalas ama bot, mohon rechat jika 5 menit tidak dibalas."
