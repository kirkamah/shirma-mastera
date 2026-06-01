import type { ConditionItem } from '@shared/types'

// All 15 core D&D 5e conditions in Russian. `desc` holds the condition's effects;
// `exit` holds the accurate, condition-specific way to get out of it (a saving
// throw — and of which ability — an ability check, a rest, or nothing at all).
// Where the 2024 ruleset changed the text, the *2024 variant differs.
interface RawCondition {
  key: string
  name: string
  desc2014: string
  desc2024?: string
  exit2014: string
  exit2024?: string
}

const RAW: RawCondition[] = [
  {
    key: 'blinded',
    name: 'Ослеплён',
    desc2014:
      'Ослеплённое существо не видит и автоматически проваливает проверки характеристик, требующие зрения.\n\nБроски атаки по существу совершаются с преимуществом, а броски атаки самого существа — с помехой.',
    exit2014:
      'Спадает, когда оканчивается наложивший эффект или устранена причина (вспышка, рана глаз). Магически снимается заклинанием «Малое восстановление».\n\nЕсли слепота наложена заклинанием со спасбросками (например, «Слепота/глухота»), цель в конце каждого своего хода повторяет спасбросок Телосложения против СЛ заклинателя и оканчивает состояние при успехе.'
  },
  {
    key: 'charmed',
    name: 'Очарован',
    desc2014:
      'Очарованное существо не может атаковать того, кто его очаровал, и выбирать его целью вредоносных способностей и магических эффектов.\n\nТот, кто очаровал, совершает с преимуществом проверки характеристик при социальном взаимодействии с существом.',
    exit2014:
      'Длится, пока действует наложивший эффект, и оканчивается по истечении его длительности; концентрационные чары (как «Очарование личности») спадают при потере концентрации заклинателем.\n\nМногие чары дают цели новый спасбросок Мудрости против СЛ заклинателя, если очаровавший причиняет ей вред. Полностью снимается заклинанием «Высшее восстановление».'
  },
  {
    key: 'deafened',
    name: 'Оглохший',
    desc2014: 'Оглохшее существо не слышит и автоматически проваливает проверки характеристик, требующие слуха.',
    exit2014:
      'Спадает при устранении причины или окончании эффекта. Магически снимается заклинанием «Малое восстановление».\n\nЕсли глухота наложена заклинанием (например, «Слепота/глухота»), цель в конце каждого своего хода повторяет спасбросок Телосложения против СЛ заклинателя и оканчивает состояние при успехе.'
  },
  {
    key: 'exhaustion',
    name: 'Истощение',
    desc2014:
      'Истощение измеряется шестью уровнями. Эффекты накапливаются: существо страдает от всех эффектов своего уровня и уровней ниже.\n\n• Уровень 1 — помеха на проверки характеристик\n• Уровень 2 — скорость уменьшена вдвое\n• Уровень 3 — помеха на броски атаки и спасброски\n• Уровень 4 — максимум хитов уменьшен вдвое\n• Уровень 5 — скорость становится равной 0\n• Уровень 6 — смерть\n\nЕсли у существа уже есть истощение и оно получает новый уровень, его уровень повышается.',
    desc2024:
      'Истощение измеряется уровнями (1–6). Пока у существа есть хотя бы 1 уровень истощения, оно испытывает следующие эффекты.\n\n• Броски d20 — существо вычитает из каждого броска d20 (броски атаки, проверки характеристик и спасброски) число, равное 2 × его уровню истощения.\n• Скорость — скорость существа уменьшается на число футов, равное 5 × его уровню истощения.\n• Уровень 6 — смерть.\n\n(В редакции 2024 шестиуровневая таблица заменена единым нарастающим штрафом.)',
    exit2014:
      'Спасбросками не снимается. Каждый продолжительный отдых снижает уровень истощения на 1 — при условии, что существо ело и пило. Заклинание «Высшее восстановление» снимает один уровень. Состояние оканчивается, когда уровень истощения достигает 0.'
  },
  {
    key: 'frightened',
    name: 'Испуган',
    desc2014:
      'Испуганное существо совершает с помехой проверки характеристик и броски атаки, пока источник страха находится в пределах его линии обзора.\n\nСущество не может добровольно приближаться к источнику своего страха.',
    exit2014:
      'Спадает по истечении наложившего эффекта. Эффект также прекращается, если источник страха надолго покидает линию обзора существа (по усмотрению Мастера).\n\nЗаклинания вроде «Страх» позволяют цели в конце каждого своего хода повторять спасбросок Мудрости против СЛ заклинателя, оканчивая состояние при успехе.'
  },
  {
    key: 'grappled',
    name: 'Схвачен',
    desc2014: 'Скорость схваченного существа становится равной 0, и оно не получает бонусов к скорости.',
    desc2024:
      'Скорость схваченного существа становится равной 0, и оно не получает бонусов к скорости.\n\n• Атаки — существо совершает с помехой броски атаки по любой цели, кроме того, кто его схватил.\n• Перемещение — схвативший может тащить или нести схваченное существо при перемещении, но каждый фут такого движения стоит 1 дополнительный фут (если только существо не Крошечное или не на два размера меньше схватившего).',
    exit2014:
      'Освобождение — это НЕ спасбросок, а действие. Схваченное существо тратит своё действие на побег: совершает проверку Силы (Атлетика) или Ловкости (Акробатика) — что выберет — против проверки Силы (Атлетика) схватившего (состязание характеристик). При успехе захват окончен.\n\nСостояние также оканчивается, если схвативший становится недееспособным или если существо удаляют из зоны досягаемости схватившего сторонним эффектом (например, заклинанием «Громовая волна»).\n\n**Как совершается захват.** В действии Атака существо заменяет одну из своих атак особой рукопашной атакой — захватом (нужна свободная рука); цель должна быть не более чем на один размер крупнее. Проводится то же состязание Атлетики против Атлетики/Акробатики цели.',
    exit2024:
      'Освобождение — это НЕ спасбросок, а действие. Схваченное существо тратит своё действие на побег: совершает проверку Силы (Атлетика) или Ловкости (Акробатика) против Сложности захвата схватившего. При успехе состояние оканчивается.\n\nСостояние также оканчивается, если схвативший становится недееспособным или если цель оказывается вне досягаемости схватившего (например, её отбросило эффектом).\n\n**Как совершается захват.** Атака Безоружным ударом имеет опцию «Захват»: вместо урона существо вынуждает цель (не крупнее его более чем на один размер) совершить спасбросок Силы или Ловкости — что выберет цель — против Сложности захвата = **8 + модификатор Силы схватившего + его бонус мастерства**. При провале цель становится Схвачена.'
  },
  {
    key: 'incapacitated',
    name: 'Недееспособен',
    desc2014: 'Недееспособное существо не может совершать действия и реакции.',
    desc2024:
      'Недееспособное существо испытывает следующие эффекты.\n\n• Без действий — существо не может совершать никакие действия, бонусные действия и реакции.\n• Концентрация — концентрация существа прерывается.\n• Без речи — существо не может говорить.\n• Инициатива — если существо застигнуто врасплох, оно совершает с помехой бросок инициативы.',
    exit2014:
      'Собственного спасброска или проверки для выхода нет. Состояние спадает только вместе с породившим его эффектом. Часто недееспособность входит в состав других состояний («Парализован», «Окаменел», «Ошеломлён», «Без сознания») и оканчивается вместе с ними.'
  },
  {
    key: 'invisible',
    name: 'Невидимый',
    desc2014:
      'Невидимое существо невозможно увидеть без помощи магии или особого чувства. Для скрытности существо считается сильно заслонённым.\n\nБроски атаки по существу совершаются с помехой, а его собственные броски атаки — с преимуществом.',
    desc2024:
      'Невидимое существо испытывает следующие эффекты.\n\n• Сокрытие — существо не видно без помощи магии или особого чувства. Снаряжение, которое оно несёт, также скрыто.\n• Эффекты по цели — существо не подвержено эффектам, требующим видеть цель, если их источник не может его видеть.\n• Атаки — броски атаки по существу совершаются с помехой, а его собственные броски атаки — с преимуществом. Если существо как-либо видно, оно теряет эти преимущества.',
    exit2014:
      'Спасброском не снимается. Спадает по истечении наложившего эффекта. Некоторые источники (например, заклинание «Невидимость») оканчиваются раньше — как только существо атакует или творит заклинание.'
  },
  {
    key: 'paralyzed',
    name: 'Парализован',
    desc2014:
      'Парализованное существо недееспособно, не может двигаться и говорить.\n\nОно автоматически проваливает спасброски Силы и Ловкости. Броски атаки по нему совершаются с преимуществом. Любая атака, попадающая по нему с расстояния 5 футов, — критическое попадание.',
    exit2014:
      'Спадает по истечении наложившего эффекта. Магически снимается заклинанием «Малое восстановление».\n\nЕсли паралич наложен заклинанием (например, «Удержание личности»), цель в конце каждого своего хода повторяет спасбросок Мудрости против СЛ заклинателя и оканчивает состояние при успехе.'
  },
  {
    key: 'petrified',
    name: 'Окаменел',
    desc2014:
      'Окаменевшее существо превращено вместе со всем носимым снаряжением в твёрдую субстанцию, недееспособно, не осознаёт окружение и не может двигаться или говорить.\n\nВес существа увеличивается в десять раз, и оно перестаёт стареть. Броски атаки по нему совершаются с преимуществом. Оно автоматически проваливает спасброски Силы и Ловкости, получает сопротивление всему урону и иммунитет к яду и болезням.',
    exit2014:
      'Само по себе не оканчивается и повторными спасбросками не снимается. Снимается мощной магией — например, заклинанием «Высшее восстановление». Окаменение от взгляда (как у медузы) часто даёт первоначальный спасбросок Телосложения против СЛ существа, но после провала требует магического исцеления.'
  },
  {
    key: 'poisoned',
    name: 'Отравлен',
    desc2014: 'Отравленное существо совершает с помехой броски атаки и проверки характеристик.',
    exit2014:
      'Спадает по истечении длительности яда или способности. Магически снимается заклинанием «Малое восстановление».\n\nМногие яды и заклинания (например, «Луч болезни») позволяют повторять спасбросок Телосложения против СЛ источника в конце каждого своего хода, оканчивая состояние при успехе.'
  },
  {
    key: 'prone',
    name: 'Сбит с ног',
    desc2014:
      'Сбитое с ног существо может перемещаться только ползком, если не встанет, тем самым окончив состояние.\n\nОно совершает с помехой броски атаки. Броски атаки по нему совершаются с преимуществом, если атакующий находится в пределах 5 футов, и с помехой в остальных случаях.',
    exit2014:
      'Ни спасброска, ни проверки — существо просто встаёт. Чтобы встать, оно тратит половину своей скорости (округляя вниз). Если оставшейся скорости не хватает, встать в этот ход нельзя. Как только существо встаёт, состояние оканчивается.'
  },
  {
    key: 'restrained',
    name: 'Опутан',
    desc2014:
      'Скорость опутанного существа становится равной 0, и оно не получает бонусов к скорости.\n\nБроски атаки по нему совершаются с преимуществом, а его собственные — с помехой. Существо совершает с помехой спасброски Ловкости.',
    exit2014:
      'Способ выхода задаёт конкретный источник:\n\n• «Опутывание» — действием совершить проверку Силы против СЛ заклинателя;\n• «Паутина» — спасбросок Ловкости против СЛ заклинателя в конце каждого своего хода;\n• верёвки, сети и путы — проверка Силы (Атлетика) или Ловкости (Акробатика) против СЛ предмета.\n\nВ остальных случаях спадает по истечении наложившего эффекта.'
  },
  {
    key: 'stunned',
    name: 'Ошеломлён',
    desc2014:
      'Ошеломлённое существо недееспособно, не может двигаться и говорит запинаясь.\n\nОно автоматически проваливает спасброски Силы и Ловкости. Броски атаки по нему совершаются с преимуществом.',
    exit2014:
      'Спадает по истечении наложившего эффекта — обычно он короткий (например, до конца следующего хода источника).\n\nЗаклинания, налагающие ошеломление, как правило позволяют цели повторять спасбросок в конце каждого своего хода против СЛ заклинателя. Характеристику спасброска задаёт само заклинание: например, Оглушающий удар монаха — Телосложение, а псионические эффекты — нередко Мудрость.'
  },
  {
    key: 'unconscious',
    name: 'Без сознания',
    desc2014:
      'Существо без сознания недееспособно, не может двигаться или говорить и не осознаёт окружение. Оно роняет всё, что держит, и падает ничком.\n\nОно автоматически проваливает спасброски Силы и Ловкости. Броски атаки по нему совершаются с преимуществом, а любое попадание с расстояния 5 футов — критическое.',
    exit2014:
      'Способ выхода зависит от причины. От ран: существо приходит в себя, восстановив хотя бы 1 хит, или после успешной стабилизации (три успешных спасброска от смерти оставляют его без сознания, но стабильным).\n\nМагический сон (например, «Усыпление») спадает, если существо получает урон или кто-то действием будит его.'
  }
]

// English translations of the 15 core conditions, keyed by the same `key`.
const RAW_EN: RawCondition[] = [
  {
    key: 'blinded',
    name: 'Blinded',
    desc2014:
      "A blinded creature can't see and automatically fails any ability check that requires sight.\n\nAttack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.",
    exit2014:
      "Ends when the effect that caused it ends or its cause is removed (a flash, an eye wound). Magically removed by the «Lesser Restoration» spell.\n\nIf the blindness was imposed by a spell with a save (e.g. «Blindness/Deafness»), the target repeats a Constitution save against the caster's DC at the end of each of its turns, ending the condition on a success."
  },
  {
    key: 'charmed',
    name: 'Charmed',
    desc2014:
      "A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects.\n\nThe charmer has advantage on any ability check to interact socially with the creature.",
    exit2014:
      "Lasts while the effect that caused it lasts and ends when its duration expires; concentration charms (like «Charm Person») end if the caster loses concentration.\n\nMany charms give the target a new Wisdom save against the caster's DC if the charmer harms it. Fully removed by «Greater Restoration»."
  },
  {
    key: 'deafened',
    name: 'Deafened',
    desc2014: "A deafened creature can't hear and automatically fails any ability check that requires hearing.",
    exit2014:
      "Ends when the cause is removed or the effect ends. Magically removed by «Lesser Restoration».\n\nIf imposed by a spell (e.g. «Blindness/Deafness»), the target repeats a Constitution save against the caster's DC at the end of each of its turns, ending it on a success."
  },
  {
    key: 'exhaustion',
    name: 'Exhaustion',
    desc2014:
      'Exhaustion is measured in six levels. Effects are cumulative: a creature suffers all effects of its level and lower.\n\n• Level 1 — disadvantage on ability checks\n• Level 2 — speed halved\n• Level 3 — disadvantage on attack rolls and saving throws\n• Level 4 — hit point maximum halved\n• Level 5 — speed reduced to 0\n• Level 6 — death\n\nIf an exhausted creature gains another level, its level increases.',
    desc2024:
      'Exhaustion is measured in levels (1–6). While a creature has at least 1 level of exhaustion, it suffers the following effects.\n\n• d20 Tests — the creature subtracts a number equal to 2 × its exhaustion level from every d20 Test (attack rolls, ability checks, and saving throws).\n• Speed — the creature\'s speed is reduced by a number of feet equal to 5 × its exhaustion level.\n• Level 6 — death.\n\n(In the 2024 rules the six-level table is replaced by a single scaling penalty.)',
    exit2014:
      'Not removed by saving throws. Each long rest reduces exhaustion by 1 — provided the creature has eaten and drunk. The «Greater Restoration» spell removes one level. The condition ends when exhaustion reaches 0.'
  },
  {
    key: 'frightened',
    name: 'Frightened',
    desc2014:
      "A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.\n\nThe creature can't willingly move closer to the source of its fear.",
    exit2014:
      "Ends when the effect that caused it ends. It also ends if the source of fear leaves the creature's line of sight for a long time (at the GM's discretion).\n\nSpells like «Fear» let the target repeat a Wisdom save against the caster's DC at the end of each of its turns, ending the condition on a success."
  },
  {
    key: 'grappled',
    name: 'Grappled',
    desc2014: "A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed.",
    desc2024:
      "A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed.\n\n• Attacks — the creature has disadvantage on attack rolls against any target other than the grappler.\n• Movement — the grappler can drag or carry the grappled creature, but every foot of movement costs 1 extra foot (unless the creature is Tiny or two or more sizes smaller than the grappler).",
    exit2014:
      "Escaping is NOT a saving throw but an action. The grappled creature uses its action to escape: it makes a Strength (Athletics) or Dexterity (Acrobatics) check — its choice — against the grappler's Strength (Athletics) check (a contest). On a success, the grapple ends.\n\nThe condition also ends if the grappler is incapacitated, or if the creature is moved out of the grappler's reach by an outside effect (e.g. «Thunderwave»).\n\n**Making a grapple.** On the Attack action, a creature replaces one of its attacks with a special melee attack — a grapple (a free hand is required); the target can be at most one size larger. The same Athletics-vs-Athletics/Acrobatics contest is made.",
    exit2024:
      "Escaping is NOT a saving throw but an action. The grappled creature uses its action to escape: it makes a Strength (Athletics) or Dexterity (Acrobatics) check against the grappler's escape DC. On a success the condition ends.\n\nIt also ends if the grappler is incapacitated or if the target is moved out of reach (e.g. pushed away by an effect).\n\n**Making a grapple.** The Unarmed Strike has a «Grapple» option: instead of damage, the creature forces a target (no more than one size larger) to make a Strength or Dexterity save — the target's choice — against an escape DC = **8 + the grappler's Strength modifier + its proficiency bonus**. On a failure the target is Grappled."
  },
  {
    key: 'incapacitated',
    name: 'Incapacitated',
    desc2014: "An incapacitated creature can't take actions or reactions.",
    desc2024:
      "An incapacitated creature has the following effects.\n\n• No Actions — the creature can't take any action, bonus action, or reaction.\n• Concentration — the creature's concentration is broken.\n• No Speech — the creature can't speak.\n• Initiative — if the creature is surprised, it has disadvantage on its initiative roll.",
    exit2014:
      "There's no save or check to end it on your own. It ends only with the effect that caused it. Incapacitation is often part of other conditions («Paralyzed», «Petrified», «Stunned», «Unconscious») and ends along with them."
  },
  {
    key: 'invisible',
    name: 'Invisible',
    desc2014:
      "An invisible creature can't be seen without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured.\n\nAttack rolls against the creature have disadvantage, and its own attack rolls have advantage.",
    desc2024:
      "An invisible creature has the following effects.\n\n• Concealed — the creature isn't seen without the aid of magic or a special sense. Equipment it carries is also concealed.\n• Effects that require sight — the creature isn't subjected to effects that require seeing it unless the source can see it.\n• Attacks — attack rolls against the creature have disadvantage, and its own have advantage. If the creature is somehow seen, it loses these benefits.",
    exit2014:
      "Not removed by a save. Ends when the effect that caused it ends. Some sources (e.g. the «Invisibility» spell) end early — as soon as the creature attacks or casts a spell."
  },
  {
    key: 'paralyzed',
    name: 'Paralyzed',
    desc2014:
      "A paralyzed creature is incapacitated and can't move or speak.\n\nIt automatically fails Strength and Dexterity saving throws. Attack rolls against it have advantage. Any attack that hits it from within 5 feet is a critical hit.",
    exit2014:
      "Ends when the effect that caused it ends. Magically removed by «Lesser Restoration».\n\nIf imposed by a spell (e.g. «Hold Person»), the target repeats a Wisdom save against the caster's DC at the end of each of its turns, ending the condition on a success."
  },
  {
    key: 'petrified',
    name: 'Petrified',
    desc2014:
      "A petrified creature is transformed, along with any nonmagical equipment it's wearing or carrying, into a solid substance. It's incapacitated, unaware of its surroundings, and can't move or speak.\n\nIts weight increases by a factor of ten, and it ceases aging. Attack rolls against it have advantage. It automatically fails Strength and Dexterity saves, has resistance to all damage, and is immune to poison and disease.",
    exit2014:
      "Doesn't end on its own and isn't removed by repeated saves. Removed by powerful magic — e.g. «Greater Restoration». Petrification from a gaze (like a medusa's) often grants an initial Constitution save against the creature's DC, but after a failure requires magical healing."
  },
  {
    key: 'poisoned',
    name: 'Poisoned',
    desc2014: 'A poisoned creature has disadvantage on attack rolls and ability checks.',
    exit2014:
      "Ends when the poison's or ability's duration expires. Magically removed by «Lesser Restoration».\n\nMany poisons and spells (e.g. «Ray of Sickness») let you repeat a Constitution save against the source's DC at the end of each of your turns, ending the condition on a success."
  },
  {
    key: 'prone',
    name: 'Prone',
    desc2014:
      "A prone creature's only movement option is to crawl, unless it stands up, thereby ending the condition.\n\nIt has disadvantage on attack rolls. Attack rolls against it have advantage if the attacker is within 5 feet, and disadvantage otherwise.",
    exit2014:
      "No save or check — the creature simply stands up. Standing up costs half its speed (rounded down). If it doesn't have enough movement left, it can't stand this turn. Once the creature stands, the condition ends."
  },
  {
    key: 'restrained',
    name: 'Restrained',
    desc2014:
      "A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed.\n\nAttack rolls against it have advantage, and its own have disadvantage. It has disadvantage on Dexterity saving throws.",
    exit2014:
      "The way out is set by the specific source:\n\n• «Entangle» — use an action to make a Strength check against the caster's DC;\n• «Web» — a Dexterity save against the caster's DC at the end of each of its turns;\n• ropes, nets, and bonds — a Strength (Athletics) or Dexterity (Acrobatics) check against the item's DC.\n\nOtherwise it ends when the effect that caused it ends."
  },
  {
    key: 'stunned',
    name: 'Stunned',
    desc2014:
      "A stunned creature is incapacitated, can't move, and can speak only falteringly.\n\nIt automatically fails Strength and Dexterity saving throws. Attack rolls against it have advantage.",
    exit2014:
      "Ends when the effect that caused it ends — usually a short one (e.g. until the end of the source's next turn).\n\nSpells that stun usually let the target repeat a save at the end of each of its turns against the caster's DC. The save ability is set by the spell: e.g. the monk's Stunning Strike uses Constitution, while psionic effects often use Wisdom."
  },
  {
    key: 'unconscious',
    name: 'Unconscious',
    desc2014:
      "An unconscious creature is incapacitated, can't move or speak, and is unaware of its surroundings. It drops whatever it's holding and falls prone.\n\nIt automatically fails Strength and Dexterity saving throws. Attack rolls against it have advantage, and any hit from within 5 feet is a critical hit.",
    exit2014:
      "The way out depends on the cause. From wounds: the creature regains consciousness when it recovers at least 1 hit point, or after being stabilized (three successful death saves leave it unconscious but stable).\n\nMagical sleep (e.g. «Sleep») ends if the creature takes damage or someone uses an action to wake it."
  }
]

const pick = (base: string, override?: string): string => override ?? base

const toItems = (src: RawCondition[]): ConditionItem[] =>
  src.map((c) => ({
    key: c.key,
    name: c.name,
    descriptions: [
      { desc: c.desc2014, gamesystem: '5e-2014' },
      { desc: pick(c.desc2014, c.desc2024), gamesystem: '5e-2024' }
    ],
    escape: [
      { desc: c.exit2014, gamesystem: '5e-2014' },
      { desc: pick(c.exit2014, c.exit2024), gamesystem: '5e-2024' }
    ]
  }))

export const FALLBACK_CONDITIONS: ConditionItem[] = toItems(RAW)
const FALLBACK_CONDITIONS_EN: ConditionItem[] = toItems(RAW_EN)

/** Conditions in the requested UI language (defaults to Russian). */
export function conditionsFor(lang: string): ConditionItem[] {
  return lang.startsWith('en') ? FALLBACK_CONDITIONS_EN : FALLBACK_CONDITIONS
}

/** True when the condition's text differs between the 2014 and 2024 rulesets. */
export function conditionDiffers(c: ConditionItem): boolean {
  const a = c.descriptions.find((d) => d.gamesystem === '5e-2014')?.desc
  const b = c.descriptions.find((d) => d.gamesystem === '5e-2024')?.desc
  return Boolean(a && b && a !== b)
}

// Russian names are kept for detecting condition mentions inside RU rules text.
export const CONDITION_NAMES = RAW.map((c) => c.name)

const COND_INDEX = new Map(FALLBACK_CONDITIONS.map((c) => [c.key, c]))
const COND_INDEX_EN = new Map(FALLBACK_CONDITIONS_EN.map((c) => [c.key, c]))

export function conditionByKey(key: string, lang = 'ru'): ConditionItem | undefined {
  return (lang.startsWith('en') ? COND_INDEX_EN : COND_INDEX).get(key)
}
