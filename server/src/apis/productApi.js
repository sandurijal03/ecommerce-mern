import { Router } from 'express';
import productCtrl from '../controllers/productCtrl';

const router = Router();

router
  .route('/products')
  .get(productCtrl.getProducts)
  .post(productCtrl.createProduct);

router
  .route('/products/:id')
  .put(productCtrl.updateProduct)
  .delete(productCtrl.deleteProduct);

export default router;
