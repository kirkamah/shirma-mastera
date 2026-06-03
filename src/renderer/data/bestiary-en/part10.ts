const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  "Артефактор-алхимик (3 ур.)": {
    name: "Artificer (Alchemist), 3rd Level",
    senses: "passive Perception 11",
    langs: "Common plus one of your choice",
    traits: [
      ["Magical Tinkering", "As an action, can imbue three Tiny objects with minor effects (light, sound, smell, a temporary mark); the effects last until a long rest."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 13, +5 to hit); uses an alchemist's supplies as a spellcasting focus. Cantrips (at will): «acid splash», «fire bolt». Alchemist (always prepared): «healing word», «ray of enfeeblement». 1st level (3 slots): «cure wounds», Tasha's caustic brew, «thunderwave»."],
      ["Infuse Item", "Knows 4 infusions, maintains 2 active: Enhanced Defense (+1 AC, included in AC), Enhanced Weapon (+1), Returning Weapon, Mind Sharpener."],
      ["Experimental Elixir", "After a long rest, creates an elixir (more by expending slots) — drunk or given to an ally as a bonus action. Choose an effect: healing (2d4 + 3 hit points), swiftness, resilience, boldness, flight, or transformation."],
    ],
    actions: [
      ["Light Crossbow (+1)", "Ranged Weapon Attack: +4 to hit, range 80/320 ft. Hit: 6 (1d8 + 2) piercing damage."],
      ["Acid Splash (Cantrip)", "Target (or two within 5 ft. of each other) within 60 ft.: Dexterity saving throw DC 13, 5 (1d6) acid damage on a failure."],
      ["Tasha's Caustic Brew (1st Level, Concentration)", "A creature within 30 ft.: Dexterity saving throw DC 13, or at the start of each of its turns takes 2d4 acid damage until concentration ends."],
    ],
    bonus: [
      ["Apply Elixir", "As a bonus action, drinks an elixir or hands it to an ally within 5 ft."],
    ],
  },
  "Артефактор-алхимик (7 ур.)": {
    name: "Artificer (Alchemist), 7th Level",
    senses: "passive Perception 11",
    langs: "Common plus one of your choice",
    traits: [
      ["Magical Tinkering", "See 3rd level."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 15, +7 to hit). Cantrips (at will): «acid splash», «fire bolt». Alchemist (always prepared): «healing word», «ray of enfeeblement», «flaming sphere», «acid arrow». 1st level (4 slots): «cure wounds», Tasha's caustic brew, «thunderwave». 2nd level (3): «flaming sphere», «acid arrow», «lesser restoration»."],
      ["Infuse Item", "Knows 6 infusions, maintains 3 active."],
      ["Experimental Elixir", "See 3rd level."],
      ["Alchemical Savant", "Adds Intelligence modifier (+4) to one acid/fire/necrotic/poison damage roll or one healing roll of a spell cast through alchemist's supplies."],
      ["Flash of Genius", "As a reaction to an ability check or saving throw — for self or a creature within 30 ft. — adds +4 (Intelligence modifier). Number of uses = Intelligence modifier (4) per long rest."],
    ],
    actions: [
      ["Light Crossbow (+1)", "Ranged Weapon Attack: +5 to hit, range 80/320 ft. Hit: 6 (1d8 + 2) piercing damage."],
      ["Acid Arrow (2nd Level)", "Ranged Spell Attack: +7 to hit, range 90 ft. Hit: 18 (4d4) acid damage + 2d4 at the end of the target's next turn. One of the rolls gains +4 (Alchemical Savant)."],
    ],
    bonus: [
      ["Apply Elixir", "See 3rd level."],
    ],
    reactions: [
      ["Flash of Genius", "As a reaction, +4 to a check or saving throw within 30 ft."],
    ],
  },
  "Артефактор-алхимик (13 ур.)": {
    name: "Artificer (Alchemist), 13th Level",
    senses: "passive Perception 11",
    langs: "Common plus two of your choice",
    traits: [
      ["Magical Tinkering", "See 3rd level."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 18, +10 to hit). Cantrips (at will): «acid splash», «fire bolt», «ray of frost». Alchemist (always prepared): «healing word», «ray of enfeeblement», «flaming sphere», «acid arrow», «gaseous form», «mass healing word», «blight», «death ward». 1st level (4 slots): «cure wounds», Tasha's caustic brew, «thunderwave». 2nd level (3): «flaming sphere», «acid arrow», «lesser restoration». 3rd level (3): «revivify», «protection from energy», «haste». 4th level (1): «blight»."],
      ["Infuse Item", "Knows 8 infusions, maintains 4 active."],
      ["Experimental Elixir · Alchemical Savant", "See above (+5 to the modifier)."],
      ["Restorative Reagents", "The elixir additionally grants the target temporary hit points (2d6 + 5); once per long rest the elixir can function as «lesser restoration» without expending a slot."],
      ["Flash of Genius", "As a reaction, +5 to a check/saving throw within 30 ft. (5/long rest)."],
    ],
    actions: [
      ["Light Crossbow (+1)", "Ranged Weapon Attack: +7 to hit, range 80/320 ft. Hit: 6 (1d8 + 2) piercing damage."],
      ["Blight (4th Level)", "Target within 30 ft.: Constitution saving throw DC 18, 36 (8d8) + 5 (Alchemical Savant) necrotic damage on a failure, half on a success."],
    ],
    bonus: [
      ["Apply Elixir", "As a bonus action — healing and temporary hit points (2d6 + 5)."],
    ],
    reactions: [
      ["Flash of Genius", "As a reaction, +5 to a check or saving throw within 30 ft."],
    ],
  },
  "Артефактор-алхимик (18 ур.)": {
    name: "Artificer (Alchemist), 18th Level",
    senses: "passive Perception 11",
    langs: "Common plus two of your choice",
    resist: "acid, poison",
    condImmune: "Poisoned",
    traits: [
      ["Magical Tinkering", "See 3rd level."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 19, +11 to hit). Cantrips (at will): «acid splash», «fire bolt», «ray of frost». 1st level (4 slots): «cure wounds», Tasha's caustic brew, «thunderwave». 2nd level (3): «flaming sphere», «acid arrow», «lesser restoration». 3rd level (3): «revivify», «protection from energy», «haste». 4th level (3): «blight», «freedom of movement», «stoneskin». 5th level (1): «cloudkill»."],
      ["Infuse Item", "Knows 12 infusions, maintains 6 active."],
      ["Experimental Elixir · Alchemical Savant · Restorative Reagents", "See above."],
      ["Chemical Mastery", "Resistance to acid and poison damage; immunity to the Poisoned condition. Once per long rest can cast «heal» and «greater restoration» without cost."],
      ["Flash of Genius", "As a reaction, +5 to a check/saving throw within 30 ft. (5/long rest)."],
    ],
    actions: [
      ["Light Crossbow (+1)", "Ranged Weapon Attack: +8 to hit, range 80/320 ft. Hit: 6 (1d8 + 2) piercing damage."],
      ["Cloudkill (5th Level, Concentration)", "A 20-ft.-radius sphere of poisonous fog at a point within 120 ft.: each creature in the cloud makes a Constitution saving throw DC 19, taking 22 (5d8) poison damage on a failure, half on a success. The cloud moves 10 ft. to the side each round."],
    ],
    bonus: [
      ["Apply Elixir", "As a bonus action — healing and temporary hit points (2d6 + 5)."],
    ],
    reactions: [
      ["Flash of Genius", "As a reaction, +5 to a check or saving throw within 30 ft."],
    ],
  },
  "Артефактор-артиллерист (3 ур.)": {
    name: "Artificer (Artillerist), 3rd Level",
    senses: "passive Perception 13",
    langs: "Common plus one of your choice",
    traits: [
      ["Magical Tinkering", "See Artificer (Alchemist), 3rd level."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 13, +5 to hit). Cantrips (at will): «fire bolt», «ray of frost». Artillerist (always prepared): «shield», «thunderwave». 1st level (3 slots): «magic missile», «thunderwave», «snare»."],
      ["Infuse Item", "Knows 4 infusions, maintains 2 active (standard set)."],
      ["Eldritch Cannon", "As an action, creates a magical cannon (AC 18, HP 15, speed 15 ft.): Small (a free space within 5 ft.) or Tiny (on self/an object). As a bonus action, activates it. One of three options is chosen at creation: Force Ballista, Flamethrower, Protector."],
    ],
    actions: [
      ["Fire Bolt (Cantrip)", "Ranged Spell Attack: +5 to hit, range 120 ft. Hit: 5 (1d10) fire damage."],
      ["Eldritch Cannon — Force Ballista", "Ranged Attack: +5 to hit, range 120 ft. Hit: 9 (2d8) force damage; the target is pushed 5 ft. away from the cannon. Options: Flamethrower — 15-ft. cone, 2d8 fire (Dexterity saving throw DC 13 for half); Protector — temporary hit points 1d8 + 3 to allies within 10 ft."],
    ],
    bonus: [
      ["Activate Cannon", "As a bonus action, the cannon fires, gouts flame, or grants temporary hit points."],
    ],
  },
  "Артефактор-артиллерист (7 ур.)": {
    name: "Artificer (Artillerist), 7th Level",
    senses: "passive Perception 14",
    langs: "Common plus one of your choice",
    traits: [
      ["Magical Tinkering", "See 3rd level."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 15, +7 to hit). Cantrips (at will): «fire bolt», «ray of frost». Artillerist (always prepared): «shield», «thunderwave», «scorching ray», «shatter». 1st level (4 slots): «magic missile», «thunderwave», «snare». 2nd level (3): «scorching ray», «shatter», «blur»."],
      ["Infuse Item", "Knows 6 infusions, maintains 3 active."],
      ["Eldritch Cannon", "AC 18, HP 35."],
      ["Arcane Firearm", "Uses a wand, staff, or short weapon as a spellcasting focus; adds +1d8 to one damage roll of a spell cast through the firearm."],
      ["Flash of Genius", "As a reaction, +4 to a check/saving throw within 30 ft. (4/long rest)."],
    ],
    actions: [
      ["Fire Bolt (Cantrip)", "Ranged Spell Attack: +7 to hit, range 120 ft. Hit: 11 (2d10) + 1d8 (Arcane Firearm) fire damage."],
      ["Eldritch Cannon — Force Ballista", "Ranged Attack: +7 to hit, range 120 ft. Hit: 9 (2d8) force damage; the target is pushed 5 ft."],
      ["Scorching Ray (2nd Level)", "Three rays, Ranged Spell Attack: +7 to hit each, range 120 ft. Hit: 6 (2d6) fire damage per ray (+1d8 firearm to one)."],
    ],
    bonus: [
      ["Activate Cannon", "As a bonus action — the cannon fires a volley."],
    ],
    reactions: [
      ["Flash of Genius", "As a reaction, +4 to a check or saving throw within 30 ft."],
    ],
  },
  "Артефактор-артиллерист (13 ур.)": {
    name: "Artificer (Artillerist), 13th Level",
    senses: "passive Perception 16",
    langs: "Common plus two of your choice",
    traits: [
      ["Magical Tinkering", "See 3rd level."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 18, +10 to hit). Cantrips (at will): «fire bolt», «ray of frost», «acid splash». Artillerist (always prepared): «shield», «thunderwave», «scorching ray», «shatter», «fireball», «wind wall», «ice storm», «wall of fire». 1st level (4 slots): «magic missile», «thunderwave», «snare». 2nd level (3): «scorching ray», «shatter», «blur». 3rd level (3): «fireball», «wind wall», «haste». 4th level (1): «wall of fire»."],
      ["Infuse Item", "Knows 8 infusions, maintains 4 active."],
      ["Eldritch Cannon", "AC 18, HP 65."],
      ["Arcane Firearm", "+1d8 to a spell's damage roll through the focus."],
      ["Explosive Cannon", "The cannon's damage is increased by +1d8. As an action, the artificer can detonate the cannon: each creature within 20 ft. of it makes a Dexterity saving throw DC 18, taking 14 (3d8) force damage on a failure (half on a success). After detonating, the cannon disappears."],
      ["Flash of Genius", "As a reaction, +5 to a check/saving throw within 30 ft. (5/long rest)."],
      ["Spell-Storing Item", "Stores a 1st- or 2nd-level spell in an item; number of uses = 2 × Intelligence modifier (10)."],
    ],
    actions: [
      ["Fire Bolt (Cantrip)", "Ranged Spell Attack: +10 to hit, range 120 ft. Hit: 16 (3d10) + 1d8 (Arcane Firearm) fire damage."],
      ["Eldritch Cannon — Force Ballista", "Ranged Attack: +10 to hit, range 120 ft. Hit: 13 (2d8 + 1d8 Explosive) force damage; pushed 5 ft."],
      ["Fireball (3rd Level)", "A 20-ft.-radius sphere at a point within 150 ft.: Dexterity saving throw DC 18, 28 (8d6) + 1d8 (firearm, to one of the rolls) fire damage on a failure, half on a success."],
    ],
    bonus: [
      ["Activate Cannon", "As a bonus action — a volley or detonation."],
    ],
    reactions: [
      ["Flash of Genius", "As a reaction, +5 to a check or saving throw within 30 ft."],
    ],
  },
  "Артефактор-артиллерист (18 ур.)": {
    name: "Artificer (Artillerist), 18th Level",
    senses: "passive Perception 17",
    langs: "Common plus two of your choice",
    traits: [
      ["Magical Tinkering", "See 3rd level."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 19, +11 to hit). Cantrips (at will): «fire bolt», «ray of frost», «acid splash». 1st level (4 slots): «magic missile», «thunderwave», «snare». 2nd level (3): «scorching ray», «shatter», «blur». 3rd level (3): «fireball», «wind wall», «haste». 4th level (3): «wall of fire», «ice storm», «resilient sphere». 5th level (1): «cone of cold»."],
      ["Infuse Item", "Knows 12 infusions, maintains 6 active."],
      ["Arcane Firearm · Explosive Cannon", "See 13th level."],
      ["Fortified Position", "The artificer can have TWO eldritch cannons active at once. An ally standing within 10 ft. of any of his cannons has half cover."],
      ["Eldritch Cannons", "AC 18, HP 90 each."],
      ["Flash of Genius", "As a reaction, +5 to a check/saving throw within 30 ft. (5/long rest)."],
    ],
    actions: [
      ["Fire Bolt (Cantrip)", "Ranged Spell Attack: +11 to hit, range 120 ft. Hit: 22 (4d10) + 1d8 fire damage."],
      ["Two Eldritch Cannons — Force Ballistas", "Each makes one Ranged Attack: +11 to hit, range 120 ft. Hit: 13 (2d8 + 1d8 Explosive) force damage; the target is pushed 5 ft."],
      ["Cone of Cold (5th Level)", "60-ft. cone: Constitution saving throw DC 19, 36 (8d8) cold damage on a failure, half on a success."],
    ],
    bonus: [
      ["Activate Cannons", "As a bonus action — both cannons fire or apply their effect."],
    ],
    reactions: [
      ["Flash of Genius", "As a reaction, +5 to a check or saving throw within 30 ft."],
    ],
  },
  "Артефактор — боевой кузнец (3 ур.)": {
    name: "Artificer (Battle Smith), 3rd Level",
    senses: "passive Perception 13",
    langs: "Common plus one of your choice",
    traits: [
      ["Magical Tinkering", "See Artificer (Alchemist), 3rd level."],
      ["Battle Ready", "For attacks with magic weapons, the artificer uses Intelligence modifier instead of Strength or Dexterity modifier (already included in the attack line)."],
      ["Steel Defender", "A Medium mechanical companion: AC 15, HP 20, speed walk 40. Attack — Force-Empowered Rend: +5 to hit, reach 5 ft. Hit: 6 (1d8 + 2) force damage. Reaction «Deflect Attack»: imposes disadvantage on the attack roll of a creature within 5 ft. of the defender against a target other than itself."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 13, +5 to hit). Cantrips (at will): «fire bolt», «guidance». Smith (always prepared): «heroism», «shield of faith». 1st level (3 slots): «healing word», «thunderwave», «snare»."],
      ["Infuse Item", "Knows 4 infusions, maintains 2 active (Enhanced Defense included in armor AC, Enhanced Weapon — in the +1 to the hammer)."],
    ],
    actions: [
      ["Warhammer (magic +1)", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 7 (1d8 + 3) bludgeoning damage (rolled with Intelligence)."],
      ["Fire Bolt (Cantrip)", "Ranged Spell Attack: +5 to hit, range 120 ft. Hit: 5 (1d10) fire damage."],
    ],
    bonus: [
      ["Command Defender", "As a bonus action, the Steel Defender takes an action (Attack, Dodge, Help, etc.)."],
    ],
  },
  "Артефактор — боевой кузнец (7 ур.)": {
    name: "Artificer (Battle Smith), 7th Level",
    senses: "passive Perception 14",
    langs: "Common plus one of your choice",
    traits: [
      ["Magical Tinkering", "See 3rd level."],
      ["Battle Ready", "Magic weapon attacks use Intelligence (included)."],
      ["Steel Defender", "AC 15, HP 41, speed walk 40. Attack — Force-Empowered Rend: +7 to hit, 7 (1d8 + 3) force damage. Reaction «Deflect Attack»."],
      ["Extra Attack", "On its turn makes two weapon attacks instead of one (included in Multiattack)."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 15, +7 to hit). Cantrips (at will): «fire bolt», «guidance». Smith (always prepared): «heroism», «shield of faith», «branding smite», «warding bond». 1st level (4 slots): «healing word», «thunderwave», «snare». 2nd level (3): «magic weapon», «blur», «lesser restoration»."],
      ["Infuse Item", "Knows 6 infusions, maintains 3 active."],
      ["Flash of Genius", "As a reaction, +4 to a check/saving throw within 30 ft. (4/long rest)."],
    ],
    actions: [
      ["Multiattack", "Two attacks with the warhammer."],
      ["Warhammer (magic +1)", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 8 (1d8 + 4) bludgeoning damage."],
      ["Fire Bolt (Cantrip)", "Ranged Spell Attack: +7 to hit, range 120 ft. Hit: 11 (2d10) fire damage."],
    ],
    bonus: [
      ["Command Defender", "As a bonus action, the Steel Defender takes an action."],
    ],
    reactions: [
      ["Flash of Genius", "As a reaction, +4 to a check or saving throw within 30 ft."],
    ],
  },
  "Артефактор — боевой кузнец (13 ур.)": {
    name: "Artificer (Battle Smith), 13th Level",
    senses: "passive Perception 16",
    langs: "Common plus two of your choice",
    traits: [
      ["Magical Tinkering", "See 3rd level."],
      ["Battle Ready", "See above."],
      ["Steel Defender", "AC 15, HP 72, speed walk 40. Attack — Force-Empowered Rend: +10 to hit, 9 (1d8 + 5) force damage. Reaction «Deflect Attack»."],
      ["Extra Attack", "Two attacks per turn (included)."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 18, +10 to hit). Cantrips (at will): «fire bolt», «guidance», «ray of frost». Smith (always prepared): «heroism», «shield of faith», «branding smite», «warding bond», aura of vitality, aura of purity, «fire shield». 1st level (4 slots): «healing word», «thunderwave», «snare». 2nd level (3): «magic weapon», «blur», «lesser restoration». 3rd level (3): «haste», «protection from energy», «revivify». 4th level (1): «fire shield»."],
      ["Infuse Item", "Knows 8 infusions, maintains 4 active."],
      ["Arcane Jolt", "Once per turn when hitting with a magic weapon (its own or the Steel Defender's strike) — additional 7 (2d6) force damage OR heal a creature within 30 ft. for 7 (2d6). Uses = Intelligence modifier (5) per long rest."],
      ["Flash of Genius", "As a reaction, +5 to a check/saving throw within 30 ft. (5/long rest)."],
      ["Spell-Storing Item", "Stores a 1st- or 2nd-level spell (number of uses = 2 × Int = 10)."],
    ],
    actions: [
      ["Multiattack", "Two attacks with the warhammer."],
      ["Warhammer (magic +1)", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) bludgeoning damage plus 7 (2d6) force damage (Arcane Jolt)."],
      ["Fire Bolt (Cantrip)", "Ranged Spell Attack: +10 to hit, range 120 ft. Hit: 16 (3d10) fire damage."],
    ],
    bonus: [
      ["Command Defender", "As a bonus action, the Steel Defender takes an action (may apply Arcane Jolt to its hit)."],
    ],
    reactions: [
      ["Flash of Genius", "As a reaction, +5 to a check or saving throw within 30 ft."],
    ],
  },
  "Артефактор — боевой кузнец (18 ур.)": {
    name: "Artificer (Battle Smith), 18th Level",
    senses: "passive Perception 17",
    langs: "Common plus two of your choice",
    traits: [
      ["Magical Tinkering", "See 3rd level."],
      ["Battle Ready · Extra Attack", "See above."],
      ["Steel Defender", "AC 15, HP 97, speed walk 40. Attack — Force-Empowered Rend: +11 to hit, 9 (1d8 + 5) force damage. Reaction «Deflect Attack» (+1d4 + 5 force damage to the attacker — Improved Defender)."],
      ["Improved Defender", "Arcane Jolt deals/heals 4d6 instead of 2d6 (included in the attack line)."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 19, +11 to hit). Cantrips (at will): «fire bolt», «guidance», «ray of frost». 1st level (4 slots): «healing word», «thunderwave», «snare». 2nd level (3): «magic weapon», «blur», «lesser restoration». 3rd level (3): «haste», «protection from energy», «revivify». 4th level (3): «fire shield», «freedom of movement», «stoneskin». 5th level (1): «mass cure wounds»."],
      ["Infuse Item", "Knows 12 infusions, maintains 6 active."],
      ["Flash of Genius", "As a reaction, +5 to a check/saving throw within 30 ft. (5/long rest)."],
    ],
    actions: [
      ["Multiattack", "Two attacks with the warhammer."],
      ["Warhammer (magic +1)", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 9 (1d8 + 5) bludgeoning damage plus 14 (4d6) force damage (Arcane Jolt, Improved Defender)."],
      ["Fire Bolt (Cantrip)", "Ranged Spell Attack: +11 to hit, range 120 ft. Hit: 22 (4d10) fire damage."],
    ],
    bonus: [
      ["Command Defender", "As a bonus action, the Steel Defender takes an action."],
    ],
    reactions: [
      ["Flash of Genius", "As a reaction, +5 to a check or saving throw within 30 ft."],
    ],
  },
  "Артефактор-бронник (3 ур.)": {
    name: "Artificer (Armorer), 3rd Level",
    senses: "passive Perception 11",
    langs: "Common plus one of your choice",
    traits: [
      ["Magical Tinkering", "See Artificer (Alchemist), 3rd level."],
      ["Arcane Armor", "The armorer turns worn armor into magic armor; it requires no proficiency and can't be removed against the armorer's will. Guardian model (melee tank)."],
      ["Thunder Gauntlets", "A weapon built into the armor; a target struck has disadvantage on attack rolls against creatures other than the armorer until the end of the armorer's next turn."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 13, +5 to hit). Cantrips (at will): «fire bolt», «ray of frost». Armorer (always prepared): «magic missile», «thunderwave». 1st level (3 slots): «magic missile», «thunderwave», «absorb elements»."],
      ["Infuse Item", "Knows 4 infusions, maintains 2 active (at least Enhanced Defense — included in AC)."],
    ],
    actions: [
      ["Thunder Gauntlets", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 7 (1d8 + 3) thunder damage (rolled with Intelligence); the target has disadvantage on attacks against other creatures until the end of the armorer's next turn."],
      ["Fire Bolt (Cantrip)", "Ranged Spell Attack: +5 to hit, range 120 ft. Hit: 5 (1d10) fire damage."],
    ],
    bonus: [
      ["Defensive Field", "As a bonus action, the armorer or a creature within 30 ft. gains temporary hit points equal to its level (3). Uses = Intelligence modifier (3) per long rest."],
    ],
  },
  "Артефактор-бронник (7 ур.)": {
    name: "Artificer (Armorer), 7th Level",
    senses: "passive Perception 11",
    langs: "Common plus one of your choice",
    traits: [
      ["Magical Tinkering", "See 3rd level."],
      ["Arcane Armor · Thunder Gauntlets", "See 3rd level."],
      ["Extra Attack", "On its turn makes two attacks (included in Multiattack)."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 15, +7 to hit). Cantrips (at will): «fire bolt», «ray of frost». Armorer (always prepared): «magic missile», «thunderwave», «mirror image», «shatter». 1st level (4 slots): «magic missile», «thunderwave», «absorb elements». 2nd level (3): «mirror image», «shatter», «blur»."],
      ["Infuse Item", "Knows 6 infusions, maintains 3 active."],
      ["Flash of Genius", "As a reaction, +4 to a check/saving throw within 30 ft. (4/long rest)."],
    ],
    actions: [
      ["Multiattack", "Two attacks with the thunder gauntlets."],
      ["Thunder Gauntlets", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 8 (1d8 + 4) thunder damage; the target has disadvantage on attacks against others until the end of the armorer's next turn."],
      ["Fire Bolt (Cantrip)", "Ranged Spell Attack: +7 to hit, range 120 ft. Hit: 11 (2d10) fire damage."],
    ],
    bonus: [
      ["Defensive Field", "As a bonus action — temporary hit points equal to level (7), to self or an ally within 30 ft. (4/long rest)."],
    ],
    reactions: [
      ["Flash of Genius", "As a reaction, +4 to a check or saving throw within 30 ft."],
    ],
  },
  "Артефактор-бронник (13 ур.)": {
    name: "Artificer (Armorer), 13th Level",
    senses: "passive Perception 11",
    langs: "Common plus two of your choice",
    traits: [
      ["Magical Tinkering", "See 3rd level."],
      ["Arcane Armor · Thunder Gauntlets · Extra Attack", "See above."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 18, +10 to hit). Cantrips (at will): «fire bolt», «ray of frost». Armorer (always prepared): «magic missile», «thunderwave», «mirror image», «shatter», «hypnotic pattern», «lightning bolt», «fire shield», «greater invisibility». 1st level (4 slots): «magic missile», «thunderwave», «absorb elements». 2nd level (3): «mirror image», «shatter», «blur». 3rd level (3): «lightning bolt», «hypnotic pattern», «haste». 4th level (1): «greater invisibility»."],
      ["Infuse Item", "Knows 8 infusions, maintains 4 active."],
      ["Armor Modifications", "The arcane armor counts as several separate items for infusion purposes — the armorer can infuse its pauldrons, helmet, gauntlets, and greaves simultaneously."],
      ["Flash of Genius", "As a reaction, +5 to a check/saving throw within 30 ft. (5/long rest)."],
      ["Spell-Storing Item", "Stores a 1st- or 2nd-level spell (number of uses = 2 × Int = 10)."],
    ],
    actions: [
      ["Multiattack", "Two attacks with the thunder gauntlets."],
      ["Thunder Gauntlets", "Melee Weapon Attack: +10 to hit, reach 5 ft. Hit: 9 (1d8 + 5) thunder damage; the target has disadvantage on attacks against others."],
      ["Lightning Bolt (3rd Level)", "A line 100 ft. long and 5 ft. wide: Dexterity saving throw DC 18, 28 (8d6) lightning damage on a failure, half on a success."],
    ],
    bonus: [
      ["Defensive Field", "As a bonus action — temporary hit points equal to level (13) (5/long rest)."],
    ],
    reactions: [
      ["Flash of Genius", "As a reaction, +5 to a check or saving throw within 30 ft."],
    ],
  },
  "Артефактор-бронник (18 ур.)": {
    name: "Artificer (Armorer), 18th Level",
    senses: "passive Perception 11",
    langs: "Common plus two of your choice",
    traits: [
      ["Magical Tinkering", "See 3rd level."],
      ["Arcane Armor · Thunder Gauntlets · Extra Attack · Armor Modifications", "See above."],
      ["Perfected Armor (Guardian)", "When a creature within 30 ft. hits an ally of the armorer with an attack, the armorer can, as a reaction, attempt to pull that creature toward itself: Strength saving throw DC 19; on a failure, the attacker is pulled up to 30 ft. into a free space within 5 ft. of the armorer, and its attack has disadvantage."],
      ["Spellcasting", "Spellcasting ability is Intelligence (spell save DC 19, +11 to hit). Cantrips (at will): «fire bolt», «ray of frost». 1st level (4 slots): «magic missile», «thunderwave», «absorb elements». 2nd level (3): «mirror image», «shatter», «blur». 3rd level (3): «lightning bolt», «hypnotic pattern», «haste». 4th level (3): «greater invisibility», «fire shield», «stoneskin». 5th level (1): «wall of force»."],
      ["Infuse Item", "Knows 12 infusions, maintains 6 active."],
      ["Flash of Genius", "As a reaction, +5 to a check/saving throw within 30 ft. (5/long rest)."],
    ],
    actions: [
      ["Multiattack", "Two attacks with the thunder gauntlets."],
      ["Thunder Gauntlets", "Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 9 (1d8 + 5) thunder damage; the target has disadvantage on attacks against others."],
      ["Lightning Bolt (3rd Level)", "A line 100 ft. long and 5 ft. wide: Dexterity saving throw DC 19, 28 (8d6) lightning damage on a failure, half on a success."],
    ],
    bonus: [
      ["Defensive Field", "As a bonus action — temporary hit points equal to level (18) (5/long rest)."],
    ],
    reactions: [
      ["Perfected Armor", "As a reaction, pulls an attacking creature toward itself (Strength saving throw DC 19)."],
      ["Flash of Genius", "As a reaction, +5 to a check or saving throw within 30 ft."],
    ],
  },
  "Друид Круга Земли (3 ур.)": {
    name: "Druid of the Circle of the Land, 3rd Level",
    senses: "passive Perception 15",
    langs: "Druidic, Common",
    traits: [
      ["Wild Shape (2/short rest)", "As an action, the druid transforms into a beast with a challenge rating of 1/4 or lower (no flying or swimming speed) that it has seen; duration is half its level in hours (1 hr.). In beast form it uses the form's physical ability scores, while Intelligence, Wisdom, and Charisma stay the same; the druid can speak but can't cast spells (unless stated otherwise)."],
      ["Circle Spells (Forest)", "Additional terrain spells are always prepared and don't count against the prepared limit (for Forest: «pass without trace», «barkskin», etc.)."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 13, +5 to hit). Cantrips (at will): «produce flame», thorn whip. 1st level (4 slots): «cure wounds», «entangle», «thunderwave», «speak with animals». 2nd level (2): «moonbeam», «heat metal»."],
    ],
    actions: [
      ["Quarterstaff", "Melee Weapon Attack: +2 to hit, reach 5 ft. Hit: 3 (1d6) bludgeoning damage (4 (1d8) with two hands)."],
      ["Thorn Whip (Cantrip)", "Ranged Spell Attack: +5 to hit, range 30 ft. Hit: 3 (1d6) piercing damage; a target no larger than Large is pulled 10 ft. toward the druid."],
      ["Moonbeam (2nd Level, Concentration)", "A 5-ft.-radius cylindrical beam of silvery light at a point within 120 ft.: a creature that starts its turn or first enters the area makes a Constitution saving throw DC 13, taking 10 (2d10) radiant damage on a failure (half on a success). As a bonus action, the druid moves the beam 60 ft."],
    ],
    bonus: [
      ["Natural Recovery", "Once per day during a short rest, the druid recovers spell slots with a combined level up to half its level (up to 2)."],
    ],
  },
  "Друид Круга Земли (7 ур.)": {
    name: "Druid of the Circle of the Land, 7th Level",
    senses: "passive Perception 17",
    langs: "Druidic, Common",
    traits: [
      ["Wild Shape (2/short rest)", "As an action — a beast with CR ≤ 1/2 (no flying)."],
      ["Circle Spells (Forest)", "See 3rd level."],
      ["Land's Stride", "Difficult terrain made of plants doesn't slow the druid's movement; advantage on saving throws against magical plants that entangle."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 15, +7 to hit). Cantrips (at will): «produce flame», thorn whip, create bonfire. 1st level (4 slots): «cure wounds», «entangle», «thunderwave», «fog cloud». 2nd level (3): «moonbeam», «heat metal», «barkskin». 3rd level (3): «call lightning», «conjure animals», «dispel magic». 4th level (1): «ice storm»."],
    ],
    actions: [
      ["Quarterstaff", "Melee Weapon Attack: +3 to hit, reach 5 ft. Hit: 4 (1d8) bludgeoning damage."],
      ["Call Lightning (3rd Level, Concentration)", "The druid summons a storm cloud: on its turn, as a bonus action, calls down a bolt at a point within 120 ft. Each creature within 5 ft. of the point makes a Dexterity saving throw DC 15, taking 18 (4d10) lightning damage on a failure (in a storm — 5d10), half on a success."],
    ],
    bonus: [
      ["Natural Recovery", "Recovers slots totaling up to 4 levels (1/day during a short rest)."],
    ],
  },
  "Друид Круга Земли (13 ур.)": {
    name: "Druid of the Circle of the Land, 13th Level",
    senses: "passive Perception 20",
    langs: "Druidic, Common plus two of your choice",
    traits: [
      ["Wild Shape (2/short rest)", "As an action — a beast with CR ≤ 1."],
      ["Circle Spells (Forest) · Land's Stride", "See above."],
      ["Nature's Ward", "Immunity to poison damage and the Poisoned condition; immunity to disease; the druid can't be Charmed or Frightened by fey or elementals."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 18, +10 to hit). Cantrips (at will): «produce flame», thorn whip, create bonfire, «druidcraft». 1st level (4 slots): «cure wounds», «entangle», «thunderwave». 2nd level (3): «moonbeam», «heat metal», «barkskin». 3rd level (3): «call lightning», «conjure animals», «protection from energy». 4th level (3): «ice storm», «stoneskin», «dominate beast». 5th level (2): «conjure elemental», «mass cure wounds». 6th level (1): «sunbeam». 7th level (1): «fire storm»."],
    ],
    actions: [
      ["Quarterstaff", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 5 (1d8 + 1) bludgeoning damage."],
      ["Sunbeam (6th Level, Concentration)", "A beam 5 ft. wide and 60 ft. long in the druid's direction: each creature in the line makes a Constitution saving throw DC 18, taking 27 (6d8) radiant damage and being Blinded until the end of its next turn on a failure (half with no blinding on a success). As an action on subsequent turns, repeats the beam."],
    ],
    bonus: [
      ["Natural Recovery", "Recovers slots totaling up to 7 levels."],
    ],
  },
  "Друид Круга Земли (18 ур.)": {
    name: "Druid of the Circle of the Land, 18th Level",
    senses: "passive Perception 21",
    langs: "Druidic, Common plus three of your choice",
    traits: [
      ["Wild Shape (unlimited)", "As an action — a beast with CR ≤ 1; the druid can cast spells even in beast form."],
      ["Circle Spells (Forest) · Land's Stride · Nature's Ward", "See above."],
      ["Nature's Sanctuary", "When a beast or plant creature tries to attack the druid, it must succeed on a Wisdom saving throw DC 19 or choose a different target or its attack is wasted."],
      ["Timeless Body", "Advantage on saving throws against aging and exhaustion."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 19, +11 to hit). Cantrips (at will): «produce flame», thorn whip, create bonfire, «druidcraft». 1st level (4 slots): «cure wounds», «entangle», «thunderwave». 2nd level (3): «moonbeam», «heat metal», «barkskin». 3rd level (3): «call lightning», «conjure animals», «protection from energy». 4th level (3): «ice storm», «stoneskin», «dominate beast». 5th level (3): «conjure elemental», «mass cure wounds», «tree stride». 6th level (1): «sunbeam». 7th level (1): «fire storm». 8th level (1): «sunburst». 9th level (1): «storm of vengeance»."],
    ],
    actions: [
      ["Quarterstaff", "Melee Weapon Attack: +6 to hit, reach 5 ft. Hit: 5 (1d8 + 1) bludgeoning damage."],
      ["Storm of Vengeance (9th Level, Concentration)", "A storm breaks over a 360-ft.-radius area within sight: deafening thunder, acid rain, lightning (against six targets), hail, and gale-force wind deal damage round after round (DC 19). See the spell description."],
    ],
    bonus: [
      ["Natural Recovery", "Recovers slots totaling up to 9 levels."],
    ],
  },
  "Друид Круга Луны (3 ур.)": {
    name: "Druid of the Circle of the Moon, 3rd Level",
    senses: "passive Perception 15",
    langs: "Druidic, Common",
    traits: [
      ["Combat Wild Shape", "The druid transforms into a beast as a bonus action. The beast's CR — up to 1 (a typical combat form is a dire wolf: AC 14, HP 37, speed walk 50; Bite: +5 to hit, reach 5 ft. Hit: 10 (2d6 + 3) piercing damage; a target no larger than Large makes a Strength saving throw DC 13 or is knocked Prone). Duration is half its level in hours (1 hr.)."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 13, +5 to hit). Cantrips (at will): «produce flame», thorn whip. 1st level (4 slots): «cure wounds», «entangle», «thunderwave», «animal friendship». 2nd level (2): «moonbeam», «barkskin»."],
    ],
    actions: [
      ["Bite (in dire wolf form)", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 10 (2d6 + 3) piercing damage; a target no larger than Large: Strength saving throw DC 13 or knocked Prone."],
      ["Quarterstaff (out of form)", "Melee Weapon Attack: +2 to hit, reach 5 ft. Hit: 3 (1d6) bludgeoning damage."],
    ],
    bonus: [
      ["Wild Shape", "As a bonus action, transforms into a beast or returns to its own form."],
      ["Beast Healing", "While in beast form, as a bonus action expends a spell slot to regain 1d8 hit points per slot level."],
    ],
  },
  "Друид Круга Луны (7 ур.)": {
    name: "Druid of the Circle of the Moon, 7th Level",
    senses: "passive Perception 17",
    langs: "Druidic, Common",
    traits: [
      ["Combat Wild Shape", "Beast CR up to 2 (a typical form is a saber-toothed tiger: AC 12, HP 52, speed walk 40; Multiattack — Bite + Claw)."],
      ["Primal Strike", "Attacks in beast form count as magical for overcoming resistance and immunity to nonmagical damage."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 15, +7 to hit). Cantrips (at will): «produce flame», thorn whip, create bonfire. 1st level (4 slots): «cure wounds», «entangle», «thunderwave», «fog cloud». 2nd level (3): «moonbeam», «barkskin», «heat metal». 3rd level (3): «call lightning», «conjure animals», «dispel magic». 4th level (1): «ice storm»."],
    ],
    actions: [
      ["Multiattack (in saber-toothed tiger form)", "Bite + Claw."],
      ["Bite (saber-toothed tiger)", "Melee Weapon Attack: +6 to hit, reach 5 ft. Hit: 10 (1d10 + 5) piercing damage (magical)."],
      ["Claw (saber-toothed tiger)", "Melee Weapon Attack: +6 to hit, reach 5 ft. Hit: 12 (2d6 + 5) slashing damage (magical)."],
    ],
    bonus: [
      ["Wild Shape", "As a bonus action — transform/revert."],
      ["Beast Healing", "As a bonus action in beast form, expends a slot: 1d8 hit points per level."],
    ],
  },
  "Друид Круга Луны (13 ур.)": {
    name: "Druid of the Circle of the Moon, 13th Level",
    senses: "passive Perception 20",
    langs: "Druidic, Common plus two of your choice",
    traits: [
      ["Combat Wild Shape", "Beast CR up to 4."],
      ["Elemental Wild Shape", "Can turn into an air, earth, fire, or water elemental (CR 5)."],
      ["Primal Strike", "Attacks in beast form are magical."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 18, +10 to hit). Cantrips (at will): «produce flame», thorn whip, create bonfire, «druidcraft». 1st level (4 slots): «cure wounds», «entangle», «thunderwave». 2nd level (3): «moonbeam», «barkskin», «heat metal». 3rd level (3): «call lightning», «conjure animals», «protection from energy». 4th level (3): «ice storm», «stoneskin», «dominate beast». 5th level (2): «conjure elemental», «mass cure wounds». 6th level (1): «sunbeam». 7th level (1): «fire storm»."],
    ],
    actions: [
      ["Multiattack (in fire elemental form)", "Two slams."],
      ["Slam (fire elemental)", "Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 10 (2d6 + 3) fire damage; the target and each creature that starts its turn within 5 ft. of the elemental catch fire (1d10 fire at the start of their turns until extinguished)."],
      ["Quarterstaff (out of form)", "Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 5 (1d8 + 1) bludgeoning damage."],
    ],
    bonus: [
      ["Wild/Elemental Shape", "As a bonus action — transform/revert."],
      ["Beast Healing", "As a bonus action in beast form — 1d8 hit points per slot level."],
    ],
  },
  "Друид Круга Луны (18 ур.)": {
    name: "Druid of the Circle of the Moon, 18th Level",
    senses: "passive Perception 21",
    langs: "Druidic, Common plus three of your choice",
    traits: [
      ["Combat Wild Shape", "Beast CR up to 6 (a typical form is a giant ape: AC 12, HP 157, speed walk 40, climb 40) or an elemental."],
      ["Thousand Forms", "At will casts «alter self» (without a slot)."],
      ["Primal Strike", "Attacks in beast form are magical."],
      ["Timeless Body", "Advantage on saving throws against aging and exhaustion."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 19, +11 to hit). Cantrips (at will): «produce flame», thorn whip, create bonfire, «druidcraft». 1st level (4 slots): «cure wounds», «entangle», «thunderwave». 2nd level (3): «moonbeam», «barkskin», «heat metal». 3rd level (3): «call lightning», «conjure animals», «protection from energy». 4th level (3): «ice storm», «stoneskin», «dominate beast». 5th level (3): «conjure elemental», «mass cure wounds», «tree stride». 6th level (1): «sunbeam». 7th level (1): «fire storm». 8th level (1): «sunburst». 9th level (1): «storm of vengeance»."],
    ],
    actions: [
      ["Multiattack (in giant ape form)", "Two fist strikes."],
      ["Fist (giant ape)", "Melee Weapon Attack: +9 to hit, reach 10 ft. Hit: 22 (3d10 + 6) bludgeoning damage (magical)."],
      ["Thrown Rock (giant ape)", "Ranged Weapon Attack: +9 to hit, range 50/100 ft. Hit: 30 (7d6 + 6) bludgeoning damage."],
    ],
    bonus: [
      ["Wild/Elemental Shape", "As a bonus action — transform/revert."],
      ["Beast Healing", "As a bonus action — 1d8 hit points per slot level."],
    ],
  },
  "Друид Круга Звёзд (3 ур.)": {
    name: "Druid of the Circle of Stars, 3rd Level",
    senses: "passive Perception 15",
    langs: "Druidic, Common",
    traits: [
      ["Wild Shape (2/short rest)", "As an action — a beast with CR ≤ 1/4 (no flying/swimming); 1 hour."],
      ["Star Map", "The druid carries a star chart and knows the «guidance» cantrip. Once per long rest can cast guiding bolt for free without expending a slot."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 13, +5 to hit). Cantrips (at will): «produce flame», thorn whip, «guidance». 1st level (4 slots): «cure wounds», «entangle», «thunderwave», «speak with animals». 2nd level (2): «moonbeam», «heat metal»."],
    ],
    actions: [
      ["Starry Arrow (Archer)", "While the Archer Starry Form is active: a Ranged Spell Attack on activating the form and then each turn as a bonus action: +5 to hit, range 60 ft. Hit: 7 (1d8 + 3) radiant damage."],
      ["Thorn Whip (Cantrip)", "Ranged Spell Attack: +5 to hit, range 30 ft. Hit: 3 (1d6) piercing damage; a target no larger than Large is pulled 10 ft."],
    ],
    bonus: [
      ["Starry Form", "As a bonus action, the druid wreathes itself in a constellation for 10 minutes, choosing one (switching — as a bonus action). Archer: on activation and then as a bonus action — Starry Arrow (see above). Chalice: when casting a healing spell with a slot, additionally heals itself or a creature within 30 ft. for 1d8 + 3 hit points. Dragon: for Intelligence and Wisdom checks and saving throws and concentration checks — a roll of 9 or lower counts as a «10»."],
    ],
  },
  "Друид Круга Звёзд (7 ур.)": {
    name: "Druid of the Circle of Stars, 7th Level",
    senses: "passive Perception 17",
    langs: "Druidic, Common",
    traits: [
      ["Wild Shape (2/short rest)", "As an action — a beast with CR ≤ 1/2."],
      ["Star Map", "See 3rd level."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 15, +7 to hit). Cantrips (at will): «produce flame», thorn whip, create bonfire, «guidance». 1st level (4 slots): «cure wounds», «entangle», «thunderwave», «fog cloud». 2nd level (3): «moonbeam», «heat metal», «barkskin». 3rd level (3): «call lightning», «conjure animals», «dispel magic». 4th level (1): «ice storm»."],
    ],
    actions: [
      ["Starry Arrow (Archer)", "Ranged Spell Attack: +7 to hit, range 60 ft. Hit: 8 (1d8 + 4) radiant damage."],
      ["Quarterstaff", "Melee Weapon Attack: +3 to hit, reach 5 ft. Hit: 4 (1d8) bludgeoning damage."],
    ],
    bonus: [
      ["Starry Form", "As a bonus action, Archer / Chalice (1d8 + 4 healing on a healing spell) / Dragon (see 3rd level); duration 10 min."],
    ],
    reactions: [
      ["Cosmic Omen (2/rest)", "When a creature within 30 ft. makes an attack roll, saving throw, or ability check, the druid as a reaction rolls a d6: on an even result — an ally adds the d6 to its roll; on an odd result — an enemy subtracts the d6 from its roll."],
    ],
  },
  "Друид Круга Звёзд (13 ур.)": {
    name: "Druid of the Circle of Stars, 13th Level",
    senses: "passive Perception 20",
    langs: "Druidic, Common plus two of your choice",
    traits: [
      ["Wild Shape (2/short rest)", "As an action — a beast with CR ≤ 1."],
      ["Star Map", "See 3rd level."],
      ["Twinkling Constellations", "In Starry Form, the druid gains a flying speed of 20 ft.; the Archer's damage and the Chalice's healing become 2d8."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 18, +10 to hit). Cantrips (at will): «produce flame», thorn whip, create bonfire, «druidcraft», «guidance». 1st level (4 slots): «cure wounds», «entangle», «thunderwave». 2nd level (3): «moonbeam», «heat metal», «barkskin». 3rd level (3): «call lightning», «conjure animals», «protection from energy». 4th level (3): «ice storm», «stoneskin», «dominate beast». 5th level (2): «conjure elemental», «mass cure wounds». 6th level (1): «sunbeam». 7th level (1): «fire storm»."],
    ],
    actions: [
      ["Starry Arrow (Archer)", "Ranged Spell Attack: +10 to hit, range 60 ft. Hit: 14 (2d8 + 5) radiant damage."],
      ["Sunbeam (6th Level, Concentration)", "A beam 5 ft. wide and 60 ft. long: each creature in the line — Constitution saving throw DC 18, 27 (6d8) radiant damage and Blinded until the end of its next turn on a failure (half with no blinding on a success). As an action on subsequent turns, repeats the beam."],
    ],
    bonus: [
      ["Starry Form", "Archer (2d8 + 5) / Chalice (2d8 + 5 healing) / Dragon; flying speed 20 ft."],
    ],
    reactions: [
      ["Cosmic Omen (2/rest)", "See 7th level."],
    ],
  },
  "Друид Круга Звёзд (18 ур.)": {
    name: "Druid of the Circle of Stars, 18th Level",
    senses: "passive Perception 21",
    langs: "Druidic, Common plus three of your choice",
    traits: [
      ["Wild Shape (unlimited)", "As an action — a beast with CR ≤ 1; can cast spells in beast form."],
      ["Star Map · Twinkling Constellations", "See above."],
      ["Starry Body", "While the Starry Form is active, the druid gains resistance to bludgeoning, piercing, and slashing damage and regains 1d8 + 5 hit points at the start of its turn."],
      ["Timeless Body", "Advantage on saving throws against aging and exhaustion."],
      ["Spellcasting", "Spellcasting ability is Wisdom (spell save DC 19, +11 to hit). Cantrips (at will): «produce flame», thorn whip, create bonfire, «druidcraft», «guidance». 1st level (4 slots): «cure wounds», «entangle», «thunderwave». 2nd level (3): «moonbeam», «heat metal», «barkskin». 3rd level (3): «call lightning», «conjure animals», «protection from energy». 4th level (3): «ice storm», «stoneskin», «dominate beast». 5th level (3): «conjure elemental», «mass cure wounds», «tree stride». 6th level (1): «sunbeam». 7th level (1): «fire storm». 8th level (1): «sunburst». 9th level (1): «storm of vengeance»."],
    ],
    actions: [
      ["Starry Arrow (Archer)", "Ranged Spell Attack: +11 to hit, range 60 ft. Hit: 14 (2d8 + 5) radiant damage."],
      ["Sunburst (8th Level)", "A flash of light in a 60-ft.-radius sphere: each creature in the area — Constitution saving throw DC 19, 44 (12d6) radiant damage and Blinded for 1 minute on a failure (half with no blinding on a success)."],
    ],
    bonus: [
      ["Starry Form", "Archer / Chalice / Dragon; flying 20 ft."],
    ],
    reactions: [
      ["Cosmic Omen (2/rest)", "See 7th level."],
    ],
  },
}
export default PART
