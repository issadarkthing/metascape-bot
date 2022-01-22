import { CommandManager } from "@jiman24/commandment";
import { Client as DiscordClient } from "discord.js";
import Enmap from "enmap";
import { Nft } from "./Nft";

export class Client extends DiscordClient {
  players = new Enmap("Player");
  commandManager = new CommandManager(process.env.PREFIX || "!");
  nft = new Enmap<string, Nft>("nft");
}


