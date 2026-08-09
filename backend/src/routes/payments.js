import express from 'express';
import crypto from 'crypto';

const router = express.Router();

router.post('/create', async (req, res) => {
  const { amount, receipt } = req.body;
  if (!amount || Number(amount) <= 0) return res.status(400).json({ success: false, message: 'Invalid amount.' });

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return res.json({ success: true, mode: 'demo', keyId: null, orderId: `demo_${Date.now()}`, amount: Math.round(Number(amount) * 100), currency: 'INR' });
  }

  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST', headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: Math.round(Number(amount) * 100), currency: 'INR', receipt: receipt || `aur_${Date.now()}` })
  });
  const data = await response.json();
  if (!response.ok) return res.status(502).json({ success: false, message: data.error?.description || 'Razorpay order creation failed.' });
  res.json({ success: true, mode: 'live', keyId: process.env.RAZORPAY_KEY_ID, orderId: data.id, amount: data.amount, currency: data.currency });
});

router.post('/verify', (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  if (!process.env.RAZORPAY_KEY_SECRET) return res.json({ success: true, verified: true, mode: 'demo' });
  const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex');
  res.json({ success: true, verified: expected === signature });
});

export default router;
