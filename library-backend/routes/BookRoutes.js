import express from "express";
import multer from "multer";
import {
  addBookController,
  deleteBookController,
  editBookController,
  getAllBooksController,
} from "../controllers/BookController.js";
import { authMiddleware } from "../middlewares/authMIddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const bookRouter = express.Router();

// multer setup for file upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const uploads = multer({ storage });

bookRouter.get("/get-all", getAllBooksController);

bookRouter.post(
  "/add-book",
  authMiddleware,
  authorizeRoles("author"),
  uploads.single("image"),
  addBookController
);
bookRouter.put(
  "/edit-book/:id",
  authMiddleware,
  authorizeRoles("author"),
  uploads.single("image"),
  editBookController
);

bookRouter.delete(
  "/delete-book/:id",
  authMiddleware,
  authorizeRoles("author"),
  deleteBookController
);

export default bookRouter;
