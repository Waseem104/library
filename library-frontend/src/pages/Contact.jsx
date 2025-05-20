import React from "react";
import { MdEmail, MdPhone } from "react-icons/md";

const Contact = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h2 className="mb-4 text-center">Contact Us</h2>
              <p className="text-muted text-center mb-4">
                Have questions or feedback? We'd love to hear from you!
              </p>
              <form>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Type your message..."
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
              <div className="mt-4 text-center">
                <span className="me-3">
                  <MdEmail className="text-primary fs-5 mb-1" />{" "}
                  support@libraryx.com
                </span>
                <span>
                  <MdPhone className="text-primary fs-5 mb-1" /> +91 98765 43210
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
