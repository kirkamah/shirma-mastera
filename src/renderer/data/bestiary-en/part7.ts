const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  "Монах Открытой ладони (18 ур.)": {
    name: "Way of the Open Hand Monk (18th level)",
    senses: "passive Perception 21",
    langs: "Common, any one (Tongue of the Sun and Moon)",
    traits: [
      ["Martial Arts", "Unarmed strikes deal 1d10 damage."],
      ["Ki (18 points, DC 19)", "Ki points = level; ki effect DC 19."],
      ["Open Hand Technique", "On a hit with Flurry of Blows the target is knocked Prone / pushed away / has no reactions (DC 19)."],
      ["Ki-Empowered Strikes", "Unarmed strikes count as magical."],
      ["Evasion · Purity of Body", "See 13th level."],
      ["Diamond Soul", "Proficiency in all saving throws; for 1 ki point reroll a failed saving throw."],
      ["Empty Body [ki, 4 points]", "As an action becomes Invisible for 1 minute; resistance to all damage except force."],
      ["Stunning Strike [ki, 1 point]", "Target: Constitution saving throw DC 19."]
    ],
    actions: [
      ["Multiattack", "Two unarmed attacks."],
      ["Unarmed Strike", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 10 (1d10 + 5) bludgeoning damage."],
      ["Quivering Palm [palm, ki, 3 points]", "On a hit with an unarmed strike the monk sets up imperceptible lethal vibrations in the target lasting up to 24 hours. On the monk's turn, as an action, it can end them (at any distance): the target makes a Constitution saving throw DC 19 — on a failure it drops to 0 hit points, on a success it takes 70 (10d10 + 10) thunder damage."]
    ],
    bonus: [
      ["Flurry of Blows [ki, 1 point]", "As a bonus action, two unarmed attacks: +11 to hit, 10 (1d10 + 5) bludgeoning damage each. On each hit — Open Hand Technique."],
      ["Wholeness of Body (1/day)", "As a bonus action, regains 54 hit points."],
      ["Patient Defense [ki, 1 point]", "As a bonus action, the Dodge action."],
      ["Step of the Wind [ki, 1 point]", "As a bonus action, the Dash or Disengage action."]
    ],
    reactions: [
      ["Deflect Missiles", "As a reaction, reduces the damage of a ranged attack by 1d10 + 23."]
    ]
  },
  "Монах Пути тени (3 ур.)": {
    name: "Way of Shadow Monk (3rd level)",
    senses: "passive Perception 15",
    langs: "Common",
    traits: [
      ["Martial Arts", "Unarmed strikes deal 1d4 damage; Dexterity for attacks."],
      ["Ki (3 points, DC 13)", "Ki points = level; ki DC 13."],
      ["Shadow Arts", "For 2 ki points the monk casts «darkness», «darkvision», «silence», or «pass without trace». Knows the «minor illusion» cantrip."]
    ],
    actions: [
      ["Shortsword", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 6 (1d6 + 3) piercing damage."],
      ["Unarmed Strike", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 5 (1d4 + 3) bludgeoning damage."],
      ["Darkness [shadow, ki, 2 points]", "Creates a 15-foot-radius sphere of magical darkness at a point within 60 ft. for 10 minutes (as the «darkness» spell)."]
    ],
    bonus: [
      ["Flurry of Blows [ki, 1 point]", "As a bonus action, two unarmed attacks: +5 to hit, 5 (1d4 + 3) bludgeoning damage each."],
      ["Patient Defense [ki, 1 point]", "As a bonus action, the Dodge action."],
      ["Step of the Wind [ki, 1 point]", "As a bonus action, the Dash or Disengage action."]
    ],
    reactions: [
      ["Deflect Missiles", "As a reaction, reduces the damage of a ranged attack by 1d10 + 6."]
    ]
  },
  "Монах Пути тени (7 ур.)": {
    name: "Way of Shadow Monk (7th level)",
    senses: "passive Perception 17",
    langs: "Common",
    traits: [
      ["Martial Arts", "Unarmed strikes deal 1d6 damage."],
      ["Ki (7 points, DC 15)", "Ki points = level; ki DC 15."],
      ["Shadow Arts", "For 2 ki points — «darkness», «darkvision», «silence», or «pass without trace»; knows the «minor illusion» cantrip."],
      ["Ki-Empowered Strikes · Evasion · Stillness of Mind", "See Open Hand 7th level."],
      ["Stunning Strike [ki, 1 point]", "Constitution saving throw DC 15."]
    ],
    actions: [
      ["Multiattack", "Two unarmed attacks."],
      ["Shortsword", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 7 (1d6 + 4) piercing damage."],
      ["Unarmed Strike", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 7 (1d6 + 4) bludgeoning damage."]
    ],
    bonus: [
      ["Shadow Step", "While in dim light or darkness, as a bonus action teleports up to 60 ft. to a visible unoccupied space, also in dim light or darkness; its next melee attack this turn has advantage."],
      ["Flurry of Blows [ki, 1 point]", "As a bonus action, two unarmed attacks: +7 to hit, 7 (1d6 + 4) bludgeoning damage each."],
      ["Patient Defense [ki, 1 point]", "As a bonus action, the Dodge action."],
      ["Step of the Wind [ki, 1 point]", "As a bonus action, the Dash or Disengage action."]
    ],
    reactions: [
      ["Deflect Missiles", "As a reaction, reduces the damage of a ranged attack by 1d10 + 11."]
    ]
  },
  "Монах Пути тени (13 ур.)": {
    name: "Way of Shadow Monk (13th level)",
    senses: "passive Perception 20",
    langs: "Common, any one (Tongue of the Sun and Moon)",
    traits: [
      ["Martial Arts", "Unarmed strikes deal 1d8 damage."],
      ["Ki (13 points, DC 18)", "Ki points = level; ki DC 18."],
      ["Shadow Arts", "For 2 ki points — «darkness», «darkvision», «silence», or «pass without trace»; knows the «minor illusion» cantrip."],
      ["Ki-Empowered Strikes · Evasion · Purity of Body", "See Open Hand 13th level."],
      ["Cloak of Shadows", "While in dim light or darkness, as an action becomes Invisible; the invisibility ends as soon as the monk attacks, casts a spell, or is in bright light."],
      ["Tongue of the Sun and Moon", "Understands any spoken language, and is understood by any creature."],
      ["Stunning Strike [ki, 1 point]", "Constitution saving throw DC 18."]
    ],
    actions: [
      ["Multiattack", "Two unarmed attacks."],
      ["Shortsword", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) piercing damage."],
      ["Unarmed Strike", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) bludgeoning damage."],
      ["Cloak of Shadows", "As an action becomes Invisible in dim light (see trait)."]
    ],
    bonus: [
      ["Shadow Step", "As a bonus action — teleport 60 ft. between shadows + advantage on the next melee attack."],
      ["Flurry of Blows [ki, 1 point]", "As a bonus action, two unarmed attacks: +10 to hit, 9 (1d8 + 5) bludgeoning damage each."],
      ["Patient Defense [ki, 1 point]", "As a bonus action, the Dodge action."],
      ["Step of the Wind [ki, 1 point]", "As a bonus action, the Dash or Disengage action."]
    ],
    reactions: [
      ["Deflect Missiles", "As a reaction, reduces the damage of a ranged attack by 1d10 + 18."]
    ]
  },
  "Монах Пути тени (18 ур.)": {
    name: "Way of Shadow Monk (18th level)",
    senses: "passive Perception 21",
    langs: "Common, any one (Tongue of the Sun and Moon)",
    traits: [
      ["Martial Arts", "Unarmed strikes deal 1d10 damage."],
      ["Ki (18 points, DC 19)", "Ki points = level; ki DC 19."],
      ["Shadow Arts · Cloak of Shadows · Ki-Empowered Strikes · Evasion", "See 13th level."],
      ["Diamond Soul", "Proficiency in all saving throws; for 1 ki point reroll a failed saving throw."],
      ["Empty Body [ki, 4 points]", "As an action — Invisible for 1 minute, resistance to all damage except force."],
      ["Stunning Strike [ki, 1 point]", "Constitution saving throw DC 19."]
    ],
    actions: [
      ["Multiattack", "Two unarmed attacks."],
      ["Shortsword", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 10 (1d10 + 5) piercing damage."],
      ["Unarmed Strike", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 10 (1d10 + 5) bludgeoning damage."]
    ],
    bonus: [
      ["Shadow Step", "As a bonus action — teleport 60 ft. between shadows + advantage on the next melee attack."],
      ["Flurry of Blows [ki, 1 point]", "As a bonus action, two unarmed attacks: +11 to hit, 10 (1d10 + 5) bludgeoning damage each."],
      ["Patient Defense · Step of the Wind [ki, 1 point]", "As a bonus action — Dodge or Dash/Disengage."]
    ],
    reactions: [
      ["Opportune Strike", "When a creature within 5 ft. of the monk is hit by an attack from another creature, the monk uses its reaction to make one unarmed attack against it."],
      ["Deflect Missiles", "As a reaction, reduces the damage of a ranged attack by 1d10 + 23."]
    ]
  },
  "Монах Четырёх стихий (3 ур.)": {
    name: "Way of the Four Elements Monk (3rd level)",
    senses: "passive Perception 15",
    langs: "Common",
    traits: [
      ["Martial Arts", "Unarmed strikes deal 1d4 damage."],
      ["Ki (3 points, DC 13)", "Ki points = level; ki effect DC 13."],
      ["Disciple of the Elements", "Knows the «Elemental Attunement» discipline (a cantrip-like effect — interacting with minor elemental phenomena) and one combat discipline."]
    ],
    actions: [
      ["Unarmed Strike", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 5 (1d4 + 3) bludgeoning damage."],
      ["Fist of Unbroken Air [elements, ki, 2 points]", "Target within 30 ft.: Strength saving throw DC 13, or take 3d10 bludgeoning damage, be pushed 20 ft. away and knocked Prone (half damage on a success, with no displacement effects)."],
      ["Fangs of the Fire Snake [elements, ki, 1 point]", "As a bonus action — the reach of unarmed strikes increases to 10 ft. for this turn; the first strike that hits adds 1d10 fire damage."]
    ],
    bonus: [
      ["Flurry of Blows [ki, 1 point]", "As a bonus action, two unarmed attacks: +5 to hit, 5 (1d4 + 3) bludgeoning damage each."],
      ["Patient Defense · Step of the Wind [ki, 1 point]", "As a bonus action — Dodge or Dash/Disengage."]
    ],
    reactions: [
      ["Deflect Missiles", "As a reaction, reduces the damage of a ranged attack by 1d10 + 6."]
    ]
  },
  "Монах Четырёх стихий (7 ур.)": {
    name: "Way of the Four Elements Monk (7th level)",
    senses: "passive Perception 17",
    langs: "Common",
    traits: [
      ["Martial Arts", "Unarmed strikes deal 1d6 damage."],
      ["Ki (7 points, DC 15)", "Ki points = level; ki DC 15."],
      ["Disciple of the Elements", "Knows «Elemental Attunement» and the combat disciplines below."],
      ["Ki-Empowered Strikes · Evasion · Stillness of Mind", "See Open Hand 7th level."],
      ["Stunning Strike [ki, 1 point]", "Constitution saving throw DC 15."]
    ],
    actions: [
      ["Multiattack", "Two unarmed attacks."],
      ["Unarmed Strike", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 7 (1d6 + 4) bludgeoning damage."],
      ["Sweeping Cinder Strike [elements, ki, 2 points]", "As an action — a «burning hands» effect: 15-foot cone, Dexterity saving throw DC 15, 12 (3d6) fire damage on a failure, half on a success."],
      ["Water Whip [elements, ki, 2 points]", "Target within 30 ft.: Dexterity saving throw DC 15, or take 3d10 bludgeoning damage and be knocked Prone (or pulled up to 25 ft. toward the monk). Half damage on a success."]
    ],
    bonus: [
      ["Flurry of Blows [ki, 1 point]", "As a bonus action, two unarmed attacks: +7 to hit, 7 (1d6 + 4) bludgeoning damage each."],
      ["Patient Defense · Step of the Wind [ki, 1 point]", "As a bonus action — Dodge or Dash/Disengage."]
    ],
    reactions: [
      ["Deflect Missiles", "As a reaction, reduces the damage of a ranged attack by 1d10 + 11."]
    ]
  },
  "Монах Четырёх стихий (13 ур.)": {
    name: "Way of the Four Elements Monk (13th level)",
    senses: "passive Perception 20",
    langs: "Common, any one (Tongue of the Sun and Moon)",
    traits: [
      ["Martial Arts", "Unarmed strikes deal 1d8 damage."],
      ["Ki (13 points, DC 18)", "Ki points = level; ki DC 18."],
      ["Disciple of the Elements · Ki-Empowered Strikes · Evasion", "See 7th level."],
      ["Purity of Body · Tongue of the Sun and Moon", "See Open Hand 13th level."],
      ["Stunning Strike [ki, 1 point]", "Constitution saving throw DC 18."]
    ],
    actions: [
      ["Multiattack", "Two unarmed attacks."],
      ["Unarmed Strike", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) bludgeoning damage."],
      ["Fist of Four Thunders [elements, ki, 2 points]", "As an action — a «thunderwave» effect: Constitution saving throw DC 18, 2d8 thunder damage and pushed 10 ft. away on a failure, half on a success (no push)."],
      ["Wrath of the Flaming Mountain [elements, ki, 3 points]", "As an action — a «fireball» effect: 20-foot sphere at a point within 150 ft., Dexterity saving throw DC 18, 28 (8d6) fire damage on a failure, half on a success."]
    ],
    bonus: [
      ["Flurry of Blows [ki, 1 point]", "As a bonus action, two unarmed attacks: +10 to hit, 9 (1d8 + 5) bludgeoning damage each."],
      ["Patient Defense · Step of the Wind [ki, 1 point]", "As a bonus action — Dodge or Dash/Disengage."]
    ],
    reactions: [
      ["Deflect Missiles", "As a reaction, reduces the damage of a ranged attack by 1d10 + 18."]
    ]
  },
  "Монах Четырёх стихий (18 ур.)": {
    name: "Way of the Four Elements Monk (18th level)",
    senses: "passive Perception 21",
    langs: "Common, any one (Tongue of the Sun and Moon)",
    traits: [
      ["Martial Arts", "Unarmed strikes deal 1d10 damage."],
      ["Ki (18 points, DC 19)", "Ki points = level; ki DC 19."],
      ["Disciple of the Elements · Ki-Empowered Strikes · Evasion", "See 7th level."],
      ["Diamond Soul", "Proficiency in all saving throws; for 1 ki point reroll a failed saving throw."],
      ["Empty Body [ki, 4 points]", "As an action — Invisible for 1 minute, resistance to all damage except force."],
      ["Stunning Strike [ki, 1 point]", "Constitution saving throw DC 19."]
    ],
    actions: [
      ["Multiattack", "Two unarmed attacks."],
      ["Unarmed Strike", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 10 (1d10 + 5) bludgeoning damage."],
      ["Breath of Winter [elements, ki, 6 points]", "As an action — a «cone of cold» effect: 60-foot cone, Constitution saving throw DC 19, 58 (12d8) cold damage on a failure, half on a success."],
      ["Wrath of the Flaming Mountain [elements, ki, 3 points]", "As an action — a «fireball» effect: 28 (8d6) fire damage, DC 19, 20-foot sphere."]
    ],
    bonus: [
      ["Flurry of Blows [ki, 1 point]", "As a bonus action, two unarmed attacks: +11 to hit, 10 (1d10 + 5) bludgeoning damage each."],
      ["Patient Defense · Step of the Wind [ki, 1 point]", "As a bonus action — Dodge or Dash/Disengage."]
    ],
    reactions: [
      ["Deflect Missiles", "As a reaction, reduces the damage of a ranged attack by 1d10 + 23."]
    ]
  },
  "Паладин Клятвы преданности (3 ур.)": {
    name: "Oath of Devotion Paladin (3rd level)",
    senses: "passive Perception 11",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Defense)", "+1 to AC while wearing armor (already included)."],
      ["Divine Smite", "On a hit with a melee weapon the paladin can expend a spell slot to add +2d8 radiant damage (+1d8 per slot level above 1st, maximum 5d8; +1d8 against undead and fiends)."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 12, +4 to hit). Oath (always prepared): «protection from evil and good», «sanctuary». 1st level (3 slots): «bless», «guiding bolt», «shield of faith»."]
    ],
    actions: [
      ["Longsword", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 7 (1d8 + 3) slashing damage (+ Divine Smite from a slot: 2d8 radiant and more)."],
      ["Lay on Hands", "By touch, heals from a pool (5 × level = 15) hit points; or 3 points from the pool cure one disease or poison."],
      ["Channel Divinity: Sacred Weapon", "For 1 minute the paladin's weapon sheds bright light 20 ft. + dim light for an additional 20 ft. and gains +2 (Charisma modifier) to attack rolls."]
    ]
  },
  "Паладин Клятвы преданности (7 ур.)": {
    name: "Oath of Devotion Paladin (7th level)",
    senses: "passive Perception 11",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Defense)", "+1 to AC while wearing armor (already included)."],
      ["Divine Smite", "On a hit with a melee weapon — +2d8 radiant damage per 1st-level slot (+1d8 per level above; +1d8 against undead/fiends)."],
      ["Aura of Protection (10 ft.)", "The paladin and each friendly ally within 10 ft. add +3 (Charisma modifier) to all saving throws (included in the paladin's own saves)."],
      ["Aura of Devotion", "The paladin and allies within 10 ft. cannot be Charmed."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 14, +6 to hit). Oath (always prepared): «protection from evil and good», «sanctuary», «lesser restoration», «zone of truth». 1st level (4 slots): «bless», «guiding bolt», «shield of faith», «heroism». 2nd level (3): «hold person», «aid», «lesser restoration»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longsword."],
      ["Longsword", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 8 (1d8 + 4) slashing damage (+ Divine Smite)."],
      ["Lay on Hands", "By touch, heals from a pool (35) hit points; 3 points — cure disease/poison."],
      ["Channel Divinity: Sacred Weapon", "For 1 minute the weapon glows and gains +3 to attack rolls."]
    ]
  },
  "Паладин Клятвы преданности (13 ур.)": {
    name: "Oath of Devotion Paladin (13th level)",
    senses: "passive Perception 11",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Defense)", "+1 to AC while wearing armor (already included)."],
      ["Divine Smite", "On a hit with a melee weapon — +2d8 radiant damage per 1st-level slot (+1d8 per level above; +1d8 against undead/fiends)."],
      ["Improved Divine Smite", "Each hit with a melee weapon deals an additional 1d8 radiant damage (included in the «Longsword» line)."],
      ["Aura of Protection (10 ft.)", "The paladin and allies within 10 ft. add +4 to all saving throws."],
      ["Aura of Devotion", "The paladin and allies within 10 ft. cannot be Charmed."],
      ["Aura of Courage (10 ft.)", "The paladin and allies within 10 ft. cannot be Frightened."],
      ["Purity of Spirit", "The paladin is permanently under the effect of «protection from evil and good»."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 17, +9 to hit). Oath: «protection from evil and good», «sanctuary», «lesser restoration», «zone of truth», «beacon of hope», «dispel magic», «freedom of movement», «guardian of faith». 1st level (4 slots): «bless», «guiding bolt», «shield of faith». 2nd level (3): «hold person», «aid», «lesser restoration». 3rd level (3): «beacon of hope», «dispel magic», «spirit guardians». 4th level (1): «freedom of movement»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longsword."],
      ["Longsword", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) slashing damage plus 4 (1d8) radiant damage (Improved Divine Smite) (+ Divine Smite from a slot on top)."],
      ["Lay on Hands", "By touch, heals from a pool (65) hit points; 3 points — cure disease/poison."],
      ["Channel Divinity: Sacred Weapon", "For 1 minute the weapon glows and gains +4 to attack rolls."]
    ]
  },
  "Паладин Клятвы преданности (18 ур.)": {
    name: "Oath of Devotion Paladin (18th level)",
    senses: "passive Perception 11",
    langs: "Common + any two",
    traits: [
      ["Fighting Style (Defense)", "+1 to AC while wearing armor (already included)."],
      ["Divine Smite", "On a hit with a melee weapon — +2d8 radiant damage per 1st-level slot (+1d8 per level above; +1d8 against undead/fiends)."],
      ["Improved Divine Smite", "Each hit with a melee weapon deals an additional 1d8 radiant damage (included in the «Longsword» line)."],
      ["Improved Auras (30 ft.)", "The radius of all the paladin's auras is increased to 30 ft. The paladin and allies in this area add +5 to all saving throws and cannot be Charmed or Frightened."],
      ["Purity of Spirit", "The paladin is permanently under the effect of «protection from evil and good»."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 19, +11 to hit). Oath: «protection from evil and good», «sanctuary», «lesser restoration», «zone of truth», «beacon of hope», «dispel magic», «freedom of movement», «guardian of faith», «commune», «flame strike». 1st level (4 slots): «bless», «guiding bolt», «shield of faith». 2nd level (3): «hold person», «aid», «lesser restoration». 3rd level (3): «beacon of hope», «dispel magic», «spirit guardians». 4th level (3): «freedom of movement», «guardian of faith», «banishment». 5th level (1): «flame strike»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longsword."],
      ["Longsword", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 9 (1d8 + 5) slashing damage plus 4 (1d8) radiant damage (Improved Divine Smite) (+ Divine Smite from a slot)."],
      ["Lay on Hands", "By touch, heals from a pool (90) hit points; 3 points — cure disease/poison."],
      ["Channel Divinity: Sacred Weapon", "For 1 minute the weapon glows and gains +5 to attack rolls."]
    ]
  },
  "Паладин Клятвы древних (3 ур.)": {
    name: "Oath of the Ancients Paladin (3rd level)",
    senses: "passive Perception 11",
    langs: "Common, Sylvan",
    traits: [
      ["Fighting Style (Defense)", "+1 to AC while wearing armor (already included)."],
      ["Divine Smite", "On a hit with a melee weapon — +2d8 radiant damage per 1st-level slot (+1d8 per level above; +1d8 against undead/fiends)."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 12, +4 to hit). Oath (always prepared): «ensnaring strike», «speak with animals». 1st level (3 slots): «bless», «guiding bolt», «shield of faith»."]
    ],
    actions: [
      ["Longsword", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 7 (1d8 + 3) slashing damage (+ Divine Smite)."],
      ["Lay on Hands", "By touch, heals from a pool (15) hit points; 3 points — cure disease/poison."],
      ["Channel Divinity: Nature's Wrath", "Spectral vines reach toward a creature within 10 ft.: Strength or Dexterity saving throw (target's choice) DC 12, or the target is Restrained (repeats at the end of its turns)."]
    ]
  },
  "Паладин Клятвы древних (7 ур.)": {
    name: "Oath of the Ancients Paladin (7th level)",
    senses: "passive Perception 11",
    langs: "Common, Sylvan",
    traits: [
      ["Fighting Style (Defense)", "+1 to AC while wearing armor (already included)."],
      ["Divine Smite", "On a hit with a melee weapon — +2d8 radiant damage per 1st-level slot (+1d8 per level above; +1d8 against undead/fiends)."],
      ["Aura of Protection (10 ft.)", "The paladin and allies within 10 ft. add +3 to all saving throws."],
      ["Aura of Warding", "The paladin and each friendly ally within 10 ft. have resistance to damage from spells."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 14, +6 to hit). Oath: «ensnaring strike», «speak with animals», «misty step», «moonbeam». 1st level (4 slots): «bless», «guiding bolt», «shield of faith», «heroism». 2nd level (3): «hold person», «aid», «moonbeam»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longsword."],
      ["Longsword", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 8 (1d8 + 4) slashing damage (+ Divine Smite)."],
      ["Lay on Hands", "By touch, heals from a pool (35) hit points; 3 points — cure disease/poison."],
      ["Channel Divinity: Nature's Wrath", "Vines Restrain a target within 10 ft., DC 14 (Strength or Dexterity)."]
    ]
  },
  "Паладин Клятвы древних (13 ур.)": {
    name: "Oath of the Ancients Paladin (13th level)",
    senses: "passive Perception 11",
    langs: "Common, Sylvan",
    traits: [
      ["Fighting Style (Defense)", "+1 to AC while wearing armor (already included)."],
      ["Divine Smite", "On a hit with a melee weapon — +2d8 radiant damage per 1st-level slot (+1d8 per level above; +1d8 against undead/fiends)."],
      ["Improved Divine Smite", "Each hit with a melee weapon deals an additional 1d8 radiant damage (included in the «Longsword» line)."],
      ["Aura of Protection (10 ft.)", "The paladin and allies within 10 ft. add +4 to all saving throws."],
      ["Aura of Warding", "The paladin and allies within 10 ft. have resistance to damage from spells."],
      ["Aura of Courage (10 ft.)", "The paladin and allies within 10 ft. cannot be Frightened."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 17, +9 to hit). Oath: «ensnaring strike», «speak with animals», «misty step», «moonbeam», «plant growth», «protection from energy», «ice storm», «stoneskin». 1st level (4 slots): «bless», «guiding bolt», «shield of faith». 2nd level (3): «hold person», «aid», «moonbeam». 3rd level (3): «dispel magic», «protection from energy», «plant growth». 4th level (1): «stoneskin»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longsword."],
      ["Longsword", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) slashing damage plus 4 (1d8) radiant damage (Improved Divine Smite) (+ Divine Smite from a slot)."],
      ["Lay on Hands", "By touch, heals from a pool (65) hit points; 3 points — cure disease/poison."],
      ["Channel Divinity: Nature's Wrath", "Vines Restrain, DC 17."]
    ]
  },
  "Паладин Клятвы древних (18 ур.)": {
    name: "Oath of the Ancients Paladin (18th level)",
    senses: "passive Perception 11",
    langs: "Common, Sylvan",
    traits: [
      ["Fighting Style (Defense)", "+1 to AC while wearing armor (already included)."],
      ["Divine Smite", "On a hit with a melee weapon — +2d8 radiant damage per 1st-level slot (+1d8 per level above; +1d8 against undead/fiends)."],
      ["Improved Divine Smite", "Each hit with a melee weapon deals an additional 1d8 radiant damage (included in the «Longsword» line)."],
      ["Improved Auras (30 ft.)", "The radius of all the paladin's auras is 30 ft.; +5 to all saving throws, immunity to being Frightened, resistance to damage from spells."],
      ["Undying Sentinel", "When the paladin drops to 0 hit points and is not killed outright, it stays at 1 hit point (once per long rest)."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 19, +11 to hit). Oath: «ensnaring strike», «speak with animals», «misty step», «moonbeam», «plant growth», «protection from energy», «ice storm», «stoneskin», «commune with nature», «tree stride». 1st level (4 slots): «bless», «guiding bolt», «shield of faith». 2nd level (3): «hold person», «aid», «moonbeam». 3rd level (3): «dispel magic», «protection from energy», «plant growth». 4th level (3): «stoneskin», «ice storm», «banishment». 5th level (1): «tree stride»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longsword."],
      ["Longsword", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 9 (1d8 + 5) slashing damage plus 4 (1d8) radiant damage (Improved Divine Smite) (+ Divine Smite from a slot)."],
      ["Lay on Hands", "By touch, heals from a pool (90) hit points; 3 points — cure disease/poison."],
      ["Channel Divinity: Nature's Wrath", "Vines Restrain, DC 19."]
    ]
  },
  "Паладин Клятвы мести (3 ур.)": {
    name: "Oath of Vengeance Paladin (3rd level)",
    senses: "passive Perception 13",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Dueling)", "+2 to damage rolls with a one-handed melee weapon with no other weapon in the other hand (included)."],
      ["Divine Smite", "On a hit with a melee weapon — +2d8 radiant damage per 1st-level slot (+1d8 per level above; +1d8 against undead/fiends)."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 12, +4 to hit). Oath (always prepared): «bane», «hunter's mark». 1st level (3 slots): «divine favor», «guiding bolt», «shield of faith»."]
    ],
    actions: [
      ["Longsword", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 9 (1d8 + 5) slashing damage (+ Divine Smite)."],
      ["Lay on Hands", "By touch, heals from a pool (15) hit points; 3 points — cure disease/poison."],
      ["Channel Divinity: Abjure Enemy", "A creature within 60 ft.: Wisdom saving throw DC 12, or be Frightened for 1 minute (repeats at the end of its turns; if the target cannot be Frightened, its speed becomes 0)."]
    ],
    bonus: [
      ["Channel Divinity: Vow of Enmity", "For 1 minute the paladin gains advantage on attack rolls against one visible creature of its choice."]
    ]
  },
  "Паладин Клятвы мести (7 ур.)": {
    name: "Oath of Vengeance Paladin (7th level)",
    senses: "passive Perception 14",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Dueling)", "+2 to damage rolls with a one-handed melee weapon (included)."],
      ["Divine Smite", "On a hit with a melee weapon — +2d8 radiant damage per 1st-level slot (+1d8 per level above; +1d8 against undead/fiends)."],
      ["Aura of Protection (10 ft.)", "The paladin and allies within 10 ft. add +3 to all saving throws."],
      ["Relentless Avenger", "When an opportunity attack by the paladin hits a target, it can move up to half its speed (this movement does not provoke opportunity attacks from that target)."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 14, +6 to hit). Oath: «bane», «hunter's mark», «hold person», «misty step». 1st level (4 slots): «divine favor», «guiding bolt», «shield of faith», «heroism». 2nd level (3): «hold person», «misty step», «aid»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longsword."],
      ["Longsword", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 10 (1d8 + 6) slashing damage (+ Divine Smite)."],
      ["Lay on Hands", "By touch, heals from a pool (35) hit points; 3 points — cure disease/poison."],
      ["Channel Divinity: Abjure Enemy", "Target within 60 ft.: Wisdom saving throw DC 14, or be Frightened for 1 minute."]
    ],
    bonus: [
      ["Channel Divinity: Vow of Enmity", "For 1 minute — advantage on attacks against one visible creature."]
    ]
  },
  "Паладин Клятвы мести (13 ур.)": {
    name: "Oath of Vengeance Paladin (13th level)",
    senses: "passive Perception 16",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Dueling)", "+2 to damage rolls with a one-handed melee weapon (included)."],
      ["Divine Smite", "On a hit with a melee weapon — +2d8 radiant damage per 1st-level slot (+1d8 per level above; +1d8 against undead/fiends)."],
      ["Improved Divine Smite", "Each hit with a melee weapon deals an additional 1d8 radiant damage (included in the «Longsword» line)."],
      ["Aura of Protection (10 ft.)", "The paladin and allies within 10 ft. add +4 to all saving throws."],
      ["Aura of Courage (10 ft.)", "The paladin and allies within 10 ft. cannot be Frightened."],
      ["Relentless Avenger", "After a hitting opportunity attack — movement up to half speed without provoking from the same target."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 17, +9 to hit). Oath: «bane», «hunter's mark», «hold person», «misty step», «haste», «protection from energy», «banishment», «dimension door». 1st level (4 slots): «divine favor», «guiding bolt», «shield of faith». 2nd level (3): «hold person», «misty step», «aid». 3rd level (3): «haste», «protection from energy», «dispel magic». 4th level (1): «banishment»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longsword."],
      ["Longsword", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 11 (1d8 + 7) slashing damage plus 4 (1d8) radiant damage (Improved Divine Smite) (+ Divine Smite from a slot)."],
      ["Lay on Hands", "By touch, heals from a pool (65) hit points; 3 points — cure disease/poison."],
      ["Channel Divinity: Abjure Enemy", "Target within 60 ft.: Wisdom saving throw DC 17."]
    ],
    bonus: [
      ["Channel Divinity: Vow of Enmity", "For 1 minute — advantage on attacks against one visible creature."]
    ]
  },
  "Паладин Клятвы мести (18 ур.)": {
    name: "Oath of Vengeance Paladin (18th level)",
    senses: "passive Perception 17",
    langs: "Common + any two",
    traits: [
      ["Fighting Style (Dueling)", "+2 to damage rolls with a one-handed melee weapon (included)."],
      ["Divine Smite", "On a hit with a melee weapon — +2d8 radiant damage per 1st-level slot (+1d8 per level above; +1d8 against undead/fiends)."],
      ["Improved Divine Smite", "Each hit with a melee weapon deals an additional 1d8 radiant damage (included in the «Longsword» line)."],
      ["Improved Auras (30 ft.)", "The radius of all auras is 30 ft.: +5 to all saving throws, immunity to being Frightened."],
      ["Relentless Avenger", "After a hitting opportunity attack — movement up to half speed without provoking from the same target."],
      ["Spellcasting", "Spellcasting ability is Charisma (spell save DC 19, +11 to hit). Oath: «bane», «hunter's mark», «hold person», «misty step», «haste», «protection from energy», «banishment», «dimension door», «hold monster», «scrying». 1st level (4 slots): «divine favor», «guiding bolt», «shield of faith». 2nd level (3): «hold person», «misty step», «aid». 3rd level (3): «haste», «protection from energy», «dispel magic». 4th level (3): «banishment», «dimension door», «freedom of movement». 5th level (1): «hold monster»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longsword."],
      ["Longsword", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 11 (1d8 + 7) slashing damage plus 4 (1d8) radiant damage (Improved Divine Smite) (+ Divine Smite from a slot)."],
      ["Lay on Hands", "By touch, heals from a pool (90) hit points; 3 points — cure disease/poison."],
      ["Channel Divinity: Abjure Enemy", "Target within 60 ft.: Wisdom saving throw DC 19."]
    ],
    bonus: [
      ["Channel Divinity: Vow of Enmity", "For 1 minute — advantage on attacks against one visible creature."]
    ],
    reactions: [
      ["Soul of Vengeance", "When a creature under the Vow of Enmity makes an attack roll (against anyone), the paladin uses its reaction to make one melee attack against it."]
    ]
  },
  "Следопыт-охотник (3 ур.)": {
    name: "Hunter Ranger (3rd level)",
    senses: "passive Perception 14",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Archery)", "+2 to attack rolls with ranged weapons (included)."],
      ["Favored Enemy", "Advantage on Wisdom (Survival) checks to track favored enemies and Intelligence checks to recall information about them."],
      ["Natural Explorer", "In familiar terrain the party does not lose its way, moves at full speed while stealthy, and so on."],
      ["Hunter's Prey: Colossus Slayer", "Once per turn, when hitting a creature that has fewer than its maximum hit points, the ranger deals an additional 1d8 weapon damage."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 12, +4 to hit). 1st level (3 slots): «hunter's mark», «cure wounds», «hail of thorns»."]
    ],
    actions: [
      ["Longbow", "Ranged Weapon Attack: +7 to hit, range 150/600 ft. Hit: 7 (1d8 + 3) piercing damage plus 4 (1d8) damage from Colossus Slayer (once per turn) and plus 3 (1d6) damage against a target affected by Hunter's Mark."],
      ["Shortsword", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 6 (1d6 + 3) piercing damage."]
    ],
    bonus: [
      ["«Hunter's Mark»", "Concentration up to 1 hour: marks a visible creature within 90 ft. Weapon attacks against it deal +1d6 damage, and Wisdom (Perception/Survival) checks to find it are made with advantage."]
    ]
  },
  "Следопыт-охотник (7 ур.)": {
    name: "Hunter Ranger (7th level)",
    senses: "passive Perception 16",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Archery)", "+2 to attack rolls with ranged weapons (included)."],
      ["Favored Enemy · Natural Explorer", "See 3rd level."],
      ["Hunter's Prey: Colossus Slayer", "Once per turn — an additional 1d8 damage against a target not at maximum hit points."],
      ["Defensive Tactics: Multiattack Defense", "After a creature's first attack on this turn, all its other attacks against the ranger take −4 to hit (effectively +4 AC against them)."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 14, +6 to hit). 1st level (4 slots): «hunter's mark», «cure wounds», «hail of thorns», «longstrider». 2nd level (3): «spike growth», «pass without trace», «lesser restoration»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longbow."],
      ["Longbow", "Ranged Weapon Attack: +9 to hit, range 150/600 ft. Hit: 8 (1d8 + 4) piercing damage plus 4 (1d8) from Colossus Slayer (once per turn) and +3 (1d6) against a Hunter's Mark target."]
    ],
    bonus: [
      ["«Hunter's Mark»", "Marks a visible creature within 90 ft."]
    ]
  },
  "Следопыт-охотник (13 ур.)": {
    name: "Hunter Ranger (13th level)",
    senses: "passive Perception 19",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Archery)", "+2 to attack rolls with ranged weapons (included)."],
      ["Favored Enemy · Natural Explorer", "See 3rd level."],
      ["Colossus Slayer · Multiattack Defense", "See above."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 17, +9 to hit). 1st level (4 slots): «hunter's mark», «cure wounds», «hail of thorns». 2nd level (3): «spike growth», «pass without trace», «lesser restoration». 3rd level (3): «lightning arrow», «conjure animals», «protection from energy». 4th level (1): «freedom of movement»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longbow."],
      ["Longbow", "Ranged Weapon Attack: +12 to hit, range 150/600 ft. Hit: 9 (1d8 + 5) piercing damage plus 4 (1d8) from Colossus Slayer (once per turn) and +3 (1d6) against a Hunter's Mark target."],
      ["Volley", "A ranged attack against any number of creatures within 10 ft. of a point within 150 ft.; make a separate attack roll against each target: +12 to hit, 9 (1d8 + 5) piercing damage."]
    ],
    bonus: [
      ["«Hunter's Mark»", "Marks a visible creature within 90 ft."]
    ]
  },
  "Следопыт-охотник (18 ур.)": {
    name: "Hunter Ranger (18th level)",
    senses: "blindsight 30 ft. (Feral Senses), passive Perception 21",
    langs: "Common + any two",
    traits: [
      ["Fighting Style (Archery)", "+2 to attack rolls with ranged weapons (included)."],
      ["Favored Enemy · Natural Explorer", "See 3rd level."],
      ["Colossus Slayer · Multiattack Defense · Volley", "See above."],
      ["Hunter's Defense: Evasion", "On a Dexterity saving throw to reduce damage: on a success no damage, on a failure half."],
      ["Feral Senses", "Senses the location of Invisible creatures within 30 ft. (blindsense at that range)."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 19, +11 to hit). 1st level (4 slots): «hunter's mark», «cure wounds», «hail of thorns». 2nd level (3): «spike growth», «pass without trace», «lesser restoration». 3rd level (3): «lightning arrow», «conjure animals», «protection from energy». 4th level (3): «freedom of movement», «stoneskin», «conjure woodland beings». 5th level (1): «swift quiver»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longbow (or four this turn when «Swift Quiver» is active)."],
      ["Longbow", "Ranged Weapon Attack: +13 to hit, range 150/600 ft. Hit: 9 (1d8 + 5) piercing damage plus 4 (1d8) from Colossus Slayer (once per turn) and +3 (1d6) against a Hunter's Mark target."],
      ["Volley", "A ranged attack against any number of creatures within 10 ft. of a point within 150 ft.: +13 to hit each, 9 (1d8 + 5) piercing damage."]
    ],
    bonus: [
      ["«Hunter's Mark»", "Marks a visible creature within 90 ft."],
      ["Swift Quiver (concentration, up to 1 minute)", "While active, as a bonus action on its turn — two attacks with the longbow (the arrows appear on their own); requires concentration."]
    ]
  },
  "Следопыт — повелитель зверей (3 ур.)": {
    name: "Beast Master Ranger (3rd level)",
    senses: "passive Perception 14",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Archery)", "+2 to attack rolls with ranged weapons (included)."],
      ["Favored Enemy · Natural Explorer", "See Hunter 3rd level."],
      ["Beast Companion", "The ranger has trained a beast. On its turn the beast moves and takes reactions on its own; it attacks only on the ranger's command (see bonus actions). The companion shares the ranger's initiative. The beast's profile is a separate block below."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 12, +4 to hit). 1st level (3 slots): «hunter's mark», «cure wounds», «hail of thorns»."]
    ],
    actions: [
      ["Longbow", "Ranged Weapon Attack: +7 to hit, range 150/600 ft. Hit: 7 (1d8 + 3) piercing damage (+1d6 against a Hunter's Mark target)."],
      ["Shortsword", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 6 (1d6 + 3) piercing damage."]
    ],
    bonus: [
      ["«Hunter's Mark»", "Marks a visible creature within 90 ft."],
      ["Command the Beast", "The beast companion makes one attack (see block below)."],
      ["Beast Companion (wolf) — stats", "Large beast. AC 13, HP 16, speed walk 40. Keen Hearing and Smell (advantage on Perception by hearing/smell). Pack Tactics (advantage on the attack if an ally is within 5 ft. of the target). Attack — Bite: +5 to hit, reach 5 ft. Hit: 7 (2d4 + 2) piercing damage; the target must succeed on a Strength saving throw DC 11 or be knocked Prone."]
    ]
  },
  "Следопыт — повелитель зверей (7 ур.)": {
    name: "Beast Master Ranger (7th level)",
    senses: "passive Perception 16",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Archery)", "+2 to attack rolls with ranged weapons (included)."],
      ["Favored Enemy · Natural Explorer", "See 3rd level."],
      ["Beast Companion", "See 3rd level; the beast is strengthened (profile in the block below)."],
      ["Exceptional Training", "On turns when the beast does not attack, the ranger can use a bonus action to command it to take the Dash, Disengage, Dodge, or Help action. The beast's attacks count as magical."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 14, +6 to hit). 1st level (4 slots): «hunter's mark», «cure wounds», «hail of thorns», «longstrider». 2nd level (3): «spike growth», «pass without trace», «beast sense»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longbow."],
      ["Longbow", "Ranged Weapon Attack: +9 to hit, range 150/600 ft. Hit: 8 (1d8 + 4) piercing damage (+1d6 against a Hunter's Mark target)."]
    ],
    bonus: [
      ["«Hunter's Mark»", "Marks a visible creature within 90 ft."],
      ["Command the Beast", "The companion attacks, or (Exceptional Training) takes the Dash/Disengage/Dodge/Help action."],
      ["Beast Companion (dire wolf) — stats", "Large beast. AC 14, HP 32, speed walk 50. Keen Hearing and Smell. Pack Tactics. Attack — Bite: +7 to hit, reach 5 ft. Hit: 12 (2d6 + 4) piercing damage (magical); the target must succeed on a Strength saving throw DC 13 or be knocked Prone."]
    ]
  },
  "Следопыт — повелитель зверей (13 ур.)": {
    name: "Beast Master Ranger (13th level)",
    senses: "passive Perception 19",
    langs: "Common + any one",
    traits: [
      ["Fighting Style (Archery)", "+2 to attack rolls with ranged weapons (included)."],
      ["Favored Enemy · Natural Explorer", "See 3rd level."],
      ["Beast Companion · Exceptional Training", "See 7th level."],
      ["Bestial Fury", "When the ranger commands the beast to attack, it makes TWO attacks."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 17, +9 to hit). 1st level (4 slots): «hunter's mark», «cure wounds», «hail of thorns». 2nd level (3): «spike growth», «pass without trace», «lesser restoration». 3rd level (3): «lightning arrow», «conjure animals», «protection from energy». 4th level (1): «freedom of movement»."]
    ],
    actions: [
      ["Multiattack", "Two attacks with the longbow."],
      ["Longbow", "Ranged Weapon Attack: +12 to hit, range 150/600 ft. Hit: 9 (1d8 + 5) piercing damage (+1d6 against a Hunter's Mark target)."]
    ],
    bonus: [
      ["«Hunter's Mark»", "Marks a visible creature within 90 ft."],
      ["Command the Beast", "The companion makes TWO attacks (Bestial Fury)."],
      ["Beast Companion (saber-toothed tiger) — stats", "Large beast. AC 13, HP 64, speed walk 40. Keen Hearing and Smell. Pounce attack: if the tiger moves at least 20 ft. straight toward a target on its turn and then hits it with a Claw, the target makes a Strength saving throw DC 14 or be knocked Prone. Multiattack — Bite + Claw. Bite: +8 to hit, 11 (1d10 + 6) piercing damage (magical). Claw: +8 to hit, 13 (2d6 + 6) slashing damage (magical)."]
    ]
  }
}
export default PART
