const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  "Мамонт": {
    name: "Mammoth",
    flavor: "A shaggy giant of the frozen plains with immense curving tusks, trampling foes without breaking stride.",
    senses: "passive Perception 10",
    langs: "—",
    traits: [
      ["Trampling Charge", "If the mammoth moves at least 20 ft. straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 18 Strength saving throw or be knocked prone. If the target is prone, the mammoth can make one stomp attack against it as a bonus action."]
    ],
    actions: [
      ["Gore", "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 25 (4d8 + 7) piercing damage."],
      ["Stomp", "Melee Weapon Attack: +10 to hit, reach 5 ft., one prone creature. Hit: 29 (4d10 + 7) bludgeoning damage."]
    ]
  },
  "Плезиозавр": {
    name: "Plesiosaurus",
    flavor: "A marine reptile with a long serpentine neck and powerful flippers; a swift predator of lakes and coastal waters.",
    senses: "passive Perception 13",
    langs: "—",
    traits: [
      ["Hold Breath", "The plesiosaurus can hold its breath for 1 hour."]
    ],
    actions: [
      ["Bite", "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 14 (3d6 + 4) piercing damage."]
    ]
  },
  "Велоцираптор": {
    name: "Velociraptor",
    flavor: "A small feathered predatory dinosaur with sickle-shaped claws that hunts in swift packs.",
    senses: "passive Perception 13",
    langs: "—",
    traits: [
      ["Pack Tactics", "The velociraptor has advantage on an attack roll against a creature if at least one of the velociraptor's allies is within 5 feet of the creature and the ally isn't incapacitated."]
    ],
    actions: [
      ["Multiattack", "The velociraptor makes one attack with its bite and one with its claws."],
      ["Bite", "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage."],
      ["Claws", "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage."]
    ]
  },
  "Стегозавр": {
    name: "Stegosaurus",
    flavor: "A huge herbivorous dinosaur with rows of bony back plates and a spiked tail that crushes would-be predators.",
    senses: "passive Perception 10",
    langs: "—",
    actions: [
      ["Tail", "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 26 (6d6 + 5) bludgeoning damage."]
    ]
  },
  "Гигантский крокодил": {
    name: "Giant Crocodile",
    flavor: "A colossal armored reptile that lies motionless in ambush at the water's edge.",
    senses: "passive Perception 10",
    langs: "—",
    traits: [
      ["Hold Breath", "The crocodile can hold its breath for 30 minutes."]
    ],
    actions: [
      ["Multiattack", "The crocodile makes two attacks: one with its bite and one with its tail."],
      ["Bite", "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 21 (3d10 + 5) piercing damage, and the target is grappled (escape DC 16). Until this grapple ends, the target is restrained, and the crocodile can't bite another target."],
      ["Tail", "Melee Weapon Attack: +8 to hit, reach 10 ft., one target not grappled by the crocodile. Hit: 14 (2d8 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 16 Strength saving throw or be knocked prone."]
    ]
  },
  "Гигантский осьминог": {
    name: "Giant Octopus",
    flavor: "A huge cephalopod predator that changes color to match the seabed and seizes prey with long tentacles.",
    senses: "darkvision 60 ft., passive Perception 14",
    langs: "—",
    traits: [
      ["Hold Breath", "While out of water, the octopus can hold its breath for 1 hour."],
      ["Underwater Camouflage", "The octopus has advantage on Dexterity (Stealth) checks made while underwater."],
      ["Water Breathing", "The octopus can breathe only underwater."]
    ],
    actions: [
      ["Tentacles", "Melee Weapon Attack: +5 to hit, reach 15 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage. If the target is a creature, it is grappled (escape DC 16). Until this grapple ends, the target is restrained, and the octopus can't use its tentacles on another target."],
      ["Ink Cloud (Recharges after a Short or Long Rest)", "A 20-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action."]
    ]
  },
  "Гигантская акула": {
    name: "Giant Shark",
    flavor: "A thirty-foot predator of the deep that smells blood from miles away and flies into a frenzy at the sight of wounded prey.",
    senses: "blindsight 60 ft., passive Perception 13",
    langs: "—",
    traits: [
      ["Blood Frenzy", "The shark has advantage on melee attack rolls against any creature that doesn't have all its hit points."],
      ["Water Breathing", "The shark can breathe only underwater."]
    ],
    actions: [
      ["Bite", "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 22 (3d10 + 6) piercing damage."]
    ]
  },
  "Рифовая акула": {
    name: "Reef Shark",
    flavor: "A smallish shark of warm coastal waters that hunts in coordinated packs among the reefs.",
    senses: "blindsight 30 ft., passive Perception 12",
    langs: "—",
    traits: [
      ["Pack Tactics", "The shark has advantage on an attack roll against a creature if at least one of the shark's allies is within 5 feet of the creature and the ally isn't incapacitated."],
      ["Water Breathing", "The shark can breathe only underwater."]
    ],
    actions: [
      ["Bite", "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage."]
    ]
  },
  "Охотничья акула": {
    name: "Hunter Shark",
    flavor: "A big solitary predator of deep waters that strikes unerringly at wounded prey.",
    senses: "darkvision 30 ft., passive Perception 12",
    langs: "—",
    traits: [
      ["Blood Frenzy", "The shark has advantage on melee attack rolls against any creature that doesn't have all its hit points."],
      ["Water Breathing", "The shark can breathe only underwater."]
    ],
    actions: [
      ["Bite", "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage."]
    ]
  }
}
export default PART
