'use strict'

module.exports.config = {
  name: "faceswap",
  usePrefix: false,
  hasPermission: 0,
  credits: "Deku",
  description: "Generate image",
  commandCategory: "Faceswap",
};

module.exports.run = async function ({ event, text, client }) {
  try {
    const { Prodia } = require("prodia.js");
    const prodia = new Prodia("dc80a8a4-0b98-4d54-b3e4-b7c797bc2527");
    const axios = require("axios");
    const fs = require('fs');

    let url, url1;

    if (event.message.type == "image") {
      url = event.message.url;
      
      if (event.messageReply.attachments.length < 1) {
        throw new Error("No second image found for faceswap.");
      }
      
      url1 = event.messageReply.attachments[0].url;
      
      await client.sendText(event.thread_id, "Processing...");
      
      const generate = await prodia.faceSwap({
        sourceUrl: encodeURI(url),
        targetUrl: encodeURI(url1),
      });

      while (generate.status !== "succeeded" && generate.status !== "failed") {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const job = await prodia.getJob(generate.job);

        if (job.status === "succeeded") {
          const img = (await axios.get(job.imageUrl, { responseType: "arraybuffer" })).data;
          const path = __dirname + '/cache/gen.png';
          fs.writeFileSync(path, Buffer.from(img, "utf-8"));
          await client.sendFile(event.thread_id, path);
        }
      }

    } else {
      throw new Error("Please send an image to process.");
    }
  } catch (e) {
    console.error(e);
    // Handle the error gracefully, e.g., inform the user about the error
    await client.sendText(event.thread_id, `Error: ${e.message}`);
  }
};