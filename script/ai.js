const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [prompt]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args,
  senderId
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'ai'. For example: 'ai What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }

  const now = new Date();
  const currentTime = now.toLocaleTimeString();
  const currentDate = now.toLocaleDateString();
  const currentMonth = now.toLocaleString('default', { month: 'long' });

  const userName = senderId ? `(${senderId})` : '';

  api.sendMessage(`Answering Your Question Please Wait ${userName}: "${input}"\n\nCurrent time: ${currentTime}\nCurrent date: ${currentDate}\nCurrent month: ${currentMonth}`, event.threadID, event.messageID);

  try {
    const { data } = await axios.get(`https://api-soyeon.onrender.com/api?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(response + '\n\nBot Created by Sunnellzy Rebano\n\nCreate Your Own Bot Here https://auto-bot-sunnel-official.onrender.com', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
