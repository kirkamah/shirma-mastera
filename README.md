<p align="center">
  <img src="brand/logo.svg" alt="no harm org" width="96" height="96">
</p>

<h1 align="center">Ширма Мастера (Master's Screen)</h1>

<p align="center">
  <b>a no harm org project</b> · by <b>Kirkamah</b> ☮<br>
  <sub>© 2026 Kirkamah · no harm org — All rights reserved.</sub>
</p>

---

Десктопное приложение для Мастера D&D 5e: бестиарий с живыми данными Open5e,
интерактивные броски кубиков прямо в стат-блоках, конструктор монстров, состояния,
лор по расам и боковая «Записная книжка» (заметки, трекер инициативы, лог бросков).

**Стек:** Electron + React + TypeScript + Vite, Tailwind CSS, Zustand, i18next,
better-sqlite3 (локальное хранилище), Open5e API v2 (онлайн-данные с кэшем 24 ч).

## Возможности

- **Бестиарий** — русский оффлайн-набор (41 существо) + вкладка Open5e; поиск/фильтры (имя, ПО одним
  диапазонным ползунком, размер, тип, среда, мировоззрение, сортировка), сетка карточек-медальонов,
  стат-блок в официальной вёрстке. Кнопка **«⚔️ В бой»** кидает монстра в трекер инициативы.
- **🎲 Quick Roll** — кубики (`2к6+3`) и бонусы (`+4`) в стат-блоке кликабельны; **Alt** — преимущество,
  **Shift** — помеха; подсветка критов (нат. 20/1), звук броска; СЛ только подсвечивается.
- **Заклинания** — из Open5e, фильтры по уровню и школе, кликабельный урон.
- **Снаряжение** — немагическое: оружие/доспехи/инвентарь/инструменты/снадобья.
- **Опасности** — ловушки, яды, болезни с полной механикой.
- **Столкновения** — конструктор боя с расчётом сложности по бюджету опыта и **автоподбором противников**.
- **Картотека** — создание своих НИП и локаций с произвольными полями.
- **Конструктор монстров** — динамические списки, сохранение в SQLite, экспорт JSON, печать, PDF.
- **Состояния** — все 15, переключение редакций 2014/2024 (разный текст там, где правила различались).
- **Расы** — 29 видов (PHB 2024 + 2014) с лором и реальными именами/городами Forgotten Realms.
- **Мои Монстры** — локальные монстры, импорт из Open5e, правка, удаление.
- **Записная книжка** — многостраничные заметки с вики-связями `[[ ]]`, трекер инициативы (HP,
  концентрация, состояния, **временные эффекты с отсчётом раундов**), лог бросков с избранными формулами.
- **Поиск** — поле в шапке и `Ctrl+K` по монстрам/состояниям/расам.
- **Настройки** — звук, текстура, размер шрифта; бэкап/импорт данных; память размера окна; `Ctrl+B` — книжка.
- **Переключатели** языка (RU/EN) и редакции (2014/2024); выбор сохраняется.
- **Офлайн** — кэш ответов API на 24 ч, индикатор офлайна, возраст кэша.

## Требования

- Node.js 18+ (проверено на 24.15)
- Windows (основная платформа) или macOS

## Установка

> ⚠️ На этой машине (Node 24, без Visual Studio Build Tools) обычный `npm install`
> падает, потому что `better-sqlite3` пытается собраться из исходников под системный Node.
> Для Electron нужна не сборка под Node, а готовый бинарник под ABI Electron. Поэтому:

```powershell
# 1. Установить зависимости без нативной сборки
npm install --ignore-scripts

# 2. Скачать бинарник Electron (его postinstall пропустился на шаге 1)
node node_modules/electron/install.js

# 3. Скачать готовый бинарник better-sqlite3 под ABI Electron (без компилятора)
npx electron-builder install-app-deps
```

На машине с установленными «Desktop development with C++» (Visual Studio Build Tools)
и поддерживаемым Node обычного `npm install` достаточно.

## Запуск (разработка)

```powershell
npm run dev
```

## Сборка установщика Windows (.exe)

```powershell
npm run build      # electron-vite build + electron-builder --win (NSIS)
```

Готовый установщик: `release/Ширма Мастера-<версия>-setup.exe`
(распакованная версия — `release/win-unpacked/Ширма Мастера.exe`).

### Известная проблема сборки: символические ссылки winCodeSign

electron-builder скачивает пакет `winCodeSign`, содержащий macOS-симлинки
(`*.dylib`). На Windows их создание требует прав (режим разработчика или админ),
иначе сборка падает с `Cannot create symbolic link`. Обходной путь без админ-прав —
один раз распаковать пакет, исключив папку `darwin`, в кэш electron-builder:

```powershell
$cache = "$env:LOCALAPPDATA\electron-builder\Cache\winCodeSign"
$7za   = ".\node_modules\7zip-bin\win\x64\7za.exe"
$src   = Get-ChildItem $cache -Filter *.7z | Select-Object -First 1
& $7za x $src.FullName "-o$cache\winCodeSign-2.6.0" -xr!darwin -y
```

После этого `npm run build` проходит. Альтернатива — включить «Режим разработчика» в Windows.

## Архитектура

- `src/main` — процесс Electron: окно, IPC, БД (`db/database.ts`), клиент Open5e с кэшем (`api/open5e.ts`).
  better-sqlite3 синхронный и работает только в main-процессе.
- `src/preload` — `contextBridge` (`window.api.*`), `contextIsolation: true`, `nodeIntegration: false`.
- `src/shared` — общие типы и маппер Open5e v2 → нормализованный стат-блок.
- `src/renderer` — UI: `components`, `pages`, `panels`, `hooks`, `store` (Zustand), `i18n`, `utils`, `data`.

## Источник данных

Данные монстров и состояний — [Open5e API](https://api.open5e.com/) (Open Game License / Creative Commons).

---

<p align="center">
  ☮ <b>no harm org</b> · made by <b>Kirkamah</b><br>
  <sub>© 2026 Kirkamah · no harm org — All rights reserved. See <a href="LICENSE">LICENSE</a>.</sub>
</p>
