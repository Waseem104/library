import { handleError } from "../helper/handleError.js";
import Book from "../models/Book.js";

export const getAllBooksController = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length > 0) {
      return res.status(200).json({
        message: "Successfully fetched all books",
        success: true,
        books: books,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No Books Found", success: false });
    }
  } catch (error) {
    return handleError(res, error, "getAllBooksController");
  }
};
export const addBookController = async (req, res) => {
  try {
    const { title, author, publishedYear, available } = req.body;

    // check yhe uploaded image
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Image file is required", success: false });
    }

    const newBook = await new Book({
      title,
      author,
      publishedYear,
      available,
      user: req.user._id,
      image: req.file?.path.replace(/\\/g, "/"),
    }).save();
    return res.status(201).json({
      message: "book created successfully",
      success: true,
      book: newBook,
    });
  } catch (error) {
    return handleError(res, error, "addBookController");
  }
};

export const editBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishedYear, available } = req.body;

    const updatedData = { title, author, publishedYear, available };
    // if a new image is uploaded, update the image path
    if (req.file) {
      updatedData.image = req.file?.path.replace(/\\/g, "/");
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    }
    return res.status(200).json({
      message: "Book updated successfully",
      success: true,
      book: updatedBook,
    });
  } catch (error) {
    return handleError(res, error, "editBookController");
  }
};

export const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res
        .status(404)
        .json({ message: "book not found", success: false });
    }
    return res.status(200).json({
      message: "Book deleted successfully",
      success: true,
      book: deletedBook,
    });
  } catch (error) {
    return handleError(res, error, "deleteBookController");
  }
};

export const getBookByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    // check if the book exists
    // if the book is not found, return a 404 error
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    }

    return res.status(200).json({
      message: "Book fetched successfully",
      success: true,
      book: book,
    });
  } catch (error) {
    return handleError(res, error, "getBookByIdController");
  }
};
