// Glossary terms shown in popups when their «…» reference is clicked from a
// statblock or feature description. Used for class resources that aren't spells
// or conditions — metamagic options, eldritch invocations, etc.

export interface GlossaryTerm {
  /** Canonical display name. */
  name: string
  /** Category shown in the popup header, e.g. "Метамагия", "Воззвание". */
  category: string
  /** Short source tag, e.g. "PHB 2014 — Чародей". */
  source?: string
  /** Mechanical description; supports DiceText markup. */
  desc: string
  /** Lowercased alternate names used in bestiary descriptions. The popup is
   *  opened by any of them. */
  aliases?: string[]
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ---------- Метамагия (Sorcerer) ----------
  {
    name: 'Ускорение заклинания',
    category: 'Метамагия',
    source: 'Чародей',
    desc:
      'Тратя **2 очка чародейства**, чародей превращает заклинание со временем «1 действие» в заклинание, сотворяемое **бонусным действием**. Полезно, чтобы успеть наложить заговор после действия атаки или связать два заклинания за один ход.',
    aliases: ['ускорение', 'ускоренное заклинание', 'quickened spell']
  },
  {
    name: 'Высшее заклинание',
    category: 'Метамагия',
    source: 'Чародей',
    desc:
      'Тратя **3 очка чародейства**, чародей вынуждает цель его заклинания совершить спасбросок **с помехой**. Эффект применяется к первому спасброску заклинания и работает только против одной цели.',
    aliases: ['высшее', 'heightened spell']
  },
  {
    name: 'Усиленное заклинание',
    category: 'Метамагия',
    source: 'Чародей',
    desc:
      'Тратя **1 очко чародейства**, чародей перебрасывает до **{Хар} костей урона** одного заклинания (минимум 1). Использует новые результаты.',
    aliases: ['усиленное', 'empowered spell']
  },
  {
    name: 'Тонкое заклинание',
    category: 'Метамагия',
    source: 'Чародей',
    desc:
      'Тратя **1 очко чародейства**, чародей накладывает заклинание **без вербальных и соматических компонентов**. Полезно, когда чародей связан, в плену или хочет колдовать незаметно.',
    aliases: ['тонкое', 'subtle spell']
  },
  {
    name: 'Незаметное заклинание',
    category: 'Метамагия',
    source: 'Чародей',
    desc:
      'Тратя **1 очко чародейства**, чародей маскирует знаки колдовства: заклинание не дёт визуальных или звуковых эффектов сверх собственного результата.',
    aliases: ['незаметное', 'careful spell']
  },
  {
    name: 'Дальнобойное заклинание',
    category: 'Метамагия',
    source: 'Чародей',
    desc:
      'Тратя **1 очко чародейства**, чародей удваивает дистанцию заклинания (или меняет «касание» на 30 фт.).',
    aliases: ['дальнобойное', 'distant spell']
  },
  {
    name: 'Длительное заклинание',
    category: 'Метамагия',
    source: 'Чародей',
    desc:
      'Тратя **1 очко чародейства**, чародей удваивает длительность заклинания (макс. 24 часа).',
    aliases: ['длительное', 'extended spell']
  },
  {
    name: 'Близнецовое заклинание',
    category: 'Метамагия',
    source: 'Чародей',
    desc:
      'Тратя очки чародейства, равные уровню заклинания (минимум 1), чародей направляет одноцелевое заклинание сразу на **двух существ**, находящихся в пределах дистанции.',
    aliases: ['близнецовое', 'twinned spell']
  },

  // ---------- Воззвания (Eldritch Invocations, Warlock) ----------
  {
    name: 'Мучительный заряд',
    category: 'Воззвание',
    source: 'Колдун · Воззвание',
    desc:
      'Требует заговор **«Мистический заряд»**. Когда колдун попадает им по цели, к броску урона за каждый луч прибавляется **модификатор Харизмы**.',
    aliases: ['мучительный', 'agonizing blast', 'agonising blast']
  },
  {
    name: 'Отталкивающий заряд',
    category: 'Воззвание',
    source: 'Колдун · Воззвание',
    desc:
      'Требует заговор **«Мистический заряд»**. При попадании лучом колдун может оттолкнуть цель **по прямой на 10 фт.** от себя.',
    aliases: ['отталкивающий', 'repelling blast']
  },
  {
    name: 'Дьявольское зрение',
    category: 'Воззвание',
    source: 'Колдун · Воззвание',
    desc:
      'Колдун получает **тёмное зрение на 120 фт.**, способное пробивать **магическую тьму**.',
    aliases: ['devil\'s sight', 'devils sight']
  },
  {
    name: 'Маска множества лиц',
    category: 'Воззвание',
    source: 'Колдун · Воззвание',
    desc:
      'Колдун может **по желанию** колдовать заклинание **«Маскировка»** (Disguise Self) без затраты ячейки.',
    aliases: ['маска лиц', 'mask of many faces']
  },
  {
    name: 'Жажда клинка',
    category: 'Воззвание',
    source: 'Колдун · Воззвание',
    desc:
      'Колдун может выбрать **оружие как свой колдовской фокус** и использовать заклинания через него. У владельцев Договора Клинка это даёт +1 к атакам выбранным оружием.',
    aliases: ['жажда', 'thirsting blade', 'pact of the blade']
  },
  {
    name: 'Помыслы кадавра',
    category: 'Воззвание',
    source: 'Колдун · Воззвание',
    desc:
      'Колдун может **колдовать «Разговор с мёртвыми»** по желанию без затраты ячейки.',
    aliases: ['помыслы', 'speak with dead']
  },
  {
    name: 'Воспоминания об ужасе',
    category: 'Воззвание',
    source: 'Колдун · Воззвание',
    desc:
      'Колдун получает **преимущество на броски атаки против испуганных существ**.',
    aliases: ['воспоминания', 'ascendant step']
  },
  {
    name: 'Книга древних тайн',
    category: 'Воззвание',
    source: 'Колдун · Воззвание',
    desc:
      'Только для Договора Фолианта. Колдун может вписывать в свою книгу **ритуальные заклинания** любого класса и колдовать их как ритуалы.',
    aliases: ['книга тайн', 'book of ancient secrets']
  },
  {
    name: 'Туманный побег',
    category: 'Воззвание',
    source: 'Колдун · Воззвание',
    desc:
      'Когда колдун получает урон, он реакцией становится **невидимым** и **телепортируется до 60 фт.** в видимое свободное пространство. Невидимость спадает в начале его следующего хода или когда он атакует/колдует. **1 раз/короткий или длинный отдых**.',
    aliases: ['туманный', 'misty escape']
  }
]

const GLOSSARY_INDEX = new Map<string, GlossaryTerm>()
for (const t of GLOSSARY_TERMS) {
  GLOSSARY_INDEX.set(t.name.trim().toLowerCase(), t)
  for (const alias of t.aliases ?? []) {
    const k = alias.trim().toLowerCase()
    if (!GLOSSARY_INDEX.has(k)) GLOSSARY_INDEX.set(k, t)
  }
}

export function glossaryByName(name: string): GlossaryTerm | undefined {
  return GLOSSARY_INDEX.get(name.trim().toLowerCase())
}
