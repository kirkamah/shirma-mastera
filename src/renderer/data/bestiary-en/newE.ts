const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  "Юань-ти чистокровный": {
    name: "Yuan-ti Pureblood",
    flavor: "A human with serpentine features — a forked tongue, patches of scales, and an unblinking gaze; a spy and infiltrator of the serpent folk among humans.",
    senses: "darkvision 60 ft., passive Perception 13",
    langs: "Abyssal, Common, Draconic",
    immune: "poison",
    condImmune: "poisoned",
    traits: [
      ["Innate Spellcasting", "The yuan-ti's innate spellcasting ability is Charisma (spell save DC 12). The yuan-ti can innately cast the following spells, requiring no material components: At will: animal friendship (snakes only). 3/day each: poison spray, suggestion."],
      ["Magic Resistance", "The yuan-ti has advantage on saving throws against spells and other magical effects."]
    ],
    actions: [
      ["Multiattack", "The yuan-ti makes two melee attacks."],
      ["Scimitar", "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage."],
      ["Shortbow", "Ranged Weapon Attack: +3 to hit, range 80/320 ft., one target. Hit: 4 (1d6 + 1) piercing damage plus 7 (2d6) poison damage."]
    ]
  },
  "Юань-ти проклинатель": {
    name: "Yuan-ti Malison",
    flavor: "A yuan-ti with a human body and a snake's head — a cruel overseer and warrior of the serpent temples, able to assume the form of a snake.",
    senses: "darkvision 60 ft., passive Perception 11",
    langs: "Abyssal, Common, Draconic",
    immune: "poison",
    condImmune: "poisoned",
    traits: [
      ["Shapechanger", "The yuan-ti can use its action to polymorph into a Medium snake, or back into its true form. Its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. It doesn't change form if it dies."],
      ["Innate Spellcasting (Yuan-ti Form Only)", "The yuan-ti's innate spellcasting ability is Charisma (spell save DC 13). The yuan-ti can innately cast the following spells, requiring no material components: At will: animal friendship (snakes only). 3/day: suggestion."],
      ["Magic Resistance", "The yuan-ti has advantage on saving throws against spells and other magical effects."]
    ],
    actions: [
      ["Multiattack (Yuan-ti Form Only)", "The yuan-ti makes two ranged attacks or two melee attacks, but can use its bite only once."],
      ["Bite", "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 5 (1d4 + 3) piercing damage plus 7 (2d6) poison damage."],
      ["Scimitar (Yuan-ti Form Only)", "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."],
      ["Longbow (Yuan-ti Form Only)", "Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage plus 7 (2d6) poison damage."]
    ]
  },
  "Юань-ти аномалия": {
    name: "Yuan-ti Abomination",
    flavor: "A massive serpent with scaled arms — the highest caste of the yuan-ti, closest to the serpent gods and commanding their cults.",
    senses: "darkvision 60 ft., passive Perception 15",
    langs: "Abyssal, Common, Draconic",
    immune: "poison",
    condImmune: "poisoned",
    traits: [
      ["Shapechanger", "The yuan-ti can use its action to polymorph into a Large snake, or back into its true form. Its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. It doesn't change form if it dies."],
      ["Innate Spellcasting (Abomination Form Only)", "The yuan-ti's innate spellcasting ability is Charisma (spell save DC 15). The yuan-ti can innately cast the following spells, requiring no material components: At will: animal friendship (snakes only). 3/day: suggestion. 1/day: fear."],
      ["Magic Resistance", "The yuan-ti has advantage on saving throws against spells and other magical effects."]
    ],
    actions: [
      ["Multiattack (Abomination Form Only)", "The yuan-ti makes two ranged attacks or two melee attacks, but can use its bite and constrict attacks each only once."],
      ["Bite", "Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 7 (1d6 + 4) piercing damage plus 10 (3d6) poison damage."],
      ["Constrict", "Melee Weapon Attack: +7 to hit, reach 10 ft., one Large or smaller creature. Hit: 11 (2d6 + 4) bludgeoning damage, and the target is grappled (escape DC 14). Until this grapple ends, the target is restrained, and the yuan-ti can't constrict another target."],
      ["Scimitar (Abomination Form Only)", "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage."],
      ["Longbow (Abomination Form Only)", "Ranged Weapon Attack: +6 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 10 (3d6) poison damage."]
    ]
  },
  "Фоморой": {
    name: "Fomorian",
    flavor: "A hideously deformed giant of the Underdark, warped by an ancient curse of the fey; its evil eye brings pain and deformity.",
    senses: "darkvision 120 ft., passive Perception 18",
    langs: "Giant, Undercommon",
    actions: [
      ["Multiattack", "The fomorian attacks twice with its greatclub or makes one greatclub attack and uses Evil Eye once."],
      ["Greatclub", "Melee Weapon Attack: +9 to hit, reach 15 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage."],
      ["Evil Eye", "The fomorian magically forces a creature it can see within 60 feet of it to make a DC 14 Charisma saving throw. The creature takes 27 (6d8) psychic damage on a failed save, or half as much damage on a successful one."],
      ["Curse of the Evil Eye (Recharges after a Short or Long Rest)", "With a stare, the fomorian uses Evil Eye, but on a failed save, the creature is also cursed with magical deformity. While deformed, the creature has its speed halved and has disadvantage on ability checks, attack rolls, and saving throws based on Strength or Dexterity. The transformed creature can repeat the saving throw whenever it finishes a long rest, ending the effect on a success."]
    ]
  },
  "Полуогр": {
    name: "Half-Ogre",
    flavor: "The offspring of an ogre and a human, orc, or hobgoblin — a dim-witted brute a head taller than any human, living by plunder and raw strength.",
    senses: "darkvision 60 ft., passive Perception 9",
    langs: "Common, Giant",
    actions: [
      ["Battleaxe", "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) slashing damage, or 14 (2d10 + 3) slashing damage if used with two hands."],
      ["Javelin", "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 10 (2d6 + 3) piercing damage."]
    ]
  },
  "Эмпирей": {
    name: "Empyrean",
    flavor: "A child of the gods of the Upper Planes — a beautiful titan radiating divine majesty; an empyrean fallen to evil spreads misery and ruin around it.",
    senses: "truesight 120 ft., passive Perception 16",
    langs: "all",
    traits: [
      ["Innate Spellcasting", "The empyrean's innate spellcasting ability is Charisma (spell save DC 23, +15 to hit with spell attacks). It can innately cast the following spells, requiring no material components: At will: greater restoration, pass without trace, water breathing, water walk. 1/day each: commune, dispel evil and good, earthquake, fire storm, plane shift (self only)."],
      ["Legendary Resistance (3/Day)", "If the empyrean fails a saving throw, it can choose to succeed instead."],
      ["Magic Resistance", "The empyrean has advantage on saving throws against spells and other magical effects."]
    ],
    actions: [
      ["Maul", "Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 31 (6d6 + 10) bludgeoning damage. If the target is a creature, it must succeed on a DC 15 Strength saving throw or be pushed up to 10 feet away from the empyrean and knocked prone."],
      ["Bolt", "Ranged Spell Attack: +15 to hit, range 600 ft., one target. Hit: 24 (7d6) acid, cold, fire, lightning, radiant, or thunder damage (empyrean's choice)."]
    ],
    legendary: [
      ["Attack", "The empyrean makes one attack."],
      ["Bolster (Costs 2 Actions)", "The empyrean bolsters all nonhostile creatures within 120 feet of it until the end of its next turn. Bolstered creatures can't be charmed or frightened, and they gain advantage on ability checks and saving throws until the end of the empyrean's next turn."],
      ["Trembling Strike (Costs 2 Actions)", "The empyrean strikes the ground with its maul, triggering an earth tremor. All creatures on the ground within 60 feet of it must succeed on a DC 25 Strength saving throw or be knocked prone."]
    ]
  },
  "Дао": {
    name: "Dao",
    flavor: "A genie of the Elemental Plane of Earth — a greedy and cruel lord of stone and gemstones who keeps slaves in its underground palaces.",
    senses: "darkvision 120 ft., passive Perception 11",
    langs: "Terran",
    condImmune: "petrified",
    traits: [
      ["Earth Glide", "The dao can burrow through nonmagical, unworked earth and stone. While doing so, the dao doesn't disturb the material it moves through."],
      ["Elemental Demise", "If the dao dies, its body disintegrates into crystalline powder, leaving behind only equipment the dao was wearing or carrying."],
      ["Innate Spellcasting", "The dao's innate spellcasting ability is Charisma (spell save DC 14, +6 to hit with spell attacks). It can innately cast the following spells, requiring no material components: At will: detect evil and good, detect magic, stone shape. 3/day each: passwall, move earth, tongues. 1/day each: conjure elemental (earth elemental only), gaseous form, invisibility, phantasmal killer, plane shift, wall of stone."],
      ["Sure-Footed", "The dao has advantage on Strength and Dexterity saving throws made against effects that would knock it prone."]
    ],
    actions: [
      ["Multiattack", "The dao makes two fist attacks or two maul attacks."],
      ["Fist", "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage."],
      ["Maul", "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 20 (4d6 + 6) bludgeoning damage. If the target is a Huge or smaller creature, it must succeed on a DC 18 Strength check or be knocked prone."]
    ]
  },
  "Марид": {
    name: "Marid",
    flavor: "A genie of the Elemental Plane of Water — a haughty and grandiloquent lord of the seas, a lover of tall tales and master of coral palaces.",
    senses: "blindsight 30 ft., darkvision 120 ft., passive Perception 13",
    langs: "Aquan",
    resist: "acid, cold, lightning",
    traits: [
      ["Amphibious", "The marid can breathe air and water."],
      ["Elemental Demise", "If the marid dies, its body disintegrates into a burst of water and foam, leaving behind only equipment the marid was wearing or carrying."],
      ["Innate Spellcasting", "The marid's innate spellcasting ability is Charisma (spell save DC 16, +8 to hit with spell attacks). It can innately cast the following spells, requiring no material components: At will: create or destroy water, detect evil and good, detect magic, fog cloud, purify food and drink. 3/day each: tongues, water breathing, water walk. 1/day each: conjure elemental (water elemental only), control water, gaseous form, invisibility, plane shift."]
    ],
    actions: [
      ["Multiattack", "The marid makes two trident attacks."],
      ["Trident", "Melee or Ranged Weapon Attack: +10 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 13 (2d6 + 6) piercing damage, or 15 (2d8 + 6) piercing damage if used with two hands to make a melee attack."],
      ["Water Jet", "The marid magically shoots water in a 60-foot line that is 5 feet wide. Each creature in the line must make a DC 16 Dexterity saving throw. On a failure, a target takes 21 (6d6) bludgeoning damage and, if it is Huge or smaller, is pushed up to 20 feet away from the marid and knocked prone. On a success, a target takes half the bludgeoning damage, but is neither pushed nor knocked prone."]
    ]
  }
}
export default PART
