import express from 'express';

const router = express.Router();

const PRODUCTS = [
  ['UH62','AUR-UH62','Oversized Hoodie','Hoodies',999],
  ['UA30','AUR-UA30','Acid Wash Oversized Tee','Oversized T-Shirts',799],
  ['UA26','AUR-UA26','Heavy Oversized Tee','Oversized T-Shirts',749],
  ['FC32','AUR-FC32','Classic Regular Fit T-Shirt','Regular T-Shirts',449],
  ['UH38','AUR-UH38','Premium Pullover Hoodie','Hoodies',899],
  ['UH83','AUR-UH83','Heavyweight Zip Hoodie','Hoodies',1099],
  ['UH32','AUR-UH32','Classic Sweatshirt','Hoodies',799],
  ['UH35','AUR-UH35','Oversized Sweatshirt','Hoodies',899],
  ['UH26','AUR-UH26','Lightweight Hoodie','Hoodies',699],
  ['UJ31','AUR-UJ31','Varsity Jacket','Jackets',1299],
  ['UC61','AUR-UC61','Classic Oversized Tee','Oversized T-Shirts',549],
  ['UA22','AUR-UA22','Essential Oversized Tee','Oversized T-Shirts',499],
  ['UB73','AUR-UB73','Premium Joggers','Bottomwear',699],
  ['UC21','AUR-UC21','Classic Cotton Tee','Regular T-Shirts',395],
  ['MP25','AUR-MP25','Male Polo','Polo',599],
  ['UC28','AUR-UC28','Oversized Classic Shirt','Shirts',799],
  ['UR37','AUR-UR37','Raglan T-Shirt','Raglan',449],
  ['UR50','AUR-UR50','Premium Raglan T-Shirt','Raglan',499],
  ['UR39','AUR-UR39','Ringer T-Shirt','Ringer',449],
  ['UC23','AUR-UC23','Supima T-Shirt','Supima',699],
  ['UT58','AUR-UT58','Tie & Dye Oversized T-Shirt','Tie Dye',599],
  ['UV34','AUR-UV34','V-Neck T-Shirt','V Neck',449]
].map(([code, sku, name, category, salePrice], i) => ({
  id: i + 1, code, sku, name, category, salePrice,
  mockup: `/assets/products/${code}.png`
}));

router.get('/', (_req, res) => res.json({ success: true, products: PRODUCTS }));
router.get('/:code', (req, res) => {
  const product = PRODUCTS.find(p => p.code.toLowerCase() === req.params.code.toLowerCase());
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product });
});

export { PRODUCTS };
export default router;
