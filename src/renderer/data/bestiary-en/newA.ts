const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  "Роупер": {
    name: "Roper",
    flavor: "A predator lurking in cavern darkness, indistinguishable from a stalagmite until it lashes out with grasping tendrils.",
    senses: "darkvision 60 ft., passive Perception 16",
    langs: "—",
    traits: [
      ["False Appearance", "While the roper remains motionless, it is indistinguishable from a normal cave formation, such as a stalagmite."],
      ["Grasping Tendrils", "The roper can have up to six tendrils at a time. Each tendril can be attacked (AC 20; 10 hit points; immunity to poison and psychic damage). Destroying a tendril deals no damage to the roper, which can extrude a replacement tendril on its turn (no action required). A tendril can also be broken if a creature takes an action and succeeds on a DC 15 Strength check against it."],
      ["Spider Climb", "The roper can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."]
    ],
    actions: [
      ["Multiattack", "The roper makes four attacks with its tendrils, uses Reel, and makes one attack with its bite."],
      ["Bite", "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) piercing damage."],
      ["Tendril", "Melee Weapon Attack: +7 to hit, reach 50 ft., one creature. Hit: The target is grappled (escape DC 15). Until the grapple ends, the target is restrained and has disadvantage on Strength checks and Strength saving throws, and the roper can't use the same tendril on another target."],
      ["Reel", "The roper pulls each creature grappled by it up to 25 ft. straight toward it."]
    ],
    reactions: []
  },
  "Отюх": {
    name: "Otyugh",
    flavor: "A reeking devourer of refuse that lurks in heaps of rotting filth and seizes prey with whipping tentacles.",
    senses: "darkvision 120 ft., passive Perception 11",
    langs: "Otyugh",
    traits: [
      ["Limited Telepathy", "The otyugh can magically transmit simple messages and images to any creature within 120 ft. of it that can understand a language. This form of telepathy doesn't allow the receiving creature to telepathically respond."]
    ],
    actions: [
      ["Multiattack", "The otyugh makes three attacks: one with its bite and two with its tentacles."],
      ["Bite", "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) piercing damage. If the target is a creature, it must succeed on a DC 15 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the target must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. The disease is cured on a success. The target dies if the disease reduces its hit point maximum to 0. This reduction to the target's hit point maximum lasts until the disease is cured."],
      ["Tentacle", "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage plus 4 (1d8) piercing damage. If the target is Medium or smaller, it is grappled (escape DC 13) and restrained until the grapple ends. The otyugh has two tentacles, each of which can grapple one target."],
      ["Tentacle Slam", "The otyugh slams creatures grappled by it into each other or a solid surface. Each creature must succeed on a DC 14 Constitution saving throw or take 10 (2d6 + 3) bludgeoning damage and be stunned until the end of the otyugh's next turn. On a successful save, the target takes half the bludgeoning damage and isn't stunned."]
    ]
  },
  "Крюкастый ужас": {
    name: "Hook Horror",
    flavor: "A chitin-plated Underdark predator with massive bony hooks for forelimbs that navigates the dark by echo.",
    senses: "darkvision 60 ft., blindsight 60 ft. (blind beyond this radius), passive Perception 15",
    langs: "—",
    traits: [
      ["Echolocation", "The hook horror can't use its blindsight while deafened."],
      ["Keen Hearing", "The hook horror has advantage on Wisdom (Perception) checks that rely on hearing."]
    ],
    actions: [
      ["Multiattack", "The hook horror makes two hook attacks."],
      ["Hook", "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) piercing damage."]
    ]
  },
  "Трупный червь": {
    name: "Carrion Crawler",
    flavor: "A giant scavenging worm that crawls along cave walls and ceilings, its tentacles dripping with paralytic venom.",
    senses: "darkvision 60 ft., passive Perception 11",
    langs: "—",
    traits: [
      ["Keen Smell", "The carrion crawler has advantage on Wisdom (Perception) checks that rely on smell."],
      ["Spider Climb", "The carrion crawler can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check."]
    ],
    actions: [
      ["Multiattack", "The carrion crawler makes two attacks: one with its tentacles and one with its bite."],
      ["Tentacles", "Melee Weapon Attack: +4 to hit, reach 10 ft., one creature. Hit: 4 (1d4 + 2) poison damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 1 minute. Until this poison ends, the target is paralyzed. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."],
      ["Bite", "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage."]
    ]
  },
  "Грелл": {
    name: "Grell",
    flavor: "A floating brain with a beak and a cluster of venomous tentacles that drifts silently through the dark, needing no sight.",
    senses: "blindsight 60 ft. (blind beyond this radius), passive Perception 10",
    langs: "Grell",
    condImmune: "blinded",
    traits: [
      ["Keen Hearing and Smell", "The grell has advantage on Wisdom (Perception) checks that rely on hearing or smell."],
      ["Levitate", "The grell can rise or descend vertically up to its flying speed and can hover. This works just like the levitate spell, except the grell can move horizontally as well as vertically and isn't restricted to moving up or down."]
    ],
    actions: [
      ["Multiattack", "The grell makes two attacks: one with its tentacles and one with its beak."],
      ["Tentacles", "Melee Weapon Attack: +4 to hit, reach 10 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target must succeed on a DC 11 Constitution saving throw or be poisoned for 1 minute. Until this poison ends, the target is paralyzed. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. The target is also grappled (escape DC 15). Until this grapple ends, the target is restrained, and the grell can't use its tentacles on another target."],
      ["Beak", "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage."]
    ]
  },
  "Тёмный плащ": {
    name: "Darkmantle",
    flavor: "A stalactite-like creature that drops onto prey from above, smothering its head in darkness.",
    senses: "blindsight 60 ft., passive Perception 10",
    langs: "—",
    traits: [
      ["Echolocation", "The darkmantle can't use its blindsight while deafened."],
      ["False Appearance", "While the darkmantle remains motionless, it is indistinguishable from a cave formation such as a stalactite or stalagmite."]
    ],
    actions: [
      ["Crush", "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d6 + 3) bludgeoning damage, and the darkmantle attaches to the target. If the target is Medium or smaller and the darkmantle has advantage on the attack roll, it attaches by engulfing the target's head, and the target is also blinded and unable to breathe while the darkmantle is attached in this way. While attached to the target, the darkmantle can attack no other creature except the target but has advantage on its attack rolls. The darkmantle's speed also becomes 0, it can't benefit from any bonus to its speed, and it moves with the target. A creature can detach the darkmantle by making a successful DC 13 Strength check as an action. On its turn, the darkmantle can detach itself from the target by using 5 feet of movement."],
      ["Darkness Aura (1/Day)", "A 15-foot radius of magical darkness extends out from the darkmantle, moves with it, and spreads around corners. The darkness lasts as long as the darkmantle maintains concentration, up to 10 minutes (as if concentrating on a spell). Darkvision can't penetrate this darkness, and no natural light can illuminate it. If any of the darkness overlaps with an area of light created by a spell of 2nd level or lower, the spell creating the light is dispelled."]
    ]
  },
  "Пронзатель": {
    name: "Piercer",
    flavor: "A ceiling-dwelling predator disguised as a stalactite that plummets like a stone onto prey passing below.",
    senses: "blindsight 30 ft. (blind beyond this radius), passive Perception 8",
    langs: "—",
    traits: [
      ["False Appearance", "While the piercer remains motionless, it is indistinguishable from a normal stalactite."]
    ],
    actions: [
      ["Pierce", "Melee Weapon Attack: +2 to hit, one target directly underneath the piercer. Hit: 10 (3d6) piercing damage. This attack has disadvantage against a creature that is protecting its head with a shield or similar object. If the attack misses, the piercer dies."]
    ]
  },
  "Булетта": {
    name: "Bulette",
    flavor: "An armored burrowing beast nicknamed the \"land shark\" that erupts from the earth directly beneath its prey.",
    senses: "darkvision 60 ft., tremorsense 60 ft., passive Perception 16",
    langs: "—",
    traits: [
      ["Standing Leap", "The bulette's long jump is up to 30 ft. and its high jump is up to 15 ft., with or without a running start."]
    ],
    actions: [
      ["Bite", "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 30 (4d12 + 4) piercing damage."],
      ["Deadly Leap", "If the bulette jumps at least 15 ft. as part of its movement, it can then use this action to land on its feet in a space that contains one or more other creatures. Each of those creatures must succeed on a DC 16 Strength or Dexterity saving throw (target's choice) or be knocked prone and take 14 (3d6 + 4) bludgeoning damage plus 14 (3d6 + 4) slashing damage. On a successful save, the creature takes only half the damage, isn't knocked prone, and is pushed 5 ft. out of the bulette's space into an unoccupied space of the creature's choice. If no unoccupied space is within range, the creature instead falls prone in the bulette's space."]
    ]
  },
  "Чуул": {
    name: "Chuul",
    flavor: "A shell-armored crustacean horror with massive pincers and a cluster of paralytic tentacles around its maw.",
    senses: "darkvision 60 ft., passive Perception 14",
    langs: "understands Deep Speech but can't speak",
    immune: "poison",
    condImmune: "poisoned",
    traits: [
      ["Amphibious", "The chuul can breathe air and water."],
      ["Sense Magic", "The chuul senses magic within 120 feet of it at will. This trait otherwise works like the detect magic spell but isn't itself magical."]
    ],
    actions: [
      ["Multiattack", "The chuul makes two pincer attacks. If the chuul is grappling a creature, the chuul can also use its tentacles once."],
      ["Pincer", "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage. The target is grappled (escape DC 14) if it is a Large or smaller creature and the chuul doesn't have two other creatures grappled."],
      ["Tentacles", "One creature grappled by the chuul must succeed on a DC 13 Constitution saving throw or be poisoned for 1 minute. Until this poison ends, the target is paralyzed. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."]
    ]
  }
}
export default PART
