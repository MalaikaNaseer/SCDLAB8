const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());


app.post("/events", (req, res) => {
    res.status(201).json({ message: "Event created" });
});


if (process.env.NODE_ENV !== "test") {
    app.listen(3000, () => console.log("Server running on port 3000"));
}

module.exports = app;
