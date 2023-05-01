import express, { Request, Response } from "express";
import cors from 'cors';
import { sampleProd } from './data';

const app = express();
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)
app.get("/api/products", (req: Request, res: Response) => {
    res.json(sampleProd);
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
})
