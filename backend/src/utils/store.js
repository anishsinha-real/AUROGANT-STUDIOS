import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../../data');
const FILE = path.join(DATA_DIR, 'orders.json');

async function ensure() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try { await fs.access(FILE); } catch { await fs.writeFile(FILE, '[]', 'utf8'); }
}

export async function readOrders() {
  await ensure();
  return JSON.parse(await fs.readFile(FILE, 'utf8'));
}

export async function writeOrders(orders) {
  await ensure();
  await fs.writeFile(FILE, JSON.stringify(orders, null, 2), 'utf8');
}

export async function createOrder(order) {
  const orders = await readOrders();
  orders.unshift(order);
  await writeOrders(orders);
  return order;
}

export async function findOrder(id) {
  return (await readOrders()).find(o => o.id === id);
}

export async function updateOrder(id, patch) {
  const orders = await readOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index < 0) return null;
  orders[index] = { ...orders[index], ...patch, updatedAt: new Date().toISOString() };
  await writeOrders(orders);
  return orders[index];
}
