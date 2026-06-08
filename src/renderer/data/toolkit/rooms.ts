import type { Room } from './types'

// F4 «Модульные комнаты подземелья». Официальный сид (§5.6, source:'official').
export const ROOMS: Room[] = [
  {
    key: 'room-guardpost',
    type: 'room',
    name: 'Сторожевой пост',
    source: 'official',
    tags: ['combat'],
    data: {
      kind: 'guardpost',
      flavor: 'Узкий проход, перекрытый постом охраны.',
      mechanics: '2–4 стража; при тревоге зовут подмогу через 1d4 раунда.',
      hooks: ['ключ от внутренней двери', 'записка с паролем']
    }
  },
  {
    key: 'room-portcullis',
    type: 'room',
    name: 'Ловушка-портикул',
    source: 'official',
    tags: ['trap'],
    data: {
      kind: 'trap',
      flavor: 'Свод с пазами для опускной решётки.',
      mechanics: 'Спасбросок Ловкости DC 13; провал — решётка отрезает часть отряда.'
    }
  },
  {
    key: 'room-fire-jets',
    type: 'room',
    name: 'Зал огненных струй',
    source: 'official',
    tags: ['trap'],
    data: {
      kind: 'trap',
      flavor: 'Пол испещрён закопчёнными отверстиями.',
      mechanics: 'Спасбросок Ловкости DC 14; провал — 3d6 огнём при пересечении.'
    }
  },
  {
    key: 'room-sacrifice',
    type: 'room',
    name: 'Комната жертвоприношений',
    source: 'official',
    tags: ['story'],
    data: {
      kind: 'altar',
      flavor: 'Каменный алтарь в потёках; воздух тяжёлый.',
      hooks: ['незаконченный ритуал', 'пленник у алтаря', 'имя культа на стене']
    }
  },
  {
    key: 'room-ancient-altar',
    type: 'room',
    name: 'Алтарь Древнего',
    source: 'official',
    tags: ['story'],
    data: {
      kind: 'altar',
      flavor: 'Идол неизвестного божества с горящими свечами.',
      hooks: ['благословение ценой тайны', 'реликвия как награда']
    }
  },
  {
    key: 'room-trapped-chest',
    type: 'room',
    name: 'Запертый сундук-ловушка',
    source: 'official',
    tags: ['loot', 'trap'],
    data: {
      kind: 'cache',
      flavor: 'Окованный сундук со свежими царапинами у замка.',
      mechanics: 'Ядовитая игла: спасбросок Телосложения DC 12, провал — 2d4 яда.'
    }
  }
]

// Подписи известных типов комнат (RU/EN); незнакомый kind показывается как есть.
const ROOM_KIND: Record<string, [string, string]> = {
  trap: ['Ловушка', 'Trap'],
  guardpost: ['Сторожевой пост', 'Guard post'],
  altar: ['Алтарь', 'Altar'],
  cache: ['Тайник', 'Cache'],
  gallery: ['Галерея', 'Gallery'],
  sunken: ['Затопленное', 'Sunken']
}
export function roomKindLabel(kind: string, lang: string): string {
  const e = ROOM_KIND[kind]
  return e ? e[lang.startsWith('en') ? 1 : 0] : kind
}
