import express from "express";

const app = express();

const PORT = 5005;

app.get("/", (req, res) => {
  res.send("Hello there!!!");
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
