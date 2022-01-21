import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { client } from "../index";
import { bold } from "../utils";
import { Player } from "../structure/Player";

export default class extends Command {
  name = "register";
  description = "create new character";

  async exec(msg: Message, args: string[]) {

    const id = args[0];

    if (!id) {
      throw new Error("no id was provided");
    }

    const nft = client.nft.get(id);

    if (!nft) {
      throw new Error(`no nft with id "${id}" exists`);
    } else if (nft.active) {
      throw new Error(`nft with id "${id}" is currently in used`);
    }

    let player: Player;
    let isNewPlayer = false;

    try {

      player = Player.fromUser(msg.author);

    } catch (err) {
      player = new Player(msg.author);
      delete player.imageUrl;
      isNewPlayer = true;
    }

    if (player.imageUrl) {
      const nft = client.nft.find(x => x.url === player.imageUrl)!;

      throw new Error(`You are currently using nft with id "${nft.id}"`);
    }

    player.imageUrl = nft.url;

    nft.ownerID = player.user.id;
    nft.active = true;

    client.nft.set(id, nft);

    player.save();

    const { prefix } = client.commandManager;

    if (isNewPlayer) {

      msg.channel.send(`${bold(player.name)} has been created successfully!`);
      msg.channel.send(
        `Use \`${prefix}profile\` to checkout your profile`
      )
      msg.channel.send(`Use \`${prefix}hunt\` to start hunting monsters!`);
      msg.channel.send(`Use \`${prefix}help\` to check out other commands!`);

    } else {
      msg.channel.send(`Successfully register new nft`);
    }
  }
}
