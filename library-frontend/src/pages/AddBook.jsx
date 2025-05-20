import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const AddBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingBook = location.state?.book || null;

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    editingBook ? `${import.meta.env.VITE_API_URL}/${editingBook?.image}` : null
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    publishedYear: Yup.number()
      .typeError("publish year must be number")
      .required("Publish year is required"),
    available: Yup.boolean().oneOf([true], "Availability must be checked"),
  });

  const formik = useFormik({
    initialValues: {
      title: editingBook ? editingBook.title : "",
      author: editingBook ? editingBook.author : "",
      publishedYear: editingBook ? editingBook.publishedYear : "",
      available: editingBook ? editingBook.available : false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!image && !editingBook) {
          toast.error("Image is required");
          return;
        }

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("author", values.author);
        formData.append("publishedYear", values.publishedYear);
        formData.append("available", values.available);
        // Only append image if a new file is selected
        if (image) {
          formData.append("image", image);
        }

        let url, method;
        if (editingBook) {
          url = `${import.meta.env.VITE_API_URL}/api/books/edit-book/${
            editingBook._id
          }`;
          method = axios.put;
        } else {
          url = `${import.meta.env.VITE_API_URL}/api/books/add-book`;
          method = axios.post;
        }
        const { data } = await method(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data?.success) {
          toast.success(data?.message);
          setImage(null);
          setPreview(null);
          resetForm();
          navigate("/books");
        } else {
          toast.error(data?.message);
        }
      } catch {
        // console.log("error in handleSubmit add book:", error.message);
        // toast.error(error?.response?.data?.message || "Registration failed");
      }
    },
  });

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="w-100 w-sm-75 w-md-50 w-lg-25 p-4 shadow">
        <h2 className="text-center">
          {editingBook ? "Edit Book" : "Add Book"}
        </h2>
        <form
          className="mt-4 d-flex flex-column justify-content-center"
          onSubmit={formik.handleSubmit}
        >
          {preview && (
            <div>
              <img
                src={preview}
                alt="Selected"
                style={{
                  maxHeight: "200px",
                  borderRadius: "10px",
                }}
              />
            </div>
          )}
          <div>
            <label>Upload Image</label>
            <input
              name="image"
              type="file"
              className="form-control"
              accept="image/"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size > 1024 * 1024) {
                  alert("Image Size Should be less than 1MB");
                  return;
                }
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </div>
          <div className="mb-2">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter book Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-danger small">{formik.errors.title}</div>
            )}
          </div>
          <div className="mt-2">
            <label>Author</label>
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder="Enter author name"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.author && formik.errors.author && (
              <div className="text-danger small">{formik.errors.author}</div>
            )}
          </div>
          <div className="mt-2">
            <label>Publish Year</label>
            <input
              type="number"
              name="publishedYear"
              className="form-control"
              placeholder="Enter Publish Year"
              value={formik.values.publishedYear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.publishedYear && formik.errors.publishedYear && (
              <div className="text-danger small">
                {formik.errors.publishedYear}
              </div>
            )}
          </div>

          <div className="form-check mb-4 mt-2">
            <input
              type="checkbox"
              name="available"
              value={formik.values.available}
              className="form-check-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="available"
            />
            <label className="form-check-label" htmlFor="available">
              Available
            </label>
            {formik.touched.available && formik.errors.available && (
              <div className="text-danger small">{formik.errors.available}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            {editingBook ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
