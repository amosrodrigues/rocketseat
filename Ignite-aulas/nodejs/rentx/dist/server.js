"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const PORT = 3333;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/', routes_1.createCourse);
app.listen(3333, () => console.log(`Rodando na porta ${PORT}`));
