import { Message } from "discord.js";
import { Pet as BasePet } from "@jiman24/discordjs-rpg";
import { Player } from "./Player";

interface PetData {
  id: string;
  name: string;
  interceptRate: number;
  attack: number;
  price: number;
  imageUrl: string;
}

export class Pet extends BasePet {
  id: string;
  name: string;
  interceptRate: number;
  attack: number;
  price: number;

  constructor(data: PetData) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.interceptRate = data.interceptRate;
    this.attack = data.attack;
    this.price = data.price;
    this.imageUrl = data.imageUrl;
  }

  static get all(): Pet[] {
    return data.map(x => new Pet(x));
  }

  async buy(msg: Message) {

    const player = Player.fromUser(msg.author);

    if (player.coins < this.price) {
      msg.channel.send("Insufficient amount");
      return;
    }

    if (player.inventory.some(x => x.id === this.id)) {
      msg.channel.send("You already own this item");
      return;
    }

    player.coins -= this.price;
    player.inventory.push(this);

    player.save();
    msg.channel.send(`Successfully bought **${this.name}**!`);
  }
}

const data = [
  {
    id: "pig",
    name: "Pig",
    price: 5000,
    interceptRate: 0.1,
    attack: 20,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080209776635914/pig.png",
  },
  {
    id: "slime",
    name: "Slime",
    price: 6000,
    interceptRate: 0.12,
    attack: 30,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080209051009055/slime.png",
  },
  {
    id: "bat",
    name: "Bat",
    price: 7000,
    interceptRate: 0.14,
    attack: 40,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080210577752144/bat.png",
  },
  {
    id: "rhino",
    name: "Rhino",
    price: 8000,
    interceptRate: 0.16,
    attack: 50,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080209373974589/rhino.png",
  },
  {
    id: "golem",
    name: "Golem",
    price: 9000,
    interceptRate: 0.18,
    attack: 60,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080210196041828/golem.png",
  },
]

