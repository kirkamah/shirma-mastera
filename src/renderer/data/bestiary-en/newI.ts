const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  "Фейский дракон": {
    name: "Faerie Dragon",
    flavor: "A tiny mischievous dragon with rainbow scales and butterfly wings, fond of invisible pranks and sweets.",
    senses: "darkvision 60 ft., passive Perception 13",
    langs: "Draconic, Sylvan",
    traits: [
      ["Superior Invisibility", "As a bonus action, the dragon can magically turn invisible until its concentration ends (as if concentrating on a spell). Any equipment the dragon wears or carries is invisible with it."],
      ["Limited Telepathy", "Using telepathy, the dragon can magically communicate with any other faerie dragon within 60 feet of it."],
      ["Magic Resistance", "The dragon has advantage on saving throws against spells and other magical effects."],
      ["Innate Spellcasting", "The dragon's innate spellcasting ability is Charisma (spell save DC 13). It can innately cast a number of spells, requiring no material components: 1/day each: dancing lights, mage hand, minor illusion. The older a dragon gets, the more spells it knows."]
    ],
    actions: [
      ["Bite", "Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 1 piercing damage."],
      ["Euphoria Breath (Recharge 5–6)", "The dragon exhales a puff of euphoria gas at one creature within 5 feet of it. The target must succeed on a DC 11 Wisdom saving throw, or for 1 minute, the target can't take reactions and must roll a d6 at the start of each of its turns to determine its behavior during the turn: 1–4. The target takes no action or bonus action and uses all of its movement to move in a randomly determined direction. 5–6. The target doesn't move, and the only thing it can do on its turn is make a DC 11 Wisdom saving throw, ending the effect on itself on a success."]
    ]
  },
  "Шлемоносный ужас": {
    name: "Helmed Horror",
    flavor: "An animated suit of enchanted plate armor that hovers through the air, tirelessly carrying out the will of its long-gone creator.",
    senses: "blindsight 60 ft. (blind beyond this radius), passive Perception 14",
    langs: "understands the languages of its creator but can't speak",
    resist: "bludgeoning, piercing, and slashing from nonmagical attacks",
    immune: "force, necrotic, poison",
    condImmune: "blinded, charmed, deafened, frightened, paralyzed, petrified, poisoned, stunned",
    traits: [
      ["Magic Resistance", "The helmed horror has advantage on saving throws against spells and other magical effects."],
      ["Spell Immunity", "The helmed horror is immune to three spells chosen by its creator. Typical immunities include fireball, heat metal, and lightning bolt."]
    ],
    actions: [
      ["Multiattack", "The helmed horror makes two longsword attacks."],
      ["Longsword", "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands."]
    ]
  },
  "Хранитель-щит": {
    name: "Shield Guardian",
    flavor: "A massive construct of wood and metal built to protect the wearer of a special amulet, taking its master's wounds upon itself.",
    senses: "blindsight 10 ft., darkvision 60 ft., passive Perception 10",
    langs: "understands commands given in any language but can't speak",
    immune: "poison",
    condImmune: "charmed, exhaustion, frightened, paralyzed, poisoned",
    traits: [
      ["Bound", "The shield guardian is magically bound to an amulet. As long as the guardian and its amulet are on the same plane of existence, the amulet's wearer can telepathically call the guardian to travel to it, and the guardian knows the distance and direction to the amulet. If the guardian is within 60 feet of the amulet's wearer, half of any damage the wearer takes (rounded up) is transferred to the guardian."],
      ["Regeneration", "The shield guardian regains 10 hit points at the start of its turn if it has at least 1 hit point."],
      ["Spell Storing", "A spellcaster who wears the shield guardian's amulet can cause the guardian to store one spell of 4th level or lower. To do so, the wearer must cast the spell on the guardian. The spell has no effect but is stored within the guardian. When commanded to do so by the wearer or when a situation arises that was predefined by the spellcaster, the guardian casts the stored spell with any parameters set by the original caster, requiring no components. When the spell is cast or a new spell is stored, any previously stored spell is lost."]
    ],
    actions: [
      ["Multiattack", "The guardian makes two fist attacks."],
      ["Fist", "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage."]
    ],
    reactions: [
      ["Shield", "When a creature makes an attack against the wearer of the guardian's amulet, the guardian grants a +2 bonus to the wearer's AC if the guardian is within 5 feet of the wearer."]
    ]
  },
  "Голем из плоти": {
    name: "Flesh Golem",
    flavor: "A monster stitched together from pieces of dead bodies, brought to life by lightning and obedient to its creator — until it flies into a blind rage.",
    senses: "darkvision 60 ft., passive Perception 10",
    langs: "understands the languages of its creator but can't speak",
    immune: "lightning, poison; bludgeoning, piercing, and slashing from nonmagical attacks not made with adamantine weapons",
    condImmune: "charmed, exhaustion, frightened, paralyzed, petrified, poisoned",
    traits: [
      ["Berserk", "Whenever the golem starts its turn with 40 hit points or fewer, roll a d6. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object, with preference for an object smaller than itself. Once the golem goes berserk, it continues to do so until it is destroyed or regains all its hit points. The golem's creator, if within 60 feet of the berserk golem, can try to calm it by speaking firmly and persuasively. The golem must be able to hear its creator, who must take an action to make a DC 15 Charisma (Persuasion) check. If the check succeeds, the golem ceases being berserk. If it takes damage while still at 40 hit points or fewer, the golem might go berserk again."],
      ["Aversion of Fire", "If the golem takes fire damage, it has disadvantage on attack rolls and ability checks until the end of its next turn."],
      ["Immutable Form", "The golem is immune to any spell or effect that would alter its form."],
      ["Lightning Absorption", "Whenever the golem is subjected to lightning damage, it takes no damage and instead regains a number of hit points equal to the lightning damage dealt."],
      ["Magic Resistance", "The golem has advantage on saving throws against spells and other magical effects."],
      ["Magic Weapons", "The golem's weapon attacks are magical."]
    ],
    actions: [
      ["Multiattack", "The golem makes two slam attacks."],
      ["Slam", "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage."]
    ]
  },
  "Душащий ковёр": {
    name: "Rug of Smothering",
    flavor: "An enchanted rug indistinguishable from ordinary furnishing that engulfs whoever steps on it and smothers them.",
    senses: "blindsight 60 ft. (blind beyond this radius), passive Perception 6",
    langs: "—",
    immune: "poison, psychic",
    condImmune: "blinded, charmed, deafened, frightened, paralyzed, petrified, poisoned",
    traits: [
      ["Antimagic Susceptibility", "The rug is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the rug must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute."],
      ["Damage Transfer", "While it is grappling a creature, the rug takes only half the damage dealt to it, and the creature grappled by the rug takes the other half."],
      ["False Appearance", "While the rug remains motionless, it is indistinguishable from a normal rug."]
    ],
    actions: [
      ["Smother", "Melee Weapon Attack: +5 to hit, reach 5 ft., one Medium or smaller creature. Hit: The creature is grappled (escape DC 13). Until this grapple ends, the target is restrained, blinded, and at risk of suffocating, and the rug can't smother another target. In addition, at the start of each of the target's turns, the target takes 10 (2d6 + 3) bludgeoning damage."]
    ]
  },
  "Пожиратель интеллекта": {
    name: "Intellect Devourer",
    flavor: "A walking brain on four clawed legs — a creation of the mind flayers that devours a victim's mind and seizes its body.",
    senses: "blindsight 60 ft. (blind beyond this radius), passive Perception 12",
    langs: "understands Deep Speech but can't speak, telepathy 60 ft.",
    resist: "bludgeoning, piercing, and slashing from nonmagical attacks",
    condImmune: "blinded",
    traits: [
      ["Detect Sentience", "The intellect devourer can sense the presence and location of any creature within 300 feet of it that has an Intelligence of 3 or higher, regardless of interposing barriers, unless the creature is protected by a mind blank spell."]
    ],
    actions: [
      ["Multiattack", "The intellect devourer makes one attack with its claws and uses Devour Intellect."],
      ["Claws", "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage."],
      ["Devour Intellect", "The intellect devourer targets one creature it can see within 10 feet of it that has a brain. The target must succeed on a DC 12 Intelligence saving throw against this magic or take 11 (2d10) psychic damage. Also on a failure, roll 3d6: If the total equals or exceeds the target's Intelligence score, that score is reduced to 0. The target is stunned until it regains at least one point of Intelligence."],
      ["Body Thief", "The intellect devourer initiates an Intelligence contest with an incapacitated humanoid within 5 feet of it that isn't protected by protection from evil and good. If it wins the contest, the intellect devourer magically consumes the target's brain, teleports into the target's skull, and takes control of the target's body. While inside a creature, the intellect devourer has total cover against attacks and other effects originating outside its host. The intellect devourer retains its Intelligence, Wisdom, and Charisma scores, as well as its understanding of Deep Speech, its telepathy, and its traits. It otherwise adopts the target's statistics. It knows everything the creature knew, including spells and languages. If the host body dies, the intellect devourer must leave it. A protection from evil and good spell cast on the body drives the intellect devourer out. The intellect devourer is also forced out if the target regains its devoured brain by means of a wish. By spending 5 feet of its movement, the intellect devourer can voluntarily leave the body, teleporting to the nearest unoccupied space within 5 feet of it. The body then dies, unless its brain is restored within 1 round."]
    ]
  },
  "Улитарид": {
    name: "Ulitharid",
    flavor: "A rare towering mind flayer with six tentacles — a psychic overlord around whom new illithid colonies arise.",
    senses: "darkvision 120 ft., passive Perception 18",
    langs: "Deep Speech, Undercommon, telepathy 2 miles",
    traits: [
      ["Creature Sense", "The ulitharid is aware of the presence of creatures within 2 miles of it that have an Intelligence score of 4 or higher. It knows the distance and direction to each creature, as well as each one's Intelligence score, but can't sense anything else about it. A creature protected by a mind blank spell, a nondetection spell, or similar magic can't be perceived in this manner."],
      ["Magic Resistance", "The ulitharid has advantage on saving throws against spells and other magical effects."],
      ["Innate Spellcasting (Psionics)", "The ulitharid's innate spellcasting ability is Intelligence (spell save DC 17). It can innately cast the following spells, requiring no components: At will: detect thoughts, levitate. 1/day each: dominate monster, feeblemind, mass suggestion, plane shift (self only), project image, scrying, telekinesis."]
    ],
    actions: [
      ["Tentacles", "Melee Weapon Attack: +9 to hit, reach 10 ft., one creature. Hit: 27 (4d10 + 5) psychic damage. If the target is Medium or smaller, it is grappled (escape DC 14) and must succeed on a DC 17 Intelligence saving throw or be stunned until this grapple ends."],
      ["Extract Brain", "Melee Weapon Attack: +9 to hit, reach 5 ft., one incapacitated humanoid grappled by the ulitharid. Hit: 55 (10d10) piercing damage. If this damage reduces the target to 0 hit points, the ulitharid kills the target by extracting and devouring its brain."],
      ["Mind Blast (Recharge 5–6)", "The ulitharid magically emits psychic energy in a 60-foot cone. Each creature in that area must succeed on a DC 17 Intelligence saving throw or take 31 (4d12 + 5) psychic damage and be stunned for 1 minute. A target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."]
    ]
  },
  "Наблюдатель": {
    name: "Spectator",
    flavor: "A lesser kin of the beholder with four eyestalks, summoned from another plane to guard a place or treasure for exactly 101 years.",
    senses: "darkvision 120 ft., passive Perception 16",
    langs: "Deep Speech, Undercommon, telepathy 120 ft.",
    condImmune: "prone",
    actions: [
      ["Bite", "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 2 (1d6 − 1) piercing damage."],
      ["Eye Rays", "The spectator shoots up to two of the following magical eye rays at one or two creatures it can see within 90 feet of it. It can use each ray only once on a turn. 1. Confusion Ray. The target must succeed on a DC 13 Wisdom saving throw, or it can't take reactions until the end of its next turn. On its turn, the target can't move, and it uses its action to make a melee or ranged attack against a randomly determined creature within range. If the target can't attack, it does nothing on its turn. 2. Paralyzing Ray. The target must succeed on a DC 13 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. 3. Fear Ray. The target must succeed on a DC 13 Wisdom saving throw or be frightened for 1 minute. The target can repeat the saving throw at the end of each of its turns, with disadvantage if the spectator is visible to the target, ending the effect on itself on a success. 4. Wounding Ray. The target must make a DC 13 Constitution saving throw, taking 16 (3d10) necrotic damage on a failed save, or half as much damage on a successful one."],
      ["Create Food and Water", "The spectator magically creates enough food and water to sustain itself for 24 hours."]
    ],
    reactions: [
      ["Spell Reflection", "If the spectator makes a successful saving throw against a spell, or a spell attack misses it, the spectator can choose another creature (including the spellcaster) it can see within 30 feet of it. The spell targets the chosen creature instead of the spectator. If the spell forced a saving throw, the chosen creature makes its own save. If the spell was an attack, the attack roll is rerolled against the chosen creature."]
    ]
  },
  "Тиран смерти": {
    name: "Death Tyrant",
    flavor: "An undead beholder — a colossal skull with floating eyestalks whose dead central eye radiates a wave of negative energy.",
    senses: "darkvision 120 ft., passive Perception 22",
    langs: "Deep Speech, Undercommon",
    immune: "poison",
    condImmune: "charmed, exhaustion, paralyzed, petrified, poisoned, prone",
    traits: [
      ["Negative Energy Cone", "The death tyrant's central eye emits an invisible, magical 150-foot cone of negative energy. At the start of each of its turns, the tyrant decides which way the cone faces and whether the cone is active. Any creature in that area can't regain hit points. Any humanoid that dies there becomes a zombie under the tyrant's command. The dead humanoid retains its place in the initiative order and animates at the start of its next turn, provided that its body hasn't been completely destroyed."]
    ],
    actions: [
      ["Bite", "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 14 (4d6) piercing damage."],
      ["Eye Rays", "The death tyrant shoots three of the following magical eye rays at random (reroll duplicates), choosing one to three targets it can see within 120 feet of it. 1. Charm Ray. The targeted creature must succeed on a DC 17 Wisdom saving throw or be charmed by the tyrant for 1 hour, or until the tyrant harms the creature. 2. Paralyzing Ray. The targeted creature must succeed on a DC 17 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. 3. Fear Ray. The targeted creature must succeed on a DC 17 Wisdom saving throw or be frightened for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. 4. Slowing Ray. The targeted creature must succeed on a DC 17 Dexterity saving throw. On a failed save, the target's speed is halved for 1 minute. In addition, the creature can't take reactions, and it can take either an action or a bonus action on its turn, not both. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. 5. Enervation Ray. The targeted creature must make a DC 17 Constitution saving throw, taking 36 (8d8) necrotic damage on a failed save, or half as much damage on a successful one. 6. Telekinetic Ray. If the target is a creature, it must succeed on a DC 17 Strength saving throw or the tyrant moves it up to 30 feet in any direction. It is restrained by the ray's telekinetic grip until the start of the tyrant's next turn or until the tyrant is incapacitated. If the target is an object weighing 300 pounds or less that isn't being worn or carried, the tyrant moves it up to 30 feet in any direction. The tyrant can also exert fine control on objects with this ray, such as manipulating a simple tool or opening a door or a container. 7. Sleep Ray. The targeted creature must succeed on a DC 17 Wisdom saving throw or fall asleep and remain unconscious for 1 minute. The target awakens if it takes damage or another creature takes an action to wake it. This ray has no effect on constructs and undead. 8. Petrification Ray. The targeted creature must make a DC 17 Dexterity saving throw. On a failed save, the creature begins to turn to stone and is restrained. It must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure, the creature is petrified until freed by the greater restoration spell or other magic. 9. Disintegration Ray. If the target is a creature, it must succeed on a DC 17 Dexterity saving throw or take 45 (10d8) force damage. If this damage reduces the creature to 0 hit points, its body becomes a pile of fine gray dust. If the target is a Large or smaller nonmagical object or creation of magical force, it is disintegrated without a saving throw. If the target is a Huge or larger object or creation of magical force, this ray disintegrates a 10-foot cube of it. 10. Death Ray. The targeted creature must succeed on a DC 17 Dexterity saving throw or take 55 (10d10) necrotic damage. The target dies if the ray reduces it to 0 hit points."]
    ],
    legendary: [
      ["Eye Ray", "The death tyrant uses one random eye ray."]
    ]
  },
  "Катоблепас": {
    name: "Catoblepas",
    flavor: "A fetid swamp monstrosity with the body of a buffalo and a heavy head on a long serpentine neck, whose gaze brings death.",
    senses: "darkvision 60 ft., passive Perception 12",
    langs: "—",
    traits: [
      ["Stench", "Any creature other than a catoblepas that starts its turn within 10 feet of the catoblepas must succeed on a DC 16 Constitution saving throw or be poisoned until the start of its next turn. On a successful saving throw, the creature is immune to the stench of all catoblepases for 1 hour."]
    ],
    actions: [
      ["Tail", "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 21 (5d6 + 4) bludgeoning damage. If the target is a creature, it must succeed on a DC 16 Constitution saving throw or be stunned until the start of the catoblepas's next turn."],
      ["Death Ray (Recharge 5–6)", "The catoblepas targets a creature it can see within 30 feet of it. The target must make a DC 16 Constitution saving throw, taking 36 (8d8) necrotic damage on a failed save, or half as much damage on a successful one. If the target fails the save and this damage reduces it to 0 hit points, it dies."]
    ]
  }
}
export default PART
