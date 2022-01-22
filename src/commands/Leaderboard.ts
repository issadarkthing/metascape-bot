import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { client } from "../index";
import { bold } from "../utils";

export default class extends Command {
  name = "leaderboard";
  aliases = ["l"];
  description = "show leaderboard of high xp players";

  exec(msg: Message) {

    const player = client.players.array()
      .sort((a, b) => b.xp - a.xp)
      .map((x, i) => `${i + 1}. ${x.name} \`${x.xp}\``)
      .slice(0, 10)
      .join("\n");

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Leaderboard")
      .setDescription(bold(`Name | XP\n`) + player);

    msg.channel.send({ embeds: [embed] });
  }
}

