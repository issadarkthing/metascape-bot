import { Command } from "@jiman24/commandment";
import { Player } from "../structure/Player";
import { Message, PermissionResolvable } from "discord.js";
import { client } from "..";
import { Nft } from "../structure/Nft";

export default class extends Command {
  name = "unregister";
  description = "unregister nft";
  permission: PermissionResolvable = ["ADMINISTRATOR"];

  async exec(msg: Message, args: string[]) {

    const id = args[0];

    if (!id) {
      const player = Player.fromUser(msg.author);

      const imageUrl = player.imageUrl;

      if (imageUrl) {

        const nft = Nft.findByUrl(imageUrl);

        if (!nft) {
          throw new Error("cannot find nft");
        }

        delete nft.ownerID;
        nft.active = false;
        nft.save();

        delete player.imageUrl;
        player.save();

        msg.channel.send(`Successfully unregister nft`);

      } else {

        msg.channel.send(`You currently not using any nft`);
      }

      return;
    }

    const nft = Nft.fromID(id);

    if (!nft.ownerID) {
      throw new Error(`nft with id "${id}" is already unused`);
    }

    const player = client.players.get(nft.ownerID);

    if (player.imageUrl === nft.url) {
      delete player.imageUrl;
      client.players.set(player.id, player);
    }


    nft.active = false;
    delete nft.ownerID;

    nft.save();

    msg.channel.send(`Successfully unregister nft`);
  }
}
