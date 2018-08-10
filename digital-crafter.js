const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const TOKEN = fs.readFileSync('beta-token.token', 'utf8'); 


const bot = new TelegramBot(TOKEN, { polling: true });

let selecionaAleatorio = (lista) => {

  return lista[Math.floor(Math.random() * lista.length)];
};

let matchAlguem = (msg) => {
  let padraoRemocao = /u|e|é/gi;
  let padraoPontuacao = /\?|\.|\!|\,/g;
  let textoSeparado = msg.text.toString().toLowerCase().split(' ');
  let matchPadraoIndex = msg.text.toString().toLowerCase().replace(padraoRemocao, '').split(' ').indexOf('algm');

  const listaDeFrases = [
    'Espero ter ajudado.',
    'Fico sempre feliz em contribuir!',
    'Não precisa agradecer :)',
    'Ao seu dispor.',
    'Ou não...',
    'Embora talvez no futuro.',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
  ];
  const opts = { reply_to_message_id: msg.message_id };

  if (matchPadraoIndex !== -1 && matchPadraoIndex+1 !== textoSeparado.length) {
    let proximaPalavra = textoSeparado[matchPadraoIndex + 1].replace(padraoPontuacao, '');
    bot.sendMessage(msg.chat.id, `Alguém ${proximaPalavra.toLowerCase()}, ${msg.chat.first_name}. ${selecionaAleatorio(listaDeFrases)}`, opts);
    return true;
  }
  return false;
};

let matchBot = (msg) => {
  let padraoRemocao = /u|e|é/gi;
  let matchPadraoIndex = msg.text.toString().toLowerCase().replace(padraoRemocao, '').split(' ').indexOf('bot');

  const listaDeFrases = [
    'Hum hum',
    'Hum hum',
    'Hum hum',
    '🤔🤔',
    '🤔🤔',
    '🤔🤔',
    '🧐',
    '🧐',
    '🧐',
    'ora ora parece que temos um xeroque holmes aqui',
    '👀'
  ];

  if (matchPadraoIndex !== -1) {
    bot.sendMessage(msg.chat.id, selecionaAleatorio(listaDeFrases));
    return true;
  }
  return false;
};

bot.on('message', (msg) => {
  if (matchAlguem(msg)) {
    console.log('Match em um algúem');
  }
  else if (matchBot(msg)) {
    console.log('Match em bot');
  }
});