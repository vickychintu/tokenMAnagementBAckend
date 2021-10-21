const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(PORT, () => {
  //   debug(`App listening at http://localhost:${PORT}`);
  console.info(`App listening at http://localhost:${PORT}`);
});
