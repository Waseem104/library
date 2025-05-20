import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Register = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("password is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/public/register`,
          values
        );
        if (data.success) {
          localStorage.setItem("token", data.token);
          setUser(data.user);
          setTimeout(() => {
            navigate("/");
          }, 200);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch {
        // console.log("error in handleSubmit:", error.message);
        // toast.error(error?.response?.data?.message || "registration failed");
      }
    },
  });
  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="w-100 w-sm-75 w-md-50 w-lg-25 p-4 shadow">
        <h2 className="text-center">Register</h2>
        <form
          className="mt-4 d-flex flex-column justify-content-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              cd
              placeholder="Enter your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-danger small">{formik.errors.name}</div>
            )}
          </div>
          <div className="mt-2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger small">{formik.errors.email}</div>
            )}
          </div>
          <div className="mt-2">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger small">{formik.errors.password}</div>
            )}
          </div>
          <div className="mt-2">
            <label>Role</label>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-select"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="author">Author</option>
              <option value="user">User</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="text-danger small">{formik.errors.role}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Register
          </button>
          <div className="mt-3 text-center">
            <p className="text-sm">
              Already a User ?{" "}
              <Link className="text-decoration-none" to="/login">
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
