import { Fighter } from "@jiman24/discordjs-rpg";
import { createSeed, currency } from "../utils";
import { Skill } from "../structure/Skill";
import { Pet } from "./Pet";
import { MersenneTwister19937 as Engine, Random } from "random-js";

export class Boss extends Fighter {
  drop: number;
  xpDrop: number;
  level: number;

  static get all(): Boss[] {
    return data.map(x => new Boss(x));
  }

  constructor(monsterData: { name: string, imageUrl: string }) {
    super(monsterData.name);
    this.imageUrl = monsterData.imageUrl;
    this.level = data.findIndex(x => x.name === monsterData.name) + 1;

    const random = new Random(
      Engine.seedWithArray(createSeed(monsterData.name))
    );

    this.drop = random.integer(300 * this.level, 1000 * this.level);
    this.xpDrop = random.integer(100 * this.level, 150 * this.level);

    const offset = this.level;
    this.hp += offset * 2000;
    this.attack += offset * 10;
    this.critDamage += offset * 0.10;
    this.armor = (random.integer(10, 10 + this.level)) / 100;
    this.critChance = (random.integer(20, 20 + this.level)) / 100;

    const skill = random.pick(Skill.all);
    skill.setOwner(this);

    const pet = random.pick(Pet.all);
    pet.setOwner(this);
  }

  show() {
    const embed = super.show();

    embed.addField(`${currency} Drop`, `${this.drop}`, true);
    embed.addField(`XP Drop`, `${this.xpDrop}`, true);

    return embed;
  }
}


const data = [
  {
    name: "Octorock",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942493255843900/Octorock.png",
  },
  {
    name: "Octoslime",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942493469757460/Octoslime.png",
  },
  {
    name: "Octowater",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942493864030258/Octowater.png",
  },
  {
    name: "Octofire",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942494170189844/Octofire.png",
  },
  {
    name: "SkeloKnight",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941591400783902/SkeloKnight.png",
  },
  {
    name: "Paladin",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941590377385984/Paladin.png",
  },
  {
    name: "Red Paladin",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941590645833728/Red_Paladin.png",
  },
  {
    name: "Molten Bird King",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941413734273054/Molten_Bird_King.png",
  },
  {
    name: "Demon King",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940875596689408/Demon_King.png",
  },
  {
    name: "Dagger Soldier",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942077663240252/Dagger_Soldier.png",
  },
];
