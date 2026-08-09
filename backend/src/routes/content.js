import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentFile = path.resolve(__dirname, '../../data/subscribers.json');
const contactFile = path.resolve(__dirname, '../../data/messages.json');
async function append(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  let rows = [];
  try { rows = JSON.parse(await fs.readFile(file, 'utf8')); } catch {}
  rows.unshift(data);
  await fs.writeFile(file, JSON.stringify(rows, null, 2));
}
router.post('/subscribe', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ success: false, message: 'Enter a valid email.' });
  await append(contentFile, { email, createdAt: new Date().toISOString() });
  res.json({ success: true, message: 'Subscribed successfully.' });
});
router.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
  await append(contactFile, { name, email, phone: phone || '', message, createdAt: new Date().toISOString() });
  res.json({ success: true, message: 'Message received.' });
});
export default router;
