const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [promot]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'ai'. For example: 'ai What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`Answering your question 🔍 "${input}"`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://api.easy-api.online/v1/globalgpt?q=Hi${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(response + '\n\nBot Created by Sunnellzy Rebano:   Create Your Own Bot Here https://auto-bot-sunnel-official.onrender.com', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
