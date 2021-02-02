import { Router } from 'express';

import categoryCtrl from '../controllers/categoryCtrl';
import auth from '../middleware/auth';
import authAdmin from '../middleware/authAdmin';

const router = Router();

router
  .route('/category')
  .get(categoryCtrl.getCategories)
  .post(auth, authAdmin, categoryCtrl.createCategory);

router
  .route('/category/:id')
  .delete(auth, authAdmin, categoryCtrl.deleteCategory)
  .put(auth, authAdmin, categoryCtrl.updateCategory);

export default router;
