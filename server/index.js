import express, { json } from "express";
import cors from "cors";

const PORT = 3000;

const app = express();

app.use(json());

app.use(cors({ origin: true, credentials: true }));

app.post("/log", (req, res) => {
  const { src, script } = req.body;
  console.log(`Got injected script: src="${src}" script="${script}"`);
  res.status(200).send({ message: "Data received successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
