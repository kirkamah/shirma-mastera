const PART: Record<string, { name: string; primary: string; saves: string; armor: string; weapons: string; tools?: string; skills: string; features: [string, string][]; subclasses?: { name: string; meta?: string; features: [string, string][] }[] }> = {
  "paladin-ph24": {
    name: "Paladin",
    primary: "Strength and Charisma",
    saves: "Wisdom, Charisma",
    armor: "All armor and Shields",
    weapons: "Simple and Martial",
    skills: "Choose two: Athletics, Insight, Intimidation, Medicine, Persuasion, Religion.",
    features: [
      ["Lay On Hands", "You have a divine pool of healing power that replenishes when you finish a Long Rest. The pool's size in Hit Points equals 5 × your Paladin level (for example, 5 HP at 1st level, 25 at 5th). Healing: as an action you touch a creature and channel power from the pool, restoring any number of Hit Points up to the amount remaining in the pool. Curing Poison and Disease: instead of healing, you can spend 5 HP from the pool to end one poison or one disease affecting the creature you touch. You can also use this feature on yourself. The pool cannot heal Undead or Constructs. Restoration: all spent pool HP returns after a Long Rest."],
      ["Spellcasting", "Preparing for battle against evil, you study prayer-based spells. Your spellcasting ability is Charisma: your spell save DC = 8 + Proficiency Bonus + Charisma modifier, and your spell attack bonus = Proficiency Bonus + Charisma modifier. The Paladin is a half-caster: spell slots are gained per the corresponding table (you have none at 1st level; your first 1st-level slots appear at 2nd level). Spellcasting Focus: instead of material components without a listed cost you can use a Holy Symbol. Preparation: after each Long Rest you re-prepare your list of Paladin spells of 1st level and higher (the number prepared is given by the class table); a prepared spell is cast by expending a slot of the appropriate level. You can swap one prepared spell for another when you finish a Long Rest."],
      ["Fighting Style", "You adopt a particular style of fighting as your specialty. You gain (no action) one feat of your choice from the \"Fighting Style\" category — such as Defense, Dueling, Great Weapon Fighting, Protection, Blessed Warrior (which grants Cleric cantrips), and so on. Whenever you gain a level in this class, you can replace the Fighting Style feat you chose earlier with another."],
      ["Paladin's Smite", "You always have the spell «Divine Smite» prepared, and it doesn't count against the number of spells you can prepare. In addition, once per Long Rest you can cast «Divine Smite» without expending a spell slot. The spell itself: as a Bonus Action on the same turn you hit a creature with a melee weapon attack or an Unarmed Strike, you deal the target an extra 2d8 Radiant damage; if the target is an Undead or a Fiend, the damage increases to 3d8. When cast with a 2nd-level slot or higher, the damage increases by 1d8 for each slot level above 1st."],
      ["Channel Divinity", "You can channel divine energy for special effects. The base effect for all Paladins is Divine Sense (Turn Undead), and your Oath (subclass) adds its own Channel options. Uses: 2; you regain 1 expended use when you finish a Short Rest, and all when you finish a Long Rest (3 uses at 11th level). Turn Undead: as a Magic action you present your Holy Symbol and speak a prayer censuring Undead and Fiends. Each such creature that can see or hear you within 30 ft. must succeed on a Wisdom saving throw (DC = 8 + Proficiency Bonus + Charisma modifier) or have the Frightened condition for 1 minute or until it takes damage. A creature Frightened this way spends its turns trying to move as far from you as it can, and can't willingly move within 30 ft. of you; it also can't take Reactions. For its action it can only Dash or try to escape an effect that prevents it from moving."],
      ["Oath", "You take a sacred oath and become a devotee of one of the paladin orders — choosing a subclass (Oath of Devotion, Oath of Glory, Oath of the Ancients, or Oath of Vengeance). Your Oath grants you features at levels 3, 7, 15, and 20."],
      ["Ability Score Improvement", "You gain (no action) one General feat (the \"General\" category, PH24) of your choice for which you qualify. Instead of a feat you can increase your ability scores per the rules of ability-score-improvement feats (typically +2 to one or +1 to two, none above 20)."],
      ["Extra Attack", "When you take the Attack action on your turn, you make 2 attacks instead of one."],
      ["Faithful Steed", "You always have the spell «Find Steed» prepared, and it doesn't count against the number of spells you can prepare. In addition, once per Long Rest you can cast «Find Steed» without expending a spell slot."],
      ["Aura of Protection", "You emit an unseen aura of protection in a 10-ft. radius (30 ft. at 18th level) around yourself; the aura is inactive while you have the Incapacitated condition. You and each creature of your choice in the aura gain a bonus to all saving throws equal to your Charisma modifier (minimum bonus of +1). This effect doesn't stack with the same aura from another Paladin."],
      ["Subclass Feature", "You gain the 7th-level feature of your Oath."],
      ["Abhor Enemies", "Your Turn Undead gains an enhanced form that works on any creatures, not just Undead and Fiends. When you use Turn Undead, you can force each creature of your choice that can see or hear you within 30 ft. to make a Wisdom saving throw (DC = 8 + Proficiency Bonus + Charisma modifier). On a failure, the creature has the Frightened condition for 1 minute or until it takes damage. If a creature fails the save by 5 or more, it also has the Paralyzed condition for the same duration; at the end of each of its turns a creature Frightened this way can repeat the save, ending both effects on itself on a success."],
      ["Aura of Courage", "You and each creature of your choice within your Aura of Protection are immune to the Frightened condition; while a creature is already Frightened, the condition is suspended while it is in the aura. The radius matches the Aura of Protection (10 ft., 30 ft. at 18th level)."],
      ["Radiant Strikes", "Your strikes blaze with divine light. Once per turn, when you hit a creature with a melee weapon attack or an Unarmed Strike, you deal the target an extra 1d8 Radiant damage."],
      ["Restoring Touch", "When you use Lay On Hands on a creature, you can also end one of the following conditions on it: Blinded, Charmed, Deafened, Frightened, Paralyzed, Petrified, Poisoned, or Stunned. For each such condition removed you spend 5 HP from your Lay On Hands pool (in addition to any HP spent on the healing itself, if any)."],
      ["Subclass Feature", "You gain the 15th-level feature of your Oath."],
      ["Ability Score Improvement", "You gain (no action) another General feat or increase your ability scores, as described at 4th level."],
      ["Auras — 30 ft.", "The radius of each of your paladin auras (Aura of Protection, Aura of Courage, and auras granted by your Oath) increases from 10 to 30 ft."],
      ["Epic Boon", "You gain (no action) one Epic feat (the \"Epic\" category, PH24) of your choice."],
      ["Oath's Apex", "You gain the capstone 20th-level feature of your Oath."]
    ],
    subclasses: [
      {
        name: "Oath of Devotion",
        meta: "Oath of Devotion",
        features: [
          ["Channel Divinity: Sacred Weapon", "As a Channel Divinity option, as a Bonus Action you imbue one weapon you're proficient with with holy power for 10 minutes or until you fall unconscious, let go of the weapon, or end the effect as a Bonus Action. For that time you add your Charisma modifier (minimum +1) to attack rolls with that weapon, the weapon deals Radiant damage instead of its normal type and counts as magical, and it emits Bright Light in a 20-ft. radius and Dim Light for an additional 20 ft. This expends 1 use of Channel Divinity."],
          ["Aura of Devotion", "You and each creature of your choice within your Aura of Protection are immune to the Charmed condition; while a creature is already Charmed, the condition is suspended while it is in the aura. The radius matches the Aura of Protection (10 ft., 30 ft. at 18th level)."],
          ["Smite of Protection", "When you cast «Divine Smite», you can wreath allies in protective energy. Until the start of your next turn, each creature of your choice (including you) within your Aura of Protection gains Half Cover (+2 to AC and Dexterity saving throws)."],
          ["Holy Nimbus", "As a Bonus Action you surround yourself with a radiant nimbus for 10 minutes or until you end it (no action). Effects for that time: you emit Bright Light in a 30-ft. radius and Dim Light for an additional 30 ft.; when a Fiend or Undead hits you with an attack, that creature takes Radiant damage equal to your Charisma modifier; and you have Advantage on saving throws against spells cast by Fiends and Undead. Uses: 1; regained on a Long Rest. In addition, after you spend this feature, you can restore it by expending a 5th-level spell slot (no action)."]
        ]
      },
      {
        name: "Oath of Glory",
        meta: "Oath of Glory",
        features: [
          ["Channel Divinity: Inspiring Smite", "Immediately after you cast «Divine Smite», you can, as a Channel Divinity option (no action), hand out inspiring energy. Distribute among any number of creatures of your choice (including yourself) within 30 ft. a total amount of Temporary Hit Points equal to 2d6 + your Paladin level; each creature gets at least 1 such HP. This expends 1 use of Channel Divinity."],
          ["Peerless Athlete", "Thanks to constant training you have Advantage on Strength (Athletics) and Dexterity (Acrobatics) checks. In addition, the distance of your long and high jumps increases by a number of feet equal to your Strength modifier (minimum +1)."],
          ["Aura of Alacrity", "You and each creature of your choice within your Aura of Protection gain +10 ft. of Speed (provided you aren't wearing Heavy armor). The radius matches the Aura of Protection (10 ft., 30 ft. at 18th level)."],
          ["Glorious Defense", "You can surround yourself or another creature with protective force. When you or a creature you can see within 10 ft. becomes the target of an attack, you can use a Reaction to add your Charisma modifier (minimum +1) to the target's AC against that attack, which can cause it to miss. If the attack misses as a result, the target can make one weapon attack against the attacker as part of that same Reaction, if the attacker is within its reach. Uses: equal to your Charisma modifier (minimum 1); all regained on a Long Rest."],
          ["Living Legend", "As a Magic action you imbue yourself with legendary presence for 10 minutes. For that time: you have Advantage on all Charisma checks; once per turn, when you miss with a weapon attack or an Unarmed Strike, you can cause that attack to hit instead; and if you fail a saving throw, you can use a Reaction to reroll it with Advantage (you must use the new result). Uses: 1; regained on a Long Rest. In addition, after you spend this feature, you can restore it by expending a 5th-level spell slot (no action)."]
        ]
      },
      {
        name: "Oath of the Ancients",
        meta: "Oath of the Ancients",
        features: [
          ["Channel Divinity: Nature's Wrath", "As a Channel Divinity option, as a Magic action you summon spectral vines. Each creature of your choice you can see within 15 ft. must make a Strength or Dexterity saving throw (the creature's choice; DC = 8 + Proficiency Bonus + Charisma modifier). On a failure, the creature has the Restrained condition for 1 minute. A creature Restrained this way repeats the save at the end of each of its turns, ending the effect on itself on a success. This expends 1 use of Channel Divinity."],
          ["Aura of Warding", "Ancient magic shelters you and your companions. You and each creature of your choice within your Aura of Protection gain Resistance to damage from spells. The radius matches the Aura of Protection (10 ft., 30 ft. at 18th level)."],
          ["Undying Sentinel", "When you drop to 0 Hit Points and don't die outright, you can (no action) drop to 1 Hit Point instead. In addition, when you use this feature, each enemy within your Aura of Protection takes damage equal to your Paladin level. Uses: 1; regained on a Long Rest. Beyond that, you stop aging and can't be aged magically."],
          ["Elder Champion", "As a Magic action you transform, gaining the power of nature itself for 1 minute. For that time: at the start of each of your turns you regain 10 Hit Points; you can cast Paladin spells with a casting time of \"1 action\" as a Bonus Action this turn; and enemies within your Aura of Protection have Disadvantage on saving throws against your spells and your Channel Divinity. Uses: 1; regained on a Long Rest. In addition, after you spend this feature, you can restore it by expending a 5th-level spell slot (no action)."]
        ]
      },
      {
        name: "Oath of Vengeance",
        meta: "Oath of Vengeance",
        features: [
          ["Channel Divinity: Vow of Enmity", "As a Channel Divinity option, as a Bonus Action you choose one creature you can see within 30 ft. and vow to destroy it. For 1 minute you have Advantage on attack rolls against that target; this requires no concentration. If the target drops to 0 Hit Points before the minute is up, you can (no action) transfer the vow to a new creature within 30 ft. This expends 1 use of Channel Divinity."],
          ["Relentless Avenger", "Your will to pursue knows no obstacle. When you hit a creature with an Opportunity Attack, its Speed becomes 0 until the end of the current turn, and you can, as part of that same Reaction, move up to half your Speed without provoking Opportunity Attacks."],
          ["Soul of Vengeance", "Your thirst for retribution lets you strike enemies in return. When a creature that is the target of your «Vow of Enmity» makes an attack, you can use a Reaction to make one melee weapon attack against it if it is within your reach."],
          ["Avenging Angel", "As a Magic action you transform, taking on the guise of an avenging angel for 10 minutes. For that time, spectral wings appear behind you, granting a flying Speed of 60 ft., and an aura of fear arises around you in a 30-ft. radius. Any enemy that starts its turn in the aura or first enters it on a turn must succeed on a Wisdom saving throw (DC = 8 + Proficiency Bonus + Charisma modifier) or have the Frightened condition (frightened of you) for 1 minute or until it takes damage. Uses: 1; regained on a Long Rest. In addition, after you spend this feature, you can restore it by expending a 5th-level spell slot (no action)."]
        ]
      }
    ]
  },
  "ranger-ph24": {
    name: "Ranger",
    primary: "Dexterity and Wisdom",
    saves: "Strength, Dexterity",
    armor: "Light and Medium armor, Shields",
    weapons: "Simple and Martial",
    skills: "Choose three: Animal Handling, Athletics, Insight, Intimidation, Nature, Perception, Stealth, Survival.",
    features: [
      ["Spellcasting", "You learn the magic of tracking and nature. Your spellcasting ability is Wisdom; your spell save DC = 8 + Proficiency Bonus + Wisdom modifier, and your spell attack bonus = Proficiency Bonus + Wisdom modifier. You know two cantrips from the Ranger list and learn more over time. You are a half-caster: at 1st level you have 2 1st-level slots, and your highest slot level grows per the Ranger table (maximum 5th level at 17th level). Each day after a Long Rest you prepare your available spell list: the number of prepared spells is given in the class table and grows with level. You can change your prepared spells after a Long Rest. You can use a Druidic focus as a Spellcasting Focus."],
      ["Favored Enemy", "You always have the spell «Hunter's Mark» prepared — it doesn't count against the number of spells you can prepare. You can cast «Hunter's Mark» for free (without expending a spell slot) a number of times equal to your Proficiency Bonus, and you regain all such uses when you finish a Long Rest. In addition, you can still cast the spell by expending spell slots as usual."],
      ["Weapon Mastery", "You can use the mastery properties of two kinds of weapons of your choice that you're proficient with (for example Nick, Push, Topple). Each time you finish a Long Rest, you can change the chosen weapon kinds. At 4th level the number of available weapon kinds rises to 3, and at 10th level to 4."],
      ["Deft Explorer", "You hone one of the facets of a Ranger's mastery. Choose one of the options below. At 2nd level only the chosen option is active; you can't change the option. Expertise: you gain Expertise (double Proficiency Bonus on checks) in one skill you already have proficiency in, and you learn one language of your choice. Roving: your Walking Speed increases by 10 ft. You also gain a Climb Speed and a Swim Speed equal to your Walking Speed. (Tireless: as a Magic action you give yourself Temporary Hit Points equal to 1d8 + your Wisdom modifier (minimum 1). The number of uses equals your Wisdom modifier (minimum 1), and all are regained when you finish a Long Rest. In addition, whenever you finish a Short Rest, you reduce your Exhaustion level by 1.)"],
      ["Fighting Style", "You adopt a fighting style as a specialty. Choose one feat from the \"Fighting Style\" category (for example Archery, granting +2 to attack rolls with ranged weapons, or Dueling, granting +2 to damage when you wield a one-handed weapon and no other weapons). You can't choose the chosen feat again, even if you later get such an opportunity."],
      ["Ranger Subclass", "You choose a Ranger subclass: Hunter, Beast Master, Fey Wanderer, or Gloom Stalker. Your subclass grants features at levels 3, 7, 11, and 15."],
      ["Ability Score Improvement", "You gain the Ability Score Improvement feat (you can raise one ability score by 2 or two ability scores by 1, none above 20) or another feat of the \"General\" category for which you qualify. This feature recurs at levels 8, 12, and 16."],
      ["Extra Attack", "When you take the Attack action on your turn, you can attack twice instead of once."],
      ["Subclass Feature", "You gain the 6th-level feature of your Ranger subclass (effectively the subclass's 7th-level feature, unlocking per the subclass progression)."],
      ["Ability Score Improvement", "You gain the Ability Score Improvement feat or another feat of the \"General\" category for which you qualify."],
      ["Expertise", "Choose two skills you have proficiency in. Your Proficiency Bonus is doubled on any ability check you make using either of those two skills."],
      ["Tireless (improvement)", "As a Magic action you give yourself Temporary Hit Points equal to your Ranger level + your Wisdom modifier. In addition, you reduce your Exhaustion level by 1. You can use this feature a number of times equal to your Wisdom modifier (minimum 1), and all uses are regained when you finish a Long Rest."],
      ["Subclass Feature", "You gain the 11th-level feature of your Ranger subclass."],
      ["Ability Score Improvement", "You gain the Ability Score Improvement feat or another feat of the \"General\" category for which you qualify."],
      ["Relentless Hunter", "Taking damage can't break your concentration on the spell «Hunter's Mark» (other ways of breaking concentration still apply)."],
      ["Nature's Veil", "As a Bonus Action you become Invisible. The Invisibility lasts up to 1 minute, ending early if you make an attack, deal damage, or cast a spell (no concentration required). You can use this feature a number of times equal to your Proficiency Bonus, and all uses are regained when you finish a Long Rest."],
      ["Subclass Feature", "You gain the 15th-level feature of your Ranger subclass."],
      ["Ability Score Improvement", "You gain the Ability Score Improvement feat or another feat of the \"General\" category for which you qualify."],
      ["Precise Hunter", "You have Advantage on attack rolls against a target marked by your «Hunter's Mark»."],
      ["Feral Senses", "You gain Blindsight within 30 ft.: within that radius you see anything that isn't behind Total Cover, even if you're Blinded or in darkness, and you also sense Invisible creatures."],
      ["Epic Boon", "You gain a feat of the \"Epic\" category or another feat for which you qualify. The Boon of Dimensional Travel — er, the Epic Boon of Perfection, granting Advantage on checks of a chosen ability, is recommended."],
      ["Foe Slayer", "The extra damage die of your «Hunter's Mark» becomes 1d10 instead of 1d6. In addition, once per turn, when the target of «Hunter's Mark» is within range, you can add the «Hunter's Mark» damage die (1d10) to one attack roll or one saving throw you make."]
    ],
    subclasses: [
      {
        name: "Hunter",
        meta: "Hunter",
        features: [
          ["Hunter's Lore", "As a Magic action you choose one creature you can see within 120 ft. You learn whether that creature has any Immunities, Resistances, or Vulnerabilities, and if so, which. You can use this feature a number of times equal to your Wisdom modifier (minimum 1), and all uses are regained when you finish a Long Rest."],
          ["Hunter's Prey", "You gain one signature hunting technique of your choice from the options below. The choice is made once at 3rd level. Colossus Slayer: once per turn, when you hit a creature with a weapon attack, you deal that target an extra 1d8 damage of the same type as the weapon, provided the target isn't at full Hit Points. Horde Breaker: once per turn, when you hit a creature with a weapon attack, you can, as part of the same action, make one more attack with the same weapon against a different creature within 5 ft. of the first target and within your reach."],
          ["Defensive Tactics", "You gain one defensive technique of your choice from the options below. The choice is made once at 7th level. Escape the Horde: Opportunity Attacks against you are made with Disadvantage. Multiattack Defense: when a creature makes an attack roll against you, you gain +4 to AC against all attacks from that creature until the end of the current turn (as a Reaction, without expending it)."],
          ["Superior Hunter's Prey", "Your Hunter's Prey technique is enhanced. Colossus Slayer: the extra damage rises from 1d8 to 2d8. Horde Breaker: the extra attack can be made against two different creatures within reach, not just one."],
          ["Superior Hunter's Defense", "When you make a Dexterity saving throw for a partial effect (usually instead of half damage), you take no damage on a success and only half damage on a failure. This works like an improved Evasion."]
        ]
      },
      {
        name: "Beast Master",
        meta: "Beast Master",
        features: [
          ["Primal Companion", "As a Magic action you summon a primal beast companion that manifests your bond with nature. Choose its form when you summon it: Land, Sea, or Sky — this sets the Primal Beast stat block. The beast is friendly to you and your companions and obeys your commands; in combat it acts on your initiative but takes an action only if you command it with a Bonus Action (otherwise it takes the Dodge action). Without your command (no action) it can move and use Reactions. The beast uses your Proficiency Bonus for its rolls and DCs; its Hit Points equal five times your Ranger level, and it treats its level as your Ranger level. If the beast dies, you can, as a Magic action over 1 hour, touch it and bring it back to life with all Hit Points restored, or choose a different form when you summon it. You can summon the beast for free once, and thereafter by expending a spell slot of 1st level or higher; resummoning the same beast for free is available after a Long Rest."],
          ["Exceptional Training", "On your turn, if you haven't commanded the beast to take an action, you can, as a Bonus Action, command it to take the Dash, Help, Dodge, Disengage, or one of its special attacks. In addition, when the beast deals damage, that damage counts as magical for the purpose of overcoming Resistance and Immunity to nonmagical attacks."],
          ["Bestial Fury", "When you command your beast companion to make a special attack with a Bonus Action, it can make two attacks instead of one. In addition, if your beast has «Hunter's Mark» from you, it deals the mark's extra damage on each of these attacks."],
          ["Share Spells", "When you cast a spell with a range of touch or a range in feet, you can apply it as though its source were your beast companion, provided the beast is within 30 ft. of you and you can see it. This lets your spells \"reach\" through the beast, using it as the point of origin for range."]
        ]
      },
      {
        name: "Fey Wanderer",
        meta: "Fey Wanderer",
        features: [
          ["Dreadful Strikes", "Once per turn, when you hit a creature with a weapon attack, you deal that target an extra 1d6 Psychic damage. At 11th level the extra damage rises to 1d8, and at 15th level to 1d10."],
          ["Otherworldly Glamour", "You always have the spell «Charm Person» prepared — it doesn't count against the number of spells you can prepare. In addition, you add your Wisdom modifier (minimum +1) to Charisma (Deception), Charisma (Persuasion), and Charisma (Performance) checks."],
          ["Beguiling Twist", "When a creature you can see within 30 ft. fails a saving throw against your spell, you can use a Reaction to make your spell also affect that creature. This applies to spells able to Charm or Frighten. You can use this feature once, and again by expending a spell slot when casting the relevant spell."],
          ["Fey Reinforcements", "You always have the spell «Summon Fey» prepared. You can cast it once without expending a spell slot, and this free use is regained when you finish a Long Rest. You can also cast it normally by expending a spell slot."],
          ["Misty Wanderer", "You always have the spell «Misty Step» prepared. You can cast it without expending a spell slot a number of times equal to your Proficiency Bonus, and all these uses are regained when you finish a Long Rest. Each time you teleport this way you can wreath yourself in mist: until the start of your next turn you gain +1d4 to AC and Dexterity saving throws."]
        ]
      },
      {
        name: "Gloom Stalker",
        meta: "Gloom Stalker",
        features: [
          ["Dread Ambusher", "You add your Wisdom modifier (minimum +1) to your initiative rolls. In addition, on the first turn of each combat you gain +10 ft. of Speed, and if you take the Attack action, you can make one additional weapon attack as a Bonus Action."],
          ["Umbral Sight", "You see in darkness (including magical darkness) better than most. If you already have Darkvision, its radius increases by 30 ft. If you didn't have Darkvision, you gain Darkvision within 30 ft. that works even in magical darkness."],
          ["Iron Mind", "You gain proficiency in Wisdom saving throws. If you already had it, instead choose proficiency in Intelligence or Charisma saving throws."],
          ["Stalker's Flurry", "Once per turn, when you miss a creature with a weapon attack, you can make one more weapon attack against the same or a different creature."],
          ["Shadowy Dodge", "When you are the target of an attack roll and you aren't Incapacitated, you can use a Reaction to impose Disadvantage on that roll."]
        ]
      }
    ]
  },
  "rogue-ph24": {
    name: "Rogue",
    primary: "Dexterity",
    saves: "Dexterity, Intelligence",
    armor: "Light armor",
    weapons: "Simple + Martial weapons with the Finesse and Light properties",
    tools: "Thieves' Tools",
    skills: "Choose four: Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, Stealth.",
    features: [
      ["Expertise", "Choose two skills you have proficiency in (two more at 6th level): your Proficiency Bonus is doubled for checks with those skills. You can swap Expertise for Thieves' Tools at either of these moments, if you're proficient with them."],
      ["Sneak Attack", "Once per turn you deal extra damage to a creature you hit with an attack if you had Advantage on the attack roll, or if an able ally is within 5 ft. of the target and you don't have Disadvantage on the roll. The attack must be made with a weapon that has the Finesse or Ranged property (or an Unarmed Strike). The extra damage is the same type as the weapon. At 1st level it is 1d6; it then grows by +1d6 at each odd Rogue level: 2d6 at 3rd, 3d6 at 5th, 4d6 at 7th, 5d6 at 9th, 6d6 at 11th, 7d6 at 13th, 8d6 at 15th, 9d6 at 17th, and 10d6 at 19th level."],
      ["Thieves' Cant", "You know Thieves' Cant — a secret mix of dialect, jargon, and code that lets you hide messages in seemingly ordinary conversation. Only someone who also knows Thieves' Cant can understand such a message. Conveying a thought through the cant takes four times as long as ordinary speech. In addition, you understand a set of secret signs and symbols used to convey short, simple messages (whether it's safe here, whether a thieves' den is nearby, whether there's easy prey around, whether the authorities have left, and so on)."],
      ["Weapon Mastery", "Your training lets you use the mastery properties of two kinds of Simple or Martial weapons of your choice — for example Cleave or Slow. When you finish a Long Rest, you can swap one of these weapon kinds for another. The number of available mastery properties grows per the class table as your Rogue level rises."],
      ["Cunning Action", "Your agility and skill let you act with lightning speed. On each of your turns in combat you can take one of the following actions as a Bonus Action: Dash, Disengage, or Hide (you can Hide only if you have grounds for it — such as cover)."],
      ["Subclass", "Choose a subclass (Thief, Assassin, Soulknife, or Arcane Trickster), which grants features at levels 3, 9, 13, and 17."],
      ["Steady Aim", "As a Bonus Action you take aim at a creature you can see within your attack's reach. Until the end of the current turn your attack rolls against that target have Advantage, provided you haven't moved this turn. This feature is notable in that it lets you gain Advantage to trigger Sneak Attack in melee without an ally nearby."],
      ["Ability Score Improvement", "You take a General feat (PH24) — for example, increasing your ability scores (usually Dexterity) up to a maximum of 20."],
      ["Cunning Strike", "When you deal Sneak Attack damage, you can spend one of its dice (dealing 1d6 less extra damage) to add one effect: Poison — the target makes a Constitution saving throw (DC = 8 + Proficiency Bonus + Dexterity modifier); on a failure it has the Poisoned condition until the end of your next turn; Trip — if the target is no larger than Huge, it makes a Dexterity saving throw (same DC); on a failure it has the Prone condition; Withdraw — you move up to half your Speed without provoking Opportunity Attacks."],
      ["Uncanny Dodge", "When an attacker you can see hits you with an attack, you can use a Reaction to halve the attack's damage (round down after applying)."],
      ["Expertise", "Choose two more of your skills (or Thieves' Tools): your Proficiency Bonus is doubled for checks with them."],
      ["Evasion", "When an effect forces you to make a Dexterity saving throw to take only half damage, you instead take no damage on a success and only half on a failure. This feature doesn't work if you're Incapacitated."],
      ["Reliable Talent", "When you make an ability check that uses your Proficiency Bonus and roll 9 or lower on the d20, the roll is treated as a 10."],
      ["Ability Score Improvement", "You take another General feat or increase your ability scores (maximum 20)."],
      ["Subclass Feature", "You gain the 9th-level feature of your chosen Rogue subclass."],
      ["Ability Score Improvement", "You take another General feat or increase your ability scores (maximum 20)."],
      ["Improved Cunning Strike", "When you make a Cunning Strike, you can apply two of its effects, spending one Sneak Attack die for each (that is, 2d6 less extra damage). Each effect that requires a saving throw uses its own separate save."],
      ["Ability Score Improvement", "You take another General feat or increase your ability scores (maximum 20)."],
      ["Subclass Feature", "You gain the 13th-level feature of your chosen Rogue subclass."],
      ["Devious Strikes", "You master three new Cunning Strike effects (save DCs = 8 + Proficiency Bonus + Dexterity modifier): Daze — the target makes a Constitution saving throw; on a failure it has the Stunned condition until the end of your next turn; Knock Out — the target makes a Constitution saving throw; on a failure it has the Unconscious condition until the end of your next turn (ending if it takes damage); Obscure — the target makes a Constitution saving throw; on a failure it has the Blinded condition until the end of your next turn. Each effect spends one Sneak Attack die, like an ordinary Cunning Strike."],
      ["Slippery Mind", "You gain proficiency in Wisdom and Charisma saving throws."],
      ["Ability Score Improvement", "You take another General feat or increase your ability scores (maximum 20)."],
      ["Subclass Feature", "You gain the 17th-level feature of your chosen Rogue subclass."],
      ["Elusive", "You are so nimble that attack rolls against you don't gain Advantage. The exception — when you're Incapacitated: then this defense doesn't apply."],
      ["Epic Boon", "You take one Epic feat (PH24) or increase your ability scores."],
      ["Stroke of Luck", "Fortune favors you. If you miss an attack against a target, you can (no action) turn the miss into a hit; or if you fail an ability check, you can treat the d20 roll as a 20. You can use this feature once and regain it on a Short or Long Rest."]
    ],
    subclasses: [
      {
        name: "Thief",
        meta: "Thief",
        features: [
          ["Fast Hands", "You can put your nimble fingers to work along with a Cunning Action. When you take a Cunning Action as a Bonus Action, you can additionally use it to do one of the following: a Dexterity (Sleight of Hand) check; use Thieves' Tools to disarm a trap or pick a lock; or the Utilize (Magic) action to use an item."],
          ["Second-Story Work", "You gain a Climb Speed equal to your Walking Speed. In addition, when you make a long or high jump, you need only 5 ft. of a running start, not 10, to jump the full distance."],
          ["Supreme Sneak", "When you make a Dexterity (Stealth) check with Advantage, you treat a d20 roll of 14 or lower as a 15. In other words, with Advantage you sneak so skillfully that the Stealth roll can't come out below 15."],
          ["Use Magic Device", "You've mastered the handling of any magic items: you ignore all class, type, and level requirements when using magic items. In addition, you can be attuned to four magic items at once (instead of the usual three). Spell Scrolls: you can use a Spell Scroll even if the spell is only partly on the Rogue list, making for scrolls of 6th level and higher an Intelligence (Arcana) check, DC 10 + the spell's level. Charges: once per day, when you activate a magic item that expends charges, you can roll a d6 — on a 6 the charge isn't expended."],
          ["Thief's Reflexes", "You're used to acting at the very start of a fight. On the first round of each combat you take two turns: one at your normal initiative count and a second at your initiative count minus 10. If you are Surprised (for example, caught off guard), you can't take the second turn."]
        ]
      },
      {
        name: "Assassin",
        meta: "Assassin",
        features: [
          ["Assassinate", "You are deadly when striking first. You have Advantage on attack rolls against any creature that hasn't taken a turn yet in the current combat. In addition, if you hit a Surprised creature with a Sneak Attack, it takes extra damage equal to your Rogue level."],
          ["Assassin's Tools", "You gain proficiency with a Disguise Kit and a Poisoner's Kit. A Disguise Kit can alter appearance; a Poisoner's Kit is needed to craft and apply poisons."],
          ["Infiltration Expertise", "You can reliably create false identities. By spending 7 days and 25 gp, you create a false identity with documents, contacts, and a history. While you use this identity, no check can reveal it as a fake, and you yourself can accurately mimic another person's speech, mannerisms, and behavior after studying them for at least 3 hours."],
          ["Envenom Weapons", "You've mastered working with poisons: you can craft Basic Poison (as in the core book) for half the usual price and four times faster. In addition, when you deal Sneak Attack damage, you can spend one of its dice to give the target the Poisoned condition until the end of your next turn, without spending an actual poison."],
          ["Death Strike", "Your first-strike attacks are monstrously powerful. When you hit a Surprised creature with a Sneak Attack, the Sneak Attack's extra damage is doubled (roll the Sneak Attack dice twice and add the results)."]
        ]
      },
      {
        name: "Soulknife",
        meta: "Soulknife (psionic)",
        features: [
          ["Psionic Power", "You have a reservoir of psionic energy in the form of Psionic Energy Dice — d6s. The number of dice equals twice your Proficiency Bonus, and their size grows per the subclass table (d6, then d8, d10, d12). Many subclass features expend these dice. You regain one expended die when you finish a Short Rest, and all when you finish a Long Rest."],
          ["Psychic Blades", "You can manifest blades of pure psychic energy from your mind. As part of the Attack action you create a psychic blade and make an attack with it against a creature within 60 ft.; this is a Dexterity-based weapon attack dealing Force damage equal to 1d6 + your Dexterity modifier. Immediately after the attack the blade vanishes. Right after the first blade you can, as a Bonus Action, create a second identical blade and attack with it — the second blade's damage doesn't include your Dexterity modifier, but Sneak Attack applies to it. Creating these blades requires no energy and no ammunition."],
          ["Psionic Power: Psi-Bolstered Knack", "You can fortify your mind. When you make an ability check that uses a skill, you can (no action) expend one Psionic Energy Die, roll it, and add the result to the check. You can do this after the d20 roll but before the outcome is announced; if the check still fails, the die isn't expended."],
          ["Psychic Whispers", "You can speak silently and telepathically. As an action you establish a telepathic link with creatures of your choice within 1 mile that you can see or know (the number of creatures equals your Proficiency Bonus). The link lasts up to 1 hour (ending earlier if you become Incapacitated or die). While the link is active, you and the linked creature can telepathically convey words to each other in a language you both understand."],
          ["Soul Blades: Homing Strikes", "If you miss with a Psychic Blade attack, you can (no action) expend one Psionic Energy Die, roll it, and add the result to the attack roll. If this causes the attack to hit, the added result counts; the die is expended only when it successfully turns a miss into a hit."],
          ["Soul Blades: Psychic Teleportation", "As a Bonus Action you expend one Psionic Energy Die, roll it, and teleport to an unoccupied space you can see, a number of feet equal to the roll result multiplied by 10."],
          ["Psychic Veil", "As a Magic action you become Invisible for 1 hour or until you become Incapacitated (no die expenditure required). The effect ends early immediately after you deal damage to a creature or cast a spell. You can use this feature once, regaining it on a Long Rest, or by expending one Psionic Energy Die to use it again."],
          ["Rend Mind", "Once per turn, when you hit a creature with a Psychic Blade and deal it Sneak Attack damage, you can force the target to make an Intelligence saving throw (DC = 8 + Proficiency Bonus + Dexterity modifier). On a failure, the target has the Stunned condition until the end of your next turn. After using this feature you can't use it again until you spend 1 Psionic Energy Die (no action) to restore it."]
        ]
      },
      {
        name: "Arcane Trickster",
        meta: "Arcane Trickster (third-caster, Intelligence, Wizard list)",
        features: [
          ["Spellcasting", "You learn magic in an arcane manner, primarily from the Enchantment and Illusion schools of the Wizard list. Your spellcasting ability is Intelligence: your spell save DC = 8 + Proficiency Bonus + Intelligence modifier, and your spell attack bonus = Proficiency Bonus + Intelligence modifier. You are a third-caster: the number of slots, cantrips, and known spells is taken from the subclass table. Cantrips: you know 3 Wizard cantrips (including «Acid Splash» or another of your choice). Known spells: you know several Wizard spells of 1st level and higher; until 13th level all spells (except when replaced on level-up) must be from the Enchantment or Illusion schools. You cast them by expending slots of the appropriate level; slots are regained on a Long Rest."],
          ["Mage Hand Legerdemain", "You know the cantrip «Mage Hand» (it doesn't count against your known cantrips). When you cast it, you can make the spectral hand Invisible. Through this hand you can, as a Bonus Action, make a Dexterity (Sleight of Hand) check to steal or plant items, use Thieves' Tools to disarm traps and pick locks at a distance, provided the hand is within 30 ft. of you."],
          ["Magical Ambush", "If you are hidden (Invisible to a creature or hiding from it) at the moment you cast a spell on that creature, it makes saving throws against that spell with Disadvantage."],
          ["Versatile Trickster", "While the spectral hand of the «Mage Hand» spell is within 30 ft. of you, you can make attack rolls with Advantage against any creature within 5 ft. of the hand. In addition, as a Magic action you can cast «Mage Hand», targeting it through the hand instead of yourself."],
          ["Spell Thief", "As a Reaction, when a creature within 60 ft. of you casts a spell, you attempt to steal part of its magic. The caster makes a saving throw (DC = 8 + Proficiency Bonus + Intelligence modifier); on a failure the spell has no effect, and you steal knowledge of it if it's 1st or 2nd level and on the Wizard list. Until your next Long Rest you can cast that spell once using your slots. After using this feature you can regain it on a Long Rest."]
        ]
      }
    ]
  },
  "sorcerer-ph24": {
    name: "Sorcerer",
    primary: "Charisma",
    saves: "Constitution, Charisma",
    armor: "No armor",
    weapons: "Simple",
    skills: "Choose two: Arcana, Deception, Insight, Intimidation, Persuasion, Religion.",
    features: [
      ["Spellcasting", "You are a full caster and cast Sorcerer spells. Your spellcasting ability is Charisma: your spell save DC = 8 + Proficiency Bonus + Charisma modifier, and your spell attack roll modifier = Proficiency Bonus + Charisma modifier. At 1st level you know 4 cantrips and 2 1st-level spells; the number of cantrips and spells known, and your available slots, grow per the Sorcerer table. You know spells (rather than preparing them); when you finish a Long Rest, you can replace one known spell with another of the same or lower level. You can use a Sorcerer's focus for casting."],
      ["Innate Sorcery", "As a Bonus Action you can unleash innate magic for 1 minute (no concentration). While the effect is active: your Sorcerer spell save DC increases by 1, and you have Advantage on Sorcerer spell attack rolls. Uses: 2; regained on a Long Rest, and starting at 2nd level one use can also be restored by spending 2 Sorcery Points (no action)."],
      ["Font of Magic", "You gain a pool of Sorcery Points equal to your Sorcerer level (2 at 2nd level). The points are fully regained after a Long Rest. With them you pay for Metamagic and (no action on your turn) can convert points into spell slots and back: creating a slot costs 2 points for a 1st-level slot, 3 for 2nd, 5 for 3rd, 6 for 4th, and 7 for 5th (these slots vanish on a Long Rest); for the reverse you expend a slot and gain a corresponding number of points (as a Magic action, not exceeding your point maximum)."],
      ["Metamagic", "You learn 2 Metamagic options of your choice (such as Quickened Spell, Heightened Spell, Empowered Spell, Subtle Spell, Careful Spell, Distant Spell, Extended Spell, Twinned Spell). You can apply only one option to a single spell at a time, unless it states otherwise; each option costs the listed number of Sorcery Points. The specific Metamagic options are chosen separately. When you finish a Long Rest, you can replace one known option with another."],
      ["Subclass", "You choose a subclass — the origin of your magic (Draconic Sorcery, Wild Magic Sorcery, Aberrant Sorcery, or Clockwork Sorcery). Your subclass grants features at levels 3, 6, 14, and 18."],
      ["Ability Score Improvement", "You gain a feat of the \"General\" category (PH24) of your choice: this usually lets you raise one ability score by +2 or two ability scores by +1, not exceeding 20."],
      ["Sorcerous Restoration", "Once per Long Rest, when you finish a Short Rest, you regain expended Sorcery Points equal to half your Sorcerer level (rounded up). This isn't an action."],
      ["Subclass Feature", "You gain the 6th-level feature of your subclass."],
      ["Sorcery Incarnate", "Your maximum Sorcery Points increases by 2 (and below 17th level you can store up to 19 points). In addition, as no action on your turn, you can activate Innate Sorcery for free (spending neither a use of the feature nor Sorcery Points). Having done so, you can't repeat this free use until you finish a Long Rest."],
      ["Ability Score Improvement", "You again gain a feat of the \"General\" category (PH24) of your choice (see the 4th-level feature)."],
      ["Metamagic (+1)", "You learn 2 more Metamagic options of your choice (4 total). When you finish a Long Rest, you can replace one known option with another."],
      ["Ability Score Improvement", "You again gain a feat of the \"General\" category (PH24) of your choice."],
      ["Subclass Feature", "You gain the 14th-level feature of your subclass."],
      ["Ability Score Improvement", "You again gain a feat of the \"General\" category (PH24) of your choice."],
      ["Metamagic (+1)", "You learn 2 more Metamagic options of your choice (6 total). When you finish a Long Rest, you can replace one known option with another."],
      ["Subclass Feature", "You gain the 18th-level feature of your subclass."],
      ["Epic Boon", "You gain an Epic feat of your choice (usually the Epic Boon of Spell Recall — er, Boon of Sorcery, but any Epic feat for which you qualify works)."],
      ["Sorcerous Apotheosis", "While your Innate Sorcery is active, you gain two benefits. First, you regain 4 Sorcery Points at the start of each of your turns. Second, once per turn you can apply one Metamagic option to a spell without spending Sorcery Points on it."]
    ],
    subclasses: [
      {
        name: "Draconic Sorcery",
        meta: "Draconic Sorcery",
        features: [
          ["Draconic Resilience", "Your bond with dragons fortifies your body. Your Hit Point maximum increases by 3 and then by 1 for each Sorcerer level you gain thereafter. In addition, while you aren't wearing armor, your base Armor Class equals 10 + Dexterity modifier + Charisma modifier (you can still use a Shield as normal)."],
          ["Expanded Spells: Draconic Spells", "You learn the spell «Speak with Dragons», and for you it doesn't count as a Sorcerer spell known against the limit. In addition, you always have additional spells prepared per the Draconic expanded-spells table; they don't count against the number of spells you know."],
          ["Elemental Affinity", "Choose a damage type associated with dragons: acid, cold, fire, lightning, or poison. Once per turn, when you deal that type of damage with a spell, you add your Charisma modifier to one roll of that damage. In addition, at that same moment you can, with no action, spend 1 Sorcery Point to gain Resistance to the chosen damage type for 1 hour."],
          ["Dragon Wings", "As a Bonus Action you can sprout a pair of spectral dragon wings on your back, gaining a flying Speed of 60 ft. The wings remain until you dismiss them (no action) or become Incapacitated. You can't sprout the wings if you're already wearing something on your back (a cloak, backpack, etc.)."],
          ["Dragon Companion", "You can cast the spell «Summon Dragon Spirit» without expending a slot or material components — once for free per Long Rest (and via slots too, if you wish). When casting this spell, you can apply one Metamagic option to it without spending Sorcery Points. While the summoned spirit is nearby, you have Advantage on all saving throws while within 60 ft. of it."]
        ]
      },
      {
        name: "Wild Magic Sorcery",
        meta: "Wild Magic",
        features: [
          ["Wild Magic Surge", "Your magic is unpredictable. Immediately after you cast a Sorcerer spell of 1st level or higher, the DM can have you roll a d20: on a 1 you roll on the Wild Magic table and a random magical effect immediately triggers. If the effect requires a saving throw, its DC equals your spell save DC (8 + Proficiency Bonus + Charisma modifier). After an effect triggers, you don't roll for a Surge again until you finish a Long Rest, unless you use Tides of Chaos."],
          ["Tides of Chaos", "As a Bonus Action you can call on chaotic luck: gain Advantage on one attack roll, ability check, or saving throw you make before the end of your turn. If you used this Advantage, then immediately after the next Sorcerer spell you cast of 1st level or higher you must roll on the Wild Magic table (without the d20 roll — the Surge triggers guaranteed). Uses: 1; regained on a Long Rest, or it can be restored by spending 1 Sorcery Point (no action)."],
          ["Bend Luck", "As a Reaction you can nudge fate. When you or a creature you can see within 30 ft. makes a d20 roll (attack, ability check, or saving throw), you spend 2 Sorcery Points and add or subtract 1d4 from the result (you can do this after the roll but before the outcome is announced)."],
          ["Controlled Chaos", "You temper randomness a little. When you roll on the Wild Magic table, you can roll twice and choose which of the two results to apply."],
          ["Tamed Surge", "Your magic strikes devastatingly. Once per turn, when you roll spell damage dice and at least one of them rolls the maximum value, you choose one such die, reroll it, and add the result to the damage."]
        ]
      },
      {
        name: "Aberrant Sorcery",
        meta: "Aberrant Sorcery",
        features: [
          ["Telepathic Speech", "As a Bonus Action you establish a telepathic link with one creature you can see within 30 ft. The link lasts a number of minutes equal to your Sorcerer level, or until you end it (no action) or use this feature again. While the link is active, you and that creature can communicate mentally over a distance of up to 1 mile, provided you share at least one language. The creature's consent isn't required, but the link ends if you or it can no longer see each other for more than an hour."],
          ["Psionic Spells", "You always have additional Divination and Enchantment spells prepared per the Psionic Spells table; they don't count against the number of spells you know. In addition, you can cast any of these spells by paying for it with Sorcery Points rather than a slot: the spell costs a number of points equal to its level."],
          ["Psionic Sorcery", "When you cast any spell from the Psionic Spells list, you can cast it for Sorcery Points (a number of points equal to the spell's level) instead of a spell slot. In addition, you can cast such spells without their verbal and somatic components — the spell remains unnoticeable to onlookers, not betraying you as a caster."],
          ["Psychic Defenses", "You gain Resistance to Psychic damage, as well as Advantage on saving throws to avoid being Charmed or Frightened."],
          ["Revelation in Flesh", "As a Bonus Action you spend 1 Sorcery Point and physically alter your body for 10 minutes (you can end it early, no action). Choose one effect for that time: see Invisible creatures and objects within 60 ft. (including those on the Ethereal Plane); a Swim Speed of 40 ft., the ability to breathe underwater, and gills; or a pair of tentacles on your back granting a flying Speed of 30 ft., as well as a tentacle attack as part of the Magic action (15-ft. reach, on a hit 3d6 Force damage)."],
          ["Warping Implosion", "As a Magic action you spend 5 Sorcery Points to teleport to an unoccupied space you can see within 60 ft. Immediately after teleporting, each creature of your choice within 30 ft. of the point you vanished from must make a Constitution saving throw against your spell save DC. On a failure, the creature takes 8d8 Force damage, half as much on a success."]
        ]
      },
      {
        name: "Clockwork Sorcery",
        meta: "Clockwork Sorcery",
        features: [
          ["Expanded Spells: Clockwork Spells", "You always have additional clockwork spells prepared (for example «Protection from Evil and Good», «Aid», «Protection from Energy», «Freedom of Movement») per the Clockwork expanded-spells table; they don't count against the number of spells you know."],
          ["Restore Balance", "As a Reaction, when a creature you can see within 60 ft. is about to make a d20 roll with Advantage or Disadvantage, you can return the order to balance: the roll is made with neither Advantage nor Disadvantage. Uses: equal to your Charisma modifier (minimum 1); regained on a Long Rest."],
          ["Bastion of Law", "As a Magic action you spend up to 5 Sorcery Points to create protective ward energy. For each point spent you create one 1d8 die and distribute these dice among yourself and other creatures of your choice within 30 ft. (one creature can receive several). A creature gains the ward with these dice for 10 minutes or until you use the feature again. When a warded creature takes damage, it can expend any number of its dice by rolling them, subtracting the total from the damage; expended dice vanish."],
          ["Trance of Order", "As a Bonus Action (no action otherwise) you can enter a trance of order for 1 minute (no concentration); while it lasts: attack rolls against you don't gain Advantage, and each time you make a d20 roll for an ability check or saving throw and roll lower than 10, the result is treated as a 10. Uses: 1; regained on a Long Rest, or it can be restored by spending 5 Sorcery Points (no action)."],
          ["Clockwork Cavalcade", "As a Magic action you spend 7 Sorcery Points to summon spectral clockwork energy in a 30-ft. cube within 60 ft. Then choose any of the following effects, each once: heal one creature in the area for 6d10 Hit Points; until the end of your next turn, give one creature in the area Disadvantage on attack rolls against you; fully repair one damaged object in the area; and/or dispel each spell of 6th level or lower on one target in the area."]
        ]
      }
    ]
  },
  "warlock-ph24": {
    name: "Warlock",
    primary: "Charisma",
    saves: "Wisdom, Charisma",
    armor: "Light armor",
    weapons: "Simple",
    skills: "Choose two: Arcana, Deception, History, Intimidation, Nature, Religion.",
    features: [
      ["Pact Magic", "You draw magic from your otherworldly patron through a special form of casting — Pact Magic. Your spellcasting ability is Charisma: you add its modifier to spell attack rolls, and your spell save DC = 8 + Proficiency Bonus + Charisma modifier. From 1st level you know two cantrips and can cast Warlock spells you know. Unlike other classes, you have few spell slots, but all of them are always of one — the highest level available to you (at 1st level that's 1 slot of 1st level; the number and level of slots grow with your Warlock level up to 5th-level slots). To cast a spell of 1st level or higher, you expend a slot of the appropriate level. All expended slots are regained when you finish either a Short or a Long Rest. You can cast low-level spells at a higher level using your slot, if the spell has improvements from the slot's level."],
      ["Eldritch Invocations", "You learn fragments of forbidden lore that grant you persistent magical abilities. At 1st level you know one invocation; the number known grows with your Warlock level (gradually reaching nine). Each invocation has its own prerequisites (such as a minimum Warlock level or knowledge of a certain spell). When you finish a Long Rest, you can replace one known invocation with another for which you qualify. The Pact Boons (Pact of the Blade, Pact of the Chain, Pact of the Tome, and Pact of the Talisman) are also taken as Eldritch Invocations in this edition. The specific invocations are chosen separately during character creation and advancement."],
      ["Magical Cunning", "Once between Long Rests, by spending 1 minute (for example, during a Short Rest), you can, as a Magic action, regain some of your expended Pact Magic spell slots. The combined level of the slots regained can't exceed half your Proficiency Bonus (rounded up), and each restored slot must be 5th level or lower. This use is regained when you finish a Long Rest."],
      ["Subclass", "You choose a Warlock Patron — a subclass: the Fiend, the Archfey, the Celestial, or the Great Old One. Your Patron grants features at levels 3, 6, 10, and 14, as well as a set of expanded spells that become available to you."],
      ["Ability Score Improvement", "You gain the Ability Score Improvement feat (you can raise one ability score by 2 or two ability scores by 1, none above 20) or another feat of the \"General\" category for which you qualify. This feature recurs at levels 8, 12, and 16."],
      ["Subclass Feature", "You gain the 6th-level feature of your Patron."],
      ["Contact Patron", "You can cast the spell «Contact Other Plane» without expending a spell slot, reaching out directly to your patron or its intermediaries. When you cast the spell this way, you automatically succeed on its Intelligence saving throw. Once you use this feature, you can't use it again until you finish a Long Rest."],
      ["Subclass Feature", "You gain the 10th-level feature of your Patron."],
      ["Mystic Arcanum (6th level)", "Your patron grants you a mighty spell. Choose one Warlock spell of 6th level you know as a Mystic Arcanum. You can cast this spell once without expending a spell slot. The use is regained when you finish a Long Rest. When you finish a Long Rest, you can replace the chosen Arcanum spell with another Warlock spell of the same level."],
      ["Ability Score Improvement", "You gain the Ability Score Improvement feat or another feat of the \"General\" category for which you qualify."],
      ["Mystic Arcanum (7th level)", "You gain another Mystic Arcanum: choose one Warlock spell of 7th level. You can cast it once without a spell slot; the use is regained when you finish a Long Rest."],
      ["Subclass Feature", "You gain the 14th-level feature of your Patron."],
      ["Mystic Arcanum (8th level)", "You gain another Mystic Arcanum: choose one Warlock spell of 8th level. You can cast it once without a spell slot; the use is regained when you finish a Long Rest."],
      ["Ability Score Improvement", "You gain the Ability Score Improvement feat or another feat of the \"General\" category for which you qualify."],
      ["Mystic Arcanum (9th level)", "You gain another Mystic Arcanum: choose one Warlock spell of 9th level. You can cast it once without a spell slot; the use is regained when you finish a Long Rest."],
      ["Epic Boon", "You gain one feat of the \"Epic\" category of your choice for which you qualify."],
      ["Eldritch Master", "As a Magic action you call on your patron and regain all your expended Pact Magic spell slots. Once you use this feature, you can't use it again until you finish a Long Rest."]
    ],
    subclasses: [
      {
        name: "The Fiend",
        meta: "The Fiend",
        features: [
          ["Dark One's Blessing", "When you reduce a creature's Hit Points to 0, or when a creature within 10 ft. of you drops to 0 Hit Points, you gain Temporary Hit Points equal to your Charisma modifier + your Warlock level (minimum 1 Temporary Hit Point). This requires no action and happens automatically."],
          ["Dark One's Own Luck", "After you make an ability check or a saving throw, but before the result is announced, you can, with no action, add 1d10 to the roll. The number of uses equals your Proficiency Bonus, and all are regained when you finish a Long Rest."],
          ["Fiendish Resilience", "When you finish a Long Rest, you choose one damage type from: thunder, acid, cold, fire, necrotic, psychic, radiant, force, lightning, or poison. You gain Resistance to the chosen damage type until you finish your next Long Rest, when you can change the choice. This requires no action."],
          ["Hurl Through Hell", "Once per turn, when you hit a creature with an attack, you can, with no additional action, instantly transport the target through the Lower Planes. The target vanishes and is hurled through a nightmare landscape of the hells. At the end of your next turn the target returns to the unoccupied space nearest the one it occupied. If the target isn't a Fiend, it takes 8d10 Psychic damage from the horrors of the journey. Once you use this feature, you can't use it again until you finish a Short or Long Rest."]
        ]
      },
      {
        name: "The Archfey",
        meta: "The Archfey",
        features: [
          ["Steps of the Fey", "You can cast the spell «Misty Step» (teleport 30 ft. to an unoccupied space you can see) without expending a spell slot. The number of such uses equals your Proficiency Bonus, and all are regained when you finish a Long Rest. In addition, each time you cast «Misty Step» this way, you choose one additional effect: Disappearing Step (one creature you can see within 5 ft. of the space you vanished from or appear in makes a Wisdom saving throw against your spell save DC, or has the Restrained condition until the end of your next turn), Frightening Step (one creature you can see within 10 ft. of the space you appear in makes a Wisdom saving throw, or has the Frightened condition until the end of your next turn), or Taunting Step (you become Invisible until the start of your next turn)."],
          ["Misty Escape", "When you take damage, you can use a Reaction to become Invisible and teleport up to 60 ft. to an unoccupied space you can see. You remain Invisible until the start of your next turn or until you attack, cast a spell, or deal damage. Once you use this feature, you can't use it again until you finish a Short or Long Rest."],
          ["Beguiling Defenses", "You are immune to the Charmed condition. In addition, when a creature within 30 ft. makes an attack roll against you, you can use a Reaction to make the attack target another creature you can see (other than the attacker) within 30 ft. of the attacker instead of you. Once you use this, you can't use the feature again until you finish a Short or Long Rest."],
          ["Bewitching Magic", "When you cast an Enchantment or Illusion spell using a Warlock spell you know with a Magic action, you can, with the same action, cast «Misty Step» (or use Steps of the Fey) without spending an action, a spell slot, or a use of Steps of the Fey."]
        ]
      },
      {
        name: "The Celestial",
        meta: "The Celestial",
        features: [
          ["Healing Light", "You gain a pool of healing energy in the form of d6 dice. The number of dice in the pool equals 1 + your Warlock level. As a Bonus Action you can spend any number of dice from the pool (but no more than your Charisma modifier per use) to heal yourself or another creature within 60 ft.: roll the spent dice and the target regains Hit Points equal to the total rolled. Spent dice return to the pool when you finish a Long Rest."],
          ["Cantrips of Light", "You learn the cantrips «Light» and «Sacred Flame» (for «Sacred Flame» the target makes a Dexterity saving throw against your Warlock spell save DC). These cantrips don't count against the number of Warlock cantrips you know. Charisma is your spellcasting ability for them."],
          ["Radiant Soul", "You gain Resistance to Radiant damage. In addition, once per turn, when you deal Fire or Radiant damage with a spell of 1st level or higher, you can add your Charisma modifier to that damage (to one target). This requires no action."],
          ["Celestial Resilience", "When you finish a Short or Long Rest, you can grant yourself or another creature Temporary Hit Points equal to 5 + your Warlock level. This requires no action."],
          ["Searing Vengeance", "When you drop to 0 Hit Points but don't die outright, you can use a Reaction to flare with radiance. Each creature of your choice within 30 ft. of you makes a Dexterity saving throw against your spell save DC: on a failure it takes 2d8 + your Charisma modifier Radiant damage, half as much on a success. After this you immediately regain Hit Points equal to your Charisma modifier multiplied by your Warlock level. Once you use this feature, you can't use it again until you finish a Long Rest."]
        ]
      },
      {
        name: "The Great Old One",
        meta: "The Great Old One",
        features: [
          ["Awakened Mind", "You establish a telepathic link with the minds around you. You can telepathically speak to any creature you can see within 30 ft. of you. You don't need a shared language for this, but the creature must understand at least one language to understand you. The link is one-way — the creature can't reply telepathically, but it hears your mental words. This requires no action."],
          ["Psychic Spells", "Once per turn, when you hit a creature with an attack, you can, with no action, afflict that creature with a psychic affliction: it has Disadvantage on its next attack roll before the start of your next turn. This feature requires no concentration."],
          ["Thought Shield", "You gain Resistance to Psychic damage. In addition, when a creature deals Psychic or Radiant damage to you, you can use a Reaction to reflect part of the energy: the target takes damage of the same type equal to half the damage dealt to you."],
          ["Create Thrall", "As a Magic action you can touch an Incapacitated Humanoid and magically charm it. The target makes a Charisma saving throw against your Warlock spell save DC; on a failure it has the Charmed condition (charmed by you) for 1 minute or until you or your allies deal damage to it. A charmed target obeys your telepathic commands. You can use this feature on one creature at a time; to charm a new target, the previous charm ends. In addition, you can once cast the spell «Summon Aberration» without expending a slot; this use is regained when you finish a Long Rest."]
        ]
      }
    ]
  },
  "wizard-ph24": {
    name: "Wizard",
    primary: "Intelligence",
    saves: "Intelligence, Wisdom",
    armor: "No armor",
    weapons: "Simple",
    skills: "Choose two: Arcana, History, Insight, Investigation, Medicine, Nature, Religion.",
    features: [
      ["Spellcasting", "You've studied wizardry from your spellbook and cast spells from 1st level as a full caster. Your spellcasting ability is Intelligence: your spell save DC = 8 + Proficiency Bonus + Intelligence modifier, and your spell attack bonus = Proficiency Bonus + Intelligence modifier. At 1st level you know 3 cantrips from the Wizard list (the number grows with level) and own a spellbook into which 6 1st-level spells are inscribed at the start. Preparation: each day after a Long Rest you choose from the book a set of prepared spells (4 at 1st level; the number grows per the class table) of levels for which you have slots. Casting expends a slot of the appropriate level; to cast a spell more powerfully, expend a slot of a higher level. Slots are regained after a Long Rest. Replenishing the book: when you gain a Wizard level, you inscribe 2 new spells into the book for free of levels for which you already have slots; in addition, found scrolls and others' books can be copied into yours for time and gold. Your Spellcasting Focus is a staff, wand, or other arcane focus."],
      ["Ritual Adept", "Without any special ritual action: any spell from your book that has the Ritual tag you can cast as a ritual, even if it isn't among those prepared today. Ritual casting takes 10 minutes longer than usual and doesn't expend a spell slot. The spell must be inscribed in the book — this method works only with the spellbook, not the prepared list."],
      ["Arcane Recovery", "Once per day, when you finish a Short Rest, you regain expended spell slots. The combined level of the slots regained equals half your Wizard level rounded up (for example, at 4th level — 2 slot-levels: one 2nd-level slot or two 1st-level slots). You can't regain slots above 5th level this way. To use this again, you need a Long Rest."],
      ["Scholar", "Years of study have made you an expert in one field. Choose one of the skills you have proficiency in: Arcana, History, Medicine, Nature, or Religion. You gain Expertise in that skill: your Proficiency Bonus is doubled on checks with it."],
      ["Subclass", "You choose a School of Magic (Evocation, Abjuration, Divination, Illusion). Your subclass grants features at 3rd level and then at levels 6, 10, and 14."],
      ["Ability Score Improvement", "You gain a PH24 General feat (with the \"Ability Score Improvement\" tag). Usually this is +2 to one ability score or +1 to two different ones (no ability above 20), but you can instead take any available General feat."],
      ["Memorize Spell", "When you finish a Short or Long Rest, you can, with no action, replace one of your prepared spells with another spell from your book (of a level for which you have slots). This lets you retune your prepared set between fights without waiting for a new day."],
      ["Subclass Feature", "You gain the 6th-level feature of your chosen School of Magic."],
      ["Ability Score Improvement", "You gain another PH24 General feat (as at 4th level): +2 to one ability score or +1 to two different ones (none above 20), or another General feat of your choice."],
      ["Subclass Feature", "You gain the 10th-level feature of your chosen School of Magic."],
      ["Ability Score Improvement", "You gain another PH24 General feat (as at 4th level): +2 to one ability score or +1 to two different ones (none above 20), or another General feat of your choice."],
      ["Subclass Feature", "You gain the 14th-level feature of your chosen School of Magic."],
      ["Ability Score Improvement", "You gain another PH24 General feat (as at 4th level): +2 to one ability score or +1 to two different ones (none above 20), or another General feat of your choice."],
      ["Spell Mastery", "You've reached such mastery of a pair of spells that you cast them at will. Choose from your book one 1st-level spell and one 2nd-level spell, both with a casting time of \"1 action.\" Now, while these spells are prepared, you can cast them at their lowest level without expending a spell slot (using the same slot or a higher level per the normal rules, if you want to amplify them). When you finish a Long Rest, you can change the chosen spells for others from the book."],
      ["Epic Boon", "You gain one Epic Boon (Epic feat) of your choice for which you qualify."],
      ["Signature Spells", "Choose from your book two 3rd-level spells — these are your signature spells. They are always considered prepared (without taking up slots in your prepared list), and you can cast each of them once at 3rd level without expending a spell slot. Both of these free uses are regained when you finish a Short or Long Rest. You can also cast these spells using regular slots (including higher levels) as normal."]
    ],
    subclasses: [
      {
        name: "School of Evocation",
        meta: "Evoker",
        features: [
          ["Evocation Savant", "The School of Evocation focuses on the destructive magic of the elements. You know one extra cantrip from the Wizard list. In addition, when you copy an Evocation spell into your spellbook, you spend half the usual time and gold."],
          ["Potent Cantrip", "With no action (always on): when you cast a damaging Wizard cantrip and the target succeeds on its saving throw, it still takes half damage (but suffers none of the cantrip's additional effects on a success). This doesn't apply to spell attack rolls — only to cantrips with a saving throw."],
          ["Sculpt Spells", "With no action (always on): when you cast an Evocation spell that affects an area and forces creatures to make saving throws, you can choose a number of points equal to 1 + the spell's slot level. A creature in the area occupying any of the chosen points automatically succeeds on its save and takes no damage at all, even if it would normally take half on a success. This lets you keep allies out of your own Fireball and similar effects."],
          ["Empowered Evocation", "With no action (always on): when you roll damage dice for an Evocation spell, you can add your Intelligence modifier (minimum +1) to one of those damage rolls of your choice."],
          ["Overchannel", "As a Magic action you expend a 5th-level spell slot to charge yourself with elemental might. Until the end of your next turn, when you cast a damaging Evocation spell of 1st–4th level, you can skip rolling the damage dice — instead treat each damage die as having rolled its maximum. You can use this again only after a Long Rest, or by expending another 5th-level slot."]
        ]
      },
      {
        name: "School of Abjuration",
        meta: "Abjurer",
        features: [
          ["Abjuration Savant", "The School of Abjuration is protective magic that wards and deflects threats. You know one extra cantrip from the Wizard list. In addition, when you copy an Abjuration spell into your spellbook, you spend half the usual time and gold."],
          ["Arcane Ward", "With no action (as part of casting): when you cast an Abjuration spell of 1st level or higher, you can simultaneously weave around yourself a shimmering ward of magical energy that absorbs damage. The ward's absorption pool equals twice your Wizard level + your Intelligence modifier. While the ward has any pool left, any damage you take is first subtracted from it (down to 0) before your Hit Points. The ward's pool is fully restored when you finish a Long Rest."],
          ["Projected Ward", "As a Reaction, when you or a creature you can see within 30 ft. takes damage, you can redirect part of that damage to your Arcane Ward. Reduce the damage the target takes by up to the ward's current pool; that amount is subtracted from the ward's pool."],
          ["Spell Breaker", "With no action (always on): the spells «Counterspell» and «Dispel Magic» are now always prepared and don't take up slots in your prepared list. In addition, when you use one of them and an ability check is required to end another's spell, you make that check with Advantage."],
          ["Spell Resistance", "With no action (always on): you have Advantage on saving throws against spells, and you have Resistance to damage dealt by spells (that damage is halved)."]
        ]
      },
      {
        name: "School of Divination",
        meta: "Diviner",
        features: [
          ["Divination Savant", "The School of Divination is the magic of foresight and knowledge. You know one extra cantrip from the Wizard list. In addition, when you copy a Divination spell into your spellbook, you spend half the usual time and gold."],
          ["Portent", "When you finish a Long Rest, roll two d20s and record the numbers rolled — these are your portents. Until your next Long Rest you can, with no action (as a Reaction when needed), replace any attack roll, ability check, or saving throw made by you or a creature you can see with one of these pre-rolled numbers. You must do this before the outcome of the ordinary roll is known. Each portent can be used only once; expended portents are gone until your next Long Rest."],
          ["Expert Divination", "With no action (as part of casting): when you cast a Divination spell of 2nd level or higher using a spell slot, you can regain one expended spell slot. The level of the slot regained must be lower than the level of the spell cast and no higher than 5th. You can use this once, regained after a Long Rest."],
          ["The Third Eye", "As a Magic action you awaken your third eye and gain one of the following effects of your choice, lasting until you become Incapacitated or use this feature again: Darkvision out to 60 ft.; the ability to read any text in any language; or seeing the Ethereal Plane (Border Ethereal) out to 60 ft. You can use the feature again after a Short or Long Rest."],
          ["Greater Portent", "With no action (always on): your Portent feature is enhanced — now, when you finish a Long Rest, you roll three d20s (instead of two) and record all three numbers as portents."]
        ]
      },
      {
        name: "School of Illusion",
        meta: "Illusionist",
        features: [
          ["Illusion Savant", "The School of Illusion is the magic of deceiving the senses and crafting images. You know one extra cantrip from the Wizard list. In addition, when you copy an Illusion spell into your spellbook, you spend half the usual time and gold."],
          ["Improved Illusions", "With no action (always on): you learn the cantrip «Minor Illusion» if you don't already know it, and it doesn't count against the number of cantrips you know. When you cast «Minor Illusion», you can create both a sound and an image at once (rather than just one), and the cantrip's range is doubled."],
          ["Phantasmal Creatures", "As a Magic action you create an illusory creature — a Small or Medium beast, visible only to you and your allies. The creature appears in an unoccupied space you can see within 60 ft. and acts on your turn. As a Bonus Action you can mentally move it up to its Speed and command it to attack one creature within 5 ft. of it: make a spell attack roll; on a hit the target takes Psychic damage equal to 2d6 + your Intelligence modifier. The creature lasts 1 hour, until you dismiss it, create a new one, or become Incapacitated. You can use the feature for free once, regained after a Long Rest; in addition, you can resummon it by expending a spell slot of 1st level or higher."],
          ["Illusory Self", "As a Reaction, when you're struck by an attack roll, you can momentarily make yourself illusory, and that attack misses you regardless of its result. You can use this for free once, regained after a Short or Long Rest; or by expending an Illusion spell slot of 2nd level or higher."],
          ["Illusory Reality", "As a Bonus Action, while you maintain concentration on an Illusion spell that creates the image of an object, you can make one inanimate, nonmagical part of that illusion real for 1 minute. For example, an illusory bridge becomes real and can be walked across, and a vase becomes a real vase you can pick up. The object can't deal damage or otherwise directly harm anyone. After the minute, the object disappears."]
        ]
      }
    ]
  },
}
export default PART
