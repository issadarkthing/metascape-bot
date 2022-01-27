import { Message } from "discord.js";
import { Weapon as BaseWeapon } from "@jiman24/discordjs-rpg";
import { Player } from "../structure/Player";

interface WeaponData {
  id: string;
  name: string;
  attack: number;
  price: number;
  imageUrl: string;
}

export class Weapon extends BaseWeapon {
  id: string;
  name: string;
  attack: number;
  price: number;

  constructor(data: WeaponData) {
    super();
    this.id = data.id;
    this.price = data.price;
    this.name = data.name;
    this.attack = data.attack;
    this.imageUrl = data.imageUrl;
  }

  static get all(): Weapon[] {
    return data.map(x => new Weapon(x));
  }

  async buy(msg: Message) {

    const player = Player.fromUser(msg.author);

    if (player.coins < this.price) {
      msg.channel.send("Insufficient amount");
      return;
    }

    if (
      player.inventory.some(x => x.id === this.id) ||
      player.equippedWeapons.some(x => x.id === this.id)
    ) {
      msg.channel.send("You already own this item");
      return;
    }

    player.coins -= this.price;
    player.inventory.push(this);

    player.save();
    msg.channel.send(`Successfully bought **${this.name}**`);
  }
}

const data = [
  {
    id: "sparkle_sword",
    name: "Sparkle Sword",
    attack: 20,
    price: 1000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080718117867530/1.png",
  },
  {
    id: "ice_sword",
    name: "Ice Sword",
    attack: 30,
    price: 2000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080715282530324/2.png",
  },
  {
    id: "void_sword",
    name: "Void Sword",
    attack: 40,
    price: 3000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080715509030942/3.png",
  },
  {
    id: "sun_sword",
    name: "Sun Sword",
    attack: 50,
    price: 4000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080715735511070/4.png",
  },
  {
    id: "moon_sword",
    name: "Moon Sword",
    attack: 60,
    price: 5000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080716058476604/5.png",
  },
  {
    id: "galactic_sword",
    name: "Galactic Sword",
    attack: 70,
    price: 6000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080716318531604/6.png",
  },
  {
    id: "dark_sword",
    name: "Dark Sword",
    attack: 80,
    price: 7000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080716792492062/7.png",
  },
  {
    id: "majestic_sword",
    name: "Majestic Sword",
    attack: 90,
    price: 8000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080717220286514/8.png",
  },
  {
    id: "blue_sword",
    name: "Blue Sword",
    attack: 100,
    price: 9000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080717853646848/9.png",
  },
  {
    id: "extended_sword",
    name: "Extended Sword",
    attack: 110,
    price: 10000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080717572620338/10.png",
  },
  {
    id: "mystery_sword",
    name: "Mystery Sword",
    attack: 120,
    price: 11000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080794894622750/11.png",
  },
  {
    id: "red_dragon_sword",
    name: "Red Dragon Sword",
    attack: 130,
    price: 12000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080795100139551/12.png",
  },
  {
    id: "black_dragon_sword",
    name: "Black Dragon Sword",
    attack: 140,
    price: 13000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080795414724638/13.png",
  },
  {
    id: "metal_sword",
    name: "Metal Sword",
    attack: 150,
    price: 14000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080795699933285/14.png",
  },
  {
    id: "golden_snake_sword",
    name: "Golden Snake Sword",
    attack: 160,
    price: 15000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080796169691196/15.png",
  },
  {
    id: "mischief_sword",
    name: "Mischief Sword",
    attack: 170,
    price: 16000,
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/936080795938996284/16.png",
  },
]

