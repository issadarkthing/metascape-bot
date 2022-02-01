import { Fighter } from "@jiman24/discordjs-rpg";
import { code, currency, random } from "../utils";
import { Player } from "./Player";
import { Skill } from "./Skill";
import { Pet } from "./Pet";

export class Monster extends Fighter {
  drop = random.integer(150, 500);
  xpDrop = random.integer(10, 35);
  level = 1;
  difficulty: number;
  
  constructor(player: Player) {
    super("");

    const monsterData = random.pick(data);
    const monsterIndex = data.findIndex(x => x.name === monsterData.name);
    this.level = monsterIndex + 1;

    this.name = monsterData.name;
    this.imageUrl = monsterData.imageUrl;
    this.difficulty = player.level;
    
    const offset = this.level - 1;
    this.hp += offset * 10;
    this.attack += offset * 2;
    this.critDamage += offset * 0.01;
    this.armor = player.armor + (this.randomAttrib() / 100);
    this.critChance = player.critChance + (this.randomAttrib() / 100);

    if (player.skill) {
      const skill = random.pick(Skill.all);
      skill.setOwner(this);
    }

    if (player.pet) {
      const pet = random.pick(Pet.all);
      pet.setOwner(this);
    }
  }

  private randomAttrib() {
    return random.integer(-3, this.difficulty);
  }

  show() {
    const profile = super.show();

    profile.addField(`${currency} Drop`, code(this.drop), true);
    profile.addField("xp Drop", code(this.xpDrop), true);

    return profile;
  }
}

const data = [
  {
    name: "Crab",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940875395338250/Crab.png",
  },
  {
    name: "Rat",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940722441650176/Rat.png",
  },
  {
    name: "Villager",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941591799263302/Villager.png",
  },
  {
    name: "Dancer",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942295326650438/Dancer.png",
  },
  {
    name: "Hawk",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941186331697172/Hawk.png",
  },
  {
    name: "Golden Hawk",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941186851799120/Golden_Hawk.png",
  },
  {
    name: "Fire Spider",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940721875443772/Fire_Spider.png",
  },
  {
    name: "Poisonous Spider",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940722148081765/Poisonous_Spider.png",
  },
  {
    name: "Evil Bee",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940721309196318/Evil_Bee.png",
  },
  {
    name: "Evil Scientist",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941589903413258/Evil_Scientist.png",
  },
  {
    name: "Gator",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940874455842866/Gator.png",
  },
  {
    name: "Boar",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941414665416734/Boar.png",
  },
  {
    name: "Scared Ghostie",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941015581560902/Scared_Ghostie.png",
  },
  {
    name: "Snake",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940721565073430/Snake.png",
  },
  {
    name: "Monk",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941590146691112/Monk.png",
  },
  {
    name: "Ice Frog",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940874212569128/Ice_Frog.png",
  },
  {
    name: "Jungle Toad",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940874011230208/Jungle_Toad.png",
  },
  {
    name: "Octoducky",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940874690699264/Octoducky.png",
  },
  {
    name: "Cacto",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941414887710780/Cacto.png",
  },
  {
    name: "IceFire Blob",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941186138742804/IceFire_Blob.png",
  },
  {
    name: "Crazy Haired Villager",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942296161296434/Crazy_Haired_Villager.png",
  },
  {
    name: "Untrained Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942295599267912/Untrained_Warrior.png",
  },
  {
    name: "Untrained Wizard",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942295918039050/Untrained_wizard.png",
  },
  {
    name: "Young Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942296677208084/Young_Warrior.png",
  },
  {
    name: "Goblin",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941413096751154/Goblin.png",
  },
  {
    name: "Wolf",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941592034123846/Wolf.png",
  },
  {
    name: "Angry Tree",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941414422118430/Angry_Tree.png",
  },
  {
    name: "Rock Hawk",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941591212036116/Rock_Hawk.png",
  },
  {
    name: "Undead Tiki",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941015275384862/Undead_Tiki.png",
  },
  {
    name: "Baby Spiked Dino",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940873793118218/Baby_Spiked_Dino.png",
  },
  {
    name: "Fire Tikki",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941185912254474/Fire_Tiki.png",
  },
  {
    name: "Hooded Goblin",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942078271389736/Hooded_goblin.png",
  },
  {
    name: "OctoMonk Black",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940719761510420/OctoMonk_Black.png",
  },
  {
    name: "OctoMonk Blue",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940720722006056/OctoMonk_Blue.png",
  },
  {
    name: "OctoMonk Green",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940720118018059/OctoMonk_Green.png",
  },
  {
    name: "OctoMonk Red",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940720419999794/OctoMonk_Red.png",
  },
  {
    name: "Speared Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942079898808320/Speared_Warrior.png",
  },
  {
    name: "Miner",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942294655553557/Miner.png",
  },
  {
    name: "Mr. Hammer",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941760020185098/Mr._Hammer.png",
  },
  {
    name: "Red Dino",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941414149505084/Red_Dino.png",
  },
  {
    name: "Green Dino",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941413918826536/Green_Dino.png",
  },
  {
    name: "Goblin Knight",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942077927464991/Goblin_Knight.png",
  },
  {
    name: "Elk Monster",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941415122575410/Elk_Monster.png",
  },
  {
    name: "Bat Demon",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940721015599135/Bat_Demon.png",
  },
  {
    name: "Archer",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942294424879154/Archer.png",
  },
  {
    name: "Emerald Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942296450723880/Emerald_Warrior.png",
  },
  {
    name: "Elder Fighter",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942078518870016/Elder_fighter.png",
  },
  {
    name: "Goblin Soldier",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941758527012864/Goblin_Soldier.png",
  },
  {
    name: "Goblin Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941759600779264/Goblin_Warrior.png",
  },
  {
    name: "Shielded Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942078825046016/Shielded_Warrior.png",
  },
  {
    name: "Axe Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942079315791922/Axe_Warrior.png",
  },
  {
    name: "The King",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942077466087484/The_King.png",
  },
  {
    name: "The Queen",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941760225734696/The_Queen.png",
  },
  {
    name: "Horned Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942295104348230/Horned_Warrior.png",
  },
  {
    name: "Horned Horse Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941016051347466/Horned_Horse_Warrior.png",
  },
  {
    name: "Horse King Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941016768552980/Horse_King_Warrior.png",
  },
  {
    name: "Horse Knight",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941016315572244/Horse_Knight.png",
  },
  {
    name: "Masked Horse Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941015799693342/Masked_Horse_Warrior.png",
  },
  {
    name: "Dark Horse Warrior (f)",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941016584019988/Dark_Horse_Warrior_f.png",
  },
  {
    name: "Dark Horse Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941185668997190/Dark_Horse_Warrior.png",
  },
  {
    name: "White Horse Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937967979382067210/White_Horse_Warrior.png",
  },
  {
    name: "Wizard Horse Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941017066356736/Wizard_Horse_Warrior.png",
  },
  {
    name: "Tree Brute",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941591602122753/Tree_Brute.png",
  },
  {
    name: "Wolf King",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941757788835870/Wolf_King.png",
  },
  {
    name: "Bat Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940876481658901/Bat_Warrior.png",
  },
  {
    name: "Duel Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942079634563102/Duel_Warriors.png",
  },
  {
    name: "Trained Goblin Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941759365885992/Trained_Goblin_Warrior.png",
  },
  {
    name: "Trained Goblin Knight",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941758275362866/Trained_Goblin_Knight.png",
  },
  {
    name: "Trained Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942294848479292/Trained_Warrior.png",
  },
  {
    name: "Trained Wizard",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937942079059951716/Trained_Wizard.png",
  },
  {
    name: "Wizard Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941759806283776/Wizard_Warrior.png",
  },
  {
    name: "OctoMagician Black",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941187099230298/OctoMagician_Black.png",
  },
  {
    name: "OctoMagician Green",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941187350896640/OctoMagician_Green.png",
  },
  {
    name: "OctoMagician Purple",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941187766157342/OctoMagician_Purple.png",
  },
  {
    name: "OctoMagician Red",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941187556429844/OctoMagician_Red.png",
  },
  {
    name: "Rock Brute",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941591014924318/Rock_Brute.png",
  },
  {
    name: "Goblin Brute",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941759009378314/Goblin_Brute.png",
  },
  {
    name: "Goblin Brute 2",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941758032109668/Goblin_Brute_2.png",
  },
  {
    name: "Bullish Brute",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941413516156958/Bullish_Brute.png",
  },
  {
    name: "Wolf Knight",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940876242595870/Wolf_Knight.png",
  },
  {
    name: "Mega Tiki Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941014952419328/Mega_Tiki_Warrior.png",
  },
  {
    name: "Mega Undead Tiki Warrior",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941014742720512/Mega_Undead_Tiki_Warrior.png",
  },
  {
    name: "Orc Demon",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937940875894489158/Orc_Demon.png",
  },
  {
    name: "Green Dino Knight",
    imageUrl: "https://cdn.discordapp.com/attachments/933174369637777448/937941186658848818/Green_Dino_Knight.png",
  },
]
