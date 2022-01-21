import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Prompt } from "@jiman24/discordjs-prompt";
import { client } from "..";

export default class extends Command {
  name = "upload";
  description = "register nft";

  async exec(msg: Message) {

    const prompt = new Prompt(msg);
    const image = (await prompt.collect("Please upload nft")).attachments.first();

    if (!image) {
      throw new Error("no nft was provided");
    }

    const id = await prompt.ask("Please give an id to this nft");

    if (client.nft.has(id)) {
      throw new Error(`id "${id}" already exists`);
    }

    client.nft.set(id, { id, url: image.url, active: false });
    msg.channel.send(`Successfully saved nft`);
  }
}
