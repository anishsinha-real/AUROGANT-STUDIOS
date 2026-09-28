import express from 'express';
import { readOrders, updateOrder } from '../utils/store.js';

const router = express.Router();
const guard = (req, res, next) => {
  const key = process.env.ADMIN_KEY;
  if (!key) return res.status(503).json({ success: false, message: 'Admin authentication is not configured.' });
  if (req.headers['x-admin-key'] !== key) return res.status(401).json({ success: false, message: 'Unauthorized' });
  next();
};
router.use(guard);
router.get('/orders', async (_req, res) => res.json({ success: true, orders: await readOrders() }));
router.patch('/orders/:id', async (req, res) => {
  const allowed = ['status', 'paymentStatus', 'tracking'];
  const patch = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
  const valid=['payment_pending','payment_failed','confirmed','processing','shipped','delivered','cancelled'];
  if(patch.status&&!valid.includes(patch.status)) return res.status(400).json({success:false,message:'Invalid order status.'});
  const order = await updateOrder(req.params.id, {...patch,updatedAt:new Date().toISOString()});
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, order });
});
export default router;