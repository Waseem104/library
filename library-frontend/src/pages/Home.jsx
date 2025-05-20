import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";

const Home = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <h1 className="display-4 fw-bold mb-3">Welcome to LibraryX</h1>
          <p className="lead text-muted">
            Discover, borrow, and manage your favorite books with ease. Our digital
            library platform is designed for book lovers, students, and lifelong
            learners.
          </p>
          <ul className="list-unstyled mt-4">
            <li className="mb-2 d-flex align-items-center">
              <BsCheckCircleFill className="text-success me-2" />
              1000+ Books Available
            </li>
            <li className="mb-2 d-flex align-items-center">
              <BsCheckCircleFill className="text-success me-2" />
              Easy Borrow & Return
            </li>
            <li className="mb-2 d-flex align-items-center">
              <BsCheckCircleFill className="text-success me-2" />
              Personalized Recommendations
            </li>
          </ul>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
            alt="Library"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
