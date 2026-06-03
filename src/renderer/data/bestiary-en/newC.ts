const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  "Гнусь": {
    name: "Ghast",
    flavor: "Undead horror that roams in search of fresh flesh, infecting its victims with grave rot.",
    senses: "darkvision 60 ft., passive Perception 10",
    langs: "Common",
    resist: "necrotic",
    immune: "poison",
    condImmune: "charmed, exhaustion, poisoned",
    traits: [
      ["Stench", "Any creature that starts its turn within 5 ft. of the ghast must succeed on a DC 10 Constitution saving throw or be poisoned until the start of its next turn."],
      ["Turn Defiance", "The ghast and any ghouls within 30 ft. of it have advantage on saving throws against effects that turn undead."]
    ],
    actions: [
      ["Bite", "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 12 (2d8 + 3) piercing damage."],
      ["Claws", "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If the target is a creature other than an undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute."]
    ]
  },
  "Привидение": {
    name: "Wraith",
    flavor: "An incorporeal spirit of utter evil, born of crimes so monstrous that its mere presence withers life.",
    senses: "darkvision 60 ft., passive Perception 12",
    langs: "the languages it knew in life",
    resist: "acid, cold, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons",
    immune: "necrotic, poison",
    condImmune: "charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained",
    traits: [
      ["Incorporeal Movement", "The wraith can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."],
      ["Sunlight Sensitivity", "While in sunlight, the wraith has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight."]
    ],
    actions: [
      ["Life Drain", "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 21 (4d8 + 3) necrotic damage. The target must succeed on a DC 14 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken."],
      ["Create Specter", "The wraith targets a humanoid within 10 feet of it that has been dead for no longer than 1 minute and died violently. The target's spirit rises as a specter in the space of its corpse or in the nearest unoccupied space."]
    ]
  },
  "Мститель": {
    name: "Revenant",
    flavor: "A soul returned from death, consumed by a single purpose: vengeance upon the one who ended its life.",
    senses: "darkvision 60 ft., passive Perception 11",
    langs: "the languages it knew in life",
    resist: "necrotic, psychic",
    immune: "poison",
    condImmune: "charmed, exhaustion, frightened, paralyzed, poisoned, stunned",
    traits: [
      ["Fearsome Pursuit", "By spending 1 minute focusing on the target of its vengeance, the revenant learns the distance and direction to it if on the same plane; it ignores difficult terrain while pursuing."],
      ["Magic Resistance", "The revenant has advantage on saving throws against spells and other magical effects."],
      ["Rapid Recovery", "The revenant regains all missing hit points if 1 minute passes without it taking damage."],
      ["Relentless", "The revenant's body turns to dust when reduced to 0 hit points; 1 minute later its spirit inhabits a recently-dead humanoid corpse with 1 hit point."]
    ],
    actions: [
      ["Multiattack", "The revenant makes two strangle attacks; it can replace one of them with Burning Hatred if available."],
      ["Strangle", "+7 to hit, reach 5 ft. Hit: 11 (2d6 + 4) bludgeoning damage; the target is grappled (escape DC 15) if it is Large or smaller."],
      ["Burning Hatred (Recharge 4-6)", "DC 15 Wisdom saving throw against the focus of Fearsome Pursuit within 30 ft. On a failure: 14 (4d6) psychic damage and paralyzed until the end of its next turn. On a success: half damage and frightened until the end of its next turn."]
    ]
  },
  "Бодак": {
    name: "Bodak",
    flavor: "A disfigured victim of the Abyss whose single gaze brings instant and inescapable death.",
    senses: "darkvision 120 ft., passive Perception 14",
    langs: "Abyssal, the languages it knew in life",
    resist: "cold, fire, lightning; bludgeoning, piercing, and slashing from nonmagical attacks",
    immune: "necrotic",
    condImmune: "charmed, frightened, poisoned",
    traits: [
      ["Sunlight Sensitivity", "While in sunlight, the bodak has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight."],
      ["Aura of Annihilation", "Any creature that starts its turn within 30 ft. of the bodak and can see it must succeed on a DC 13 Wisdom saving throw, taking 5 (1d10) psychic damage on a failure. If it fails by 5 or more, the creature also can't take reactions until the start of its next turn."]
    ],
    actions: [
      ["Multiattack", "The bodak makes two fist attacks."],
      ["Fist", "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) bludgeoning damage plus 5 (2d4) necrotic damage."],
      ["Death Gaze", "The bodak targets one creature it can see within 30 ft. of it. If the target can see the bodak, it must succeed on a DC 13 Constitution saving throw against this magic or take 33 (6d10) psychic damage."]
    ]
  },
  "Аллип": {
    name: "Allip",
    flavor: "The maddened spirit of one who died chasing forbidden knowledge, pouring its insanity onto the living.",
    senses: "darkvision 60 ft., passive Perception 12",
    langs: "understands the languages it knew in life but can't speak",
    resist: "acid, cold, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks",
    immune: "necrotic, poison",
    condImmune: "charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained",
    traits: [
      ["Incorporeal Movement", "The allip can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."]
    ],
    actions: [
      ["Maddening Touch", "Melee Spell Attack: +5 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) psychic damage."],
      ["Whispers of Madness (Recharge 5-6)", "The allip whispers mind-shattering thoughts to one creature it can see within 30 ft. of it that can hear it. The target must succeed on a DC 14 Wisdom saving throw or take 14 (2d8 + 5) psychic damage and make a melee weapon attack against the nearest creature other than the allip."]
    ]
  },
  "Полтергейст": {
    name: "Poltergeist",
    flavor: "A spiteful poltergeist spirit that hurls objects and wreaks havoc in the place of its death.",
    senses: "darkvision 60 ft., passive Perception 10",
    langs: "understands the languages it knew in life but can't speak",
    resist: "acid, cold, fire, lightning, thunder; bludgeoning, piercing, and slashing from nonmagical attacks",
    immune: "necrotic, poison",
    condImmune: "charmed, exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained",
    traits: [
      ["Incorporeal Movement", "The poltergeist can move through other creatures and objects as if they were difficult terrain. It takes 5 (1d10) force damage if it ends its turn inside an object."],
      ["Invisibility", "The poltergeist is invisible."]
    ],
    actions: [
      ["Force Touch", "Melee Spell Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) force damage."],
      ["Telekinetic Thrust", "The poltergeist targets one object that is neither worn nor carried and weighs no more than 5 pounds, hurling it at a creature within 30 ft. of it. Ranged Weapon Attack: +4 to hit. Hit: 10 (3d6) bludgeoning damage."]
    ]
  },
  "Костяной коготь": {
    name: "Boneclaw",
    flavor: "A gangling skeletal terror with absurdly long claws, born from a villain's final breath of hatred.",
    senses: "darkvision 120 ft., passive Perception 14",
    langs: "understands the languages it knew in life but can't speak",
    resist: "",
    immune: "cold, necrotic, poison",
    condImmune: "exhaustion, frightened, poisoned",
    traits: [
      ["Dark Devotion", "The boneclaw rises from the remains of an evil humanoid and serves a powerful undead until that creature is destroyed."]
    ],
    actions: [
      ["Multiattack", "The boneclaw makes two piercing claw attacks."],
      ["Piercing Claw", "Melee Weapon Attack: +8 to hit, reach 15 ft., one target. Hit: 18 (3d8 + 5) piercing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 16 Constitution saving throw or take 9 (2d8) necrotic damage, and its hit point maximum is reduced by the same amount."],
      ["Shadow Jump (Recharge 5-6)", "The boneclaw magically teleports from one shadow to another within 60 ft., carrying any equipment it is wearing or carrying."]
    ],
    reactions: [
      ["Deadly Reach", "When a creature the boneclaw can see makes an attack against it, the boneclaw can teleport up to 30 ft. to an unoccupied space it can see. If it arrives within 5 ft. of a creature, it can make one piercing claw attack against that creature."]
    ]
  },
  "Демилич": {
    name: "Demilich",
    flavor: "A withered, gem-studded skull is all that remains of a lich that forsook undeath for another form of immortality.",
    senses: "truesight 120 ft., passive Perception 13",
    langs: "—",
    resist: "necrotic; bludgeoning, piercing, and slashing damage",
    immune: "psychic, poison; bludgeoning, piercing, and slashing from nonmagical attacks",
    condImmune: "charmed, deafened, exhaustion, frightened, paralyzed, petrified, poisoned, prone, stunned",
    traits: [
      ["Avoidance", "If the demilich is subjected to an effect that allows it to make a saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it fails."],
      ["Legendary Resistance", "If the demilich fails a saving throw, it can choose to succeed instead (3/day)."],
      ["Magic Resistance", "The demilich has advantage on saving throws against spells and other magical effects."],
      ["Turn Resistance", "While in its lair, the demilich has advantage on certain saving throws."]
    ],
    actions: [
      ["Howl (1/Day)", "The demilich emits a bloodcurdling howl. Each creature within 30 ft. of it that can hear it must succeed on a DC 15 Constitution saving throw or be frightened for 10 minutes. A frightened creature that starts its turn outside the lair dies."],
      ["Life Drain", "Save DC 19. The demilich targets one living creature within 30 ft. of it. The target must succeed on a Constitution saving throw or drop to 0 hit points. If a humanoid dies this way, its soul is trapped in one of the demilich's gems, and its body is destroyed."]
    ],
    legendary: [
      ["Flight", "The demilich flies up to half its flying speed without provoking opportunity attacks."],
      ["Cloud of Dust", "The demilich magically swirls its dusty remains. Each creature within 10 ft. of the demilich must succeed on a DC 15 Constitution saving throw or be blinded until the end of the creature's next turn."],
      ["Life Drain (Costs 3 Actions)", "The demilich uses its Life Drain action."]
    ]
  },
  "Коатль": {
    name: "Couatl",
    flavor: "A winged serpent of radiant plumage, a wise celestial guardian sent to watch over sacred sites and the worthy.",
    senses: "truesight 120 ft., passive Perception 15",
    langs: "all, telepathy 120 ft.",
    resist: "radiant",
    immune: "psychic; bludgeoning, piercing, and slashing from nonmagical attacks",
    condImmune: "",
    traits: [
      ["Innate Spellcasting", "The couatl's spellcasting ability is Charisma (spell save DC 14). It can innately cast the following spells, requiring only verbal and somatic components. At will: detect evil and good, detect magic, detect thoughts. 3/day each: bless, create food and water, cure wounds, lesser restoration, protection from poison, sanctuary, shield. 1/day each: dream, greater restoration, scrying."],
      ["Magic Weapons", "The couatl's weapon attacks are magical."],
      ["Shielded Mind", "The couatl is immune to scrying and to any effect that would sense its emotions, read its thoughts, or detect its location."]
    ],
    actions: [
      ["Bite", "Melee Weapon Attack: +8 to hit, reach 5 ft., one creature. Hit: 8 (1d6 + 5) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 24 hours."],
      ["Constrict", "Melee Weapon Attack: +6 to hit, reach 10 ft., one Medium or smaller creature. Hit: 10 (2d6 + 3) bludgeoning damage, and the target is grappled (escape DC 15)."],
      ["Change Shape", "The couatl magically polymorphs into a humanoid or beast that has a challenge rating equal to or less than its own, or back into its true form. It retains its game statistics and ability to speak."]
    ]
  }
}
export default PART
