module.exports.config = {
  name: "faceswap",
  usePrefix: false,
  hasPermission: 0,
  credits: "Deku",
  description: "Generate image",
  commandCategory: "Faceswap",
};

module.exports.run = async function({ event, text, react, reply }) {
  try {
    const { Prodia } = require("prodia.js");
    const prodia = new Prodia("dc80a8a4-0b98-4d54-b3e4-b7c797bc2527");
    const axios = require("axios"), fs = require('fs');

    let url, url1;

    if (event.type == "message_reply") {

      if (event.messageReply.attachments.length < 0) return reply("No image found.");
      if (event.messageReply.attachments[0].type !== "photo") return reply("Only image can be converted.");
      url = event.messageReply.attachments[0].url;

      if (event.messageReply.attachments.lengt > 2) return reply("Only 2 image can be converted.");

      url = event.messageReply.attachments[0].url
      url1 = event.messageReply.attachments[1].url 
        
api.sendMessage("Processing...");

      const generate = await prodia.faceSwap({

        sourceUrl: encodeURI(url),

        targetUrl: encodeURI(url1),

      });

      while (generate.status !== "succeeded" && generate.status !== "failed") {

        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed
        
        const job = await prodia.getJob(generate.job);

        if (job.status === "succeeded") {

          let img = (await axios.get(job.imageUrl, { responseType: "arraybuffer" })).data;

          let path = __dirname + '/cache/gen.png';

          fs.writeFileSync(path, Buffer.from(img, "utf-8"))

          return reply({ attachment: fs.createReadStream(path) });

        }

      }

    } else {

      return reply("Please reply to an image.");

    }

  } catch (e) {

    return reply(e.message)

  }

}