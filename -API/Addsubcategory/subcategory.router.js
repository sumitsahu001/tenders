import express from 'express';
const router = express.Router();
import * as SubCategoryController from './subcategory.controller.js';

router.post("/save", SubCategoryController.save);
router.get("/fetch", SubCategoryController.fetch);
router.delete("/delete", SubCategoryController.deleteSubcategory);
router.patch("/update", SubCategoryController.update);

export default router;
