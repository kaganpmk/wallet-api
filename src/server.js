import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import { initDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from './routes/transactionsRoute.js';

dotenv.config();
const app = express()

app.use(cors());
app.use(rateLimiter);
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Wallet API is Live! 🚀");
});

const PORT = process.env.PORT || 5001;
app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT, '0.0.0.0',() => {
        console.log("Server is up and running ng PORT:", PORT);
    })
})