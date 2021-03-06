import { Command } from "@jiman24/commandment";
import { Message, PermissionResolvable } from "discord.js";
import { client } from "..";

export default class extends Command {
  name = "delete";
  description = "delete a registered nft";
  permission: PermissionResolvable = ["ADMINISTRATOR"];

  async exec(msg: Message, args: string[]) {

    const id = args[0];

    if (!id) {
      throw new Error("no nft id was provided");
    }

    if (!client.nft.has(id)) {
      throw new Error(`no nft with id "${id}"`);
    }

    client.nft.delete(id);
    msg.channel.send("Successfully deleted nft");
  }
}
