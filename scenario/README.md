# Папка «scenario» — сценарий обзорного ролика «Ширма Мастера»

Здесь лежит сценарий, по которому снят ролик `..\video\shirma-mastera-tour.mp4`.

## Файлы
- **`Сценарий.md`** — главный документ. 22 сцены: что показывается на экране + закадровый текст дословно, с таймингами и маршрутами (`#/route`).
- **`narration.json`** — те же реплики в машинном виде (id / route / title / text). Используется для пересборки озвучки.

## Как пересобрать ролик (если правишь сценарий)
Скрипты пайплайна — в `..\scripts\`:
1. `node scripts/synth-narration.mjs` — синтез озвучки Piper по `scripts/narration.json` (медленнее, ниже тоном, с паузами) → `video/audio/scene_*.wav` + `scripts/scenes-meta.json`.
2. `node scripts/generate-music.mjs` — генерирует фоновый музыкальный луп `video/audio/music-loop.wav` (royalty-free).
3. `node scripts/record-tour.mjs` — запускает приложение в полноэкранном режиме и записывает экран по сценам (Playwright) → `video/tour/*.webm` + `scripts/timeline.json`.
4. `node scripts/mux.mjs` — сводит видео + озвучку + музыку (с дакингом) → `video/shirma-mastera-tour.mp4`.
   (`node scripts/mux.mjs verify` — только вытащить по кадру на старте каждой сцены для проверки.)

Если меняешь только текст — правь `scripts/narration.json` (рабочая копия) и повтори шаги 1, 3, 4.
Эта папка `scenario/` — читаемая копия для людей; рабочие файлы пайплайна берутся из `scripts/`.
