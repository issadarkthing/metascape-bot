import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { client } from "..";

export default class extends Command {
  name = "unregister";
  description = "unregister nft";

  async exec(msg: Message, args: string[]) {

    const id = args[0];

    if (!id) {
      throw new Error("no id was provided");
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
