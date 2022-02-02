import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { client } from "..";
import { Nft } from "../structure/Nft";
import { Player } from "../structure/Player";



export default class extends Command {
  name = "use";
  description = "use which nft to be used as your pfp";

  async exec(msg: Message, args: string[]) {

    const [id] = args;

    if (!id) {
      throw new Error("no id was provided");
    }

    const nft = Nft.fromID(id);
    const player = Player.fromUser(msg.author);

    if (nft.ownerID !== player.id) {
      throw new Error(`you do not own nft with id "${nft.id}"`);
    }

    if (nft.url === player.imageUrl) {
      throw new Error(`you are currently using this nft`);
    }

    if (player.imageUrl) {

      const oldNft = Nft.findByUrl(player.imageUrl);

      if (oldNft) {
        oldNft.active = false;
        oldNft.save();
      }
    }


    player.imageUrl = nft.url;
    nft.active = true;

    player.save();
    nft.save();

    msg.channel.send(`Successfully changed character`);
  }
}

