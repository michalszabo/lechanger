import express from "express";

import statsController from "../controllers/stats.controller";

const router = express.Router();

/* GET stats */
router.get("/", statsController.getStats);

export default router;
