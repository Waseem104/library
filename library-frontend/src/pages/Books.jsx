import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmModal from "../Components/Modal/ConfirmModal";

const Books = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/books/get-all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setBooks(data.books);
      } else {
        data.message || "failed to fetch books";
      }
    } catch {
      // console.log("error in fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/books/delete-book/${bookToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data?.success) {
        fetchBooks();
        setBookToDelete(null);
        setShowModal(false);
      }
    } catch {
      // console.log("error in fetching books");
    }
  };

  const handleEdit = (book) => {
    navigate("/add-book", { state: { book } });
  };

  const openDeleteModal = (bookId) => {
    setBookToDelete(bookId);
    setShowModal(true);
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Our Books</h2>
      {books.length === 0 ? (
        <p className="text-center text-danger">No Books Found</p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div className="col-12 col-md-4 col-lg-2 g-3 mb-4" key={book._id}>
              <div className="card shadow-sm h-100">
                <img
                  className="card-img-top img-fluid"
                  src={`${import.meta.env.VITE_API_URL}/${book.image}`}
                  alt={book.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle">{book.author}</h6>
                  <p className="card-text">{book.publishedYear}</p>
                  <p>{book.available ? "Available" : "Out Of Stock"}</p>
                  {user && book.user === user._id && (
                    <div className="d-flex justify-content-between">
                      <button
                        onClick={() => handleEdit(book)}
                        className="btn btn-link text-success p-0"
                        title="Edit"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(book._id)}
                        className="btn btn-link text-danger p-0"
                        title="Delete"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* confirm modal */}
      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Delete Book"
        body="Are you sure you want to delete this book"
      />
    </div>
  );
};

export default Books;
