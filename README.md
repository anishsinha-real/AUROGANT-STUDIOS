# AURØGANT STUDIO — Complete Website

This build links the public site, product catalog, design studio, cart, checkout, orders, optional Razorpay payments, support forms and admin order dashboard.

## Project

- `frontend/` — GitHub Pages/static frontend
- `backend/` — Node.js + Express API
- `frontend/data/products.js` — 22-product source of truth
- `frontend/assets/products/` — supplied product mockups

## Local development

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

The API runs on `http://localhost:5000`.

### Frontend

Serve `frontend/` with VS Code Live Server or another static server. The default API URL is `http://localhost:5000/api`.

If your backend uses another URL, set it in `frontend/js/app.js` or use:

```js
localStorage.setItem('aur_api_base', 'https://YOUR-BACKEND-DOMAIN/api');
```

## Live deployment

GitHub Pages can host the frontend, but it cannot run the Node backend. Deploy `backend/` to a Node host such as Render/Railway/Fly.io and point `frontend/js/app.js` at that API URL.

For Razorpay, set:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

For admin access, set:

- `ADMIN_KEY`

For MongoDB persistence, set:

- `MONGODB_URI`

Without MongoDB, orders are persisted in `backend/data/orders.json`.

## Important

Do not commit real `.env` secrets to GitHub.
