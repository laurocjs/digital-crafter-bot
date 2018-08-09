from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import random
import string
import subprocess as sub

# Initialize the bot
myToken = ""
for line in open('myToken.token'): # Read your token file
    myToken += line
updater = Updater(token=myToken[0:-1]) # mine ends with an \n, so I cut it off
dispatcher = updater.dispatcher
print('Crafter is running...')

# Define each command method
# Start method is just a welcome message
def start(bot, update):
    bot.send_message(chat_id=update.message.chat_id, text="Olá! Eu sou o *Digital Crafter*!", parse_mode='Markdown')

def echo(bot, update):
    # bot.send_message(chat_id=update.message.chat_id, text=update.message.text)
    if "alguém".upper() in update.message.text.upper():
      respondeAlguem("alguém", bot, update)
    elif "alguem".upper() in update.message.text.upper():
      respondeAlguem("alguem", bot, update)

def respondeAlguem(palavra, bot, update):
    frase = update.message.text.upper()
    lista_de_palavras = frase.split()
    next_word = lista_de_palavras[lista_de_palavras.index(palavra.upper()) + 1]
    if (next_word[len(next_word)-1] == '?'):
      update.message.reply_text("Vai saber.", quote=True)
    else:
      update.message.reply_text("Alguém " + next_word.lower() + ". Espero ter ajudado.", quote=True)

# Create handlers for each method
start_handler = CommandHandler('start', start)
echo_handler = MessageHandler(Filters.text, echo)

# Add the handlers to the dispatcher
dispatcher.add_handler(start_handler)
dispatcher.add_handler(echo_handler)

# Start polling
updater.start_polling()