# Конструктор резюме и портфолио

Веб-приложение: форма профиля, генерация текста резюме через **Google Gemini**, предпросмотр в нескольких шаблонах, светлая/тёмная тема, экспорт в PDF.

## Требования

- Node.js 18+
- Ключ [Google AI Studio](https://aistudio.google.com/apikey) (Gemini API)

## Установка

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Скопируйте `.env.example` в `.env` в корне проекта и укажите ключ:

```
GEMINI_API_KEY=ваш_ключ
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
```

## Запуск (разработка)

```bash
npm run dev
```

- Клиент: http://localhost:5173  
- API: http://localhost:3001  

## Сборка и production

```bash
npm run build
npm start
```

Сервер отдаёт статику из `client/dist` и API на `/api`.

## Возможности

- Фото, контакты, опыт, навыки, образование, языки, дата рождения
- Кнопка «Сгенерировать описание» — summary и сильные стороны от Gemini
- Шаблоны: Classic, Modern, Portfolio
- Переключение светлой и тёмной темы
- Скачивание PDF

Черновик сохраняется в `localStorage` браузера.
