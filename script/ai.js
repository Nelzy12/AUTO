const axios = require('axios');

function getDateTimeStrings() {
    const now = new Date();
    const currentTime = now.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const currentDate = now.toLocaleString('en-US', { weekday: 'long' });
    const currentMonth = now.toLocaleString('en-US', { month: 'long', day: 'numeric' });
    return { currentTime, currentDate, currentMonth };
}

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

    const { currentTime, currentDate, currentMonth } = getDateTimeStrings();
    const userID = senderId || 'Unknown User';
    const userName = `(${userID})`;

    api.sendMessage(`\n🔎Answering your question..."${input}"\n\n📝the question request on\n\ndate: ${currentDate}\nmonth: ${currentMonth}\n\n👤Asked by: ${userName}\n\n🤖Created By SunnelRebano\n\nCreate Your Own Bot Here\nhttps://auto-bot-sunnel-official.onrender.com`, event.threadID, event.messageID);

    try {
        const { data } = await axios.get(`https://api-soyeon.onrender.com/api?prompt=${encodeURIComponent(input)}`);
        const response = data.response;
        if (response) {
            api.sendMessage(`${response}`, event.threadID, event.messageID);
        }
    } catch (error) {
        api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    }
};
