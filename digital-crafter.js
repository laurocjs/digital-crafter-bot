const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const TOKEN = fs.readFileSync('beta-token.token', 'utf8'); 


const bot = new TelegramBot(TOKEN, { polling: true });

let fraseAleatoria = () => {
  return 'Espero ter ajudado';
};

bot.on('message', (msg) => {

  let padraoAlguem = /u|e|é/gi;
  let textoSeparado = msg.text.toString().toLowerCase().split(' ');
  let matchPadraoIndex = msg.text.toString().toLowerCase().replace(padraoAlguem, '').split(' ').indexOf('algm');
  if (matchPadraoIndex !== -1 && matchPadraoIndex+1 !== textoSeparado.length) {
    let proximaPalavra = textoSeparado[matchPadraoIndex + 1];
    bot.sendMessage(msg.chat.id, `Alguém ${proximaPalavra.toLowerCase()}, ${msg.chat.first_name}. ${fraseAleatoria()}.`);
  }
});