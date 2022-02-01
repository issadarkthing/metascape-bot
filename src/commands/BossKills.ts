import { Command } from "@jiman24/commandment";
import { Player } from "../structure/Player";
import { Message } from "discord.js";
import { bold } from "../utils";



export default class extends Command {
  name = "bosskills";
  description = "show how many boss(es) you've killed";

  async exec(msg: Message) {

    const player = Player.fromUser(msg.author);

    msg.channel.send(`You've killed ${bold(player.bossKills)} boss(es)`);
  }
}
