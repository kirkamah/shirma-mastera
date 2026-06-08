const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  "Куаггот": {
    name: "Quaggoth",
    flavor: "A shaggy, claw-handed humanoid of the Underdark with pale fur; a savage cave hunter that often serves the drow.",
    senses: "darkvision 120 ft., passive Perception 11",
    langs: "Undercommon",
    immune: "poison",
    condImmune: "poisoned",
    traits: [
      ["Wounded Fury", "While it has 10 hit points or fewer, the quaggoth has advantage on attack rolls. In addition, it deals an extra 10 (3d6) damage to any target it hits with a melee attack."]
    ],
    actions: [
      ["Multiattack", "The quaggoth makes two claw attacks."],
      ["Claw", "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."]
    ]
  },
  "Мерроу": {
    name: "Merrow",
    flavor: "A monstrous scion of merfolk twisted by demonic corruption; a cruel sea predator that drags sailors into the depths with its harpoon.",
    senses: "darkvision 60 ft., passive Perception 10",
    langs: "Abyssal, Aquan",
    traits: [
      ["Amphibious", "The merrow can breathe air and water."]
    ],
    actions: [
      ["Multiattack", "The merrow makes two attacks: one with its bite and one with its claws or harpoon."],
      ["Bite", "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage."],
      ["Claws", "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) slashing damage."],
      ["Harpoon", "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) piercing damage. If the target is a Huge or smaller creature, it must succeed on a Strength contest against the merrow or be pulled up to 20 feet toward the merrow."]
    ]
  },
  "Локата": {
    name: "Locathah",
    flavor: "A proud fish-like humanoid with scales and fins; a hardy nomad of the seas that has endured centuries of slavery and persecution.",
    senses: "passive Perception 13",
    langs: "Aquan",
    traits: [
      ["Leviathan Will", "The locathah has advantage on saving throws against being charmed, frightened, paralyzed, poisoned, stunned, or put to sleep."],
      ["Limited Amphibiousness", "The locathah can breathe air and water, but it needs to be submerged at least once a day for 1 minute to avoid suffocating."]
    ],
    actions: [
      ["Multiattack", "The locathah makes two attacks."],
      ["Spear", "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands to make a melee attack."]
    ]
  },
  "Три-крин": {
    name: "Thri-kreen",
    flavor: "A mantis-like nomadic humanoid with a chitinous carapace and four arms; a tireless desert hunter that needs no sleep.",
    senses: "darkvision 60 ft., passive Perception 13",
    langs: "Thri-kreen",
    traits: [
      ["Chameleon Carapace", "The thri-kreen can change the color of its carapace to match the color and texture of its surroundings. As a result, it has advantage on Dexterity (Stealth) checks made to hide."],
      ["Standing Leap", "The thri-kreen's long jump is up to 30 feet and its high jump is up to 15 feet, with or without a running start."]
    ],
    actions: [
      ["Multiattack", "The thri-kreen makes two bite attacks or two gythka attacks."],
      ["Bite", "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6 + 1) piercing damage, and the target must succeed on a DC 11 Constitution saving throw or be poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."],
      ["Gythka", "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) slashing damage."],
      ["Chatkcha", "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) slashing damage."]
    ]
  },
  "Гитъянки-воин": {
    name: "Githyanki Warrior",
    flavor: "A tall, gaunt humanoid with yellow skin and a silver greatsword; a ruthless raider of the Astral Plane and hunter of mind flayers.",
    senses: "passive Perception 11",
    langs: "Gith",
    traits: [
      ["Innate Spellcasting (Psionics)", "The githyanki's innate spellcasting ability is Intelligence (spell save DC 11, +3 to hit with spell attacks). It can innately cast the following spells, requiring no components: At will: mage hand (the hand is invisible). 3/day each: jump, misty step, nondetection (self only)."]
    ],
    actions: [
      ["Multiattack", "The githyanki makes two greatsword attacks."],
      ["Greatsword", "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage plus 7 (2d6) psychic damage."]
    ]
  },
  "Гитцерай-монах": {
    name: "Githzerai Monk",
    flavor: "An ascetic humanoid with yellow-green skin from the monasteries of Limbo; a disciplined psionicist who strikes with bare hands and the power of the mind.",
    senses: "passive Perception 14",
    langs: "Gith",
    traits: [
      ["Innate Spellcasting (Psionics)", "The githzerai's innate spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). It can innately cast the following spells, requiring no components: At will: mage hand (the hand is invisible). 3/day each: feather fall, jump, see invisibility, shield."],
      ["Psychic Defense", "While the githzerai is wearing no armor and wielding no shield, its AC includes its Wisdom modifier."]
    ],
    actions: [
      ["Multiattack", "The githzerai makes two unarmed strikes."],
      ["Unarmed Strike", "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage plus 9 (2d8) psychic damage. This is a magic weapon attack."]
    ]
  },
  "Редкап": {
    name: "Redcap",
    flavor: "A murderous little fey born of spilled blood; it wears a cap soaked in the blood of its victims and heavy iron boots.",
    senses: "darkvision 60 ft., passive Perception 13",
    langs: "Common, Sylvan",
    traits: [
      ["Iron Boots", "While moving, the redcap has disadvantage on Dexterity (Stealth) checks."],
      ["Outsize Strength", "While grappling, the redcap is considered to be Medium. Also, wielding a heavy weapon doesn't impose disadvantage on its attack rolls."]
    ],
    actions: [
      ["Multiattack", "The redcap makes three attacks with its wicked sickle."],
      ["Wicked Sickle", "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) slashing damage."],
      ["Ironbound Pursuit", "The redcap moves up to its speed to a creature it can see and kicks with its iron boots. The target must succeed on a DC 14 Dexterity saving throw or take 20 (3d10 + 4) bludgeoning damage and be knocked prone."]
    ]
  },
  "Корред": {
    name: "Korred",
    flavor: "A shaggy subterranean fey of incredible strength with stony skin and living hair; a jealous guardian of gems and hidden caverns.",
    senses: "darkvision 120 ft., tremorsense 120 ft., passive Perception 15",
    langs: "Dwarvish, Gnomish, Sylvan, Terran, Undercommon",
    resist: "bludgeoning, piercing, and slashing from nonmagical attacks",
    traits: [
      ["Command Hair", "The korred has at least one 50-foot-long rope woven out of its hair. As a bonus action while within 30 feet of such a rope, the korred can command it to move up to 20 feet and to grapple a Large or smaller creature it can see within 5 feet of the rope (escape DC 13) or to release a creature it has grappled."],
      ["Innate Spellcasting", "The korred's innate spellcasting ability is Wisdom (spell save DC 13). It can innately cast the following spells, requiring no material components: At will: commune with nature (as an action), meld into stone (as a bonus action), stone shape (as a bonus action)."]
    ],
    actions: [
      ["Multiattack", "The korred makes two attacks with its greataxe or hurls two rocks."],
      ["Greataxe", "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 12 (1d12 + 6) slashing damage."],
      ["Rock", "Ranged Weapon Attack: +9 to hit, range 60/120 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage."]
    ]
  },
  "Квиклинг": {
    name: "Quickling",
    flavor: "A tiny malicious fey that moves so fast the eye sees only a blur; it delights in cruel pranks.",
    senses: "darkvision 60 ft., passive Perception 15",
    langs: "Common, Sylvan",
    traits: [
      ["Blurred Movement", "Attack rolls against the quickling have disadvantage unless the quickling is incapacitated or restrained."],
      ["Evasion", "If the quickling is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it fails."]
    ],
    actions: [
      ["Multiattack", "The quickling makes three dagger attacks."],
      ["Dagger", "Melee or Ranged Weapon Attack: +8 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 8 (1d4 + 6) piercing damage."]
    ]
  }
}
export default PART
