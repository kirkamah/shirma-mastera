const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  "Следопыт — повелитель зверей (13 ур.)": {
    name: "Ranger — Beast Master (13th level)",
    senses: "passive Perception 19",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Archery)", "+2 to attack rolls with ranged weapons (already included)."],
      ["Favored Enemy · Natural Explorer", "See 3rd level."],
      ["Beast Companion · Exceptional Training", "See 7th level."],
      ["Bestial Fury", "When the ranger commands the beast to attack, it makes TWO attacks."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 17, +9 to hit). 1st level (4 slots): hunter's mark, cure wounds, hail of thorns. 2nd level (3): spike growth, pass without trace, lesser restoration. 3rd level (3): lightning arrow, conjure animals, protection from energy. 4th level (1): freedom of movement."],
    ],
    actions: [
      ["Multiattack", "Two longbow attacks."],
      ["Longbow", "Ranged Weapon Attack: +12 to hit, range 150/600 ft. Hit: 9 (1d8 + 5) piercing damage (+1d6 against a Hunter's Mark target)."],
    ],
    bonus: [
      ["Hunter's Mark", "Marks a creature it can see within 90 ft."],
      ["Command the Beast", "The companion makes TWO attacks (Bestial Fury)."],
      ["Beast Companion (saber-toothed tiger) — stats", "Large beast. AC 13, HP 64, speed walk 40. Keen Hearing and Smell. Pounce attack: if the tiger moves at least 20 ft. straight toward a target on its turn and then hits it with a Claw, the target makes a DC 14 Strength saving throw or is knocked Prone. Multiattack — Bite + Claw. Bite: +8 to hit, 11 (1d10 + 6) piercing damage (magical). Claw: +8 to hit, 13 (2d6 + 6) slashing damage (magical)."],
    ],
  },
  "Следопыт — повелитель зверей (18 ур.)": {
    name: "Ranger — Beast Master (18th level)",
    senses: "blindsight 30 ft. (Beast's Sense), passive Perception 21",
    langs: "Common + any two",
    traits: [
      ["Fighting Style (Archery)", "+2 to attack rolls with ranged weapons (already included)."],
      ["Favored Enemy · Natural Explorer", "See 3rd level."],
      ["Beast Companion · Exceptional Training · Bestial Fury", "See 13th level."],
      ["Share Spells", "A ranger spell with a range of touch or self can affect the beast companion at the same time (without a separate slot)."],
      ["Beast's Sense", "Senses the location of Invisible creatures within 30 ft."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 19, +11 to hit). 1st level (4 slots): hunter's mark, cure wounds, hail of thorns. 2nd level (3): spike growth, pass without trace, lesser restoration. 3rd level (3): lightning arrow, conjure animals, protection from energy. 4th level (3): freedom of movement, stoneskin, conjure woodland beings. 5th level (1): swift quiver."],
    ],
    actions: [
      ["Multiattack", "Two longbow attacks (or four while Swift Quiver is active)."],
      ["Longbow", "Ranged Weapon Attack: +13 to hit, range 150/600 ft. Hit: 9 (1d8 + 5) piercing damage (+1d6 against a Hunter's Mark target)."],
    ],
    bonus: [
      ["Hunter's Mark", "Marks a creature it can see within 90 ft."],
      ["Command the Beast", "The companion makes TWO attacks."],
      ["Swift Quiver (concentration, up to 1 minute)", "While active, as a bonus action on its turn — two longbow attacks; requires concentration."],
      ["Beast Companion (dire bear) — stats", "Large beast. AC 14, HP 84, speed walk 40, swim 40, climb 30. Keen Smell. Multiattack — Bite + Claw. Bite: +10 to hit, 15 (2d8 + 6) piercing damage (magical). Claw: +10 to hit, 17 (2d10 + 6) slashing damage (magical)."],
    ],
  },
  "Плут-вор (3 ур.)": {
    name: "Rogue — Thief (3rd level)",
    senses: "passive Perception 13",
    langs: "Common, Thieves' cant",
    traits: [
      ["Sneak Attack (2d6)", "Once per turn the rogue deals an extra 2d6 damage when it hits a creature with a finesse or ranged weapon attack if it has advantage, or if an able ally of the rogue is within 5 ft. of the target and the rogue doesn't have disadvantage on the roll."],
      ["Thieves' Cant", "Secret slang of rogue gangs (understood by similarly initiated individuals)."],
      ["Cunning Action", "As a bonus action it can take the Dash, Disengage, or Hide (Stealth) action."],
      ["Expertise", "Doubled proficiency bonus on checks with two skills (included in Stealth)."],
      ["Fast Hands", "As a bonus action — Sleight of Hand, use thieves' tools to disarm traps or pick locks, or use an object."],
      ["Second-Story Work", "Climbs without spending extra movement; on a running jump it covers an extra 2 ft. per point of Strength modifier (including 0)."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 7 (1d8 + 3) piercing damage (+2d6 on a Sneak Attack)."],
      ["Hand Crossbow", "Ranged Weapon Attack: +5 to hit, range 30/120 ft. Hit: 6 (1d6 + 3) piercing damage (+2d6 on a Sneak Attack)."],
    ],
    bonus: [
      ["Cunning Action", "Dash, Disengage, or Hide (Stealth)."],
      ["Fast Hands", "Sleight of Hand / thieves' tools / use an object."],
    ],
  },
  "Плут-вор (7 ур.)": {
    name: "Rogue — Thief (7th level)",
    senses: "passive Perception 14",
    langs: "Common, Thieves' cant",
    traits: [
      ["Sneak Attack (4d6)", "Once per turn — +4d6 damage when hitting with a finesse or ranged weapon with advantage / an ally nearby."],
      ["Thieves' Cant · Cunning Action · Expertise · Fast Hands · Second-Story Work", "See 3rd level."],
      ["Evasion", "On a Dexterity saving throw to reduce damage: on a success it takes no damage, on a failure half damage."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 8 (1d8 + 4) piercing damage (+4d6 on a Sneak Attack)."],
      ["Hand Crossbow", "Ranged Weapon Attack: +7 to hit, range 30/120 ft. Hit: 7 (1d6 + 4) piercing damage (+4d6 on a Sneak Attack)."],
    ],
    bonus: [
      ["Cunning Action", "Dash / Disengage / Hide."],
      ["Fast Hands", "As a bonus action — Sleight of Hand / thieves' tools / object."],
    ],
    reactions: [
      ["Uncanny Dodge", "When an attacker the rogue can see hits it with an attack, the rogue uses its reaction to halve the attack's damage."],
    ],
  },
  "Плут-вор (13 ур.)": {
    name: "Rogue — Thief (13th level)",
    senses: "passive Perception 16",
    langs: "Common, Thieves' cant",
    traits: [
      ["Sneak Attack (7d6)", "Once per turn — +7d6 damage."],
      ["Thieves' Cant · Cunning Action · Expertise · Fast Hands · Second-Story Work · Evasion", "See above."],
      ["Use Magic Device", "Ignores class, race, and level restrictions when using magic items."],
      ["Reliable Talent", "Any skill check in which the rogue is proficient counts a die roll of less than 10 as a 10."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) piercing damage (+7d6 on a Sneak Attack)."],
      ["Hand Crossbow", "Ranged Weapon Attack: +10 to hit, range 30/120 ft. Hit: 8 (1d6 + 5) piercing damage (+7d6 on a Sneak Attack)."],
    ],
    bonus: [
      ["Cunning Action", "Dash / Disengage / Hide."],
      ["Fast Hands", "See above."],
    ],
    reactions: [
      ["Uncanny Dodge", "As a reaction, halves the damage of one attack."],
    ],
  },
  "Плут-вор (18 ур.)": {
    name: "Rogue — Thief (18th level)",
    senses: "blindsight 10 ft. (Blindsense), passive Perception 17",
    langs: "Common, Thieves' cant",
    traits: [
      ["Sneak Attack (9d6)", "Once per turn — +9d6 damage."],
      ["Thieves' Cant · Cunning Action · Fast Hands · Second-Story Work · Evasion", "See above."],
      ["Use Magic Device · Reliable Talent", "See 13th level."],
      ["Blindsense", "Senses the location of hidden or Invisible creatures within 10 ft."],
      ["Slippery Mind", "Gains proficiency in Wisdom saving throws."],
      ["Elusive", "While the rogue isn't Incapacitated, no attack roll against it has advantage."],
      ["Thief's Reflexes", "In the first round of combat the rogue takes two turns: one at its initiative value and one at its initiative value −10 (only in the first round)."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 9 (1d8 + 5) piercing damage (+9d6 on a Sneak Attack)."],
      ["Hand Crossbow", "Ranged Weapon Attack: +11 to hit, range 30/120 ft. Hit: 8 (1d6 + 5) piercing damage (+9d6 on a Sneak Attack)."],
    ],
    bonus: [
      ["Cunning Action", "Dash / Disengage / Hide."],
      ["Fast Hands", "See above."],
    ],
    reactions: [
      ["Uncanny Dodge", "As a reaction, halves the damage of one attack."],
    ],
  },
  "Плут-убийца (3 ур.)": {
    name: "Rogue — Assassin (3rd level)",
    senses: "passive Perception 13",
    langs: "Common, Thieves' cant",
    traits: [
      ["Sneak Attack (2d6)", "Once per turn — +2d6 damage."],
      ["Thieves' Cant · Cunning Action · Expertise", "See the Thief."],
      ["Assassin's Tools", "Proficiency with a disguise kit and a poisoner's kit."],
      ["Assassinate", "Advantage on attack rolls against any creature that hasn't taken a turn in this combat; any hit against a creature caught by surprise is a critical hit."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 7 (1d8 + 3) piercing damage (+2d6 on a Sneak Attack)."],
      ["Hand Crossbow", "Ranged Weapon Attack: +5 to hit, range 30/120 ft. Hit: 6 (1d6 + 3) piercing damage (+2d6 on a Sneak Attack)."],
    ],
    bonus: [
      ["Cunning Action", "Dash / Disengage / Hide."],
    ],
  },
  "Плут-убийца (7 ур.)": {
    name: "Rogue — Assassin (7th level)",
    senses: "passive Perception 14",
    langs: "Common, Thieves' cant",
    traits: [
      ["Sneak Attack (4d6)", "Once per turn — +4d6 damage."],
      ["Thieves' Cant · Cunning Action · Expertise · Evasion", "See above."],
      ["Assassinate", "Advantage against creatures that haven't acted; critical hits against creatures caught by surprise."],
      ["Infiltration Expertise", "Can spend 7 days of work to establish a wholly believable false identity (documents, surroundings, connections); it can be uncovered only by a detailed investigation."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 8 (1d8 + 4) piercing damage (+4d6 on a Sneak Attack)."],
      ["Hand Crossbow (with poison)", "Ranged Weapon Attack: +7 to hit, range 30/120 ft. Hit: 7 (1d6 + 4) piercing damage (+4d6 on a Sneak Attack); the target must succeed on a DC 13 Constitution saving throw or be Poisoned for 1 minute."],
    ],
    bonus: [
      ["Cunning Action", "Dash / Disengage / Hide."],
    ],
    reactions: [
      ["Uncanny Dodge", "As a reaction, halves the damage of one attack."],
    ],
  },
  "Плут-убийца (13 ур.)": {
    name: "Rogue — Assassin (13th level)",
    senses: "passive Perception 16",
    langs: "Common, Thieves' cant",
    traits: [
      ["Sneak Attack (7d6)", "Once per turn — +7d6 damage."],
      ["Thieves' Cant · Cunning Action · Evasion · Reliable Talent", "See above."],
      ["Assassinate · Infiltration Expertise", "See 3rd and 7th level."],
      ["Impostor", "Flawlessly mimics the speech, writing, and mannerisms of a creature the rogue has studied for at least 3 hours. To suspect the forgery requires a Wisdom (Insight) check against DC 8 + Charisma + proficiency bonus."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) piercing damage (+7d6 on a Sneak Attack)."],
      ["Hand Crossbow (with poison)", "Ranged Weapon Attack: +10 to hit, range 30/120 ft. Hit: 8 (1d6 + 5) piercing damage (+7d6 on a Sneak Attack); target: DC 15 Constitution saving throw or be Poisoned for 1 minute."],
    ],
    bonus: [
      ["Cunning Action", "Dash / Disengage / Hide."],
    ],
    reactions: [
      ["Uncanny Dodge", "As a reaction, halves the damage of one attack."],
    ],
  },
  "Плут-убийца (18 ур.)": {
    name: "Rogue — Assassin (18th level)",
    senses: "blindsight 10 ft. (Blindsense), passive Perception 17",
    langs: "Common, Thieves' cant",
    traits: [
      ["Sneak Attack (9d6)", "Once per turn — +9d6 damage."],
      ["Thieves' Cant · Cunning Action · Evasion · Reliable Talent · Blindsense · Slippery Mind · Elusive", "See the Thief, 18th level."],
      ["Assassinate · Impostor", "See 13th level."],
      ["Death Strike", "When the rogue hits a creature that is caught by surprise with an attack, the creature must succeed on a DC 19 Constitution saving throw (8 + Dexterity + proficiency bonus) or the attack's damage is doubled."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 9 (1d8 + 5) piercing damage (+9d6 on a Sneak Attack)."],
      ["Hand Crossbow (with poison)", "Ranged Weapon Attack: +11 to hit, range 30/120 ft. Hit: 8 (1d6 + 5) piercing damage (+9d6 on a Sneak Attack); target: DC 17 Constitution saving throw or be Poisoned for 1 minute."],
    ],
    bonus: [
      ["Cunning Action", "Dash / Disengage / Hide."],
    ],
    reactions: [
      ["Uncanny Dodge", "As a reaction, halves the damage of one attack."],
    ],
  },
  "Плут — мистический ловкач (3 ур.)": {
    name: "Rogue — Arcane Trickster (3rd level)",
    senses: "passive Perception 13",
    langs: "Common, Thieves' cant",
    traits: [
      ["Sneak Attack (2d6)", "Once per turn — +2d6 damage."],
      ["Thieves' Cant · Cunning Action · Expertise", "See the Thief."],
      ["Mage Hand Legerdemain", "When the rogue casts mage hand, the spectral hand becomes invisible and can be used for distracting actions: as a bonus action through it the rogue can stow or retrieve an object, touch a creature, or use thieves' tools to disarm traps or pick locks at a distance (a Stealth check by the rogue)."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 12, +4 to hit). Cantrips (at will): mage hand, minor illusion, ray of frost. 1st level (2 slots): shield, charm person, sleep."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 7 (1d8 + 3) piercing damage (+2d6 on a Sneak Attack)."],
      ["Ray of Frost (cantrip)", "Ranged Spell Attack: +4 to hit, range 60 ft. Hit: 4 (1d8) cold damage; a target that fails to resist the spell has its speed reduced by 10 ft. until the start of the rogue's next turn."],
    ],
    bonus: [
      ["Cunning Action", "Dash / Disengage / Hide."],
      ["Mage Hand Legerdemain", "Control the mage hand as a lockpick/distraction."],
    ],
    reactions: [
      ["Shield (1st level)", "As a reaction to an attack roll or magic missile — +5 to AC until the start of its next turn (expends a 1st-level slot)."],
    ],
  },
  "Плут — мистический ловкач (7 ур.)": {
    name: "Rogue — Arcane Trickster (7th level)",
    senses: "passive Perception 14",
    langs: "Common, Thieves' cant",
    traits: [
      ["Sneak Attack (4d6)", "Once per turn — +4d6 damage."],
      ["Thieves' Cant · Cunning Action · Expertise · Evasion", "See above."],
      ["Mage Hand Legerdemain", "See 3rd level."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 13, +5 to hit). Cantrips (at will): mage hand, minor illusion, ray of frost. 1st level (4 slots): shield, charm person, sleep, magic missile. 2nd level (2): invisibility, mirror image."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 8 (1d8 + 4) piercing damage (+4d6 on a Sneak Attack)."],
      ["Ray of Frost (cantrip)", "Ranged Spell Attack: +5 to hit, range 60 ft. Hit: 4 (1d8) cold damage; speed −10 ft."],
    ],
    bonus: [
      ["Cunning Action", "Dash / Disengage / Hide."],
      ["Mage Hand Legerdemain", "Control the mage hand."],
    ],
    reactions: [
      ["Uncanny Dodge", "As a reaction, halves the damage of one attack."],
      ["Shield (1st level)", "As a reaction — +5 to AC until the start of its next turn."],
    ],
  },
  "Плут — мистический ловкач (13 ур.)": {
    name: "Rogue — Arcane Trickster (13th level)",
    senses: "passive Perception 16",
    langs: "Common, Thieves' cant",
    traits: [
      ["Sneak Attack (7d6)", "Once per turn — +7d6 damage."],
      ["Thieves' Cant · Cunning Action · Expertise · Evasion · Reliable Talent", "See above."],
      ["Mage Hand Legerdemain", "See 3rd level."],
      ["Magical Ambush", "If the rogue is hidden from a creature when it casts a spell on it, that creature makes its saving throw against the spell with disadvantage."],
      ["Versatile Trickster", "Through the mage hand, as a bonus action, the rogue gives itself advantage on its next attack roll against a creature within 5 ft. of the hand."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 16, +8 to hit). Cantrips (at will): mage hand, minor illusion, ray of frost, fire bolt. 1st level (4 slots): shield, charm person, sleep, magic missile. 2nd level (3): invisibility, mirror image, hold person. 3rd level (2): haste, fear."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) piercing damage (+7d6 on a Sneak Attack)."],
      ["Fire Bolt (cantrip)", "Ranged Spell Attack: +8 to hit, range 120 ft. Hit: 11 (2d10) fire damage."],
    ],
    bonus: [
      ["Cunning Action", "Dash / Disengage / Hide."],
      ["Versatile Trickster", "Advantage on the next attack through the mage hand."],
    ],
    reactions: [
      ["Uncanny Dodge", "As a reaction, halves the damage of one attack."],
      ["Shield (1st level)", "As a reaction — +5 to AC until the start of its next turn."],
    ],
  },
  "Плут — мистический ловкач (18 ур.)": {
    name: "Rogue — Arcane Trickster (18th level)",
    senses: "blindsight 10 ft. (Blindsense), passive Perception 17",
    langs: "Common, Thieves' cant",
    traits: [
      ["Sneak Attack (9d6)", "Once per turn — +9d6 damage."],
      ["Thieves' Cant · Cunning Action · Evasion · Reliable Talent · Blindsense · Slippery Mind · Elusive", "See the Thief, 18th level."],
      ["Mage Hand Legerdemain · Magical Ambush · Versatile Trickster", "See 13th level."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 17, +9 to hit). Cantrips (at will): mage hand, minor illusion, ray of frost, fire bolt. 1st level (4 slots): shield, charm person, sleep, magic missile. 2nd level (3): invisibility, mirror image, hold person. 3rd level (3): haste, fear, fly."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 9 (1d8 + 5) piercing damage (+9d6 on a Sneak Attack)."],
      ["Fire Bolt (cantrip)", "Ranged Spell Attack: +9 to hit, range 120 ft. Hit: 16 (3d10) fire damage."],
    ],
    bonus: [
      ["Cunning Action", "Dash / Disengage / Hide."],
      ["Versatile Trickster", "Advantage on the next attack through the mage hand."],
    ],
    reactions: [
      ["Uncanny Dodge", "As a reaction, halves the damage of one attack."],
      ["Shield (1st level)", "As a reaction — +5 to AC until the start of its next turn."],
      ["Spell Thief (1/long rest)", "When a creature within 60 ft. casts a spell targeting the rogue or including it in an area, the rogue uses its reaction to attempt to steal that knowledge: the spell has no effect, and until its next long rest the rogue can cast it once as its own (using its own slots), and the caster loses access to it until its own long rest."],
    ],
  },
  "Чародей драконьей крови (3 ур.)": {
    name: "Sorcerer — Draconic Bloodline (3rd level)",
    senses: "passive Perception 12",
    langs: "Common, Draconic",
    traits: [
      ["Draconic Resilience", "Without armor, AC = 13 + Dexterity modifier; hit point maximum increases by 1 per sorcerer level (included in HP)."],
      ["Sorcery Points (3)", "Sorcery points equal level. They can be converted into spell slots and back, and spent on Metamagic."],
      ["Metamagic (2 effects)", "Known: Quickened Spell (2 points — a spell with a casting time of 1 action is cast as a bonus action) and Heightened Spell (3 points — the target has disadvantage on the saving throw)."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 13, +5 to hit). Cantrips (at will): fire bolt, ray of frost, minor illusion, prestidigitation. 1st level (4 slots): magic missile, shield, thunderwave. 2nd level (2): scorching ray, mirror image."],
    ],
    actions: [
      ["Fire Bolt (cantrip)", "Ranged Spell Attack: +5 to hit, range 120 ft. Hit: 5 (1d10) fire damage."],
      ["Scorching Ray (2nd level)", "Three rays, Ranged Spell Attack: +5 to hit each, range 120 ft. Hit: 6 (2d6) fire damage per ray."],
    ],
    bonus: [
      ["Quickened Spell", "For 2 sorcery points, casts a spell with a casting time of 1 action as a bonus action."],
    ],
    reactions: [
      ["Shield (1st level)", "As a reaction to an attack roll or magic missile — +5 to AC until the start of its next turn (expends a 1st-level slot)."],
    ],
  },
  "Чародей драконьей крови (7 ур.)": {
    name: "Sorcerer — Draconic Bloodline (7th level)",
    senses: "passive Perception 13",
    langs: "Common, Draconic",
    traits: [
      ["Draconic Resilience", "Without armor, AC = 13 + Dexterity; +1 hit point per level (included in HP)."],
      ["Elemental Affinity (fire)", "Adds its Charisma modifier (+4 at this level) to one fire damage roll of a spell. For 1 sorcery point it can gain resistance to fire damage for 1 hour."],
      ["Sorcery Points (7) · Metamagic (2)", "See 3rd level."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 15, +7 to hit). Cantrips (at will): fire bolt, ray of frost, minor illusion, prestidigitation, shocking grasp. 1st level (4 slots): magic missile, shield, thunderwave. 2nd level (3): scorching ray, mirror image, misty step. 3rd level (3): fireball, counterspell, haste. 4th level (1): wall of fire."],
    ],
    actions: [
      ["Fire Bolt (cantrip)", "Ranged Spell Attack: +7 to hit, range 120 ft. Hit: 11 (2d10) + 4 (Elemental Affinity) fire damage."],
      ["Fireball (3rd level)", "20-ft.-radius sphere at a point within 150 ft.: DC 15 Dexterity saving throw, 28 (8d6) + 4 (Elemental Affinity) fire damage on a failure, half on a success."],
    ],
    bonus: [
      ["Quickened Spell", "For 2 sorcery points — a spell as a bonus action."],
    ],
    reactions: [
      ["Shield (1st level)", "As a reaction — +5 to AC until the start of its next turn."],
      ["Counterspell (3rd level)", "As a reaction, interrupts the spell of a creature within 60 ft. (3rd level and lower — automatically)."],
    ],
  },
  "Чародей драконьей крови (13 ур.)": {
    name: "Sorcerer — Draconic Bloodline (13th level)",
    senses: "passive Perception 15",
    langs: "Common, Draconic",
    traits: [
      ["Draconic Resilience", "Without armor, AC = 13 + Dexterity; +1 hit point per level (included in HP)."],
      ["Elemental Affinity (fire)", "+5 (Charisma modifier) to one fire damage roll of a spell; for 1 point — resistance to fire for 1 hour."],
      ["Sorcery Points (13)", "Sorcery points equal level."],
      ["Metamagic (3 effects)", "Known: Quickened Spell (2 points), Heightened Spell (3), and Empowered Spell (1 — reroll some of the damage dice)."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 18, +10 to hit). Cantrips (at will): fire bolt, ray of frost, minor illusion, prestidigitation, shocking grasp. 1st level (4 slots): magic missile, shield, thunderwave. 2nd level (3): scorching ray, mirror image, hold person. 3rd level (3): fireball, counterspell, haste. 4th level (3): wall of fire, ice storm, greater invisibility. 5th level (2): cone of cold, dominate person. 6th level (1): chain lightning. 7th level (1): fire storm."],
    ],
    actions: [
      ["Fire Bolt (cantrip)", "Ranged Spell Attack: +10 to hit, range 120 ft. Hit: 16 (3d10) + 5 (Elemental Affinity) fire damage."],
      ["Chain Lightning (6th level)", "Primary target and up to three additional creatures within 30 ft. of it: DC 18 Dexterity saving throw, 45 (10d8) lightning damage on a failure, half on a success."],
      ["Cone of Cold (5th level)", "60-ft. cone: DC 18 Constitution saving throw, 36 (8d8) cold damage on a failure, half on a success."],
    ],
    bonus: [
      ["Quickened Spell", "For 2 sorcery points — a spell as a bonus action."],
    ],
    reactions: [
      ["Shield (1st level)", "As a reaction — +5 to AC until the start of its next turn."],
      ["Counterspell (3rd level)", "As a reaction, interrupts a spell (3rd level or lower — automatically)."],
    ],
  },
  "Чародей драконьей крови (18 ур.)": {
    name: "Sorcerer — Draconic Bloodline (18th level)",
    senses: "passive Perception 16",
    langs: "Common, Draconic",
    traits: [
      ["Draconic Resilience", "Without armor, AC = 13 + Dexterity; +1 hit point per level (included in HP)."],
      ["Elemental Affinity (fire)", "+5 to one fire damage roll of a spell; for 1 point — resistance to fire for 1 hour."],
      ["Dragon Wings", "The sorcerer grows membranous draconic wings: flying speed 60 ft. (already included in speed)."],
      ["Sorcery Points (18) · Metamagic (4 effects)", "Sorcery points equal level; known: Quickened, Heightened, Empowered, and Subtle Spell (1 point — without verbal and somatic components)."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 19, +11 to hit). Cantrips (at will): fire bolt, ray of frost, minor illusion, prestidigitation, shocking grasp. 1st level (4 slots): magic missile, shield, thunderwave. 2nd level (3): scorching ray, mirror image, hold person. 3rd level (3): fireball, counterspell, haste. 4th level (3): wall of fire, ice storm, greater invisibility. 5th level (3): cone of cold, dominate person, cloudkill. 6th level (1): chain lightning. 7th level (1): fire storm. 8th level (1): sunburst. 9th level (1): meteor swarm."],
    ],
    actions: [
      ["Fire Bolt (cantrip)", "Ranged Spell Attack: +11 to hit, range 120 ft. Hit: 22 (4d10) + 5 (Elemental Affinity) fire damage."],
      ["Meteor Swarm (9th level)", "Four 40-ft.-radius spheres within 1 mile: DC 19 Dexterity saving throw, 140 (40d6) damage on a failure (half fire, half bludgeoning), half on a success."],
      ["Draconic Presence (5 sorcery points)", "As an action for 1 minute, the sorcerer creates a 60-ft. aura. Each hostile creature that starts its turn in it must succeed on a DC 19 Wisdom saving throw or be Charmed or Frightened (sorcerer's choice) for as long as the aura lasts. Concentration."],
    ],
    bonus: [
      ["Quickened Spell", "For 2 sorcery points — a spell as a bonus action."],
    ],
    reactions: [
      ["Shield (1st level)", "As a reaction — +5 to AC until the start of its next turn."],
      ["Counterspell (3rd level)", "As a reaction, interrupts a spell (3rd level or lower — automatically)."],
    ],
  },
  "Чародей дикой магии (3 ур.)": {
    name: "Sorcerer — Wild Magic (3rd level)",
    senses: "passive Perception 12",
    langs: "Common + any one",
    traits: [
      ["Wild Magic Surge", "When the sorcerer casts a spell of 1st level or higher, the DM can have it roll a d20. On a 1, the sorcerer rolls on the Wild Magic table and applies the result."],
      ["Tides of Chaos (1/long rest)", "As a bonus action — advantage on one attack roll, ability check, or saving throw. Afterward the DM can immediately trigger a Wild Magic Surge without a d20 roll."],
      ["Sorcery Points (3) · Metamagic (2)", "Known: Quickened Spell (2 points) and Heightened Spell (3 points)."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 13, +5 to hit). Cantrips (at will): fire bolt, ray of frost, acid splash, minor illusion. 1st level (4 slots): magic missile, shield, thunderwave. 2nd level (2): scorching ray, mirror image."],
    ],
    actions: [
      ["Fire Bolt (cantrip)", "Ranged Spell Attack: +5 to hit, range 120 ft. Hit: 5 (1d10) fire damage."],
      ["Thunderwave (1st level)", "15-ft. cube: DC 13 Constitution saving throw, 9 (2d8) thunder damage and pushed 10 ft. on a failure, half and no push on a success."],
    ],
    bonus: [
      ["Quickened Spell", "For 2 sorcery points — a spell as a bonus action."],
    ],
    reactions: [
      ["Shield (1st level)", "As a reaction — +5 to AC until the start of its next turn."],
    ],
  },
  "Чародей дикой магии (7 ур.)": {
    name: "Sorcerer — Wild Magic (7th level)",
    senses: "passive Perception 13",
    langs: "Common + any one",
    traits: [
      ["Wild Magic Surge · Tides of Chaos", "See 3rd level."],
      ["Sorcery Points (7) · Metamagic (2)", "See 3rd level."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 15, +7 to hit). Cantrips (at will): fire bolt, ray of frost, acid splash, minor illusion, prestidigitation. 1st level (4 slots): magic missile, shield, thunderwave. 2nd level (3): scorching ray, mirror image, hold person. 3rd level (3): fireball, counterspell, haste. 4th level (1): confusion."],
    ],
    actions: [
      ["Fire Bolt (cantrip)", "Ranged Spell Attack: +7 to hit, range 120 ft. Hit: 11 (2d10) fire damage."],
      ["Fireball (3rd level)", "20-ft.-radius sphere at a point within 150 ft.: DC 15 Dexterity saving throw, 28 (8d6) fire damage on a failure, half on a success."],
    ],
    bonus: [
      ["Quickened Spell", "For 2 sorcery points — a spell as a bonus action."],
    ],
    reactions: [
      ["Shield (1st level)", "As a reaction — +5 to AC until the start of its next turn."],
      ["Counterspell (3rd level)", "As a reaction, interrupts a spell (3rd level or lower — automatically)."],
      ["Bend Luck (2 sorcery points)", "When a creature within 30 ft. makes an attack roll, ability check, or saving throw, the sorcerer uses its reaction to add or subtract 1d4 from the result."],
    ],
  },
  "Чародей дикой магии (13 ур.)": {
    name: "Sorcerer — Wild Magic (13th level)",
    senses: "passive Perception 15",
    langs: "Common + any one",
    traits: [
      ["Wild Magic Surge · Tides of Chaos · Bend Luck", "See above."],
      ["Sorcery Points (13) · Metamagic (3)", "Known: Quickened, Heightened, Empowered (1 point — reroll some of the damage dice)."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 18, +10 to hit). Cantrips (at will): fire bolt, ray of frost, acid splash, minor illusion, prestidigitation. 1st level (4 slots): magic missile, shield, thunderwave. 2nd level (3): scorching ray, mirror image, hold person. 3rd level (3): fireball, counterspell, haste. 4th level (3): confusion, ice storm, greater invisibility. 5th level (2): cone of cold, dominate person. 6th level (1): chain lightning. 7th level (1): finger of death."],
    ],
    actions: [
      ["Fire Bolt (cantrip)", "Ranged Spell Attack: +10 to hit, range 120 ft. Hit: 16 (3d10) fire damage."],
      ["Cone of Cold (5th level)", "60-ft. cone: DC 18 Constitution saving throw, 36 (8d8) cold damage on a failure, half on a success."],
      ["Chain Lightning (6th level)", "Primary target and up to three additional creatures within 30 ft. of it: DC 18 Dexterity saving throw, 45 (10d8) lightning damage on a failure, half on a success."],
    ],
    bonus: [
      ["Quickened Spell", "For 2 sorcery points — a spell as a bonus action."],
    ],
    reactions: [
      ["Shield (1st level)", "As a reaction — +5 to AC until the start of its next turn."],
      ["Counterspell (3rd level)", "As a reaction, interrupts a spell (3rd level or lower — automatically)."],
      ["Bend Luck (2 sorcery points)", "As a reaction, ±1d4 to a roll of a creature within 30 ft."],
    ],
  },
  "Чародей дикой магии (18 ур.)": {
    name: "Sorcerer — Wild Magic (18th level)",
    senses: "passive Perception 16",
    langs: "Common + any two",
    traits: [
      ["Wild Magic Surge · Tides of Chaos · Bend Luck", "See above."],
      ["Controlled Chaos", "When a Wild Magic Surge triggers, the sorcerer rolls on the table twice and chooses either of the two results."],
      ["Spell Bombardment", "When the sorcerer rolls damage dice for a spell and at least one of them shows the highest number possible, it rolls one such die again and adds the result to the damage (once per turn)."],
      ["Sorcery Points (18) · Metamagic (4 effects)", "Known: Quickened, Heightened, Empowered, and Subtle Spell (1 point — without verbal and somatic components)."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 19, +11 to hit). Cantrips (at will): fire bolt, ray of frost, acid splash, minor illusion, prestidigitation. 1st level (4 slots): magic missile, shield, thunderwave. 2nd level (3): scorching ray, mirror image, hold person. 3rd level (3): fireball, counterspell, haste. 4th level (3): confusion, ice storm, greater invisibility. 5th level (3): cone of cold, dominate person, cloudkill. 6th level (1): chain lightning. 7th level (1): finger of death. 8th level (1): sunburst. 9th level (1): meteor swarm."],
    ],
    actions: [
      ["Fire Bolt (cantrip)", "Ranged Spell Attack: +11 to hit, range 120 ft. Hit: 22 (4d10) fire damage."],
      ["Meteor Swarm (9th level)", "Four 40-ft.-radius spheres within 1 mile: DC 19 Dexterity saving throw, 140 (40d6) damage on a failure (half fire, half bludgeoning), half on a success."],
    ],
    bonus: [
      ["Quickened Spell", "For 2 sorcery points — a spell as a bonus action."],
    ],
    reactions: [
      ["Shield (1st level)", "As a reaction — +5 to AC until the start of its next turn."],
      ["Counterspell (3rd level)", "As a reaction, interrupts a spell (3rd level or lower — automatically)."],
      ["Bend Luck (2 sorcery points)", "As a reaction, ±1d4 to a roll of a creature within 30 ft."],
    ],
  },
  "Колдун Архифеи (3 ур.)": {
    name: "Warlock of the Archfey (3rd level)",
    senses: "passive Perception 11",
    langs: "Common, Sylvan",
    traits: [
      ["Invocations (2)", "Agonizing Blast (the Charisma modifier is added to the damage of each beam of eldritch blast — included) and Devil's Sight (darkvision 120 ft., including through magical darkness)."],
      ["Pact Magic", "Spellcasting ability is Charisma (spell save DC 13, +5 to hit). All slots are of the same level (2 slots of 2nd level), regained after a short or long rest. Cantrips (at will): eldritch blast, minor illusion. Expanded patron spells (always prepared): faerie fire, sleep. Known: dissonant whispers, hold person, blur."],
    ],
    actions: [
      ["Eldritch Blast (cantrip)", "One beam; Ranged Spell Attack: +5 to hit, range 120 ft. Hit: 8 (1d10 + 3) force damage."],
      ["Fey Presence (Pact Channel)", "As an action, in a 10-ft. cube within 60 ft.: each creature makes a DC 13 Wisdom saving throw or is Charmed or Frightened (warlock's choice) until the end of the warlock's next turn. 1 charge per short or long rest."],
    ],
  },
  "Колдун Архифеи (7 ур.)": {
    name: "Warlock of the Archfey (7th level)",
    senses: "passive Perception 11",
    langs: "Common, Sylvan",
    traits: [
      ["Invocations (4)", "Agonizing Blast (+Charisma to damage per beam), Devil's Sight (darkvision 120 ft.), Repelling Blast (a hit from eldritch blast pushes the target 10 ft.), Mask of Many Faces (can cast disguise self at will)."],
      ["Pact Magic", "Spellcasting ability is Charisma (spell save DC 15, +7 to hit). 2 slots of 4th level, regained after a short or long rest. Cantrips (at will): eldritch blast, minor illusion, prestidigitation. Expanded: blink, plant growth. Known: faerie fire, hold person, hypnotic pattern, blink, greater invisibility."],
    ],
    actions: [
      ["Eldritch Blast (cantrip)", "Two beams; Ranged Spell Attack: +7 to hit each, range 120 ft. Hit: 9 (1d10 + 4) force damage per beam, and a hit target is pushed 10 ft. away from the warlock in a straight line."],
      ["Fey Presence (Pact Channel)", "10-ft. cube within 60 ft.: DC 15 Wisdom saving throw or be Charmed/Frightened until the end of the warlock's next turn."],
    ],
    reactions: [
      ["Misty Escape", "When the warlock takes damage, it uses its reaction to turn Invisible and teleport up to 60 ft. to an unoccupied space it can see (as misty step); the invisibility ends at the start of its next turn or when it attacks or casts a spell. 1/short or long rest."],
    ],
  },
  "Колдун Архифеи (13 ур.)": {
    name: "Warlock of the Archfey (13th level)",
    senses: "passive Perception 11",
    langs: "Common, Sylvan",
    traits: [
      ["Invocations (6)", "Including Agonizing Blast (+Charisma to damage per beam), Devil's Sight, Repelling Blast, Mask of Many Faces, Thirsting Blade (warlock's focus — a weapon; not relevant here), and Whispers of the Grave (speak with the dead)."],
      ["Beguiling Defenses", "The warlock is immune to being Charmed; when a creature tries to charm it, that creature itself makes a DC 18 Wisdom saving throw or is Charmed by the warlock for 1 minute."],
      ["Pact Magic", "Spellcasting ability is Charisma (spell save DC 18, +10 to hit). 3 slots of 5th level. Cantrips (at will): eldritch blast, minor illusion, prestidigitation, druidcraft. Expanded: dominate beast, greater invisibility. Known: hypnotic pattern, blink, greater invisibility, dominate person, seeming."],
      ["Mystic Arcanum", "1/long rest each. 6th level — circle of death. 7th level — finger of death."],
    ],
    actions: [
      ["Eldritch Blast (cantrip)", "Three beams; Ranged Spell Attack: +10 to hit each, range 120 ft. Hit: 10 (1d10 + 5) force damage per beam; a hit target is pushed 10 ft."],
      ["Fey Presence (Pact Channel)", "10-ft. cube within 60 ft.: DC 18 Wisdom saving throw or be Charmed/Frightened."],
      ["Circle of Death (Arcanum 6th level)", "60-ft. sphere within 150 ft.: each creature in it makes a DC 18 Constitution saving throw, taking 28 (8d6) necrotic damage on a failure or half on a success."],
    ],
    reactions: [
      ["Misty Escape", "As a reaction when taking damage — invisibility + teleport 60 ft. (1/short rest)."],
    ],
  },
  "Колдун Архифеи (18 ур.)": {
    name: "Warlock of the Archfey (18th level)",
    senses: "passive Perception 11",
    langs: "Common, Sylvan",
    traits: [
      ["Invocations (8)", "Including Agonizing Blast, Repelling Blast, Devil's Sight, and others (at the DM's choice)."],
      ["Beguiling Defenses", "Immune to being Charmed; reflects charm (DC 19)."],
      ["Pact Magic", "Spellcasting ability is Charisma (spell save DC 19, +11 to hit). 4 slots of 5th level. Cantrips (at will): eldritch blast, minor illusion, prestidigitation, druidcraft. Known: hypnotic pattern, blink, greater invisibility, dominate person, seeming."],
      ["Mystic Arcanum", "1/long rest each. 6th level — circle of death. 7th level — finger of death. 8th level — feeblemind. 9th level — power word kill."],
    ],
    actions: [
      ["Eldritch Blast (cantrip)", "Four beams; Ranged Spell Attack: +11 to hit each, range 120 ft. Hit: 10 (1d10 + 5) force damage per beam; a hit target is pushed 10 ft."],
      ["Dark Delirium (Pact Channel)", "A target within 60 ft. that the warlock can see: DC 19 Wisdom saving throw. On a failure — Charmed OR Frightened (warlock's choice) for 1 minute and experiences an illusory world (repeat at the end of its turns; on the first failure — 27 (5d10) psychic damage)."],
      ["Power Word Kill (Arcanum 9th level)", "A target within 60 ft. with no more than 100 current hit points dies without a saving throw."],
    ],
    reactions: [
      ["Misty Escape", "As a reaction when taking damage — invisibility + teleport 60 ft. (1/short rest)."],
    ],
  },
  "Колдун Исчадия (3 ур.)": {
    name: "Warlock of the Fiend (3rd level)",
    senses: "passive Perception 11",
    langs: "Common, Infernal",
    traits: [
      ["Invocations (2)", "Agonizing Blast (+Charisma to damage per beam) and Devil's Sight (darkvision 120 ft., including through magical darkness)."],
      ["Dark One's Blessing", "When the warlock reduces a creature to 0 hit points, it gains temporary hit points equal to its Charisma modifier + warlock level (6 at this level)."],
      ["Pact Magic", "Spellcasting ability is Charisma (spell save DC 13, +5 to hit). 2 slots of 2nd level. Cantrips (at will): eldritch blast, prestidigitation. Expanded: burning hands, command. Known: burning hands, magic missile, scorching ray, hold person."],
    ],
    actions: [
      ["Eldritch Blast (cantrip)", "One beam; Ranged Spell Attack: +5 to hit, range 120 ft. Hit: 8 (1d10 + 3) force damage."],
      ["Scorching Ray (2nd level)", "Three rays, Ranged Spell Attack: +5 to hit each, range 120 ft. Hit: 6 (2d6) fire damage per ray."],
    ],
  },
  "Колдун Исчадия (7 ур.)": {
    name: "Warlock of the Fiend (7th level)",
    senses: "passive Perception 11",
    langs: "Common, Infernal",
    traits: [
      ["Invocations (4)", "Agonizing Blast (+Charisma to damage per beam), Devil's Sight, Repelling Blast (pushes a hit target 10 ft.), Sign of Ill Omen (advantage on attack rolls against Frightened creatures)."],
      ["Dark One's Blessing", "Temporary hit points = Charisma modifier + warlock level (11) when reducing a creature to 0 hit points."],
      ["Dark One's Own Luck (1/short rest)", "When the warlock makes an ability check or saving throw, it can add 1d10 to the result (chosen before the success/failure is declared)."],
      ["Pact Magic", "Spellcasting ability is Charisma (spell save DC 15, +7 to hit). 2 slots of 4th level. Cantrips (at will): eldritch blast, prestidigitation, ray of frost. Expanded: fireball, stinking cloud. Known: magic missile, scorching ray, fireball, wall of fire."],
    ],
    actions: [
      ["Eldritch Blast (cantrip)", "Two beams; Ranged Spell Attack: +7 to hit each, range 120 ft. Hit: 9 (1d10 + 4) force damage per beam; a hit target is pushed 10 ft."],
      ["Fireball (cast with a 4th-level slot)", "20-ft.-radius sphere at a point within 150 ft.: DC 15 Dexterity saving throw, 42 (12d6) fire damage on a failure, half on a success."],
    ],
  },
  "Колдун Исчадия (13 ур.)": {
    name: "Warlock of the Fiend (13th level)",
    senses: "passive Perception 11",
    langs: "Common, Infernal",
    traits: [
      ["Invocations (6)", "Including Agonizing Blast, Repelling Blast, Devil's Sight, and others."],
      ["Dark One's Blessing · Dark One's Own Luck", "See above (temporary hit points 18 when reducing to 0; +1d10 to an ability check/saving throw 1/short rest)."],
      ["Fiendish Resilience", "After each short or long rest, the warlock chooses one damage type and gains resistance to it until its next rest."],
      ["Pact Magic", "Spellcasting ability is Charisma (spell save DC 18, +10 to hit). 3 slots of 5th level. Cantrips (at will): eldritch blast, prestidigitation, ray of frost. Expanded: fire shield, wall of fire. Known: fireball, wall of fire, cloudkill, cone of cold."],
      ["Mystic Arcanum", "1/long rest each. 6th level — chain lightning. 7th level — fire storm."],
    ],
    actions: [
      ["Eldritch Blast (cantrip)", "Three beams; Ranged Spell Attack: +10 to hit each, range 120 ft. Hit: 10 (1d10 + 5) force damage per beam; a hit target is pushed 10 ft."],
      ["Fireball (cast with a 5th-level slot)", "20-ft.-radius sphere: DC 18 Dexterity saving throw, 49 (14d6) fire damage on a failure, half on a success."],
      ["Fire Storm (Arcanum 7th level)", "An area of ten 10-ft. cubes the warlock can arrange as it likes: DC 18 Dexterity saving throw, 70 (20d6) fire damage on a failure, half on a success."],
    ],
  },
  "Колдун Исчадия (18 ур.)": {
    name: "Warlock of the Fiend (18th level)",
    senses: "passive Perception 11",
    langs: "Common, Infernal",
    traits: [
      ["Invocations (8)", "Including Agonizing Blast, Repelling Blast, Devil's Sight, and other enhancements."],
      ["Dark One's Blessing · Dark One's Own Luck · Fiendish Resilience", "See above (temporary hit points 23 when reducing to 0; resistance to a chosen damage type)."],
      ["Pact Magic", "Spellcasting ability is Charisma (spell save DC 19, +11 to hit). 4 slots of 5th level. Cantrips (at will): eldritch blast, prestidigitation, ray of frost. Known: fireball, wall of fire, cloudkill, cone of cold."],
      ["Mystic Arcanum", "1/long rest each. 6th level — chain lightning. 7th level — fire storm. 8th level — power word stun. 9th level — power word kill."],
    ],
    actions: [
      ["Eldritch Blast (cantrip)", "Four beams; Ranged Spell Attack: +11 to hit each, range 120 ft. Hit: 10 (1d10 + 5) force damage per beam; a hit target is pushed 10 ft."],
      ["Fireball (cast with a 5th-level slot)", "49 (14d6) fire damage, DC 19 Dexterity saving throw for half."],
      ["Hurl Through Hell (1/long rest)", "After the warlock hits a creature (not a fiend) with an attack, as a bonus action it banishes the target to the lower planes for 1 turn; at the start of its next turn the target returns to the unoccupied space nearest to where it vanished and takes 55 (10d10) psychic damage (no saving throw)."],
    ],
  },
  "Колдун Великого Древнего (3 ур.)": {
    name: "Warlock of the Great Old One (3rd level)",
    senses: "passive Perception 11",
    langs: "Common, Deep Speech; telepathy 30 ft. (Awakened Mind)",
    traits: [
      ["Invocations (2)", "Agonizing Blast (+Charisma to damage per beam) and Devil's Sight (darkvision 120 ft., including through magical darkness)."],
      ["Awakened Mind", "Can communicate telepathically with any creature within 30 ft. if both share at least one language; the communication is one-way initiated (the other need not reply)."],
      ["Pact Magic", "Spellcasting ability is Charisma (spell save DC 13, +5 to hit). 2 slots of 2nd level. Cantrips (at will): eldritch blast, minor illusion. Expanded: dissonant whispers, Tasha's hideous laughter. Known: dissonant whispers, Tasha's hideous laughter, detect thoughts, phantasmal force."],
    ],
    actions: [
      ["Eldritch Blast (cantrip)", "One beam; Ranged Spell Attack: +5 to hit, range 120 ft. Hit: 8 (1d10 + 3) force damage."],
      ["Dissonant Whispers (cast with a 2nd-level slot)", "A target within 60 ft. that can hear the warlock: DC 13 Wisdom saving throw, 13 (3d6) psychic damage on a failure (half on a success); on a failure the target also uses its reaction to Dash away from the warlock."],
    ],
  },
  "Колдун Великого Древнего (7 ур.)": {
    name: "Warlock of the Great Old One (7th level)",
    senses: "passive Perception 11",
    langs: "Common, Deep Speech; telepathy 30 ft.",
    traits: [
      ["Invocations (4)", "Agonizing Blast, Devil's Sight, Repelling Blast (pushes a hit target 10 ft.), Book of Ancient Secrets (access to ritual spells)."],
      ["Awakened Mind", "Telepathy 30 ft."],
      ["Pact Magic", "Spellcasting ability is Charisma (spell save DC 15, +7 to hit). 2 slots of 4th level. Cantrips (at will): eldritch blast, minor illusion, prestidigitation. Expanded: clairvoyance, sending. Known: Tasha's hideous laughter, detect thoughts, hypnotic pattern, Evard's black tentacles."],
    ],
    actions: [
      ["Eldritch Blast (cantrip)", "Two beams; Ranged Spell Attack: +7 to hit each, range 120 ft. Hit: 9 (1d10 + 4) force damage per beam; a hit target is pushed 10 ft."],
      ["Evard's Black Tentacles (cast with a 4th-level slot)", "A 20-ft. square area within 90 ft.: a creature that starts its turn in the area or enters it for the first time on a turn makes a DC 15 Dexterity saving throw or takes 3d6 bludgeoning damage and is Restrained (repeat at the end of its turns)."],
    ],
    reactions: [
      ["Entropic Ward", "When a creature the warlock can see within 60 ft. makes an attack roll against it, the warlock uses its reaction to impose disadvantage on that roll; if the attack misses, the warlock's next attack against that creature (before the end of its next turn) is made with advantage."],
    ],
  },
}
export default PART
