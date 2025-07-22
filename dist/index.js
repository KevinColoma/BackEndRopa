"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.set('strictQuery', true);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Usuario_DD:sancocho@delgadodiego.eat0ta1.mongodb.net/?retryWrites=true&w=majority&appName=DelgadoDiego';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const clothingSchema = new mongoose_1.default.Schema({
    name: String,
    type: String,
    size: String,
    color: String,
    price: Number
});
const ClothingModel = mongoose_1.default.model('Clothing', clothingSchema);
app.get('/api/clothing', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clothes = yield ClothingModel.find();
    const withTax = clothes.map((item) => (Object.assign(Object.assign({}, item.toObject()), { priceWithTax: item.price * 1.19 })));
    res.json(withTax);
}));
mongoose_1.default.connect(MONGO_URI).then(() => {
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
});
