const PART: Record<string, { name: string; flavor?: string; senses?: string; langs?: string; resist?: string; immune?: string; condImmune?: string; traits?: [string, string][]; actions?: [string, string][]; bonus?: [string, string][]; reactions?: [string, string][]; legendary?: [string, string][] }> = {
  'Бородатый дьявол': {
    name: 'Bearded Devil',
    senses: 'darkvision 120 ft., passive Perception 10',
    langs: 'Infernal, telepathy 120 ft.',
    resist: 'cold; nonmagical bludgeoning/piercing/slashing, except from silvered weapons',
    immune: 'fire, poison',
    condImmune: 'poisoned',
    traits: [
      ['Devil\'s Sight', "Magical darkness doesn't impede the devil's darkvision."],
      ['Magic Resistance', 'The devil has advantage on saving throws against spells and other magical effects.'],
      ['Steadfast', "The devil can't be Frightened while it can see an allied creature within 30 ft."]
    ],
    actions: [
      ['Multiattack', 'The devil makes two attacks: one with its beard and one with its glaive.'],
      ['Beard', 'Melee Weapon Attack: +5 to hit, reach 5 ft. Hit: 6 (1d8 + 2) piercing damage; the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute and unable to regain hit points (it repeats the save at the end of each of its turns).'],
      ['Glaive', 'Melee Weapon Attack: +5 to hit, reach 10 ft. Hit: 8 (1d10 + 3) slashing damage. If the target is not an undead or a construct, it must succeed on a DC 12 Constitution saving throw or take an infernal wound: it loses 5 (1d10) hit points at the start of each of its turns, and each new hit increases the loss by 5 (1d10). The wound is closed by a successful DC 12 Wisdom (Medicine) check made as an action, or by any magical healing.']
    ]
  }
}
export default PART
