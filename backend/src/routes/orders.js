import express from 'express';
import crypto from 'crypto';
import { createOrder, findOrder } from '../utils/store.js';

const router = express.Router();
const id = () => `AUR-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

router.post('/', async (req, res) => {
  try {
    const { customer, items, totals, paymentMethod = 'cod' } = req.body;
    if (!customer?.name || !customer?.phone || !customer?.address || !Array.isArray(items) || !items.length) {
      return res.status(400).json({ success: false, message: 'Customer details and at least one item are required.' });
    }
    const order = await createOrder({
      id: id(), customer, items, totals, paymentMethod,
      status: 'pending', paymentStatus: paymentMethod === 'cod' ? 'pending' : 'created',
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    });
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const order = await findOrder(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, order });
});

export default router;
