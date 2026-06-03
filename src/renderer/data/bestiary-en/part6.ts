const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  "Бард Коллегии Знаний (18 ур.)": {
    name: "College of Lore Bard (18th Level)",
    senses: "passive Perception 17",
    langs: "Common plus any five",
    traits: [
      ["Jack of All Trades", "The bard adds +1 (half its proficiency bonus) to ability checks it isn't proficient in."],
      ["Additional Magical Secrets", "The bard has access to 2 spells from any class (level 9 or lower) — included in the list below."],
      ["Peerless Skill", "The bard can expend a use of Bardic Inspiration to add the die to one of its own ability checks (as a Bonus Action before the roll)."],
      ["Spellcasting", "The bard's spellcasting ability is Charisma (spell save DC 19, +11 to hit). Cantrips (at will): «vicious mockery», «minor illusion», «prestidigitation», «light». 1st level (4 slots): «healing word», «dissonant whispers», «faerie fire». 2nd level (3 slots): «hold person», «invisibility», «enhance ability». 3rd level (3 slots): «hypnotic pattern», «fear», «dispel magic». 4th level (3 slots): «polymorph», «confusion», «counterspell». 5th level (3 slots): «dominate person», «mass cure wounds», «hold monster». 6th level (1 slot): «true seeing». 7th level (1 slot): «forcecage». 8th level (1 slot): «dominate monster». 9th level (1 slot): «power word kill»."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 8 (1d8 + 4) piercing damage."],
      ["Vicious Mockery (Cantrip)", "A target within 60 ft. that can hear the bard: Wisdom saving throw DC 19, or take 4d4 psychic damage and have disadvantage on its next attack roll."],
    ],
    bonus: [
      ["Bardic Inspiration (5/Day, d12)", "To an ally within 60 ft. Recharges after a short or long rest."],
    ],
    reactions: [
      ["Cutting Words", "The bard expends a use of Bardic Inspiration and subtracts the rolled d12 from another creature's attack roll, ability check, or damage roll."],
    ],
  },
  "Бард Коллегии Доблести (3 ур.)": {
    name: "College of Valor Bard (3rd Level)",
    senses: "passive Perception 11",
    langs: "Common plus any two",
    traits: [
      ["Jack of All Trades", "The bard adds +1 (half its proficiency bonus) to ability checks it isn't proficient in."],
      ["Spellcasting", "The bard's spellcasting ability is Charisma (spell save DC 13, +5 to hit). Cantrips (at will): «vicious mockery», «blade ward». 1st level (4 slots): «healing word», «heroism», «thunderwave», «faerie fire». 2nd level (2 slots): «hold person», «enhance ability»."],
    ],
    actions: [
      ["Rapier", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 7 (1d8 + 3) piercing damage."],
      ["Vicious Mockery (Cantrip)", "A target within 60 ft. that can hear the bard: Wisdom saving throw DC 13, or take 1d4 psychic damage and have disadvantage on its next attack roll."],
    ],
    bonus: [
      ["Bardic Inspiration (3/Day, d6)", "To an ally within 60 ft."],
    ],
    reactions: [
      ["Combat Inspiration", "A creature with a Bardic Inspiration die from the bard can, as a reaction, roll the d6 and add it to its AC against one attack (or, without a reaction, add it to the damage roll of its attack on its turn)."],
    ],
  },
  "Бард Коллегии Доблести (7 ур.)": {
    name: "College of Valor Bard (7th Level)",
    senses: "passive Perception 11",
    langs: "Common plus any three",
    traits: [
      ["Jack of All Trades", "The bard adds +1 (half its proficiency bonus) to ability checks it isn't proficient in."],
      ["Extra Attack", "On its Attack action the bard makes two melee weapon strikes (factored into Multiattack)."],
      ["Spellcasting", "The bard's spellcasting ability is Charisma (spell save DC 15, +7 to hit). Cantrips (at will): «vicious mockery», «blade ward», «light». 1st level (4 slots): «healing word», «heroism», «thunderwave», «faerie fire». 2nd level (3 slots): «hold person», «enhance ability», «blur». 3rd level (3 slots): «hypnotic pattern», «dispel magic», «fear». 4th level (1 slot): «polymorph»."],
    ],
    actions: [
      ["Multiattack", "Two rapier attacks."],
      ["Rapier", "Melee Weapon Attack: +6 to hit, reach 5 ft. Hit: 7 (1d8 + 3) piercing damage."],
      ["Vicious Mockery (Cantrip)", "A target within 60 ft. that can hear the bard: Wisdom saving throw DC 15, or take 2d4 psychic damage and have disadvantage on its next attack roll."],
    ],
    bonus: [
      ["Bardic Inspiration (4/Day, d8)", "To an ally within 60 ft. Recharges after a short or long rest."],
    ],
    reactions: [
      ["Combat Inspiration", "A creature with a Bardic Inspiration die can, as a reaction, roll the d8 and add it to its AC against one attack."],
    ],
  },
  "Бард Коллегии Доблести (13 ур.)": {
    name: "College of Valor Bard (13th Level)",
    senses: "passive Perception 11",
    langs: "Common plus any four",
    traits: [
      ["Jack of All Trades", "The bard adds +1 (half its proficiency bonus) to ability checks it isn't proficient in."],
      ["Extra Attack", "On its Attack action the bard makes two melee weapon strikes (factored into Multiattack)."],
      ["Spellcasting", "The bard's spellcasting ability is Charisma (spell save DC 18, +10 to hit). Cantrips (at will): «vicious mockery», «blade ward», «light», «minor illusion». 1st level (4 slots): «healing word», «heroism», «thunderwave». 2nd level (3 slots): «hold person», «enhance ability», «blur». 3rd level (3 slots): «hypnotic pattern», «dispel magic», «fear». 4th level (3 slots): «polymorph», «confusion», «dimension door». 5th level (2 slots): «dominate person», «mass cure wounds». 6th level (1 slot): «true seeing». 7th level (1 slot): «resurrection»."],
    ],
    actions: [
      ["Multiattack", "Two rapier attacks."],
      ["Rapier", "Melee Weapon Attack: +8 to hit, reach 5 ft. Hit: 8 (1d8 + 4) piercing damage."],
      ["Vicious Mockery (Cantrip)", "A target within 60 ft. that can hear the bard: Wisdom saving throw DC 18, or take 3d4 psychic damage and have disadvantage on its next attack roll."],
    ],
    bonus: [
      ["Bardic Inspiration (5/Day, d10)", "To an ally within 60 ft. Recharges after a short or long rest."],
    ],
    reactions: [
      ["Combat Inspiration", "A creature with a Bardic Inspiration die can, as a reaction, roll the d10 and add it to its AC against one attack."],
    ],
  },
  "Бард Коллегии Доблести (18 ур.)": {
    name: "College of Valor Bard (18th Level)",
    senses: "passive Perception 12",
    langs: "Common plus any five",
    traits: [
      ["Jack of All Trades", "The bard adds +1 (half its proficiency bonus) to ability checks it isn't proficient in."],
      ["Extra Attack", "On its Attack action the bard makes two melee weapon strikes (factored into Multiattack)."],
      ["Battle Magic", "After casting a spell with its action, the bard can make one weapon attack as a Bonus Action (factored into Bonus Actions)."],
      ["Spellcasting", "The bard's spellcasting ability is Charisma (spell save DC 19, +11 to hit). Cantrips (at will): «vicious mockery», «blade ward», «light», «minor illusion». 1st level (4 slots): «healing word», «heroism», «thunderwave». 2nd level (3 slots): «hold person», «enhance ability», «blur». 3rd level (3 slots): «hypnotic pattern», «dispel magic», «fear». 4th level (3 slots): «polymorph», «confusion», «dimension door». 5th level (3 slots): «dominate person», «mass cure wounds», «hold monster». 6th level (1 slot): «true seeing». 7th level (1 slot): «resurrection». 8th level (1 slot): «dominate monster». 9th level (1 slot): «foresight»."],
    ],
    actions: [
      ["Multiattack", "Two rapier attacks."],
      ["Rapier", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 8 (1d8 + 4) piercing damage."],
      ["Vicious Mockery (Cantrip)", "A target within 60 ft. that can hear the bard: Wisdom saving throw DC 19, or take 4d4 psychic damage and have disadvantage on its next attack roll."],
    ],
    bonus: [
      ["Bardic Inspiration (5/Day, d12)", "To an ally within 60 ft. Recharges after a short or long rest."],
      ["Battle Magic", "After a spell cast with its action this turn, as a Bonus Action — one rapier attack."],
    ],
    reactions: [
      ["Combat Inspiration", "A creature with a Bardic Inspiration die can, as a reaction, roll the d12 and add it to its AC against one attack."],
    ],
  },
  "Жрец домена Жизни (3 ур.)": {
    name: "Life Domain Priest (3rd Level)",
    senses: "passive Perception 15",
    langs: "Common plus any one",
    traits: [
      ["Disciple of Life", "When the priest casts a healing spell of 1st level or higher, the target regains additional hit points equal to 2 + the spell's level."],
      ["Spellcasting", "The priest's spellcasting ability is Wisdom (spell save DC 13, +5 to hit). Cantrips (at will): «sacred flame», «guidance», «light». Domain (always prepared): «bless», «cure wounds». 1st level (4 slots): «guiding bolt», «shield of faith», «healing word», «command». 2nd level (2 slots): «spiritual weapon», «hold person»."],
    ],
    actions: [
      ["Mace", "Melee Weapon Attack: +3 to hit, reach 5 ft. Hit: 4 (1d6 + 1) bludgeoning damage."],
      ["Sacred Flame (Cantrip)", "A target within 60 ft.: Dexterity saving throw DC 13 (cover doesn't help), taking 1d8 radiant damage on a failure."],
      ["Channel Divinity: Preserve Life", "The priest distributes healing equal to 5 × its level among creatures within 30 ft.; it can't raise a creature above half its hit point maximum; the healing doesn't help undead or constructs. (1 Channel use per short or long rest.)"],
    ],
    bonus: [
      ["Spiritual Weapon", "When casting «spiritual weapon», the priest creates a spectral weapon for 1 minute; as a Bonus Action it moves the weapon up to 20 ft. and makes an attack: +5 to hit, 8 (1d8 + 3) force damage."],
    ],
  },
  "Жрец домена Жизни (7 ур.)": {
    name: "Life Domain Priest (7th Level)",
    senses: "passive Perception 17",
    langs: "Common plus any one",
    traits: [
      ["Disciple of Life", "A healing spell of 1st level or higher restores additional hit points equal to 2 + the spell's level."],
      ["Blessed Healer", "When the priest heals a creature (other than itself) with a spell of 1st level or higher, it regains 2 + the spell's level hit points itself."],
      ["Spellcasting", "The priest's spellcasting ability is Wisdom (spell save DC 15, +7 to hit). Cantrips (at will): «sacred flame», «guidance», «light». Domain (always prepared): «bless», «cure wounds», «lesser restoration», «spiritual weapon», «beacon of hope», «revivify». 1st level (4 slots): «guiding bolt», «shield of faith», «healing word», «command». 2nd level (3 slots): «hold person», «lesser restoration», «calm emotions». 3rd level (3 slots): «spirit guardians», «dispel magic», «revivify». 4th level (1 slot): «death ward»."],
    ],
    actions: [
      ["Mace", "Melee Weapon Attack: +4 to hit, reach 5 ft. Hit: 4 (1d6 + 1) bludgeoning damage."],
      ["Sacred Flame (Cantrip)", "A target within 60 ft.: Dexterity saving throw DC 15, taking 2d8 radiant damage on a failure."],
      ["Channel Divinity: Preserve Life", "Healing 5 × level among creatures within 30 ft. (2 uses per short or long rest)."],
    ],
    bonus: [
      ["Spiritual Weapon", "As a Bonus Action — attack with the spectral weapon: +7 to hit, 8 (1d8 + 4) force damage."],
    ],
  },
  "Жрец домена Жизни (13 ур.)": {
    name: "Life Domain Priest (13th Level)",
    senses: "passive Perception 20",
    langs: "Common plus any two",
    traits: [
      ["Disciple of Life", "A healing spell restores additional hit points equal to 2 + the spell's level."],
      ["Blessed Healer", "When healing others (not itself) — regains 2 + the spell's level hit points itself."],
      ["Divine Strike (1d8)", "Once per turn, on a hit with a weapon the priest deals an additional 1d8 radiant damage (factored into the «Mace» line)."],
      ["Spellcasting", "The priest's spellcasting ability is Wisdom (spell save DC 18, +10 to hit). Cantrips (at will): «sacred flame», «guidance», «light». Domain (always prepared): «bless», «cure wounds», «lesser restoration», «spiritual weapon», «beacon of hope», «revivify», «death ward», «guardian of faith», «mass cure wounds», «raise dead». 1st level (4 slots): «guiding bolt», «shield of faith», «healing word». 2nd level (3 slots): «hold person», «lesser restoration», «spiritual weapon». 3rd level (3 slots): «spirit guardians», «dispel magic», «revivify». 4th level (3 slots): «death ward», «guardian of faith», «banishment». 5th level (2 slots): «mass cure wounds», «flame strike». 6th level (1 slot): «heal». 7th level (1 slot): «divine word»."],
    ],
    actions: [
      ["Mace", "Melee Weapon Attack: +6 to hit, reach 5 ft. Hit: 4 (1d6 + 1) bludgeoning damage plus 4 (1d8) radiant damage (Divine Strike)."],
      ["Sacred Flame (Cantrip)", "A target within 60 ft.: Dexterity saving throw DC 18, taking 3d8 radiant damage on a failure."],
      ["Channel Divinity: Preserve Life", "Healing 5 × level among creatures within 30 ft. (2 uses)."],
    ],
    bonus: [
      ["Spiritual Weapon", "As a Bonus Action — attack with the spectral weapon: +10 to hit, 9 (1d8 + 5) force damage."],
    ],
  },
  "Жрец домена Жизни (18 ур.)": {
    name: "Life Domain Priest (18th Level)",
    senses: "passive Perception 21",
    langs: "Common plus any three",
    traits: [
      ["Disciple of Life", "A healing spell restores additional hit points equal to 2 + the spell's level."],
      ["Blessed Healer", "When healing others (not itself) — regains 2 + the spell's level hit points itself."],
      ["Supreme Healing", "Healing dice from the priest's spells are treated as having rolled their maximum."],
      ["Divine Strike (2d8)", "Once per turn, on a hit with a weapon the priest deals an additional 2d8 radiant damage (factored into the «Mace» line)."],
      ["Spellcasting", "The priest's spellcasting ability is Wisdom (spell save DC 19, +11 to hit). Cantrips (at will): «sacred flame», «guidance», «light». 1st level (4 slots): «guiding bolt», «shield of faith», «healing word». 2nd level (3 slots): «hold person», «lesser restoration», «spiritual weapon». 3rd level (3 slots): «spirit guardians», «dispel magic», «revivify». 4th level (3 slots): «death ward», «guardian of faith», «banishment». 5th level (3 slots): «mass cure wounds», «flame strike», «greater restoration». 6th level (1 slot): «heal». 7th level (1 slot): «divine word». 8th level (1 slot): «holy aura». 9th level (1 slot): «mass heal»."],
    ],
    actions: [
      ["Mace", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 4 (1d6 + 1) bludgeoning damage plus 9 (2d8) radiant damage (Divine Strike)."],
      ["Sacred Flame (Cantrip)", "A target within 60 ft.: Dexterity saving throw DC 19, taking 4d8 radiant damage on a failure."],
      ["Channel Divinity: Preserve Life", "Healing 5 × level among creatures within 30 ft. (3 uses)."],
    ],
    bonus: [
      ["Spiritual Weapon", "As a Bonus Action — attack with the spectral weapon: +11 to hit, 9 (1d8 + 5) force damage."],
    ],
  },
  "Жрец домена Света (3 ур.)": {
    name: "Light Domain Priest (3rd Level)",
    senses: "passive Perception 15",
    langs: "Common plus any one",
    traits: [
      ["Spellcasting", "The priest's spellcasting ability is Wisdom (spell save DC 13, +5 to hit). Cantrips (at will): «sacred flame», «light», «guidance». Domain (always prepared): «burning hands», «faerie fire». 1st level (4 slots): «guiding bolt», «healing word», «command», «shield of faith». 2nd level (2 slots): «flaming sphere», «scorching ray»."],
    ],
    actions: [
      ["Mace", "Melee Weapon Attack: +2 to hit, reach 5 ft. Hit: 3 (1d6) bludgeoning damage."],
      ["Sacred Flame (Cantrip)", "A target within 60 ft.: Dexterity saving throw DC 13, taking 1d8 radiant damage on a failure."],
      ["Scorching Ray", "Three rays, ranged spell attack: +5 to hit each, range 120 ft. Hit: 6 (2d6) fire damage per ray."],
      ["Channel Divinity: Radiance of the Dawn", "Dispels magical darkness within 30 ft.; each creature there makes a Constitution saving throw DC 13, or takes 2d10 + the priest's level radiant damage (half on a success). 1 Channel use."],
    ],
    reactions: [
      ["Warding Flare", "When a creature the priest can see within 30 ft. makes an attack roll against it, the priest can, as a reaction, impose disadvantage on that roll. Number of uses = its Wisdom modifier per long rest."],
    ],
  },
  "Жрец домена Света (7 ур.)": {
    name: "Light Domain Priest (7th Level)",
    senses: "passive Perception 17",
    langs: "Common plus any one",
    traits: [
      ["Improved Warding Flare", "Warding Flare can also shield other creatures within 30 ft., imposing disadvantage on attacks against them."],
      ["Spellcasting", "The priest's spellcasting ability is Wisdom (spell save DC 15, +7 to hit). Cantrips (at will): «sacred flame», «light», «guidance». Domain (always prepared): «burning hands», «faerie fire», «flaming sphere», «scorching ray», «daylight», «fireball». 1st level (4 slots): «guiding bolt», «healing word», «command». 2nd level (3 slots): «scorching ray», «hold person», «lesser restoration». 3rd level (3 slots): «fireball», «dispel magic», «spirit guardians». 4th level (1 slot): «wall of fire»."],
    ],
    actions: [
      ["Mace", "Melee Weapon Attack: +3 to hit, reach 5 ft. Hit: 3 (1d6) bludgeoning damage."],
      ["Sacred Flame (Cantrip)", "A target within 60 ft.: Dexterity saving throw DC 15, taking 2d8 radiant damage on a failure."],
      ["Fireball", "A 20-ft.-radius sphere at a point within 150 ft.: Dexterity saving throw DC 15, taking 28 (8d6) fire damage on a failure, half on a success."],
      ["Channel Divinity: Radiance of the Dawn", "2d10 + level radiant damage, DC 15 (2 uses)."],
    ],
    reactions: [
      ["Warding Flare", "Disadvantage on an attack roll against the priest or an ally within 30 ft. (number of uses = its Wisdom modifier)."],
    ],
  },
  "Жрец домена Света (13 ур.)": {
    name: "Light Domain Priest (13th Level)",
    senses: "passive Perception 20",
    langs: "Common plus any two",
    traits: [
      ["Improved Warding Flare", "Warding Flare can also shield other creatures within 30 ft."],
      ["Potent Spellcasting", "The priest adds its Wisdom modifier (+5) to the damage of its cantrips."],
      ["Spellcasting", "The priest's spellcasting ability is Wisdom (spell save DC 18, +10 to hit). Cantrips (at will): «sacred flame» (with +5 damage), «light», «guidance». Domain (always prepared): «burning hands», «faerie fire», «flaming sphere», «scorching ray», «daylight», «fireball», «guardian of faith», «wall of fire», «flame strike», «scrying». 1st level (4 slots): «guiding bolt», «healing word», «command». 2nd level (3 slots): «scorching ray», «hold person», «lesser restoration». 3rd level (3 slots): «fireball», «dispel magic», «spirit guardians». 4th level (3 slots): «wall of fire», «banishment», «guardian of faith». 5th level (2 slots): «flame strike», «summon celestial». 6th level (1 slot): «chain lightning». 7th level (1 slot): «fire storm»."],
    ],
    actions: [
      ["Mace", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 3 (1d6) bludgeoning damage."],
      ["Sacred Flame (Cantrip)", "A target within 60 ft.: Dexterity saving throw DC 18, taking 3d8 + 5 radiant damage on a failure."],
      ["Flame Strike", "A 10-ft.-radius, 40-ft.-high column of fire within 60 ft.: Dexterity saving throw DC 18, taking 14 (4d6) fire plus 14 (4d6) radiant damage on a failure, half on a success."],
      ["Channel Divinity: Radiance of the Dawn", "2d10 + level radiant damage, DC 18 (3 uses)."],
    ],
    reactions: [
      ["Warding Flare", "Disadvantage on an attack roll against the priest or an ally within 30 ft."],
    ],
  },
  "Жрец домена Света (18 ур.)": {
    name: "Light Domain Priest (18th Level)",
    senses: "passive Perception 21",
    langs: "Common plus any three",
    traits: [
      ["Improved Warding Flare", "Warding Flare can also shield other creatures within 30 ft."],
      ["Potent Spellcasting", "The priest adds its Wisdom modifier (+5) to the damage of its cantrips."],
      ["Corona of Light", "As an action the priest creates a 60-ft. aura of light for 1 minute; it and allies within it can impose disadvantage on the saving throws of creatures that take fire or radiant damage from the priest's spells."],
      ["Spellcasting", "The priest's spellcasting ability is Wisdom (spell save DC 19, +11 to hit). Cantrips (at will): «sacred flame» (with +5 damage), «light», «guidance». 1st level (4 slots): «guiding bolt», «healing word», «command». 2nd level (3 slots): «scorching ray», «hold person», «lesser restoration». 3rd level (3 slots): «fireball», «dispel magic», «spirit guardians». 4th level (3 slots): «wall of fire», «banishment», «guardian of faith». 5th level (3 slots): «flame strike», «summon celestial», «mass cure wounds». 6th level (1 slot): «chain lightning». 7th level (1 slot): «fire storm». 8th level (1 slot): «sunburst». 9th level (1 slot): «meteor swarm»."],
    ],
    actions: [
      ["Mace", "Melee Weapon Attack: +6 to hit, reach 5 ft. Hit: 3 (1d6) bludgeoning damage."],
      ["Sacred Flame (Cantrip)", "A target within 60 ft.: Dexterity saving throw DC 19, taking 4d8 + 5 radiant damage on a failure."],
      ["Meteor Swarm", "Four 40-ft.-radius spheres of fire within 1 mile: Dexterity saving throw DC 19, taking 140 (40d6) damage on a failure (half fire, half bludgeoning), half on a success."],
      ["Channel Divinity: Radiance of the Dawn", "2d10 + level radiant damage, DC 19 (3 uses)."],
    ],
    reactions: [
      ["Warding Flare", "Disadvantage on an attack roll against the priest or an ally within 30 ft."],
    ],
  },
  "Жрец домена Войны (3 ур.)": {
    name: "War Domain Priest (3rd Level)",
    senses: "passive Perception 15",
    langs: "Common plus any one",
    traits: [
      ["Spellcasting", "The priest's spellcasting ability is Wisdom (spell save DC 13, +5 to hit). Cantrips (at will): «sacred flame», «guidance», «light». Domain (always prepared): «divine favor», «shield of faith». 1st level (4 slots): «guiding bolt», «healing word», «command», «bless». 2nd level (2 slots): «spiritual weapon», «hold person»."],
    ],
    actions: [
      ["Warhammer", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 7 (1d8 + 3) bludgeoning damage."],
      ["Sacred Flame (Cantrip)", "A target within 60 ft.: Dexterity saving throw DC 13, taking 1d8 radiant damage on a failure."],
      ["Channel Divinity: Guided Strike", "After making or seeing an attack roll, the priest adds +10 to the result."],
    ],
    bonus: [
      ["War Priest", "After taking the Attack action on its turn, the priest can make one additional weapon attack as a Bonus Action. Number of uses = its Wisdom modifier per long rest."],
      ["Spiritual Weapon", "When casting «spiritual weapon», it creates a spectral weapon for 1 minute; as a Bonus Action — attack: +5 to hit, 7 (1d8 + 3) force damage."],
    ],
  },
  "Жрец домена Войны (7 ур.)": {
    name: "War Domain Priest (7th Level)",
    senses: "passive Perception 17",
    langs: "Common plus any one",
    traits: [
      ["Spellcasting", "The priest's spellcasting ability is Wisdom (spell save DC 15, +7 to hit). Cantrips (at will): «sacred flame», «guidance», «light». Domain (always prepared): «divine favor», «shield of faith», «magic weapon», «spiritual weapon», «crusader's mantle», «spirit guardians». 1st level (4 slots): «guiding bolt», «healing word», «command», «bless». 2nd level (3 slots): «hold person», «lesser restoration», «calm emotions». 3rd level (3 slots): «spirit guardians», «crusader's mantle», «dispel magic». 4th level (1 slot): «freedom of movement»."],
    ],
    actions: [
      ["Multiattack", "Two warhammer attacks."],
      ["Warhammer", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 8 (1d8 + 4) bludgeoning damage."],
      ["Sacred Flame (Cantrip)", "A target within 60 ft.: Dexterity saving throw DC 15, taking 2d8 radiant damage on a failure."],
      ["Channel Divinity: Guided Strike", "+10 to an attack roll (its own or an ally's)."],
    ],
    bonus: [
      ["War Priest", "As a Bonus Action — an additional warhammer attack after the Attack action."],
      ["Spiritual Weapon", "As a Bonus Action — attack with the spectral weapon: +7 to hit, 8 (1d8 + 4) force damage."],
    ],
    reactions: [
      ["War God's Blessing", "When a creature within 30 ft. makes an attack roll, the priest adds +10 to that roll (expends a Channel Divinity use)."],
    ],
  },
  "Жрец домена Войны (13 ур.)": {
    name: "War Domain Priest (13th Level)",
    senses: "passive Perception 20",
    langs: "Common plus any two",
    traits: [
      ["Divine Strike (1d8)", "Once per turn, on a hit with a weapon the priest deals an additional 1d8 radiant damage (factored into the «Warhammer» line)."],
      ["Spellcasting", "The priest's spellcasting ability is Wisdom (spell save DC 18, +10 to hit). Cantrips (at will): «sacred flame», «guidance», «light». Domain (always prepared): «divine favor», «shield of faith», «magic weapon», «spiritual weapon», «crusader's mantle», «spirit guardians», «freedom of movement», «stoneskin», «flame strike», «hold monster». 1st level (4 slots): «guiding bolt», «healing word», «command», «bless». 2nd level (3 slots): «hold person», «lesser restoration», «spiritual weapon». 3rd level (3 slots): «spirit guardians», «crusader's mantle», «dispel magic». 4th level (3 slots): «freedom of movement», «stoneskin», «banishment». 5th level (2 slots): «flame strike», «hold monster». 6th level (1 slot): «blade barrier». 7th level (1 slot): «divine word»."],
    ],
    actions: [
      ["Multiattack", "Two warhammer attacks."],
      ["Warhammer", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) bludgeoning damage plus 4 (1d8) radiant damage (Divine Strike)."],
      ["Sacred Flame (Cantrip)", "A target within 60 ft.: Dexterity saving throw DC 18, taking 3d8 radiant damage on a failure."],
      ["Channel Divinity: Guided Strike", "+10 to an attack roll."],
    ],
    bonus: [
      ["War Priest", "As a Bonus Action — an additional warhammer attack."],
      ["Spiritual Weapon", "As a Bonus Action — attack with the spectral weapon: +10 to hit, 9 (1d8 + 5) force damage."],
    ],
    reactions: [
      ["War God's Blessing", "+10 to the attack roll of an ally within 30 ft. (expends a Channel Divinity use)."],
    ],
  },
  "Жрец домена Войны (18 ур.)": {
    name: "War Domain Priest (18th Level)",
    senses: "passive Perception 21",
    langs: "Common plus any three",
    traits: [
      ["Avatar of Battle", "Resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks."],
      ["Divine Strike (2d8)", "Once per turn, on a hit with a weapon the priest deals an additional 2d8 radiant damage (factored into the «Warhammer» line)."],
      ["Spellcasting", "The priest's spellcasting ability is Wisdom (spell save DC 19, +11 to hit). Cantrips (at will): «sacred flame», «guidance», «light». 1st level (4 slots): «guiding bolt», «healing word», «command», «bless». 2nd level (3 slots): «hold person», «lesser restoration», «spiritual weapon». 3rd level (3 slots): «spirit guardians», «crusader's mantle», «dispel magic». 4th level (3 slots): «freedom of movement», «stoneskin», «banishment». 5th level (3 slots): «flame strike», «hold monster», «mass cure wounds». 6th level (1 slot): «blade barrier». 7th level (1 slot): «divine word». 8th level (1 slot): «holy aura». 9th level (1 slot): «meteor swarm»."],
    ],
    actions: [
      ["Multiattack", "Two warhammer attacks."],
      ["Warhammer", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 9 (1d8 + 5) bludgeoning damage plus 9 (2d8) radiant damage (Divine Strike)."],
      ["Sacred Flame (Cantrip)", "A target within 60 ft.: Dexterity saving throw DC 19, taking 4d8 radiant damage on a failure."],
      ["Channel Divinity: Guided Strike", "+10 to an attack roll."],
    ],
    bonus: [
      ["War Priest", "As a Bonus Action — an additional warhammer attack."],
      ["Spiritual Weapon", "As a Bonus Action — attack with the spectral weapon: +11 to hit, 9 (1d8 + 5) force damage."],
    ],
    reactions: [
      ["War God's Blessing", "+10 to the attack roll of an ally within 30 ft. (expends a Channel Divinity use)."],
    ],
  },
  "Воин-чемпион (3 ур.)": {
    name: "Champion Fighter (3rd Level)",
    senses: "passive Perception 13",
    langs: "Common",
    traits: [
      ["Fighting Style (Great Weapon Fighting)", "Rerolls 1s and 2s on the damage dice of two-handed melee weapons (factored into the averages)."],
      ["Improved Critical", "The fighter's weapon attacks score a critical hit on a roll of 19–20."],
    ],
    actions: [
      ["Greatsword", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 10 (2d6 + 3) slashing damage."],
      ["Heavy Crossbow", "Ranged Weapon Attack: +4 to hit, range 100/400 ft. Hit: 8 (1d10 + 2) piercing damage."],
    ],
    bonus: [
      ["Second Wind (1/Short Rest)", "As a Bonus Action the fighter regains 1d10 + 3 hit points."],
      ["Action Surge (1/Short Rest)", "On its turn the fighter takes one additional action."],
    ],
  },
  "Воин-чемпион (7 ур.)": {
    name: "Champion Fighter (7th Level)",
    senses: "passive Perception 14",
    langs: "Common",
    traits: [
      ["Fighting Style (Great Weapon Fighting)", "Rerolls 1s and 2s on the damage dice of two-handed melee weapons."],
      ["Improved Critical", "Critical on 19–20."],
      ["Remarkable Athlete", "Adds half its proficiency bonus (rounded up) to Strength, Dexterity, and Constitution checks it isn't proficient in; on a running long jump it covers extra feet equal to its Strength modifier."],
    ],
    actions: [
      ["Multiattack", "Two greatsword attacks."],
      ["Greatsword", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 11 (2d6 + 4) slashing damage."],
      ["Heavy Crossbow", "Ranged Weapon Attack: +5 to hit, range 100/400 ft. Hit: 9 (1d10 + 2) piercing damage."],
    ],
    bonus: [
      ["Second Wind (1/Short Rest)", "As a Bonus Action the fighter regains 1d10 + 7 hit points."],
      ["Action Surge (1/Short Rest)", "On its turn the fighter takes one additional action."],
    ],
  },
  "Воин-чемпион (13 ур.)": {
    name: "Champion Fighter (13th Level)",
    senses: "passive Perception 16",
    langs: "Common",
    traits: [
      ["Fighting Style (Great Weapon Fighting)", "Rerolls 1s and 2s on the damage dice of two-handed melee weapons."],
      ["Improved Critical", "Critical on 19–20."],
      ["Remarkable Athlete", "Half its proficiency bonus to Strength/Dexterity/Constitution checks without proficiency; a long jump gains extra feet equal to its Strength modifier."],
      ["Indomitable (2/Day)", "Rerolls one failed saving throw."],
    ],
    actions: [
      ["Multiattack", "Three greatsword attacks."],
      ["Greatsword", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 12 (2d6 + 5) slashing damage."],
    ],
    bonus: [
      ["Second Wind (1/Short Rest)", "As a Bonus Action the fighter regains 1d10 + 13 hit points."],
      ["Action Surge (1/Short Rest)", "On its turn the fighter takes one additional action."],
    ],
  },
  "Воин-чемпион (18 ур.)": {
    name: "Champion Fighter (18th Level)",
    senses: "passive Perception 17",
    langs: "Common",
    traits: [
      ["Fighting Style (Great Weapon Fighting)", "Rerolls 1s and 2s on the damage dice of two-handed melee weapons."],
      ["Superior Critical", "The fighter's weapon attacks score a critical hit on a roll of 18–20."],
      ["Remarkable Athlete", "Half its proficiency bonus to Strength/Dexterity/Constitution checks without proficiency."],
      ["Survivor", "At the start of its turn, if the fighter has no more than half its hit points (and not 0), it regains 5 + its Constitution modifier (10) hit points."],
      ["Indomitable (3/Day)", "Rerolls a failed saving throw."],
    ],
    actions: [
      ["Multiattack", "Three greatsword attacks."],
      ["Greatsword", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 12 (2d6 + 5) slashing damage."],
    ],
    bonus: [
      ["Second Wind (1/Short Rest)", "As a Bonus Action the fighter regains 1d10 + 18 hit points."],
      ["Action Surge (2/Short Rest)", "On its turn the fighter takes one additional action."],
    ],
  },
  "Воин — мастер боевых искусств (3 ур.)": {
    name: "Battle Master Fighter (3rd Level)",
    senses: "passive Perception 13",
    langs: "Common",
    traits: [
      ["Fighting Style (Dueling)", "+2 to damage rolls with a one-handed melee weapon when no other weapon is in the other hand."],
      ["Combat Superiority", "The fighter knows several maneuvers and has 4 superiority dice (d8). Maneuver save DC = 8 + proficiency bonus + Strength modifier = 13. The dice recharge after a short or long rest."],
    ],
    actions: [
      ["Longsword", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 7 (1d8 + 3) slashing damage; when using a maneuver — an additional 1d8 damage."],
      ["Maneuver: Menacing Attack", "On a hit with a weapon the fighter expends a superiority die, adding 1d8 to the damage; the target must succeed on a Wisdom saving throw DC 13 or be Frightened until the end of the fighter's next turn."],
    ],
    bonus: [
      ["Second Wind (1/Short Rest)", "As a Bonus Action the fighter regains 1d10 + 3 hit points."],
      ["Action Surge (1/Short Rest)", "On its turn the fighter takes one additional action."],
    ],
    reactions: [
      ["Maneuver: Riposte", "When a creature misses the fighter with a melee attack, the fighter can, as a reaction, make a melee attack against it and expend a superiority die, adding 1d8 to the damage."],
    ],
  },
  "Воин — мастер боевых искусств (7 ур.)": {
    name: "Battle Master Fighter (7th Level)",
    senses: "passive Perception 14",
    langs: "Common",
    traits: [
      ["Fighting Style (Dueling)", "+2 to damage rolls with a one-handed melee weapon."],
      ["Combat Superiority", "5 superiority dice (d8); maneuver DC 15. Knows the Know Your Enemy maneuver (outside combat, after 1 minute of study of a target — learns two characteristics from among its STR/DEX/CON/AC/current hit points/levels)."],
    ],
    actions: [
      ["Multiattack", "Two longsword attacks."],
      ["Longsword", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 8 (1d8 + 4) slashing damage; with a maneuver — an additional 1d8."],
      ["Maneuver: Trip Attack", "On a hit with a weapon the fighter expends a superiority die, adding 1d8 to the damage; a target no larger than Large must succeed on a Strength saving throw DC 15 or be knocked Prone."],
    ],
    bonus: [
      ["Second Wind (1/Short Rest)", "As a Bonus Action the fighter regains 1d10 + 7 hit points."],
      ["Action Surge (1/Short Rest)", "On its turn the fighter takes one additional action."],
    ],
    reactions: [
      ["Maneuver: Riposte", "As a reaction, attacks the creature that missed with +1d8 damage (expends a superiority die)."],
    ],
  },
  "Воин — мастер боевых искусств (13 ур.)": {
    name: "Battle Master Fighter (13th Level)",
    senses: "passive Perception 16",
    langs: "Common",
    traits: [
      ["Fighting Style (Dueling)", "+2 to damage rolls with a one-handed melee weapon."],
      ["Combat Superiority", "5 superiority dice (d10); maneuver DC 18."],
      ["Indomitable (2/Day)", "Rerolls one failed saving throw."],
    ],
    actions: [
      ["Multiattack", "Three longsword attacks."],
      ["Longsword", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) slashing damage; with a maneuver — an additional 1d10."],
      ["Maneuver: Menacing Attack / Trip Attack", "On a hit — +1d10 to the damage. Target: saving throw DC 18 (Wisdom — Frightened until the end of the fighter's next turn / Strength — knocked Prone)."],
    ],
    bonus: [
      ["Second Wind (1/Short Rest)", "As a Bonus Action the fighter regains 1d10 + 13 hit points."],
      ["Action Surge (1/Short Rest)", "On its turn the fighter takes one additional action."],
    ],
    reactions: [
      ["Maneuver: Riposte", "As a reaction, attacks the creature that missed with +1d10 damage."],
    ],
  },
  "Воин — мастер боевых искусств (18 ур.)": {
    name: "Battle Master Fighter (18th Level)",
    senses: "passive Perception 17",
    langs: "Common",
    traits: [
      ["Fighting Style (Dueling)", "+2 to damage rolls with a one-handed melee weapon."],
      ["Combat Superiority", "6 superiority dice (d12); maneuver DC 19."],
      ["Relentless", "At the start of its turn, if the fighter has no superiority dice remaining, it regains one."],
      ["Indomitable (3/Day)", "Rerolls a failed saving throw."],
    ],
    actions: [
      ["Multiattack", "Three longsword attacks."],
      ["Longsword", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 9 (1d8 + 5) slashing damage; with a maneuver — an additional 1d12."],
      ["Maneuver: Menacing Attack / Trip Attack", "On a hit — +1d12 to the damage. Target: saving throw DC 19 (Wisdom — Frightened / Strength — knocked Prone)."],
    ],
    bonus: [
      ["Second Wind (1/Short Rest)", "As a Bonus Action the fighter regains 1d10 + 18 hit points."],
      ["Action Surge (2/Short Rest)", "On its turn the fighter takes one additional action."],
    ],
    reactions: [
      ["Maneuver: Riposte", "As a reaction, attacks the creature that missed with +1d12 damage."],
    ],
  },
  "Воин — мистический рыцарь (3 ур.)": {
    name: "Eldritch Knight Fighter (3rd Level)",
    senses: "passive Perception 12",
    langs: "Common",
    traits: [
      ["Fighting Style (Defense)", "+1 to AC while wearing armor (already factored in)."],
      ["Spellcasting", "The fighter's spellcasting ability is Intelligence (spell save DC 11, +3 to hit). Cantrips (at will): «fire bolt», «ray of frost». 1st level (2 slots): «shield», «magic missile», «thunderwave»."],
    ],
    actions: [
      ["Longsword", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 7 (1d8 + 3) slashing damage."],
      ["Fire Bolt (Cantrip)", "Ranged spell attack: +3 to hit, range 120 ft. Hit: 5 (1d10) fire damage."],
      ["Magic Missile (1st Level)", "Creates three darts; each automatically hits a chosen target and deals 3 (1d4 + 1) force damage."],
    ],
    bonus: [
      ["Second Wind (1/Short Rest)", "As a Bonus Action the fighter regains 1d10 + 3 hit points."],
      ["Action Surge (1/Short Rest)", "On its turn the fighter takes one additional action."],
    ],
    reactions: [
      ["Shield (1st Level)", "As a reaction to an attack or «magic missile» — +5 to AC until the start of its next turn (expends a 1st-level slot)."],
    ],
  },
  "Воин — мистический рыцарь (7 ур.)": {
    name: "Eldritch Knight Fighter (7th Level)",
    senses: "passive Perception 13",
    langs: "Common",
    traits: [
      ["Fighting Style (Defense)", "+1 to AC while wearing armor (already factored in)."],
      ["War Magic", "After casting a cantrip with its action, the fighter makes one weapon attack as a Bonus Action."],
      ["Spellcasting", "The fighter's spellcasting ability is Intelligence (spell save DC 12, +4 to hit). Cantrips (at will): «fire bolt», «ray of frost». 1st level (4 slots): «shield», «magic missile», «thunderwave», «absorb elements». 2nd level (2 slots): «blur», «misty step»."],
    ],
    actions: [
      ["Multiattack", "Two longsword attacks."],
      ["Longsword", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 8 (1d8 + 4) slashing damage."],
      ["Fire Bolt (Cantrip)", "Ranged spell attack: +4 to hit, range 120 ft. Hit: 5 (1d10) fire damage."],
    ],
    bonus: [
      ["War Magic", "As a Bonus Action — one longsword attack after a cantrip cast with its action."],
      ["Second Wind (1/Short Rest)", "As a Bonus Action the fighter regains 1d10 + 7 hit points."],
      ["Action Surge (1/Short Rest)", "On its turn the fighter takes one additional action."],
    ],
    reactions: [
      ["Shield (1st Level)", "As a reaction — +5 to AC until the start of its next turn."],
    ],
  },
  "Воин — мистический рыцарь (13 ур.)": {
    name: "Eldritch Knight Fighter (13th Level)",
    senses: "passive Perception 15",
    langs: "Common",
    traits: [
      ["Fighting Style (Defense)", "+1 to AC while wearing armor (already factored in)."],
      ["War Magic", "After casting a cantrip with its action, the fighter makes one weapon attack as a Bonus Action."],
      ["Eldritch Strike", "On a hit with a weapon the target has disadvantage on the saving throw against the fighter's next spell until the end of its next turn."],
      ["Indomitable (2/Day)", "Rerolls a failed saving throw."],
      ["Spellcasting", "The fighter's spellcasting ability is Intelligence (spell save DC 15, +7 to hit). Cantrips (at will): «fire bolt», «ray of frost», «minor illusion». 1st level (4 slots): «shield», «magic missile», «thunderwave», «absorb elements». 2nd level (3 slots): «blur», «misty step», «hold person». 3rd level (2 slots): «haste», «lightning bolt»."],
    ],
    actions: [
      ["Multiattack", "Three longsword attacks."],
      ["Longsword", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) slashing damage."],
      ["Lightning Bolt (3rd Level)", "A line 100 ft. long and 5 ft. wide: Dexterity saving throw DC 15, taking 28 (8d6) lightning damage on a failure, half on a success."],
    ],
    bonus: [
      ["War Magic", "As a Bonus Action — one longsword attack after a cantrip cast with its action."],
      ["Second Wind (1/Short Rest)", "As a Bonus Action the fighter regains 1d10 + 13 hit points."],
      ["Action Surge (1/Short Rest)", "On its turn the fighter takes one additional action."],
    ],
    reactions: [
      ["Shield (1st Level)", "As a reaction — +5 to AC until the start of its next turn."],
    ],
  },
  "Воин — мистический рыцарь (18 ур.)": {
    name: "Eldritch Knight Fighter (18th Level)",
    senses: "passive Perception 16",
    langs: "Common",
    traits: [
      ["Fighting Style (Defense)", "+1 to AC while wearing armor (already factored in)."],
      ["Improved War Magic", "After casting ANY spell with its action, the fighter makes one weapon attack as a Bonus Action."],
      ["Eldritch Strike", "On a hit with a weapon the target has disadvantage on the saving throw against the fighter's next spell until the end of its next turn."],
      ["Arcane Charge", "When using Action Surge, the fighter can teleport up to 30 ft. to a visible unoccupied space — before or after the additional action."],
      ["Indomitable (3/Day)", "Rerolls a failed saving throw."],
      ["Spellcasting", "The fighter's spellcasting ability is Intelligence (spell save DC 16, +8 to hit). Cantrips (at will): «fire bolt», «ray of frost», «minor illusion». 1st level (4 slots): «shield», «magic missile», «thunderwave», «absorb elements». 2nd level (3 slots): «blur», «misty step», «hold person». 3rd level (3 slots): «haste», «lightning bolt», «counterspell»."],
    ],
    actions: [
      ["Multiattack", "Three longsword attacks."],
      ["Longsword", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 9 (1d8 + 5) slashing damage."],
      ["Lightning Bolt (3rd Level)", "A line 100 ft. long and 5 ft. wide: Dexterity saving throw DC 16, taking 28 (8d6) lightning damage on a failure, half on a success."],
    ],
    bonus: [
      ["Improved War Magic", "As a Bonus Action — one longsword attack after any spell cast with its action."],
      ["Second Wind (1/Short Rest)", "As a Bonus Action the fighter regains 1d10 + 18 hit points."],
      ["Action Surge (2/Short Rest)", "On its turn the fighter takes one additional action."],
    ],
    reactions: [
      ["Shield (1st Level)", "As a reaction — +5 to AC until the start of its next turn."],
      ["Counterspell (3rd Level)", "As a reaction, interrupts the spell of a creature within 60 ft. (3rd level and lower — automatically)."],
    ],
  },
  "Монах Открытой ладони (3 ур.)": {
    name: "Way of the Open Hand Monk (3rd Level)",
    senses: "passive Perception 15",
    langs: "Common",
    traits: [
      ["Martial Arts", "Unarmed strikes and monk weapons use Dexterity for the attack and damage; the unarmed strike's damage die is 1d4. As a Bonus Action — one unarmed strike after a weapon attack."],
      ["Ki (3 Points, DC 13)", "Ki points = the monk's level; the DC for ki effects = 8 + proficiency bonus + Wisdom modifier. They recharge after a short or long rest."],
      ["Open Hand Technique", "When the monk hits with a Flurry of Blows attack, the target must endure one effect of the monk's choice: Dexterity saving throw DC 13 (or be knocked Prone); Strength saving throw DC 13 (or be pushed 15 ft.); or be unable to take reactions until the end of its next turn."],
    ],
    actions: [
      ["Unarmed Strike", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 5 (1d4 + 3) bludgeoning damage."],
    ],
    bonus: [
      ["Flurry of Blows [Ki, 1 Point]", "Immediately after the Attack action, as a Bonus Action — two unarmed attacks: +5 to hit, 5 (1d4 + 3) bludgeoning damage each. On each hit — Open Hand Technique."],
      ["Patient Defense [Ki, 1 Point]", "As a Bonus Action — the Dodge action (attacks against the monk until its next turn have disadvantage, and its Dexterity saving throws have advantage)."],
      ["Step of the Wind [Ki, 1 Point]", "As a Bonus Action — the Dash or Disengage action; jump distance is doubled until the end of the turn."],
    ],
    reactions: [
      ["Deflect Missiles", "When the monk is hit by a ranged weapon attack, it can, as a reaction, reduce the damage by 1d10 + 6."],
    ],
  },
  "Монах Открытой ладони (7 ур.)": {
    name: "Way of the Open Hand Monk (7th Level)",
    senses: "passive Perception 17",
    langs: "Common",
    traits: [
      ["Martial Arts", "Unarmed strikes deal 1d6 damage; Dexterity replaces Strength for attacks."],
      ["Ki (7 Points, DC 15)", "Ki points = level; DC for ki effects 15."],
      ["Open Hand Technique", "On a hit with Flurry of Blows the target, by the monk's choice: knocked Prone (Dexterity DC 15), pushed 15 ft. (Strength DC 15), or unable to take reactions until its next turn."],
      ["Ki-Empowered Strikes", "Unarmed strikes count as magical for overcoming resistances and immunities."],
      ["Evasion", "On a Dexterity saving throw against an effect for half damage — on a success it takes no damage, on a failure half."],
      ["Stillness of Mind", "As an action the monk ends one Charmed or Frightened effect on itself."],
      ["Stunning Strike [Ki, 1 Point]", "On a hit with a melee attack the monk expends ki; the target makes a Constitution saving throw DC 15, or be Stunned until the end of its next turn."],
    ],
    actions: [
      ["Multiattack", "Two unarmed attacks."],
      ["Unarmed Strike", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 7 (1d6 + 4) bludgeoning damage."],
    ],
    bonus: [
      ["Flurry of Blows [Ki, 1 Point]", "As a Bonus Action — two unarmed attacks: +7 to hit, 7 (1d6 + 4) bludgeoning damage each. On each hit — Open Hand Technique."],
      ["Wholeness of Body (1/Day)", "As a Bonus Action the monk regains 21 (3 × level) hit points."],
      ["Patient Defense [Ki, 1 Point]", "As a Bonus Action — the Dodge action."],
      ["Step of the Wind [Ki, 1 Point]", "As a Bonus Action — the Dash or Disengage action; jump distance is doubled."],
    ],
    reactions: [
      ["Deflect Missiles", "As a reaction, reduces the damage of a ranged attack by 1d10 + 11."],
    ],
  },
  "Монах Открытой ладони (13 ур.)": {
    name: "Way of the Open Hand Monk (13th Level)",
    senses: "passive Perception 20",
    langs: "Common, any (Tongue of the Sun and Moon)",
    traits: [
      ["Martial Arts", "Unarmed strikes deal 1d8 damage."],
      ["Ki (13 Points, DC 18)", "Ki points = level; DC for ki effects 18."],
      ["Open Hand Technique", "On a hit with Flurry of Blows the target is — knocked Prone / pushed / unable to take reactions (DC 18)."],
      ["Ki-Empowered Strikes", "Unarmed strikes count as magical."],
      ["Evasion · Stillness of Mind", "See 7th level."],
      ["Purity of Body", "Immunity to disease and poison."],
      ["Tranquility", "After a long rest the monk is surrounded by a «sanctuary» effect (as the spell; until its first attack or hostile spell)."],
      ["Tongue of the Sun and Moon", "Understands any spoken language, and is understood by all."],
      ["Stunning Strike [Ki, 1 Point]", "Target: Constitution saving throw DC 18."],
    ],
    actions: [
      ["Multiattack", "Two unarmed attacks."],
      ["Unarmed Strike", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) bludgeoning damage."],
    ],
    bonus: [
      ["Flurry of Blows [Ki, 1 Point]", "As a Bonus Action — two unarmed attacks: +10 to hit, 9 (1d8 + 5) bludgeoning damage each. On each hit — Open Hand Technique."],
      ["Wholeness of Body (1/Day)", "As a Bonus Action — regains 39 hit points."],
      ["Patient Defense [Ki, 1 Point]", "As a Bonus Action — the Dodge action."],
      ["Step of the Wind [Ki, 1 Point]", "As a Bonus Action — the Dash or Disengage action."],
    ],
    reactions: [
      ["Deflect Missiles", "As a reaction, reduces the damage of a ranged attack by 1d10 + 18."],
    ],
  },
}
export default PART
