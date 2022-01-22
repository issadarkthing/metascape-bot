import { Command } from "@jiman24/commandment";
import { Message, PermissionResolvable } from "discord.js";
import { Prompt } from "@jiman24/discordjs-prompt";
import { client } from "..";
import { Nft } from "../structure/Nft";

export default class extends Command {
  name = "upload";
  description = "register nft";
  permission: PermissionResolvable = ["ADMINISTRATOR"];

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

    const nft = new Nft(id, image.url);
    nft.save();

    msg.channel.send(`Successfully saved nft`);
  }
}
