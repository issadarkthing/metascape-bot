import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { client } from "..";
import { bold } from "../utils";



export default class extends Command {
  name = "duelleaderboard";
  description = "show leaderboard with most duel wins";

  async exec(msg: Message) {

    const player = client.players.array()
      .sort((a, b) => b.duelWins - a.duelWins)
      .map((x, i) => `${i + 1}. ${x.name} \`${x.duelWins}\``)
      .slice(0, 10)
      .join("\n");

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Duel Leaderboard")
      .setDescription(bold(`Name | Wins\n`) + player);

    msg.channel.send({ embeds: [embed] });
  }
}
