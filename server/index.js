const express = require("express");
const cors = require("cors");

const PORT = 3000;
const injectedScripts = [];

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.get("/injected-scripts", (req, res) => {
  res.render("injected_scripts", { injectedScripts });
});

app.post("/injected-scripts", (req, res) => {
  const { href, src, script } = req.body;

  if (!(href && src && script)) {
    res.status(400).send({ message: "Missing an expected field." });
    return;
  }

  injectedScripts.push({ href, src, script, timestamp: Date.now() });
  res.status(200).send({ message: "Data received successfully." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
