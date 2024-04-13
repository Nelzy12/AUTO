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
  const currentTime = now.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const currentDate = now.toLocaleString('en-US', { weekday: 'long' });
  const currentMonth = now.toLocaleString('en-US', { month: 'long', day: 'numeric' });

  const userName = senderId ? `(${senderId})` : '';

  api.sendMessage(`Answering your question "${input}"\n\nthe question request on\ndate: ${currentDate}\nmonth: ${currentMonth}`, event.threadID, event.messageID);

  try {
    const { data } = await axios.get(`https://api-soyeon.onrender.com/api?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(response + '\n\nChatbot Created by Sunnel Jhon Rebano\n\nCreate Your Own Bot Here https://auto-bot-sunnel-official.onrender.com', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
