# Сборка версии для macOS

«Ширма Мастера» — Electron-приложение, поэтому под macOS оно работает, но
**собрать .app можно только на macOS** (нативный модуль базы `better-sqlite3`
надо пересобрать под целевой Mac). На Windows это не собрать.

Целевая система: **macOS 11 Big Sur и новее** (у получателя 11.7.10 — подходит).

> **Важно (почему прошлый раз не запускалось).** Сборка делается **отдельно под
> каждую архитектуру на своём раннере**, иначе `better-sqlite3` попадает не той
> архитектуры и приложение падает при запуске:
> - **Intel (x64)** собирается на раннере `macos-13`;
> - **Apple Silicon (arm64)** — на `macos-14`.
> Плюс `.app` **ad-hoc подписывается** (`scripts/afterPack.cjs`) — без этого
> неподписанный arm64-бинарник macOS вообще не запускает.

Иконка macOS лежит в `build/icon.icns` (генерируется `npm run icon:mac`).

---

## Путь A — облачная сборка через GitHub Actions (без своего Mac)

1. Создай репозиторий на GitHub и залей туда проект:
   ```bash
   cd C:\projects\shirma-mastera
   git init
   git add .
   git commit -m "Ширма Мастера"
   git branch -M main
   git remote add origin https://github.com/<твой-аккаунт>/shirma-mastera.git
   git push -u origin main
   ```
   > `node_modules`, `out`, `release` пушить не нужно — проверь `.gitignore`.
2. На GitHub: вкладка **Actions** → workflow **«Build macOS app»** → **Run workflow**.
3. Через ~10 минут в завершённом запуске будет **два** артефакта:
   - **`shirma-mastera-mac-x64`** — для Mac на процессоре Intel;
   - **`shirma-mastera-mac-arm64`** — для Mac на Apple Silicon (M1/M2/M3…).
   Внутри каждого — `.zip` с приложением.
4. Узнать архитектуру Mac товарища: меню Apple → **«Об этом Mac»**. Если
   «Чип Apple M…» → бери **arm64**; если «Процессор Intel» → **x64**.
5. Передай товарищу нужный `.zip`.

(Workflow лежит в `.github/workflows/build-mac.yml`.)

---

## Путь B — сборка на «живом» Mac

На самом Маке (Node 20+) собери под ЕГО архитектуру:
```bash
npm install
npx electron-vite build
npx electron-builder --mac --arm64   # или --x64 на Intel-маке
```
Готовый `.zip` появится в `release/`.

---

## Как товарищу открыть неподписанное приложение

1. Распаковать `.zip`, перетащить «Ширма Мастера» в «Программы».
2. Запускать **не двойным кликом**, а: правый клик по иконке → **«Открыть»** →
   в окне предупреждения снова **«Открыть»**.
3. Если macOS пишет «повреждено/не удаётся проверить», в Терминале:
   ```bash
   xattr -dr com.apple.quarantine "/Applications/Ширма Мастера.app"
   ```

---

## Заметки

- Подпись и нотаризация Apple (запуск двойным кликом без предупреждений) требуют
  аккаунт Apple Developer ($99/год) — для передачи другу не обязательно.
- Данные приложения на macOS: `~/Library/Application Support/Ширма Мастера`.
- Код кроссплатформенный (база, Open5e API, экспорт PDF) — особой адаптации не нужно.
