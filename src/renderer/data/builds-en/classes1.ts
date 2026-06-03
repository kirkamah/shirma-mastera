const PART: Record<string, { name: string; primary: string; saves: string; armor: string; weapons: string; tools?: string; skills: string; features: [string, string][]; subclasses?: { name: string; meta?: string; features: [string, string][] }[] }> = {
  "barbarian-ph24": {
    name: "Barbarian",
    primary: "Strength",
    saves: "Strength, Constitution",
    armor: "Light, medium, shields",
    weapons: "Simple and martial weapons",
    skills: "Choose two: Animal Handling, Athletics, Intimidation, Nature, Perception, Survival.",
    features: [
      ["Rage", "As a bonus action you enter a Rage, provided you aren't wearing Heavy armour and have a use available. The Rage lasts up to 10 minutes. While raging you gain: advantage on Strength checks and Strength saving throws; a bonus to the damage of each melee weapon attack (or Unarmed Strike) that uses Strength — +2 at level 1, +3 from level 9, +4 from level 16; resistance to bludgeoning, piercing and slashing damage. The Rage continues if each turn you attack a foe, force one to make a saving throw, or spend a bonus action to extend it; otherwise it ends. It also ends early if you put on Heavy armour or have the Incapacitated condition. You can end your Rage on your turn as a bonus action. Number of Rage uses: 2 at level 1, 3 from level 3, 4 from level 6, 5 from level 12 and 6 from level 17. You regain one use on a short rest and all of them on a long rest."],
      ["Unarmoured Defence", "While you aren't wearing any armour, your Armour Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a Shield and still gain this benefit."],
      ["Weapon Mastery", "You can use the mastery properties of weapons. You choose 3 kinds of weapon (for example, Axe, Greatsword and Maul) — while holding such a weapon you can use its mastery property (Cleave, Push, Topple and so on). You can change your choice of these 3 kinds on a long rest. The number of weapon kinds available increases with level per the class table."],
      ["Danger Sense", "You have advantage on Dexterity saving throws against effects you can see, such as spells, traps and breath weapons. To gain this benefit you can't have the Blinded, Deafened or Incapacitated condition."],
      ["Reckless Attack", "When you make your first attack on your turn, you can decide to attack recklessly. Doing so, your first melee weapon attack using Strength this turn is made with advantage, but until the start of your next turn attack rolls against you are also made with advantage. This decision requires no action."],
      ["Primal Path", "You choose a subclass — a Primal Path that shapes your Rage: Path of the Berserker, Path of the Wild Heart, Path of the World Tree or Path of the Zealot. The chosen path grants features at levels 3, 6, 10 and 14."],
      ["Primal Knowledge", "You gain proficiency in one additional skill of your choice from the barbarian skill list. In addition, while raging you can make Acrobatics, Perception, Survival, Intimidation and Stealth ability checks as Strength checks instead of their usual ability, channelling primal might into these tasks."],
      ["Ability Score Improvement", "You gain the Ability Score Improvement feat (you can increase one ability score by 2 or two ability scores by 1, to a maximum of 20) or another General feat (PH24) of your choice for which you meet the prerequisites."],
      ["Extra Attack", "When you take the Attack action on your turn, you attack twice instead of once."],
      ["Fast Movement", "Your speed increases by 10 ft. while you aren't wearing Heavy armour."],
      ["Subclass Feature", "You gain the level 6 feature of your chosen Primal Path (subclass)."],
      ["Feral Instinct", "Your instincts are so honed that you have advantage on Initiative rolls."],
      ["Instinctive Pounce", "When you enter your Rage as a bonus action, you can move up to half your speed as part of that bonus action, with no extra action required."],
      ["Ability Score Improvement", "You gain the Ability Score Improvement feat or another General feat (PH24) of your choice."],
      ["Brutal Strike", "When you attack recklessly (Reckless Attack feature), you can forgo advantage on one of your attacks to instead deal an extra 1d10 damage on a hit with that attack and apply one Brutal Strike Effect of your choice. Forceful Blow: you push the target straight away from you up to 15 ft. Hamstring Blow: the target's speed is reduced by 15 ft. until the start of your next turn. You can apply only one effect per such attack."],
      ["Subclass Feature", "You gain the level 10 feature of your chosen Primal Path (subclass)."],
      ["Relentless Rage", "Your Rage helps you keep on your feet. If you are raging and drop to 0 hit points without dying outright, you can make a DC 10 Constitution saving throw. On a success you instead drop to 1 hit point. Each time you use this feature after your last long rest, the DC increases by 5. The DC resets to 10 on a long rest."],
      ["Ability Score Improvement", "You gain the Ability Score Improvement feat or another General feat (PH24) of your choice."],
      ["Improved Brutal Strike", "The list of Brutal Strike Effects available to the Brutal Strike feature gains two new ones. Staggering Blow: the target has disadvantage on the next saving throw it makes before the start of your next turn. Sundering Blow: the next attack against the target before the start of your next turn is made with a +5 bonus to the attack roll. As before, one effect of your choice is applied per Brutal Strike attack."],
      ["Subclass Feature", "You gain the level 14 feature of your chosen Primal Path (subclass)."],
      ["Persistent Rage", "Your Rage no longer ends on its own from your not attacking or taking damage. In addition, when you roll Initiative, you can regain one expended use of Rage if you have none left."],
      ["Ability Score Improvement", "You gain the Ability Score Improvement feat or another General feat (PH24) of your choice."],
      ["Improved Brutal Strike (stronger)", "The Brutal Strike feature is enhanced. Its extra damage increases from 1d10 to 2d10. In addition, having forgone advantage on an attack, you can apply two different Brutal Strike Effects of your choice at once (instead of one)."],
      ["Indomitable Might", "When you make a Strength check or a Strength saving throw, you can use your Strength score itself (for example, 18) as the d20 result if the number rolled on the d20 is lower than that score."],
      ["Epic Boon", "You gain one feat of the \"Epic Boon\" category of your choice for which you meet the prerequisites."],
      ["Primal Champion", "You embody primal might. Your Strength and Constitution scores increase by 4, and their maximum becomes 25."]
    ],
    subclasses: [
      {
        name: "Path of the Berserker",
        meta: "Path of the Berserker",
        features: [
          ["Frenzy", "While raging, on each of your turns you can make one additional melee weapon attack (or Unarmed Strike) as a bonus action."],
          ["Mindless Rage", "While raging, you can't be Charmed or Frightened. If you're already affected by one of those conditions when you enter your Rage, that effect is suspended until the Rage ends."],
          ["Retaliation", "When you take damage from a creature within 5 ft. of you, you can use your reaction to make one melee weapon attack (or Unarmed Strike) against that creature."],
          ["Intimidating Presence", "As a bonus action you unleash a wave of menace. Each creature of your choice within 30 ft. that can see or hear you must make a Wisdom saving throw (DC = 8 + proficiency bonus + Strength modifier). On a failure the creature has the Frightened condition (of you) until the end of your next turn. You can use this feature a number of times equal to your proficiency bonus; all uses are regained on a long rest."]
        ]
      },
      {
        name: "Path of the Wild Heart",
        meta: "Path of the Wild Heart (formerly Totem Warrior)",
        features: [
          ["Speaker with Beasts", "You can always cast «Beast Sense» and «Speak with Animals» as rituals (that is, without expending a spell slot, taking 10 minutes longer to cast). The spellcasting ability for these spells is Wisdom."],
          ["Rage of the Wilds", "When you enter your Rage, you choose one of the totem spirits, granting an effect for that Rage. Bear: you gain resistance to all damage types except force, necrotic, psychic and radiant. Eagle: as part of entering your Rage you can take the Dash and Disengage actions with no action required, and while the Rage lasts creatures make attack rolls against you with disadvantage if possible. Wolf: while the Rage lasts, your allies have advantage on melee attack rolls against any foe within 5 ft. of you. You choose the totem anew each time you enter your Rage."],
          ["Aspect of the Wilds", "You constantly take on one bestial aspect of your choice; you can change it on a long rest. Owl: you gain darkvision out to 60 ft. (or, if you already have it, its range increases by 60 ft.), and you can distinguish colours precisely in dim light. Panther: you gain a climbing speed equal to your speed. Salmon: you gain a swimming speed equal to your speed."],
          ["Nature Speaker", "You can always cast «Commune with Nature» as a ritual (without expending a spell slot). The spellcasting ability is Wisdom."],
          ["Power of the Wilds", "When you enter your Rage, you choose one of the mighty bestial forms for that Rage. Falcon: while you aren't wearing Heavy armour, you gain a flying speed equal to your speed. Lion: while the Rage lasts, any foe within 5 ft. of you makes attack rolls with disadvantage against any target other than you. Ram: once on each of your turns, when you hit a creature of size Large or smaller with a melee attack, you can knock it prone (Topple). You choose the form anew each time you enter your Rage."]
        ]
      },
      {
        name: "Path of the World Tree",
        meta: "Path of the World Tree (new)",
        features: [
          ["Vitality of the Tree", "The life force of the World Tree sustains you. Each time you enter your Rage, you gain temporary hit points equal to your barbarian level. In addition, at the start of each of your turns while raging, you can give temporary hit points to yourself or another creature of your choice within 10 ft. of you. These temporary hit points equal a roll of 1d6; the die grows with your barbarian level (1d8 from level 10, 1d10 from level 15, 1d12 from level 20)."],
          ["Branches of the Tree", "When a creature you can see within 30 ft. hits you with an attack roll, you can use your reaction to cause spectral branches of the World Tree to reach for it. The creature must make a Strength saving throw (DC = 8 + proficiency bonus + Strength modifier). On a failure the creature is teleported into an unoccupied space within 5 ft. of you (or to the nearest unoccupied space), and its speed becomes 0 until the end of its current turn."],
          ["Battering Roots", "The reach of your melee weapon attacks and Unarmed Strikes increases by 10 ft. In addition, when you hit a creature with a melee weapon attack, you can apply the Push or Topple mastery property to it, even if the weapon doesn't have that property."],
          ["Travel along the Tree", "While raging, you can use a bonus action to magically teleport up to 60 ft. to an unoccupied space you can see. In addition, once per Rage you can instead teleport up to 150 ft., bringing along up to 6 willing creatures you can see within 10 ft. of you (each to an unoccupied space you can see near the destination)."]
        ]
      },
      {
        name: "Path of the Zealot",
        meta: "Path of the Zealot",
        features: [
          ["Divine Fury", "Your strikes are filled with divine power. While raging, the first creature you hit with a melee weapon attack (or Unarmed Strike) on your turn takes extra damage equal to 1d6 + half your barbarian level (rounded down). The type of this damage is necrotic or radiant, your choice each time you apply it."],
          ["Warrior of the Gods", "You have a pool of Warrior Dice — d12s, numbering equal to your proficiency bonus. As a bonus action you can spend one such die to regain hit points equal to a roll of that d12 + your Constitution score. All spent dice are regained on a long rest."],
          ["Fanatical Focus", "While raging, once per Rage you can reroll a failed saving throw and must use the new result. You can make this reroll even if an effect would normally prevent you from rerolling."],
          ["Zealous Presence", "As a bonus action you let out a battle cry. Up to 10 creatures of your choice within 60 ft. that can hear you gain advantage on attack rolls and saving throws until the start of your next turn. You can use this feature once, and it is regained on a long rest; in addition, you can use it again by expending one use of Rage."],
          ["Rage Beyond Death", "While raging, dropping to 0 hit points doesn't make you Unconscious (but you still make death saving throws and can die as normal). You keep fighting and acting, and effects that require your hit points to be depleted take place only when the Rage ends — at which point you fall Unconscious if you still have 0 hit points at that time."]
        ]
      }
    ]
  },
  "bard-ph24": {
    name: "Bard",
    primary: "Charisma",
    saves: "Dexterity, Charisma",
    armor: "Light armour",
    weapons: "Simple weapons",
    tools: "3 Musical Instruments of your choice",
    skills: "Choose three from any list.",
    features: [
      ["Spellcasting", "You draw magic from music and words woven into enchantment. The spellcasting ability is Charisma: your spell save DC = 8 + proficiency bonus + Charisma modifier, and your spell attack bonus = proficiency bonus + Charisma modifier. Cantrips: at level 1 you know 2 bard cantrips of your choice (their number grows per the class table). Spells known: you know a set number of bard spells of level 1 and higher (per the class table) — they are known, not prepared. You cast from level 1, expending a slot of the appropriate level from the bard table. Replacement and learning: when you gain a bard level, you can replace one known spell with another bard spell. Focus: you can use a Musical Instrument as a spellcasting focus. Rituals: a known spell with the «ritual» tag can be cast as a ritual (10 minutes longer, without expending a slot)."],
      ["Bardic Inspiration", "As a bonus action you inspire another creature within 60 ft. that can see or hear you, giving it a Bardic Inspiration die — a d6 (grows: d8 from level 5, d10 from level 10, d12 from level 15). Within the next 10 minutes that creature can, once, after a d20 roll for an attack roll, ability check or saving throw (and before the result is known), roll this die and add the number rolled to the result; the die can be used before or after the d20 roll, but before the DM announces the outcome. The die is expended on use. The number of uses equals your Charisma modifier (minimum one); expended uses are regained on a long rest (from level 5 — also on a short rest)."],
      ["Expertise", "Choose 2 skills you are proficient in. Your proficiency bonus is doubled for any ability check you make using either of those two skills."],
      ["Jack of All Trades", "To any ability check where you don't add your proficiency bonus (that is, you aren't proficient with the relevant skill or tool), you add half your proficiency bonus, rounded down."],
      ["Bard College", "You join one of the bard colleges — Lore, Valor, Glamour or Dance (choose a subclass). The college grants features at levels 3, 6 and 14."],
      ["Ability Score Improvement", "You gain a General feat (PH24) of your choice or increase your ability scores."],
      ["Font of Inspiration", "You regain all expended uses of Bardic Inspiration not only on a long rest but also on a short rest. In addition, when you roll initiative and have no uses of Bardic Inspiration left, you immediately regain one of them."],
      ["Subclass Feature", "You gain the level 6 feature of your chosen Bard College."],
      ["Countercharm", "As a bonus action you create a magical field of music, giving yourself and each creature of your choice within 30 ft. advantage on saving throws against the Frightened and Charmed conditions. This effect lasts 1 minute or until you are incapacitated."],
      ["Ability Score Improvement", "You gain another General feat (PH24) of your choice or increase your ability scores."],
      ["Expertise", "Choose another 2 skills you are proficient in. Your proficiency bonus is doubled for any ability check using either of them."],
      ["Magical Secrets", "When you learn a new bard spell (on gaining a level) or replace a known spell, you can choose spells not only from the bard list but also from the cleric, druid, sorcerer, warlock and wizard lists. The chosen spell counts as a bard spell for you and must be of a level for which you have slots."],
      ["Ability Score Improvement", "You gain another General feat (PH24) of your choice or increase your ability scores."],
      ["Subclass Feature", "You gain the level 14 feature of your chosen Bard College."],
      ["Ability Score Improvement", "You gain another General feat (PH24) of your choice or increase your ability scores."],
      ["Superior Inspiration", "When you roll initiative and have fewer than two uses of Bardic Inspiration left, you regain uses so that you have two."],
      ["Epic Boon", "You gain one Epic Boon feat (PH24) of your choice."],
      ["Words of Creation", "You always have the spells «Power Word Heal» and «Power Word Kill» prepared — they don't count against the number of spells you know. When you cast either of these two spells, you can target a second creature within 10 ft. of the first target (if it meets the spell's targeting requirements)."]
    ],
    subclasses: [
      {
        name: "College of Lore",
        meta: "College of Lore",
        features: [
          ["Bonus Proficiencies", "You gain proficiency in three skills of your choice from any list."],
          ["Cutting Words", "As a reaction, when a creature within 60 ft. that you can see or hear makes an attack roll, ability check or damage roll, you expend one use of Bardic Inspiration: roll the Inspiration die and subtract the number rolled from the creature's roll. You can do this after the creature's roll but before the DM announces the result."],
          ["Additional Magical Secrets", "You learn 2 spells of your choice from the cleric, druid or wizard lists. Each can be of a level for which you have spell slots, and counts as a bard spell for you. These 2 spells don't count against the number of spells you know."],
          ["Peerless Skill", "When you make an ability check or attack roll and dislike the result, you can expend one use of Bardic Inspiration: roll the Inspiration die and add the number rolled to the roll, which can change the outcome. You can do this after the d20 roll but before the DM announces the result."]
        ]
      },
      {
        name: "College of Valor",
        meta: "College of Valor",
        features: [
          ["Combat Training", "You gain proficiency with medium armour, shields and martial weapons."],
          ["Combat Inspiration", "A creature that has your Bardic Inspiration die can use it in one of two ways. When it hits a target with a weapon attack, it can roll the Inspiration die and add the number rolled to that attack's damage roll. Or, when an attack roll is made against it, it can use its reaction to roll the Inspiration die and add the number rolled to its AC against that attack (the decision is made after the attack roll but before it's known whether it hits). The die is expended on use."],
          ["Extra Attack", "When you take the Attack action on your turn, you can attack twice instead of once."],
          ["Battle Magic", "When you cast a spell as an action, you can make one weapon attack as a bonus action on the same turn."]
        ]
      },
      {
        name: "College of Glamour",
        meta: "College of Glamour",
        features: [
          ["Mantle of Inspiration", "As a bonus action you expend one use of Bardic Inspiration to wrap yourself in a magical mantle of inspiration. Doing so, you choose up to 5 creatures (you can include yourself) you can see within 60 ft. Each chosen creature gains temporary hit points equal to twice a roll of your Inspiration die + your Charisma modifier. When a creature that gained these temporary hit points loses them for the first time, it can use its reaction to move up to half its speed without provoking opportunity attacks."],
          ["Enthralling Performance", "If you perform for at least 1 minute for a humanoid within 30 ft. that can see and hear you, you can attempt to charm it. At the end of the performance the creature makes a Wisdom saving throw (DC = 8 + proficiency bonus + Charisma modifier) against this effect, as if you had cast «Charm Monster» on it. On a failure it is charmed by you, regards you as a friend and seeks to protect you. While charmed in this way, the target has disadvantage on checks to resist your requests and commands. You can use this ability after a short or long rest."],
          ["Mantle of Majesty", "As a bonus action you cast the «Command» spell without expending a spell slot. Until the end of your next turn, each creature of your choice you can see within 60 ft. makes its saving throw against that «Command» with disadvantage. The number of uses equals your proficiency bonus; all expended uses are regained on a long rest."],
          ["Unbreakable Majesty", "You always have the «Splendor» spell prepared — it doesn't count against the number of spells you know. In addition, when a creature you can see within 60 ft. makes an attack roll against you, you can force it to make a Charisma saving throw (DC = 8 + proficiency bonus + Charisma modifier) before that roll (if it can see or hear you). On a failure the creature can't attack you this turn and must choose a different target or the attack is wasted; on a success it makes all attack rolls against you this turn with disadvantage. You can do this once per turn against each creature."]
        ]
      },
      {
        name: "College of Dance",
        meta: "College of Dance (new)",
        features: [
          ["Dazzling Footwork", "The grace of dance is reflected in your movements. While you aren't wearing armour or using a shield, your AC equals 10 + Dexterity modifier + Charisma modifier. In addition, you can replace your Unarmed Strike's damage with a Dance attack: instead of its usual damage, the unarmed strike deals bludgeoning damage equal to one roll of your Bardic Inspiration die + your Charisma modifier (this doesn't expend a use of Inspiration). Also, while you aren't wearing armour, you have advantage on Dexterity (Acrobatics) and Charisma (Performance) checks, and you can take the Disengage action as a bonus action."],
          ["Inspiring Movement", "When a foe ends its turn within 5 ft. of you, you can use your reaction to move up to half your speed without provoking opportunity attacks. Then one willing ally you can see within 5 ft. of the point where you began or ended this movement can use its reaction to move up to half its speed, also without provoking opportunity attacks. You can use this a number of times equal to your proficiency bonus; all expended uses are regained on a long rest."],
          ["Leading Evasion", "When you take the Disengage action (including as a bonus action thanks to «Dazzling Footwork»), the effect of that action extends to each willing ally within 10 ft. of you. All these creatures retain the benefits of Disengage until the start of your next turn or until they become incapacitated."]
        ]
      }
    ]
  },
  "cleric-ph24": {
    name: "Cleric",
    primary: "Wisdom",
    saves: "Wisdom, Charisma",
    armor: "Light and medium armour, shields",
    weapons: "Simple weapons",
    skills: "Choose two: History, Insight, Medicine, Persuasion, Religion.",
    features: [
      ["Spellcasting", "You gain magic by praying to your deity or another sacred power. The spellcasting ability is Wisdom: your spell save DC = 8 + proficiency bonus + Wisdom modifier, and your spell attack bonus = proficiency bonus + Wisdom modifier. Cantrips: at level 1 you know 3 cleric cantrips of your choice (their number grows per the class table). Slots: you have spell slots per the cleric class table — a full caster. Preparation: after each long rest you prepare anew a list of cleric spells of level 1 and higher (number prepared = your cleric level + Wisdom modifier, minimum one); a prepared spell is cast by expending a slot of the appropriate level. Focus: you can use a Holy Symbol as a spellcasting focus. Rituals: a prepared spell with the «ritual» tag can be cast as a ritual (10 minutes longer, without expending a slot)."],
      ["Divine Order", "You dedicate yourself to one of the sacred specialties. Choose your order — this choice is made once and doesn't change. Protector: you train in wearing Heavy armour and gain proficiency with Martial weapons. Thaumaturge: you know one additional cleric cantrip of your choice (beyond the usual number). In addition, to your Intelligence (Arcana) and Intelligence (Religion) checks you add your Wisdom modifier (minimum +1)."],
      ["Channel Divinity", "You channel divine energy for special effects. You have 2 uses of Channel Divinity (3 from level 6, 4 from level 18); expended uses are regained at the end of a short or long rest. The DC of any saving throw against Channel effects = 8 + proficiency bonus + Wisdom modifier. Base options: Divine Spark — as a Magic action you channel energy at a point within 30 ft.: one creature there either regains 1d8 + Wisdom modifier hit points, or makes a Constitution saving throw, taking 1d8 + Wisdom modifier radiant or necrotic damage (your choice) on a failure (the die grows to 2d8 at level 7, 3d8 at level 13, 4d8 at level 18). Turn Undead — as a Magic action you present your Holy Symbol: each Undead within 30 ft. that can see or hear you makes a Wisdom saving throw; on a failure the creature is Frightened for 1 minute or until it takes damage, and while Frightened it spends its turn fleeing as far from you as it can. Your Domain at level 3 adds extra Channel options."],
      ["Divine Domain", "You choose a subclass — a sacred cleric Domain (Life, Light, War or Trickery). The Domain grants features at levels 3, 6 and 17, as well as (usually) extra prepared spells and a new Channel Divinity option."],
      ["Ability Score Improvement", "You gain a feat of the \"General\" category (PH24) of your choice for which you qualify. Usually it is taken to increase an ability: you can raise one ability score by +2 or two ability scores by +1 each, not exceeding 20. This feature repeats at levels 8, 12 and 16."],
      ["Sear Undead", "Your Turn Undead Channel Divinity action now immediately incinerates some creatures. When you use «Turn Undead», each Undead creature that fails its saving throw immediately takes radiant damage equal to 1d8 per the highest level of spell slot you have (that is, the die grows with your available cleric slots)."],
      ["Channel — 3 uses", "The number of uses of your Channel Divinity increases from 2 to 3. They are still regained at the end of a short or long rest."],
      ["Subclass Feature", "You gain the level 6 feature of your chosen Domain."],
      ["Blessed Strikes", "Divine power infuses your strikes or spells. Choose one manifestation — this choice is made once and doesn't change. Divine Strike: once on each of your turns, when you hit a creature with a weapon attack, you can deal an extra 1d8 radiant damage to the target. From level 14 (the «Improved Blessed Strikes» feature) this damage increases to 2d8. Potent Spellcasting: you add your Wisdom modifier (minimum +1) to the damage dealt by any of your cleric cantrips. From level 14 the range of your cleric cantrips with a range of 10 ft. or more increases by 60 ft."],
      ["Ability Score Improvement", "You again gain a feat of the \"General\" category (PH24) of your choice (see the level 4 feature): you can raise one ability score by +2 or two by +1, not exceeding 20."],
      ["Divine Intervention", "You call on your deity for aid. As a Magic action you cast any cleric spell of level 5 or lower from your list of prepared spells or the class's spell list, without expending a slot and without using material components (observing the spell's other requirements, including casting time and concentration). Once you use this feature, you can't use it again until you finish a long rest."],
      ["Ability Score Improvement", "You again gain a feat of the \"General\" category (PH24) of your choice (see the level 4 feature)."],
      ["Improved Blessed Strikes", "The «Blessed Strikes» manifestation chosen at level 7 is enhanced. If you chose «Divine Strike» — its extra damage increases from 1d8 to 2d8. If you chose «Potent Spellcasting» — the range of your cleric cantrips with a range of 10 ft. or more increases by 60 ft."],
      ["Ability Score Improvement", "You again gain a feat of the \"General\" category (PH24) of your choice (see the level 4 feature)."],
      ["Subclass Feature", "You gain the level 17 feature of your chosen Domain."],
      ["Channel — 4 uses", "The number of uses of your Channel Divinity increases from 3 to 4. They are still regained at the end of a short or long rest."],
      ["Epic Boon", "You gain one Epic Boon feat (PH24) of your choice for which you qualify."],
      ["Greater Divine Intervention", "When you use the «Divine Intervention» feature, you can replicate the effect of the «Wish» spell instead of a cleric spell of level 5 or lower. If you do so, you can't use «Divine Intervention» again until you finish a long rest; otherwise (if you produced the ordinary effect) the feature is regained, as usual, by the end of a long rest."]
    ],
    subclasses: [
      {
        name: "Life Domain",
        meta: "Life Domain",
        features: [
          ["Domain Spells and Disciple of Life", "Domain spells: while you are a cleric of this Domain, you always have the Life domain spells prepared (per the table: «Healing Word», «Bless», «Lesser Restoration», «Mass Healing Word», «Revivify», «Greater Restoration» and so on) — they don't count against your number of prepared spells and can't be changed. Proficiency with Heavy armour. Disciple of Life: whenever a spell of level 1 or higher restores hit points to a creature, it restores an additional 2 + the spell slot's level hit points to that creature."],
          ["Channel — Preserve Life", "You gain a new Channel Divinity option. As a Magic action you expend one use of Channel Divinity and present your Holy Symbol, summoning healing energy: distribute hit points equal to 5 × your cleric level among any number of creatures within 30 ft. A creature can't be healed above half its hit point maximum with this feature, and it has no effect on Undead and Constructs."],
          ["Blessed Healer", "When you cast a spell of level 1 or higher that restores hit points to another creature, you too regain hit points equal to 2 + the spell slot's level."],
          ["Supreme Healing", "When you would normally roll dice to restore hit points with a spell or Channel Divinity, you instead use the maximum value of each such die rather than rolling."]
        ]
      },
      {
        name: "Light Domain",
        meta: "Light Domain",
        features: [
          ["Warding Flare", "As a reaction, taken when a creature you can see within 60 ft. makes an attack roll, you create a flare of light: the target of that attack (you or another creature) makes the attack roll with disadvantage. A creature is immune if it can't be Blinded. The number of uses equals your Wisdom modifier (minimum one); all are regained at the end of a long rest."],
          ["Channel — Radiance of the Dawn", "You gain a new Channel Divinity option. As a Magic action you expend one use of Channel Divinity, dispelling magical darkness within 30 ft. and creating a 30-ft.-radius circle of bright light around yourself. Until the end of your turn you can move this circle 30 ft. as a Magic action. Each hostile creature that enters the circle for the first time on a turn or starts its turn there makes a Constitution saving throw, taking radiant damage equal to 2d10 + your cleric level on a failure, and half as much on a success."],
          ["«Light» cantrip", "You know the «Light» cantrip, and it doesn't count against your number of cleric cantrips known. In addition, while you are a cleric of this Domain, you always have the Light domain spells prepared («Burning Hands», «Scorching Ray», «Misty Step», «Fireball», «Protection from Energy», «Daylight» and so on); they don't count against your number of prepared spells and can't be changed."],
          ["Improved Warding Flare", "When using «Warding Flare», you can impose disadvantage on the attack roll not only of the target of that attack but also of any number of other creatures of your choice you can see within 30 ft. of you, against their attacks until the start of your next turn. (In other words, the flare dazzlingly hampers the attacks of several foes at once.)"],
          ["Corona of Light", "As a Magic action you create a radiant crown around your head and emit light out to 60 ft. for 1 minute (or until you end the effect with no action). Hostile creatures in this light have disadvantage on saving throws against any spell that deals fire or radiant damage cast by you or your allies."]
        ]
      },
      {
        name: "War Domain",
        meta: "War Domain",
        features: [
          ["Priest of War", "Domain spells: while you are a cleric of this Domain, you always have the War domain spells prepared («Divine Favor», «Guiding Bolt», «Thunderous Smite», «Magic Weapon», «Spiritual Weapon», «Shatter» and so on) — they don't count against your prepared spells and can't be changed. Proficiencies: you gain proficiency with Martial weapons and Heavy armour. Priest of War: having taken the Attack action on your turn, you can make one additional weapon attack as a bonus action. The number of uses of this feature equals your Wisdom modifier (minimum one); all are regained at the end of a long rest."],
          ["Channel — Guided Strike", "You gain a new Channel Divinity option. When you or a creature you can see within 30 ft. makes an attack roll, you can (with no action, as part of a reaction to the roll) expend one use of Channel Divinity to add +10 to that roll. You can use this after the d20 roll but before the result is announced."],
          ["War God's Blessing", "As a reaction, taken when a creature you can see within 30 ft. makes an attack roll, you add +10 to that roll. You can use this after the d20 roll but before the result is announced. The number of uses equals your Wisdom modifier (minimum one); all are regained at the end of a long rest."],
          ["Avatar of Battle", "You gain resistance to bludgeoning, piercing and slashing damage."]
        ]
      },
      {
        name: "Trickery Domain",
        meta: "Trickery Domain",
        features: [
          ["Blessing of the Trickster", "Domain spells: while you are a cleric of this Domain, you always have the Trickery domain spells prepared («Charm Person», «Disguise Self», «Invisibility», «Mirror Image», «Blur», «Polymorph» and so on) — they don't count against your prepared spells and can't be changed. Blessing of the Trickster: as a Magic action you touch a willing creature (you can touch yourself): until the end of its next turn it has advantage on Dexterity (Stealth) checks, and its speed increases by 10 ft."],
          ["Channel — Invoke Duplicity", "You gain a new Channel Divinity option. As a Magic action you expend one use of Channel Divinity and create a perfect illusory duplicate of yourself in an unoccupied space within 30 ft.; the duplicate is intangible, occupies its space and lasts 1 minute, until you are incapacitated or you end the effect (with no action). You can move the duplicate 30 ft. as a Magic action (but no farther than 120 ft. from you). You can cast your spells as though you were in the duplicate's space, but using your own senses. In addition, when you and the duplicate are both within 5 ft. of a creature that can see the duplicate, you have advantage on attack rolls against that creature."],
          ["Trickster's Transposition", "As a bonus action, while your illusory duplicate from «Invoke Duplicity» is active, you can magically swap places with it, teleporting into its space (and it into yours)."],
          ["Improved Duplicity", "When you use «Invoke Duplicity», you create up to four duplicates instead of one, and each can appear in any unoccupied space within 30 ft. of you. As a bonus action you can move each of them 30 ft. (but no farther than 120 ft. from you). The advantage on attacks and the ability to cast from a duplicate's space apply if any of your duplicates is nearby."]
        ]
      }
    ]
  },
  "druid-ph24": {
    name: "Druid",
    primary: "Wisdom",
    saves: "Wisdom, Intelligence",
    armor: "Light armour, shields (in 2024 the metal ban is lifted)",
    weapons: "Simple weapons",
    tools: "Herbalism Kit",
    skills: "Choose two: Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, Survival.",
    features: [
      ["Spellcasting", "You draw magic from nature itself. The spellcasting ability is Wisdom: your spell save DC = 8 + proficiency bonus + Wisdom modifier, and your spell attack bonus = proficiency bonus + Wisdom modifier. Cantrips: at level 1 you know 2 druid cantrips of your choice (their number grows per the class table). Preparation: you have access to the slots from the druid table; after each long rest you prepare anew a list of druid spells of level 1 and higher (number prepared per the class table), and you cast a prepared spell by expending a slot of the appropriate level. Focus: instead of material components you can use a Druidic Focus. Rituals: a prepared spell with the «ritual» tag can be cast as a ritual (10 minutes longer, without expending a slot)."],
      ["Druidic", "You know Druidic — the secret language of druids. You speak it and can use it to leave hidden messages: scratched on wood, laid out with stones, rope knots or leaves, and so on. You and anyone who knows Druidic automatically spot and read such a message. Others notice only that a message is there, on a successful DC 15 Intelligence (Investigation) check — and still can't decipher it without magic."],
      ["Primal Order", "You are an adherent of one of the druids' primal orders. Choose your order — this determines where you are stronger. Magician: you know one additional druid cantrip. In addition, to your Intelligence (Arcana) and Intelligence (Nature) checks you add your Wisdom modifier. Warden: you train in wearing Medium armour and gain proficiency with Martial weapons."],
      ["Wild Shape", "Action — Magic: you transform into a beast you have ever seen and whose challenge rating is available to you. Duration: a number of hours equal to half your druid level (rounded down), or until you revert to your true form as a bonus action, are incapacitated, or die. Uses: at level 2 — 2 (one regained on a short rest, all on a long rest; the number grows per the class table). Available forms: at level 2 a beast of CR up to 1/4 and without a flying speed (at level 4 — CR 1/2, at level 8 — CR 1; Circle of the Moon expands these limits). In the form: Strength, Dexterity, Constitution, AC and hit points become those of the beast, but Intelligence, Wisdom and Charisma remain yours; you retain your proficiencies, feats, class features, the ability to speak and to maintain concentration. Damage in excess of the form's hit points carries over to your hit points when you revert. You can't cast spells in the form (until the «Beast Spells» feature at level 18)."],
      ["Wild Companion", "As a Magic action you expend one use of Wild Shape to cast the «Find Familiar» spell without material components. The summoned spirit is of the Fey type and disappears when you use this feature again or after a number of hours equal to half your druid level."],
      ["Druid Circle", "You join one of the druid circles — Land, Moon, Sea or Stars (choose a subclass). The Circle grants features at levels 3, 6, 10 and 14."],
      ["Ability Score Improvement", "Take a General feat (PH24) or increase your ability scores."],
      ["Wild Resurgence", "You flow between nature magic and beast form. Once per turn, if you have no uses of Wild Shape left, you can (with no action) regain one use by expending a spell slot. In addition, with no action you can expend one use of Wild Shape to gain a level 1 spell slot; you can repeat this only after a long rest."],
      ["Circle Feature (lvl 6)", "You gain the level 6 feature of your chosen Druid Circle."],
      ["Elemental Fury", "Elemental magic empowers you. Choose how your fury manifests. Potent Spellcasting: you add your Wisdom modifier to the damage dealt by any of your druid cantrips. Primal Strike: once on each of your turns, when you hit a creature with a weapon attack or a Wild Shape attack, you can deal an extra 1d8 damage — thunder, acid, fire, cold or lightning (your choice)."],
      ["Ability Score Improvement", "Another General feat or ability score increase."],
      ["Circle Feature (lvl 10)", "You gain the level 10 feature of your chosen Druid Circle."],
      ["Ability Score Improvement", "Another General feat or ability score increase."],
      ["Circle Feature (lvl 14)", "You gain the level 14 feature of your chosen Druid Circle."],
      ["Improved Elemental Fury", "The manifestation chosen at level 7 is enhanced. If you chose «Potent Spellcasting» — the range of your druid cantrips (10 ft. and more) increases by 300 ft. If «Primal Strike» — its extra damage increases from 1d8 to 2d8."],
      ["Ability Score Improvement", "Another General feat or ability score increase."],
      ["Beast Spells", "While in Wild Shape, you can cast spells, replacing their verbal and somatic components with the sounds and movements of the beast form (material components with no cost are still not required)."],
      ["Epic Boon", "Take one Epic Boon feat (PH24)."],
      ["Archdruid", "Inexhaustible form: your uses of Wild Shape are effectively unlimited — when you regain them you always have at least one. Nature magic: when you cast a druid spell, you can expend a use of Wild Shape instead of a spell slot. Longevity: you age more slowly — for every 10 years that pass, your body ages only 1 year."]
    ],
    subclasses: [
      {
        name: "Circle of the Land",
        meta: "Circle of the Land",
        features: [
          ["Circle Spells", "Choose a type of terrain (arid, polar, temperate, tropical) — gain extra prepared spells and a cantrip of that terrain."],
          ["Natural Recovery", "On a short rest, regain spell slots totaling your level (max level 5) and cast one circle spell without a slot. Once per long rest."],
          ["Nature's Aid", "As a Magic action, expend a Wild Shape: a 10-ft. emanation appears around you (1 min.). Each creature in it can choose, once per turn, healing or the terrain's elemental damage."],
          ["Nature's Ward", "Immunity to the Poisoned condition. Resistance to the damage typical of the chosen terrain."],
          ["Nature's Sanctuary", "As a Magic action, create a 30-ft.-radius protective zone for an hour: allies in it gain +1 AC and saving throws; concentration."]
        ]
      },
      {
        name: "Circle of the Moon",
        meta: "Circle of the Moon",
        features: [
          ["Combat Wild Shape", "While in form, as a bonus action expend a slot: regain (1d8 × slot level) hit points. Can choose beasts of CR up to (druid level / 3)."],
          ["Improved Circle Forms", "Attacks in form count as magical; +Wisdom to one attack's damage per turn."],
          ["Moonlight Step", "As a bonus action, teleport 30 ft. to a space you can see and gain advantage on your next attack or check. Uses — PB per long rest."],
          ["Lunar Form", "Attacks in form deal an extra 2d10 radiant damage (once per turn). When you Moonlight Step, you can bring a willing ally with you."]
        ]
      },
      {
        name: "Circle of the Sea",
        meta: "Circle of the Sea (new)",
        features: [
          ["Wrath of the Sea", "Expend a Wild Shape: as a Magic action a 15-ft. aura-emanation appears around you (1 minute, concentration). When foes enter it or start their turn there — Constitution saving throw; failure — cold damage (grows with level) and pushed back 10 ft."],
          ["Aquatic Affinity", "Your swimming speed equals your walking speed; you breathe underwater. The Wrath of the Sea aura increases to 20 ft."],
          ["Stormborn", "While in Wrath of the Sea, you gain a flying speed equal to your walking speed. Resistance to cold, lightning and thunder damage."],
          ["Oceanic Gift", "As a Magic action, share Wrath of the Sea with one willing ally within 60 ft.: the same aura appears on them for the remaining duration."]
        ]
      },
      {
        name: "Circle of Stars",
        meta: "Circle of Stars",
        features: [
          ["Star Map", "Create a sacred star chart (a spellcasting focus). You additionally know «Healing Word» and «Guiding Bolt»."],
          ["Starry Form", "As a bonus action, expend a Wild Shape: for 10 minutes take on a star constellation — Archer (as a bonus action, a 60-ft. ray, 1d8 + Wisdom radiant), Chalice (Healing Word — +1d8 healing), Dragon (minimum 10 on concentration and Intelligence/Wisdom checks)."],
          ["Cosmic Omen", "As a reaction, when a creature within 30 ft. makes a d20 roll, roll a d6: even — add +d6 to the roll (Weal), odd — subtract d6 (Woe). Uses — PB per long rest."],
          ["Twinkling Constellations", "The forms' dice increase to 1d10. Archer gains a flying speed of 30 ft.; Dragon extends the 10-minimum to Wisdom/Intelligence saving throws."],
          ["Full of Stars", "While in Starry Form, you gain resistance to bludgeoning, piercing and slashing damage."]
        ]
      }
    ]
  },
  "fighter-ph24": {
    name: "Fighter",
    primary: "Strength or Dexterity",
    saves: "Strength, Constitution",
    armor: "All armour and shields",
    weapons: "Simple and martial weapons",
    skills: "Choose two: Acrobatics, Athletics, Perception, Survival, Intimidation, History, Nature, Animal Handling.",
    features: [
      ["Fighting Style", "You adopt a particular style of fighting as a specialist. You gain (with no action, when you gain the feature) one feat of your choice from the «Fighting Style» category — for example «Archery», «Defense», «Dueling», «Great Weapon Fighting», «Interception», «Thrown Weapon Fighting», «Blind Fighting» and so on. When you gain a level in this class, you can replace a previously chosen Fighting Style feat with another."],
      ["Second Wind", "You have a reserve of vitality you can draw on to protect yourself from harm. As a bonus action you regain hit points equal to \"1d10 + your fighter level\". Uses: 2; you regain 1 expended use on a short rest and all expended uses on a long rest. The number of uses grows: 3 at level 4, 4 at level 10."],
      ["Weapon Mastery", "Your training lets you use the mastery properties (for example «Slow», «Topple», «Graze» and so on) of 3 kinds of weapon of your choice that have mastery listed in their properties (for example spear and longbow). When you finish a long rest, you can change the chosen weapon kinds. The number of weapon kinds grows: 5 at level 4, 6 at level 10."],
      ["Action Surge", "You can push yourself to act with special speed for a moment. On your turn you can (with no action) take one additional action of any kind except the «Magic» action. Uses: 1; you regain the expended use on a short or long rest. At level 17 the number of uses increases to 2, but you can spend only one per turn."],
      ["Tactical Mind", "You have a keen mind for overcoming obstacles. When you fail an ability check, you can expend one use of Second Wind (without spending hit points on healing) to add 1d10 to the result of that check, which can turn a failure into a success. If the check still fails, the use of Second Wind isn't expended."],
      ["Subclass", "You choose a martial archetype (subclass): Champion, Battle Master, Eldritch Knight or Psi Warrior. The archetype grants features at levels 3, 7, 10, 15 and 18."],
      ["Ability Score Improvement", "You gain (with no action) one General feat (the \"General\" category, PH24) of your choice for which you meet the prerequisites. Instead of a feat you can increase your ability scores per the rules of the corresponding ability-increase feats (usually +2 to one or +1 to two abilities, not above 20)."],
      ["Extra Attack", "When you take the «Attack» action on your turn, you make 2 attacks instead of one."],
      ["Ability Score Improvement", "You gain (with no action) another General feat or increase your ability scores, as described at level 4."],
      ["Subclass Feature", "You gain the level 7 feature of your chosen martial archetype."],
      ["Ability Score Improvement", "You gain (with no action) another General feat or increase your ability scores, as described at level 4."],
      ["Indomitable", "You can change fate in your favour. When you fail a saving throw, you can (with no action) reroll it, and must use the new result. Uses: 1; you regain expended uses on a long rest. The number of uses grows: 2 at level 13, 3 at level 17."],
      ["Tactical Shift", "You have learned to move to safety in the thick of a fight. When you use Second Wind, you can (with no extra action, as part of the same bonus action) move a distance equal to half your speed, and this movement doesn't provoke opportunity attacks."],
      ["Subclass Feature", "You gain the level 10 feature of your chosen martial archetype."],
      ["Two Extra Attacks", "When you take the «Attack» action on your turn, you make 3 attacks instead of one."],
      ["Ability Score Improvement", "You gain (with no action) another General feat or increase your ability scores, as described at level 4."],
      ["Studied Attacks", "You become accustomed to studying your foe's defenses in combat. If you miss a creature with an attack roll, you gain advantage on your next attack roll against that creature before the end of your next turn."],
      ["Ability Score Improvement", "You gain (with no action) another General feat or increase your ability scores, as described at level 4."],
      ["Subclass Feature", "You gain the level 15 feature of your chosen martial archetype."],
      ["Ability Score Improvement", "You gain (with no action) another General feat or increase your ability scores, as described at level 4."],
      ["Subclass Feature", "You gain the level 18 feature of your chosen martial archetype."],
      ["Epic Boon", "You gain (with no action) one Epic Boon feat (the \"Epic\" category, PH24) of your choice for which you meet the prerequisites, or instead increase your ability scores."],
      ["Three Extra Attacks", "When you take the «Attack» action on your turn, you make 4 attacks instead of one."]
    ],
    subclasses: [
      {
        name: "Champion",
        meta: "Champion",
        features: [
          ["Improved Critical", "Your weapon attacks score a critical hit on a roll of not only 20 but also 19 or 20 on the d20 (crit range 19–20). This feature works only for weapon attacks (including unarmed strikes), not for spells."],
          ["Remarkable Athlete", "Thanks to your training, you surpass most athletes. You gain the following benefits (with no action, always on). Initiative: to your initiative rolls you add half your proficiency bonus (rounded up). Jump: the distance of your running jump (both long and high) increases by a number of feet equal to your Strength modifier (minimum +1 ft.)."],
          ["Additional Fighting Style", "You gain (with no action) another feat of your choice from the «Fighting Style» category in addition to the one you already have."],
          ["Heroic Warrior", "The thrill of battle grants you resilience. At the start of each of your combats (for example, on rolling initiative), you gain Heroic Inspiration if you don't already have it. Heroic Inspiration lets you (with no action) reroll any d20 and use either result."],
          ["Superior Critical", "Your weapon attacks now score a critical hit on a roll of 18, 19 or 20 on the d20 (crit range 18–20)."],
          ["Survivor", "You reach the pinnacle of combat resilience, gaining the following benefits. Defense: you have advantage on initiative rolls. Healing: at the start of each of your turns you regain hit points equal to \"5 + your Constitution modifier\" if you have no more than half your hit point maximum remaining. This feature doesn't work if you have 0 hit points."]
        ]
      },
      {
        name: "Battle Master",
        meta: "Battle Master",
        features: [
          ["Combat Superiority", "You master combat maneuvers fueled by special superiority dice. Maneuvers: you know 3 maneuvers of your choice from the Battle Master list (for example «Pushing Attack», «Feinting Attack», «Parry», «Goading Attack» and so on). When you finish a long rest, you can replace one known maneuver with another. Superiority dice: you have 4 superiority dice, each a 1d8. A maneuver expends one superiority die; its result is added to an attack roll or damage, or used as described by the maneuver. Recovery: you regain all expended dice on a short or long rest. The save DC of maneuvers (if a maneuver requires the target to save) = 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice). As your fighter level grows, you gain additional superiority dice (5 at level 7, 6 at level 15)."],
          ["Student of War", "Your combat training has given you side knowledge as well. You gain proficiency with one Artisan's Tools of your choice and one skill of your choice from the Fighter class's skill list."],
          ["Know Your Enemy", "You can size up the combat capabilities of others. Spending 1 minute observing or interacting with a creature outside combat, you (with no action) learn one piece of information of your choice about it, provided the creature isn't deliberately concealing it: its highest or lowest ability score, its highest or lowest saving throw bonus, whether it has any damage resistances, vulnerabilities or immunities, or its current hit point total compared to yours."],
          ["Improved Combat Superiority", "Your superiority dice become d10s (instead of d8). In addition, you learn additional maneuvers: the total number of maneuvers you know increases (you learn additional maneuvers of your choice from the Battle Master list)."],
          ["Relentless", "When you enter a combat with no superiority dice left, you gain one such die. In addition, at the start of each of your turns you (with no action) regain 1 expended superiority die if you have none left."],
          ["Superiority — d12", "Your superiority dice become d12s (instead of d10)."]
        ]
      },
      {
        name: "Eldritch Knight",
        meta: "Eldritch Knight (third caster, Intelligence, wizard list)",
        features: [
          ["Spellcasting", "You augment your combat mastery with wizard magic. The spellcasting ability is Intelligence: your spell save DC = 8 + proficiency bonus + Intelligence modifier, and your spell attack bonus = proficiency bonus + Intelligence modifier. You are a third caster: slots and the number of available spell levels grow more slowly, per the Eldritch Knight table. Cantrips: at level 3 you know 3 wizard cantrips of your choice. Spells: you know 3 level 1 spells from the wizard list. When choosing new spells, almost all of them must belong to the Abjuration or Evocation schools (exceptions per the table). You cast a spell by expending a slot of the appropriate level, using the «Magic» action. As you gain levels, you can replace known spells."],
          ["Weapon Bond", "You learn to magically bond a weapon to yourself. By completing a 1-hour ritual (which can be done during a short rest) you bond one weapon you are proficient with to yourself; you can be bonded to up to 2 weapons at once, but summon only one at a time. Benefits of a bonded weapon: you can't be disarmed of it unless you are incapacitated; and you can (as a bonus action) summon the bonded weapon to a free hand, instantly transporting it to you from any distance, provided it is on the same plane of existence as you."],
          ["War Magic", "You have learned to weave weapon strikes into your spellcasting. When you cast a cantrip with the «Magic» action on your turn, you can make one weapon attack as a bonus action on the same turn."],
          ["Eldritch Strike", "You have learned to pierce enemies' magical defenses with your strikes. Once per turn, when you hit a creature with a weapon attack, you can make that creature roll its next saving throw with disadvantage against a spell you cast before the end of your next turn."],
          ["Arcane Charge", "You gain the ability to teleport into the thick of combat. When you use the «Action Surge» feature, you can (with no extra action) teleport up to 30 ft. to an unoccupied space you can see."],
          ["Improved War Magic", "Your mastery of war magic improves: the «War Magic» feature triggers after you cast any spell with the «Magic» action (not just a cantrip), letting you make a weapon attack as a bonus action on the same turn."]
        ]
      },
      {
        name: "Psi Warrior",
        meta: "Psi Warrior",
        features: [
          ["Psionic Power", "Psionic energy awakens in you as a pool of Psionic Energy Dice. Pool: the number of dice equals \"2 × your proficiency bonus\", each a d6. Recovery: you regain 1 expended die (with no action) at the start of each of your turns (a base-rules option gives you at least one on a short rest); you regain all expended dice on a long rest. The ability for these features is Intelligence. As your fighter level grows, the die size grows: d8 at level 5, d10 at level 11, d12 at level 17. You gain the following features. Protective Field: as a reaction, when you or a creature you can see within 30 ft. takes damage, you expend a Psionic Energy Die and reduce that damage by \"the number rolled + your Intelligence modifier\". Psionic Strike: once per turn, when you hit a creature with a weapon attack, you expend a Psionic Energy Die to deal extra force damage equal to \"the number rolled + your Intelligence modifier\". Telekinetic Movement: as a Magic action you expend a Psionic Energy Die and target one creature or unattended object (Huge or smaller) within 30 ft., moving it 30 ft. to a space you can see (a creature only if it fails a Strength saving throw, DC = 8 + proficiency bonus + Intelligence modifier)."],
          ["Telekinetic Adept", "You master new psionic techniques. Psi-Powered Leap: as part of your movement you can replace it with a telekinetic leap of 30 ft. in a straight line to an unoccupied space you can see; this is free (no die spent) and can be used twice per turn. Telekinetic Thrust: when you deal a creature the extra damage from the «Psionic Strike» feature, you can force that target to make a Strength saving throw (DC = 8 + proficiency bonus + Intelligence modifier); on a failure you move the target 10 ft. horizontally (your choice, toward or away from you)."],
          ["Guarded Mind", "Your psionic power shields your mind. You gain resistance to psychic damage. In addition, as a reaction, when you become Charmed or Frightened, you can expend a Psionic Energy Die to immediately end that effect on yourself."],
          ["Bulwark of Force", "As a Magic action you expend a Psionic Energy Die to create a stationary 30-ft.-radius sphere of telekinetic energy centered on a point within 120 ft. The sphere lasts while you maintain concentration (up to 10 minutes). Each creature of your choice in that area (including you) gains the following benefits: half cover, resistance to force damage, and the ability to add to saving throws when moving against a force effect. (Per the base option, the feature gives allies in the sphere half cover.)"],
          ["Telekinetic Master", "You reach the pinnacle of psionics. You can always cast the «Telekinesis» spell (the ability is Intelligence), without expending a spell slot and without needing material components; you can regain such a free casting on a long rest (between rests you can also cast it using a slot). In addition, on each of your turns while you maintain concentration on «Telekinesis», you can make one weapon attack as a bonus action."]
        ]
      }
    ]
  },
  "monk-ph24": {
    name: "Monk",
    primary: "Dexterity and Wisdom",
    saves: "Strength, Dexterity",
    armor: "No armour",
    weapons: "Simple weapons + martial weapons with the «Light» property",
    skills: "Choose two: Acrobatics, Athletics, History, Insight, Religion, Stealth.",
    features: [
      ["Martial Arts", "Your practice of martial arts gives you mastery in unarmed combat and with monk weapons (any Simple melee weapon and any weapon with the «Light» property that doesn't have the «Two-Handed» or «Heavy» properties). You gain the following benefits while unarmed or using only monk weapons and not wearing armour or a shield. Dexterous Attacks: for attack and damage rolls of unarmed strikes and monk weapons you can use your Dexterity modifier instead of Strength. Martial Arts Die: you can replace the normal damage of an unarmed strike or monk weapon with a roll of the «Martial Arts Die». This die is 1d6 at level 1 and grows as your monk level grows: 1d8 at level 5, 1d10 at level 11, 1d12 at level 17. Bonus-action unarmed strike: having taken the «Attack» action on your turn, you can make one unarmed strike as a bonus action."],
      ["Unarmoured Defence", "While you aren't wearing armour or using a shield, your Armour Class equals \"10 + Dexterity modifier + Wisdom modifier\" (with no action, always on)."],
      ["Monk's Focus", "Your training lets you draw on a special inner reserve — Discipline. You have Focus Points (Discipline) equal to your monk level (at level 2 — 2). You spend these points on Focus techniques and regain all expended points on a short or long rest. Base techniques (the save DC, where required, = 8 + proficiency bonus + Wisdom modifier): Flurry of Blows — having taken the «Attack» action, you can spend 1 Focus Point as a bonus action to make 2 unarmed strikes (3 at level 10). Patient Defense — you can take the «Dodge» action as a bonus action; or spend 1 Focus Point to take both «Dodge» and «Disengage» as a bonus action. Step of the Wind — you can take the «Dash» action as a bonus action; or spend 1 Focus Point to take both «Dash» and «Disengage» as a bonus action, and your jump distance is doubled until the end of the turn."],
      ["Unarmoured Movement", "While you aren't wearing armour or using a shield, your speed increases (with no action, always on): +10 ft. at level 2, +15 ft. at level 6, +20 ft. at level 10, +25 ft. at level 14 and +30 ft. at level 18."],
      ["Uncanny Metabolism", "When you roll initiative, you can (with no action) regain all expended Focus Points and at the same time regain hit points equal to \"a Martial Arts Die roll + your monk level\" (roll one Martial Arts Die). You can use this feature once, and you regain the ability to use it on a long rest."],
      ["Monk Subclass", "You choose a monk subclass (Warrior of the Open Hand, Warrior of Mercy, Warrior of Shadow or Warrior of the Elements). The subclass grants features at levels 3, 6, 11 and 17."],
      ["Deflect Attacks", "As a reaction, when you take bludgeoning, piercing or slashing damage, you can reduce that damage by an amount equal to \"1d10 + Dexterity modifier + your monk level\". If the damage is reduced to 0 this way and you can reach the source of the damage with a free hand (or catch the projectile), you can spend 1 Focus Point to redirect the attack: make an unarmed strike against a creature within 5 ft. (or throw the caught projectile at its normal range), using your Dexterity modifier for the attack and damage rolls, dealing Martial Arts Die damage on a hit."],
      ["Ability Score Improvement", "You gain (with no action) one General feat (the \"General\" category, PH24) of your choice for which you meet the prerequisites, or instead increase your ability scores per the rules of the corresponding ability-increase feats (usually +2 to one or +1 to two abilities, not above 20)."],
      ["Slow Fall", "As a reaction, when you fall, you can reduce the fall damage by an amount equal to \"5 × your monk level\"."],
      ["Extra Attack", "When you take the «Attack» action on your turn, you make 2 attacks instead of one."],
      ["Stunning Strike", "Once per turn, when you hit a creature with an unarmed strike or monk weapon, you can spend 1 Focus Point to attempt to stun the target. The target makes a Constitution saving throw (DC = 8 + proficiency bonus + Wisdom modifier); on a failure the target has the Stunned condition until the end of your next turn."],
      ["Empowered Strikes", "Your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks. In addition, when you deal damage with an unarmed strike, you can choose to deal force damage instead of the usual bludgeoning damage."],
      ["Subclass Feature (lvl 6)", "You gain the level 6 feature of your chosen monk subclass."],
      ["Evasion", "When you are subjected to an effect that allows a Dexterity saving throw to take half damage, you instead take no damage on a successful save and only half damage on a failure. This feature doesn't work while you are Incapacitated."],
      ["Ability Score Improvement", "You gain (with no action) another General feat or increase your ability scores, as described at level 4."],
      ["Acrobatic Movement", "While you aren't wearing armour or using a shield, on your turn you can move along vertical surfaces and across the surface of liquids without falling during that movement."],
      ["Heightened Focus", "Your Focus techniques are enhanced. Flurry of Blows: you now make 3 unarmed strikes with it instead of 2. Patient Defense: when you use this technique, you gain temporary hit points equal to \"2 × your monk level\". Step of the Wind: you can extend the effect to a willing creature within 5 ft. of you, spending the same bonus action (you both gain «Dash» and «Disengage»)."],
      ["Subclass Feature (lvl 11)", "You gain the level 11 feature of your chosen monk subclass."],
      ["Ability Score Improvement", "You gain (with no action) another General feat or increase your ability scores, as described at level 4."],
      ["Deflect Energy", "The «Deflect Attacks» feature now lets you reduce, as a reaction, damage of any type except force. If you redirect the attack, dealing a counterblow or throwing a projectile, you can deal the target damage of the same type you reduced (instead of the usual unarmed strike damage)."],
      ["Disciplined Survivor", "You gain proficiency in all saving throws. In addition, you can (with no action) reroll a failed saving throw by spending 1 Focus Point, and must use the new result."],
      ["Perfect Focus", "When you roll initiative, if you have fewer than half your maximum Focus Points left, you (with no action) regain them up to half your maximum."],
      ["Ability Score Improvement", "You gain (with no action) another General feat or increase your ability scores, as described at level 4."],
      ["Subclass Feature (lvl 17)", "You gain the level 17 feature of your chosen monk subclass."],
      ["Superior Defense", "As a bonus action you can spend 3 Focus Points to wrap yourself in protective energy for 1 minute or until you become Incapacitated. During this time you gain resistance to all damage except force."],
      ["Epic Boon", "You gain (with no action) one Epic Boon feat (the \"Epic\" category, PH24) of your choice for which you meet the prerequisites, or instead increase your ability scores."],
      ["Body and Mind", "Your training reaches its pinnacle. Your Dexterity and Wisdom scores increase by 4, and the maximum for these abilities becomes 25."]
    ],
    subclasses: [
      {
        name: "Warrior of the Open Hand",
        meta: "Way of the Open Hand",
        features: [
          ["Open Hand Technique", "When you hit a creature with one of the unarmed strikes made by the «Flurry of Blows» technique, you can apply one of the following effects to the target (your choice for each strike). Topple: the target makes a Dexterity saving throw (DC = 8 + proficiency bonus + Wisdom modifier); on a failure it has the Prone condition. Push: the target makes a Strength saving throw (same DC); on a failure you push it 15 ft. away from you. Block Reactions: the target can't take reactions until the start of your next turn (no saving throw required)."],
          ["Wholeness of Body", "As a bonus action you regain hit points equal to \"3 × your monk level\". You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses on a long rest."],
          ["Fleet Step", "When you use the «Step of the Wind» technique on your turn, you can use it again as a bonus action later in the same turn, even if you have already taken another bonus action (that is, «Step of the Wind» can be used twice per turn)."],
          ["Quivering Palm", "Once per turn, when you hit a creature with an unarmed strike, you can spend 3 Focus Points to set up imperceptible deadly vibrations in its body that last up to 24 hours. These vibrations are harmless until you (with no action, on your turn) choose to release them, or until you end them harmlessly as a Magic action. When you release the vibrations, the target makes a Constitution saving throw (DC = 8 + proficiency bonus + Wisdom modifier): on a failure — it takes 10d12 force damage; on a success — half as much. You can release the vibrations only while the target is on the same plane of existence as you."]
        ]
      },
      {
        name: "Warrior of Mercy",
        meta: "Way of Mercy",
        features: [
          ["Hand of Healing", "As a Magic action you spend 1 Focus Point to touch a creature within 5 ft. and restore hit points equal to \"a Martial Arts Die roll + your Wisdom modifier\". In addition, when using the «Flurry of Blows» technique, you can forgo one of its unarmed strikes to instead use «Hand of Healing» without spending a Focus Point (but restoring hit points without your Wisdom modifier)."],
          ["Hand of Harm", "Once per turn, when you hit a creature with an unarmed strike, you can spend 1 Focus Point to deal the target extra necrotic damage equal to \"a Martial Arts Die roll + your Wisdom modifier\"."],
          ["Implements of Mercy", "You gain proficiency in the Medicine skill and with a Herbalism Kit, as well as proficiency in saving throws against the Poisoned condition (with no action, always on)."],
          ["Physician's Touch", "When using «Hand of Healing», you can additionally remove one of the following conditions from the target of your choice: Blinded, Deafened, Poisoned or Paralyzed. When using «Hand of Harm», you can force the target to make a Constitution saving throw (DC = 8 + proficiency bonus + Wisdom modifier); on a failure it has the Poisoned condition until the end of your next turn."],
          ["Flurry of Healing and Harm", "When you use the «Flurry of Blows» technique, you can replace each of its unarmed strikes with a use of «Hand of Healing» or «Hand of Harm», without spending Focus Points for each strike (instead of striking the target you heal it with «Hand of Healing» or, on a hit, add the «Hand of Harm» effect)."],
          ["Hand of Ultimate Mercy", "As a Magic action you spend 5 Focus Points to touch a creature that has been dead no longer than 24 hours and return it to life with hit points equal to \"a Martial Arts Die roll × 5 + your Wisdom modifier\". This feature can't return to life Undead, Constructs or creatures that died of old age, and it doesn't restore missing body parts."]
        ]
      },
      {
        name: "Warrior of Shadow",
        meta: "Way of Shadow",
        features: [
          ["Shadow Arts", "You can manipulate shadows. You know the «Minor Illusion» cantrip (the spellcasting ability for your spells of this subclass is Wisdom). In addition, as a Magic action you can spend 2 Focus Points to cast, without material components, one of the spells: «Darkvision», «Darkness», «Silence» or «Pass without Trace» (per the 2024 rules — the corresponding stealth and darkness spells from the list), using Wisdom for them. The spell is cast at its base level."],
          ["Shadow Step", "While in an area of dim light or darkness, you can use a bonus action to teleport up to 60 ft. to an unoccupied space you can see that is also in dim light or darkness. After this you gain advantage on the first attack roll you make before the end of the current turn."],
          ["Improved Shadow Step", "The «Shadow Step» technique is enhanced. The teleport range increases to 90 ft. In addition, having used «Shadow Step», you can make one unarmed strike as a bonus action on the same turn immediately after teleporting (if you ended within reach of a creature)."],
          ["Cloak of Shadows", "While in an area of dim light or darkness, you can use a Magic action to become Invisible, along with everything you carry and wear. The invisibility lasts until you are in an area of bright light, make an attack roll, deal an unarmed strike, cast a spell or take a Magic action. While hidden by this feature, you can use a Magic action to teleport between shadows up to 60 ft."]
        ]
      },
      {
        name: "Warrior of the Elements",
        meta: "Way of the Elements",
        features: [
          ["Elemental Attunement", "You learn to channel elemental power. You know the «Elementalism» cantrip; the ability for it is Wisdom. Elemental Strike: while you use Martial Arts, your unarmed strikes gain +5 ft. of reach, and you can choose to deal acid, cold, fire, thunder or lightning damage with them instead of the usual damage. Elemental Burst: you can spend 1 Focus Point as a Magic action to create a 15-ft. cone of elemental energy. Each creature in that area makes a Dexterity saving throw (DC = 8 + proficiency bonus + Wisdom modifier); on a failure it takes damage equal to \"2 Martial Arts Die rolls\" of the chosen elemental type (acid, cold, fire, thunder or lightning), and half as much on a success."],
          ["Stride of the Elements", "The «Elemental Burst» technique is enhanced: the cone's length increases from 15 to 30 ft. In addition, by choosing one target in the burst's area, you can mark it: until the end of your next turn your attack rolls against that target are made with advantage."],
          ["Stride of the Elements", "You gain a swimming speed and a flying speed equal to your walking speed (with no action, always on). In addition, while flying thanks to this feature, you can hover in the air."],
          ["Elemental Epitome", "As a Magic action you spend 3 Focus Points to take on an elemental form for 1 minute (or until you become Incapacitated), gaining the following benefits. Elemental Movement: your speed increases by 10 ft. Resistance: you gain resistance to one damage type from the elemental strike list (your choice on activation). Elemental Charge: once on each of your turns, when you hit a creature with an unarmed strike, you deal it extra damage of the chosen elemental type equal to your proficiency bonus."]
        ]
      }
    ]
  },
}
export default PART
