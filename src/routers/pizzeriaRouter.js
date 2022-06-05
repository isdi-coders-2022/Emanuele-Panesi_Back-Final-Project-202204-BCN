const express = require("express");
const path = require("path");
const multer = require("multer");

const {
  getPizzerias,
  deletePizzeria,
  createPizzeria,
} = require("../controllers/pizzeriaControllers");
const auth = require("../server/middlewares/auth");

const upload = multer({
  dest: path.join("uploads", "pizzerias"),
  limits: {
    fileSize: 8000000,
  },
});

const pizzeriaRouter = express.Router();

pizzeriaRouter.get("/list", auth, getPizzerias);
pizzeriaRouter.delete("/:idPizzeria", deletePizzeria);
pizzeriaRouter.post("/", upload.single("image"), createPizzeria);

module.exports = pizzeriaRouter;
