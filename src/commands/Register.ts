import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { client } from "../index";
import { bold } from "../utils";
import { Player } from "../structure/Player";
import { Nft } from "../structure/Nft";

export default class extends Command {
  name = "register";
  description = "create new character";

  async exec(msg: Message, args: string[]) {

    const id = args[0];

    if (!id) {
      throw new Error("no id was provided");
    }

    const nft = Nft.fromID(id);

    if (nft.ownerID) {
      throw new Error(`nft "${id}" already owned`);
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

    if (!player.imageUrl) {
      player.imageUrl = nft.url;
      nft.active = true;
    }


    nft.ownerID = player.user.id;

    nft.save();
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
