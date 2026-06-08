const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  "Красный слаад": {
    name: "Red Slaad",
    flavor: "A crimson-skinned toadlike denizen of Limbo whose hooked claws infect humanoids with eggs that hatch into new slaadi.",
    senses: "darkvision 60 ft., passive Perception 11",
    langs: "Slaad, telepathy 60 ft.",
    resist: "acid, cold, fire, lightning, thunder",
    traits: [
      ["Magic Resistance", "The slaad has advantage on saving throws against spells and other magical effects."],
      ["Regeneration", "The slaad regains 10 hit points at the start of its turn if it has at least 1 hit point."]
    ],
    actions: [
      ["Multiattack", "The slaad makes three attacks: one with its bite and two with its claws."],
      ["Bite", "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) piercing damage."],
      ["Claw", "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 7 (1d8 + 3) slashing damage. If the target is a humanoid, it must succeed on a DC 14 Constitution saving throw or be infected with a disease — a minuscule slaad egg. A humanoid host can incubate only one slaad egg to term at a time. Over three months, the egg moves to the chest cavity, gestates, and forms a slaad tadpole. In the 24-hour period before giving birth, the host starts to feel unwell, its speed is halved, and it has disadvantage on attack rolls, ability checks, and saving throws. At birth, the tadpole chews its way through vital organs and out of the host's chest in 1 round, killing the host in the process. If the disease is cured before the tadpole's emergence, the unborn slaad is disintegrated."]
    ]
  },
  "Синий слаад": {
    name: "Blue Slaad",
    flavor: "A hulking toadlike denizen of Limbo with bone hooks on its forelimbs; its claws spread the chaos phage that transforms victims into slaadi.",
    senses: "darkvision 60 ft., passive Perception 11",
    langs: "Slaad, telepathy 60 ft.",
    resist: "acid, cold, fire, lightning, thunder",
    traits: [
      ["Magic Resistance", "The slaad has advantage on saving throws against spells and other magical effects."],
      ["Regeneration", "The slaad regains 10 hit points at the start of its turn if it has at least 1 hit point."]
    ],
    actions: [
      ["Multiattack", "The slaad makes three attacks: one with its bite and two with its claws."],
      ["Bite", "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) piercing damage."],
      ["Claws", "Melee Weapon Attack: +8 to hit, reach 5 ft., one creature. Hit: 12 (2d6 + 5) slashing damage. If the target is a humanoid, it must succeed on a DC 15 Constitution saving throw or be infected with a disease called chaos phage. While infected, the target can't regain hit points, and its hit point maximum decreases by 10 (3d6) every 24 hours. If the disease reduces the target's hit point maximum to 0, the target instantly transforms into a red slaad or, if it has the ability to cast spells of 3rd level or higher, a green slaad. Only a wish spell can reverse the transformation."]
    ]
  },
  "Зелёный слаад": {
    name: "Green Slaad",
    flavor: "A cunning toadlike denizen of Limbo gifted with innate magic and the ability to take humanoid form.",
    senses: "darkvision 60 ft., passive Perception 12",
    langs: "Slaad, telepathy 60 ft.",
    resist: "acid, cold, fire, lightning, thunder",
    traits: [
      ["Shapechanger", "The slaad can use its action to polymorph into a Small or Medium humanoid, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies."],
      ["Innate Spellcasting", "The slaad's innate spellcasting ability is Charisma (spell save DC 12). The slaad can innately cast the following spells, requiring no material components. At will: detect magic, detect thoughts, mage hand. 2/day each: fear, invisibility (self only). 1/day: fireball."],
      ["Magic Resistance", "The slaad has advantage on saving throws against spells and other magical effects."],
      ["Regeneration", "The slaad regains 10 hit points at the start of its turn if it has at least 1 hit point."]
    ],
    actions: [
      ["Multiattack", "The slaad makes three attacks: one with its bite and two with its claws or staff."],
      ["Bite (Slaad Form Only)", "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage."],
      ["Claw (Slaad Form Only)", "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) slashing damage."],
      ["Staff", "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) bludgeoning damage."],
      ["Hurl Flame", "Ranged Spell Attack: +4 to hit, range 60 ft., one target. Hit: 10 (3d6) fire damage. The fire ignites flammable objects that aren't being worn or carried."]
    ]
  },
  "Водяная тварь": {
    name: "Water Weird",
    flavor: "A serpentine guardian elemental of living water, invisible within its element, that strangles and drowns intruders in the pool it is bound to protect.",
    senses: "blindsight 30 ft., passive Perception 10",
    langs: "understands Aquan but doesn't speak",
    resist: "fire; bludgeoning, piercing, and slashing from nonmagical attacks",
    immune: "poison",
    condImmune: "exhaustion, grappled, paralyzed, poisoned, prone, restrained, unconscious",
    traits: [
      ["Invisible in Water", "The water weird is invisible while fully immersed in water."],
      ["Water Bound", "The water weird dies if it leaves the water to which it is bound or if that water is destroyed."]
    ],
    actions: [
      ["Constrict", "Melee Weapon Attack: +5 to hit, reach 10 ft., one creature. Hit: 13 (3d6 + 3) bludgeoning damage. If the target is Medium or smaller, it is grappled (escape DC 13) and pulled 5 feet toward the water weird. Until this grapple ends, the target is restrained, the water weird tries to drown it, and the water weird can't constrict another target."]
    ]
  },
  "Невидимый охотник": {
    name: "Invisible Stalker",
    flavor: "An unseen air elemental conjured by magic that relentlessly tracks its designated quarry until it is destroyed.",
    senses: "darkvision 60 ft., passive Perception 18",
    langs: "Auran, understands Common but doesn't speak it",
    resist: "bludgeoning, piercing, and slashing from nonmagical attacks",
    immune: "poison",
    condImmune: "exhaustion, grappled, paralyzed, petrified, poisoned, prone, restrained, unconscious",
    traits: [
      ["Invisibility", "The stalker is invisible."],
      ["Faultless Tracker", "The stalker is given a quarry by its summoner. The stalker knows the direction and distance to its quarry as long as the two of them are on the same plane of existence. The stalker also knows the location of its summoner."]
    ],
    actions: [
      ["Multiattack", "The stalker makes two slam attacks."],
      ["Slam", "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage."]
    ]
  },
  "Азер": {
    name: "Azer",
    flavor: "A bronze-forged denizen of the Plane of Fire with a mane and beard of flame; a master smith and unrivaled artisan.",
    senses: "passive Perception 11",
    langs: "Ignan",
    immune: "fire, poison",
    condImmune: "poisoned",
    traits: [
      ["Heated Body", "A creature that touches the azer or hits it with a melee attack while within 5 ft. of it takes 5 (1d10) fire damage."],
      ["Heated Weapons", "When the azer hits with a metal melee weapon, it deals an extra 3 (1d6) fire damage (included in the attack)."],
      ["Illumination", "The azer sheds bright light in a 10-foot radius and dim light for an additional 10 ft."]
    ],
    actions: [
      ["Warhammer", "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage, or 8 (1d10 + 3) bludgeoning damage if used with two hands to make a melee attack, plus 3 (1d6) fire damage."]
    ]
  },
  "Саламандра": {
    name: "Salamander",
    flavor: "A serpentine fire elemental wielding a white-hot spear and a lashing tail; vulnerable to cold damage.",
    senses: "darkvision 60 ft., passive Perception 10",
    langs: "Ignan",
    resist: "bludgeoning, piercing, and slashing from nonmagical attacks",
    immune: "fire",
    traits: [
      ["Heated Body", "A creature that touches the salamander or hits it with a melee attack while within 5 ft. of it takes 7 (2d6) fire damage."],
      ["Heated Weapons", "Any metal melee weapon the salamander wields deals an extra 3 (1d6) fire damage on a hit (included in the attack)."]
    ],
    actions: [
      ["Multiattack", "The salamander makes two attacks: one with its spear and one with its tail."],
      ["Spear", "Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack, plus 3 (1d6) fire damage."],
      ["Tail", "Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage plus 7 (2d6) fire damage, and the target is grappled (escape DC 14). Until this grapple ends, the target is restrained, the salamander can automatically hit the target with its tail, and the salamander can't make tail attacks against other targets."]
    ]
  },
  "Магмин": {
    name: "Magmin",
    flavor: "A squat creature of magma and flame that gleefully sets everything in its path ablaze; it explodes in a burst of fire when slain.",
    senses: "darkvision 60 ft., passive Perception 10",
    langs: "Ignan",
    resist: "bludgeoning, piercing, and slashing from nonmagical attacks",
    immune: "fire",
    traits: [
      ["Death Burst", "When the magmin dies, it explodes in a burst of fire and magma. Each creature within 10 ft. of it must make a DC 11 Dexterity saving throw, taking 7 (2d6) fire damage on a failed save, or half as much damage on a successful one. Flammable objects that aren't being worn or carried in that area are ignited."],
      ["Ignited Illumination", "As a bonus action, the magmin can set itself ablaze or extinguish its flames. While ablaze, the magmin sheds bright light in a 10-foot radius and dim light for an additional 10 ft."]
    ],
    actions: [
      ["Touch", "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d6) fire damage. If the target is a creature or a flammable object, it ignites. Until a creature takes an action to douse the fire, the target takes 3 (1d6) fire damage at the end of each of its turns."]
    ]
  },
  "Галеб дур": {
    name: "Galeb Duhr",
    flavor: "A rounded stone elemental with stubby limbs, indistinguishable from a boulder; it rolls into battle at speed (30 ft., 60 ft. downhill) and animates nearby rocks.",
    senses: "darkvision 60 ft., tremorsense 60 ft., passive Perception 11",
    langs: "Terran",
    resist: "bludgeoning, piercing, and slashing from nonmagical attacks",
    immune: "poison",
    condImmune: "exhaustion, paralyzed, petrified, poisoned",
    traits: [
      ["False Appearance", "While the galeb duhr remains motionless, it is indistinguishable from a boulder."],
      ["Rolling Charge", "If the galeb duhr rolls at least 20 feet straight toward a target and then hits it with a slam attack on the same turn, the target takes an extra 7 (2d6) bludgeoning damage. If the target is a creature, it must succeed on a DC 16 Strength saving throw or be knocked prone."]
    ],
    actions: [
      ["Slam", "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage."],
      ["Animate Boulders (1/Day)", "The galeb duhr magically animates up to two boulders it can see within 60 feet of it. A boulder has the statistics of a galeb duhr, except it has Intelligence 1 and Charisma 1, it can't be charmed or frightened, and it lacks this action option. A boulder remains animate as long as the galeb duhr maintains concentration, up to 1 minute (as if concentrating on a spell)."]
    ]
  }
}
export default PART
