import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { client } from "../index";
import { bold } from "../utils";
import { Player } from "../structure/Player";

export default class extends Command {
  name = "register";
  description = "create new character";

  async exec(msg: Message, args: string[]) {

    if (client.players.has(msg.author.id)) {
      throw new Error("your character has already been created");
    }

    const id = args[0];

    if (!id) {
      throw new Error("no id was provided");
    }

    const avatarUrl = client.nft.get(id);

    if (!avatarUrl) {
      throw new Error(`no nft with id "${id}" exists`);
    }

    const player = new Player(msg.author, avatarUrl);

    player.save();

    const { prefix } = client.commandManager;

    msg.channel.send(`${bold(player.name)} has been created successfully!`);
    msg.channel.send(
      `Use \`${prefix}profile\` to checkout your profile`
    )
    msg.channel.send(`Use \`${prefix}hunt\` to start hunting monsters!`);
    msg.channel.send(`Use \`${prefix}help\` to check out other commands!`);
  }
}
