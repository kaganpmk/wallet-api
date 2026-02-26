import express from 'express'
import dotenv from "dotenv"
import { initDB } from './src/config/db.js';
import rateLimiter from './src/middleware/rateLimiter.js';
import transactionsRoute from './src/routes/transactionsRoute.js';

dotenv.config();
const app = express()

app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;
app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT,() => {
        console.log("Server is up and running ng PORT:", PORT);
    })
})