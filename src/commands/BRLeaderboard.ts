import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { client } from "..";
import { bold } from "../utils";


export default class extends Command {
  name = "brleaderboard";
  description = "show leaderboard with most br wins";

  async exec(msg: Message) {

    const player = client.players.array()
      .sort((a, b) => (b.brWins || 0) - (a.brWins || 0))
      .map((x, i) => `${i + 1}. ${x.name} \`${x.brWins || 0}\``)
      .slice(0, 10)
      .join("\n");

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Battle Royale Leaderboard")
      .setDescription(bold(`Name | Wins\n`) + player);

    msg.channel.send({ embeds: [embed] });
  }
}
