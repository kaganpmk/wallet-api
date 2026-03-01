import express from "express";
import {getTransactionsByUserId, createTransaction, deleteTransaction, getSummaryByUserId} from "../controllers/transactionsController.js";
import rateLimiter from './middleware/rateLimiter.js';

const router = express.Router();

router.use(rateLimiter);

router.get("/:userId", getTransactionsByUserId);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);
router.get("/summary/:userId", getSummaryByUserId);

export default router;