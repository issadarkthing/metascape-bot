import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { client } from "..";
import { toNList } from "../utils";

export default class extends Command {
  name = "nft";
  description = "list all nft's you own";

  async exec(msg: Message) {

    const nfts = client.nft.findAll("ownerID", msg.author.id);

    if (nfts.length === 0) {
      throw new Error("you do not own any nft");
    }

    const nftList = toNList(nfts.map(x => `**#${x.id}** ${x.url}`));
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(nftList)

    msg.channel.send({ embeds: [embed] });
  }
}
