const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const TOKEN = fs.readFileSync('beta-token.token', 'utf8'); 


const bot = new TelegramBot(TOKEN, { polling: true });

let fraseAleatoria = () => {
  const listaDeFrases = [
    'Espero ter ajudado',
    'Sempre feliz em contribuir',
    'Não precisa agradecer',
    'Ao seu dispor',
    'Ou não..',
    'Embora talvez no futuro',
    ''
  ]
  return listaDeFrases[Math.floor(Math.random() * listaDeFrases.length)];
};

bot.on('message', (msg) => {

  let padraoRemocao = /u|e|é/gi;
  let padraoPontuacao = /\?|\.|\!|\,/g;
  let textoSeparado = msg.text.toString().toLowerCase().split(' ');
  let matchPadraoIndex = msg.text.toString().toLowerCase().replace(padraoRemocao, '').split(' ').indexOf('algm');
  if (matchPadraoIndex !== -1 && matchPadraoIndex+1 !== textoSeparado.length) {
    let proximaPalavra = textoSeparado[matchPadraoIndex + 1].replace(padraoPontuacao, '');
    bot.sendMessage(msg.chat.id, `Alguém ${proximaPalavra.toLowerCase()}, ${msg.chat.first_name}. ${fraseAleatoria()}.`);
  }
});