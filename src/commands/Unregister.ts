import { Command } from "@jiman24/commandment";
import { Player } from "../structure/Player";
import { Message, PermissionResolvable } from "discord.js";
import { client } from "..";

export default class extends Command {
  name = "unregister";
  description = "unregister nft";
  permission: PermissionResolvable = ["ADMINISTRATOR"];

  async exec(msg: Message, args: string[]) {

    const id = args[0];

    if (!id) {
      const player = Player.fromUser(msg.author);
      const nft = client.nft.find(x => x.url === player.imageUrl)!;

      delete nft.ownerID;
      nft.active = false;
      client.nft.set(nft.id, nft);

      delete player.imageUrl;
      client.players.set(player.id, player);

      msg.channel.send(`Successfully unregister nft`);
      return;
    }

    const nft = client.nft.get(id);

    if (!nft) {
      throw new Error(`no nft with id "${id}" exists`);
    }

    if (!nft.ownerID) {
      throw new Error(`nft with id "${id}" is already unused`);
    }

    const player = client.players.get(nft.ownerID);
    delete player.imageUrl;

    client.players.set(player.id, player);

    nft.active = false;
    delete nft.ownerID;

    client.nft.set(nft.id, nft);

    msg.channel.send(`Successfully unregister nft`);
  }
}
