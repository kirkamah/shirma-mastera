const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  "Магмовый мефит": {
    name: "Magma Mephit",
    flavor: "A small spiteful imp of fire and earth whose lumpy body oozes molten magma.",
    senses: "darkvision 60 ft., passive Perception 10",
    langs: "Ignan, Terran",
    immune: "fire, poison",
    condImmune: "poisoned",
    traits: [
      ["Death Burst", "When the mephit dies, it explodes in a burst of lava. Each creature within 5 feet of it must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one."],
      ["False Appearance", "While the mephit remains motionless, it is indistinguishable from an ordinary mound of magma."],
      ["Innate Spellcasting (1/Day)", "The mephit can innately cast heat metal (spell save DC 10), requiring no material components. Its innate spellcasting ability is Charisma."]
    ],
    actions: [
      ["Claws", "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4 + 1) slashing damage plus 2 (1d4) fire damage."],
      ["Fire Breath (Recharge 6)", "The mephit exhales a 15-foot cone of fire. Each creature in that area must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one."]
    ]
  },
  "Пылевой мефит": {
    name: "Dust Mephit",
    flavor: "A frail imp of air and earth that scatters clouds of blinding dust with every beat of its wings.",
    senses: "darkvision 60 ft., passive Perception 12",
    langs: "Auran, Terran",
    immune: "poison",
    condImmune: "poisoned",
    traits: [
      ["Death Burst", "When the mephit dies, it explodes in a burst of dust. Each creature within 5 feet of it must then succeed on a DC 10 Constitution saving throw or be blinded for 1 minute. A blinded creature can repeat the saving throw on each of its turns, ending the effect on itself on a success."],
      ["Innate Spellcasting (1/Day)", "The mephit can innately cast sleep, requiring no material components. Its innate spellcasting ability is Charisma."]
    ],
    actions: [
      ["Claws", "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) slashing damage."],
      ["Blinding Breath (Recharge 6)", "The mephit exhales a 15-foot cone of blinding dust. Each creature in that area must succeed on a DC 10 Dexterity saving throw or be blinded for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."]
    ]
  },
  "Цепной дьявол": {
    name: "Chain Devil",
    flavor: "A devil-tormentor of the Nine Hells wrapped in rattling chains; the chains around it animate and tear flesh at its will.",
    senses: "darkvision 120 ft., passive Perception 8",
    langs: "Infernal, telepathy 120 ft.",
    resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons",
    immune: "fire, poison",
    condImmune: "poisoned",
    traits: [
      ["Devil's Sight", "Magical darkness doesn't impede the devil's darkvision."],
      ["Magic Resistance", "The devil has advantage on saving throws against spells and other magical effects."]
    ],
    actions: [
      ["Multiattack", "The devil makes two attacks with its chains."],
      ["Chain", "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) slashing damage. The target is grappled (escape DC 14) if the devil isn't already grappling a creature. Until this grapple ends, the target is restrained and takes 7 (2d6) piercing damage at the start of each of its turns."],
      ["Animate Chains (Recharges after a Short or Long Rest)", "Up to four chains the devil can see within 60 feet of it magically sprout razor-edged barbs and animate under the devil's control, provided that the chains aren't being worn or carried. Each animated chain is an object with AC 20, 20 hit points, resistance to piercing damage, and immunity to psychic and thunder damage. When the devil uses Multiattack on its turn, it can use each animated chain to make one additional chain attack. An animated chain can grapple one creature of its own but can't make attacks while grappling. An animated chain reverts to its inanimate state if reduced to 0 hit points or if the devil is incapacitated or dies."]
    ],
    reactions: [
      ["Unnerving Mask", "When a creature the devil can see starts its turn within 30 feet of the devil, the devil can create the illusion that it looks like one of the creature's departed loved ones or bitter enemies. If the creature can see the devil, it must succeed on a DC 14 Wisdom saving throw or be frightened until the end of its turn."]
    ]
  },
  "Налфешни": {
    name: "Nalfeshnee",
    flavor: "A corpulent demon with the body of a giant boar-ape and stubby wings; a judge of souls in the Abyss whose nimbus shimmers with eerie light.",
    senses: "truesight 120 ft., passive Perception 11",
    langs: "Abyssal, telepathy 120 ft.",
    resist: "cold, fire, lightning; bludgeoning, piercing, and slashing from nonmagical attacks",
    immune: "poison",
    condImmune: "poisoned",
    traits: [
      ["Magic Resistance", "The nalfeshnee has advantage on saving throws against spells and other magical effects."]
    ],
    actions: [
      ["Multiattack", "The nalfeshnee uses Horror Nimbus if it can. It then makes three attacks: one with its bite and two with its claws."],
      ["Bite", "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 32 (5d10 + 5) piercing damage."],
      ["Claw", "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) slashing damage."],
      ["Horror Nimbus (Recharge 5-6)", "The nalfeshnee magically emits scintillating, multicolored light. Each creature within 15 feet of the nalfeshnee that can see the light must succeed on a DC 15 Wisdom saving throw or be frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the nalfeshnee's Horror Nimbus for the next 24 hours."],
      ["Teleport", "The nalfeshnee magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see."]
    ]
  },
  "Теневой демон": {
    name: "Shadow Demon",
    flavor: "A mass of living darkness with burning eyes — a bodiless demonic spirit that loathes light and rends the minds of its victims.",
    senses: "darkvision 120 ft., passive Perception 11",
    langs: "Abyssal, telepathy 120 ft.",
    resist: "acid, fire, necrotic, thunder; bludgeoning, piercing, and slashing from nonmagical attacks",
    immune: "cold, lightning, poison",
    condImmune: "exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained",
    traits: [
      ["Incorporeal Movement", "The demon can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."],
      ["Light Sensitivity", "While in bright light, the demon has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight."],
      ["Shadow Stealth", "While in dim light or darkness, the demon can take the Hide action as a bonus action."]
    ],
    actions: [
      ["Claws", "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 10 (2d6 + 3) psychic damage or, if the demon had advantage on the attack roll, 17 (4d6 + 3) psychic damage."]
    ]
  },
  "Барлгура": {
    name: "Barlgura",
    flavor: "A demon resembling a huge ferocious orangutan with a russet hide; a savage hunter of the Abyss that tears foes apart in reckless fury.",
    senses: "blindsight 30 ft., darkvision 120 ft., passive Perception 15",
    langs: "Abyssal, telepathy 120 ft.",
    resist: "cold, fire, lightning",
    immune: "poison",
    condImmune: "poisoned",
    traits: [
      ["Innate Spellcasting", "The barlgura's spellcasting ability is Wisdom (spell save DC 13). The barlgura can innately cast the following spells, requiring no material components: 1/day each: entangle, phantasmal force; 2/day each: disguise self, invisibility (self only)."],
      ["Reckless", "At the start of its turn, the barlgura can gain advantage on all melee weapon attack rolls it makes during that turn, but attack rolls against it have advantage until the start of its next turn."],
      ["Running Leap", "The barlgura's long jump is up to 40 feet when it has a running start of at least 10 feet."]
    ],
    actions: [
      ["Multiattack", "The barlgura makes three attacks: one with its bite and two with its fists."],
      ["Bite", "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage."],
      ["Fist", "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) bludgeoning damage."]
    ]
  },
  "Инкуб": {
    name: "Incubus",
    flavor: "A winged shapeshifting fiend in the guise of a beautiful youth; it seduces mortals in dreams and waking life, draining their very life with a kiss.",
    senses: "darkvision 60 ft., passive Perception 15",
    langs: "Abyssal, Common, Infernal, telepathy 60 ft.",
    resist: "cold, fire, lightning, poison; bludgeoning, piercing, and slashing from nonmagical attacks",
    traits: [
      ["Shapechanger", "The fiend can use its action to polymorph into a Small or Medium humanoid, or back into its true form. Without wings, the fiend loses its flying speed. Other than its size and speed, its statistics are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."],
      ["Telepathic Bond", "The fiend ignores the range restriction on its telepathy when communicating with a creature it has charmed. The two don't even need to be on the same plane of existence."]
    ],
    actions: [
      ["Claw (Fiend Form Only)", "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage."],
      ["Charm", "One humanoid the fiend can see within 30 feet of it must succeed on a DC 15 Wisdom saving throw or be magically charmed for 1 day. The charmed target obeys the fiend's verbal or telepathic commands. If the target suffers any harm or receives a suicidal command, it can repeat the saving throw, ending the effect on a success. If the target successfully saves against the effect, or if the effect on it ends, the target is immune to this fiend's Charm for the next 24 hours. The fiend can have only one target charmed at a time. If it charms another, the effect on the previous target ends."],
      ["Draining Kiss", "The fiend kisses a creature charmed by it or a willing creature. The target must make a DC 15 Constitution saving throw against this magic, taking 32 (5d10 + 5) psychic damage on a failed save, or half as much damage on a successful one. The target's hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0."],
      ["Etherealness", "The fiend magically enters the Ethereal Plane from the Material Plane, or vice versa."]
    ]
  },
  "Морская карга": {
    name: "Sea Hag",
    flavor: "A hideous crone of the sea with slimy rotting skin and dead fish-like eyes; her true form instills mortal dread.",
    senses: "darkvision 60 ft., passive Perception 11",
    langs: "Aquan, Common, Giant",
    traits: [
      ["Amphibious", "The hag can breathe air and water."],
      ["Horrific Appearance", "Any humanoid that starts its turn within 30 feet of the hag and can see the hag's true form must make a DC 11 Wisdom saving throw. On a failed save, the creature is frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, with disadvantage if the hag is within line of sight, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the hag's Horrific Appearance for the next 24 hours. Unless the target is surprised or the revelation of the hag's true form is sudden, the target can avert its eyes and avoid making the initial saving throw. Until the start of its next turn, a creature that averts its eyes has disadvantage on attack rolls against the hag."]
    ],
    actions: [
      ["Claws", "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage."],
      ["Death Glare", "The hag targets one frightened creature she can see within 30 feet of her. If the target can see the hag, it must succeed on a DC 11 Wisdom saving throw against this magic or drop to 0 hit points."],
      ["Illusory Appearance", "The hag covers herself and anything she is wearing or carrying with a magical illusion that makes her look like an ugly creature of her general size and humanoid shape. The effect ends if the hag takes a bonus action to end it or if she dies. The changes wrought by this effect fail to hold up to physical inspection. For example, the hag could appear to have no claws, but someone touching her hand might feel the claws. Otherwise, a creature has to take an action to visually inspect the illusion and succeed on a DC 16 Intelligence (Investigation) check to discern that the hag is disguised."]
    ]
  },
  "Аннис": {
    name: "Annis Hag",
    flavor: "A towering iron-clawed hag of mountains and dark forests with blue-black skin; she steals children and crushes the bones of her victims in a grip of steel.",
    senses: "darkvision 60 ft., passive Perception 15",
    langs: "Common, Giant, Sylvan",
    resist: "cold; bludgeoning, piercing, and slashing from nonmagical attacks",
    traits: [
      ["Innate Spellcasting", "The hag's innate spellcasting ability is Charisma (spell save DC 13). She can innately cast the following spells, requiring no material components: 3/day each: disguise self (including the form of a Medium humanoid), fog cloud."]
    ],
    actions: [
      ["Multiattack", "The annis makes three attacks: one with her bite and two with her claws."],
      ["Bite", "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) piercing damage."],
      ["Claw", "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 15 (4d4 + 5) slashing damage."],
      ["Crushing Hug", "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 36 (9d6 + 5) bludgeoning damage, and the target is grappled (escape DC 15) if it is a Large or smaller creature. Until the grapple ends, the target takes 36 (9d6 + 5) bludgeoning damage at the start of each of the hag's turns. The hag can't make attacks while grappling a creature in this way."]
    ]
  }
}
export default PART
