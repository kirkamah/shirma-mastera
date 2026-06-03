// English translations of the per-class progression tables (D&D 2024 — PH24).
// Mirrors CLASS_PROGRESSION in class-progression.ts: same class ids, same
// column order/count, one features entry per source row level.

export const CLASS_PROGRESSION_EN: Record<string, { columns: string[]; features: Record<number, string> }> = {
  "barbarian-ph24": {
    columns: ["Rages", "Rage Damage", "Weapon Mastery"],
    features: {
      1: "Rage · Unarmored Defense · Weapon Mastery",
      2: "Danger Sense · Reckless Attack",
      3: "Primal Path · Primal Knowledge",
      4: "ASI",
      5: "Extra Attack · Fast Movement",
      6: "Path feature",
      7: "Feral Instinct · Instinctive Pounce",
      8: "ASI",
      9: "Brutal Strike",
      10: "Path feature",
      11: "Relentless Rage",
      12: "ASI",
      13: "Improved Brutal Strike",
      14: "Path feature",
      15: "Persistent Rage",
      16: "ASI",
      17: "Improved Brutal Strike (greater)",
      18: "Indomitable Might",
      19: "Epic Boon",
      20: "Primal Champion"
    }
  },

  "bard-ph24": {
    columns: ["Cantrips", "Inspiration Die"],
    features: {
      1: "Spellcasting · Bardic Inspiration",
      2: "Expertise · Jack of All Trades",
      3: "Bard College",
      4: "ASI",
      5: "Font of Inspiration",
      6: "College feature",
      7: "Countercharm",
      8: "ASI",
      9: "Expertise ×2",
      10: "Magical Secrets",
      11: "—",
      12: "ASI",
      13: "—",
      14: "College feature",
      15: "—",
      16: "ASI",
      17: "—",
      18: "Superior Inspiration",
      19: "Epic Boon",
      20: "Words of Creation"
    }
  },

  "cleric-ph24": {
    columns: ["Cantrips", "Channel Divinity"],
    features: {
      1: "Spellcasting · Divine Order",
      2: "Channel Divinity",
      3: "Divine Domain",
      4: "ASI",
      5: "Sear Undead",
      6: "Domain feature · Channel Divinity ×3",
      7: "Blessed Strikes",
      8: "ASI",
      9: "—",
      10: "Divine Intervention",
      11: "—",
      12: "ASI",
      13: "—",
      14: "Improved Blessed Strikes",
      15: "—",
      16: "ASI",
      17: "Domain feature",
      18: "Channel Divinity ×4",
      19: "Epic Boon",
      20: "Greater Divine Intervention"
    }
  },

  "druid-ph24": {
    columns: ["Cantrips", "Wild Shape"],
    features: {
      1: "Spellcasting · Druidic · Primal Order",
      2: "Wild Shape · Wild Companion",
      3: "Druid Circle",
      4: "ASI",
      5: "Wild Resurgence",
      6: "Circle feature",
      7: "Elemental Fury",
      8: "ASI",
      9: "—",
      10: "Circle feature",
      11: "—",
      12: "ASI",
      13: "—",
      14: "Circle feature",
      15: "Improved Elemental Fury",
      16: "ASI",
      17: "—",
      18: "Beast Spells",
      19: "Epic Boon",
      20: "Archdruid"
    }
  },

  "fighter-ph24": {
    columns: ["Second Wind", "Action Surge", "Weapon Mastery"],
    features: {
      1: "Fighting Style · Second Wind · Weapon Mastery",
      2: "Action Surge · Tactical Mind",
      3: "Subclass",
      4: "ASI",
      5: "Extra Attack",
      6: "ASI",
      7: "Subclass feature",
      8: "ASI",
      9: "Indomitable · Tactical Shift",
      10: "Subclass feature",
      11: "Two Extra Attacks (3)",
      12: "ASI",
      13: "Studied Attacks · Indomitable ×2",
      14: "ASI",
      15: "Subclass feature",
      16: "ASI",
      17: "Action Surge ×2 · Indomitable ×3",
      18: "Subclass feature",
      19: "Epic Boon",
      20: "Three Extra Attacks (4)"
    }
  },

  "monk-ph24": {
    columns: ["Focus", "Martial Arts Die", "+Speed"],
    features: {
      1: "Martial Arts · Unarmored Defense",
      2: "Focus · +Speed · Uncanny Metabolism",
      3: "Subclass · Deflect Attacks",
      4: "ASI · Slow Fall",
      5: "Extra Attack · Stunning Strike",
      6: "Empowered Strikes · Subclass feature",
      7: "Evasion",
      8: "ASI",
      9: "Acrobatic Movement",
      10: "Heightened Focus",
      11: "Subclass feature",
      12: "ASI",
      13: "Deflect Energy",
      14: "Disciplined Survivor",
      15: "Perfect Focus",
      16: "ASI",
      17: "Subclass feature",
      18: "Superior Defense",
      19: "Epic Boon",
      20: "Body and Mind"
    }
  },

  "paladin-ph24": {
    columns: ["Lay on Hands", "Channel Divinity"],
    features: {
      1: "Lay on Hands · Spellcasting",
      2: "Fighting Style · Divine Smite",
      3: "Channel Divinity · Sacred Oath",
      4: "ASI",
      5: "Extra Attack · Faithful Steed",
      6: "Aura of Protection",
      7: "Oath feature",
      8: "ASI",
      9: "Abjure Foes",
      10: "Aura of Courage",
      11: "Radiant Strikes",
      12: "ASI",
      13: "—",
      14: "Restoring Touch",
      15: "Oath feature",
      16: "ASI",
      17: "—",
      18: "Auras up to 30 ft.",
      19: "Epic Boon",
      20: "Oath Apex"
    }
  },

  "ranger-ph24": {
    columns: ["Hunter's Mark"],
    features: {
      1: "Spellcasting · Favored Enemy · Weapon Mastery",
      2: "Deft Explorer · Fighting Style",
      3: "Subclass",
      4: "ASI",
      5: "Extra Attack",
      6: "Subclass feature",
      7: "—",
      8: "ASI",
      9: "Expertise",
      10: "Tireless",
      11: "Subclass feature",
      12: "ASI",
      13: "Relentless Hunter",
      14: "Nature's Veil",
      15: "Subclass feature",
      16: "ASI",
      17: "Precise Hunter",
      18: "Feral Senses",
      19: "Epic Boon",
      20: "Foe Slayer"
    }
  },

  "rogue-ph24": {
    columns: ["Sneak Attack", "Weapon Mastery"],
    features: {
      1: "Expertise · Sneak Attack · Thieves' Cant · Weapon Mastery",
      2: "Cunning Action",
      3: "Subclass · Steady Aim",
      4: "ASI",
      5: "Cunning Strike · Uncanny Dodge",
      6: "Expertise ×2",
      7: "Evasion · Reliable Talent",
      8: "ASI",
      9: "Subclass feature",
      10: "ASI",
      11: "Improved Cunning Strike",
      12: "ASI",
      13: "Subclass feature",
      14: "Devious Strikes",
      15: "Slippery Mind",
      16: "ASI",
      17: "Subclass feature",
      18: "Elusive",
      19: "Epic Boon",
      20: "Stroke of Luck"
    }
  },

  "sorcerer-ph24": {
    columns: ["Sorcery Points", "Metamagic", "Cantrips"],
    features: {
      1: "Spellcasting · Innate Sorcery",
      2: "Font of Magic · Metamagic (2)",
      3: "Subclass",
      4: "ASI",
      5: "Sorcerous Restoration",
      6: "Subclass feature",
      7: "Sorcery Incarnate",
      8: "ASI",
      9: "—",
      10: "Metamagic (3)",
      11: "—",
      12: "ASI",
      13: "—",
      14: "Subclass feature",
      15: "—",
      16: "ASI",
      17: "Metamagic (4)",
      18: "Subclass feature",
      19: "Epic Boon",
      20: "Arcane Apotheosis"
    }
  },

  "warlock-ph24": {
    columns: ["Invocations", "Arcanum"],
    features: {
      1: "Pact Magic · Eldritch Invocations",
      2: "Magical Cunning",
      3: "Subclass",
      4: "ASI",
      5: "—",
      6: "Patron feature",
      7: "—",
      8: "ASI",
      9: "Contact Patron",
      10: "Patron feature",
      11: "Mystic Arcanum (6)",
      12: "ASI",
      13: "Mystic Arcanum (7)",
      14: "Patron feature",
      15: "Mystic Arcanum (8)",
      16: "ASI",
      17: "Mystic Arcanum (9)",
      18: "—",
      19: "Epic Boon",
      20: "Eldritch Master"
    }
  },

  "wizard-ph24": {
    columns: ["Cantrips"],
    features: {
      1: "Spellcasting · Ritual Adept · Arcane Recovery",
      2: "Scholar",
      3: "Arcane Tradition",
      4: "ASI",
      5: "Memorize Spell",
      6: "School feature",
      7: "—",
      8: "ASI",
      9: "—",
      10: "School feature",
      11: "—",
      12: "ASI",
      13: "—",
      14: "School feature",
      15: "—",
      16: "ASI",
      17: "—",
      18: "Spell Mastery",
      19: "Epic Boon",
      20: "Signature Spells"
    }
  }
}
