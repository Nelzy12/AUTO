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
  senderID,
  apiUserInfo // Add apiUserInfo to get the user's name from messenger
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'ai'. For example: 'ai What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }
  
  // Get user's name from messenger using apiUserInfo if available
  const userName = apiUserInfo ? apiUserInfo.name : 'Unknown User'; // You need to replace this logic with how you retrieve the user's name
  
  api.sendMessage(`Question asked by ${userName}: "${input}"`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://api-soyeon.onrender.com/api?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(`Answering ${userName}'s question 🔍 "${input}": ${response}\n\nBot Created by Sunnellzy Rebano\n\nCreate Your Own Bot Here https://auto-bot-sunnel-official.onrender.com`, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
