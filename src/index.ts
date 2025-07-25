import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
mongoose.set('strictQuery', true);

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Usuario_DD:sancocho@delgadodiego.eat0ta1.mongodb.net/?retryWrites=true&w=majority&appName=DelgadoDiego';

app.use(cors());
app.use(express.json());

interface Clothing {
  id?: number;
  name: string;
  type: string;
  size: string;
  color: string;
  price: number;
}

const clothingSchema = new mongoose.Schema<Clothing>({
  name: String,
  type: String,
  size: String,
  color: String,
  price: Number
});

const ClothingModel = mongoose.model('Clothing', clothingSchema);

app.get('/api/clothing', async (req: Request, res: Response) => {

  const clothes = await ClothingModel.find();
  const withTax = clothes.map((item) => ({
    ...item.toObject(),
    priceWithTax: item.price * 1.19
  }));
  res.json(withTax);
});

mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
});