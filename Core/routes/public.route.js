import express from "express";
import publicController from "../controllers/public.controller"
const router = express.Router()

router.get('/static-content', (req, res) => {
    
    publicController.getStaticContent(req, res);
});


router.get('/categories', (req, res) => {
    
    publicController.getCategories(req, res);
});

router.get('/alerts', (req, res) => {
    
    publicController.getAlerts(req, res);
});

export default router;