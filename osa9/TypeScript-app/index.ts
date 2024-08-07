import express from "express";
const app = express();
import { calculator, Operation } from "./calculator";

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post("/calculate", (req, res) => {
  const { value1, value2, op } = req.body;
  console.log(req.body);

  if (!value1 || isNaN(Number(value1))) {
    console.log(value1);
    return res.status(400).send({ error: "..." });
  }

  const result = calculator(Number(value1), Number(value2), op as Operation);
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
