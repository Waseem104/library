// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  // formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/public/login`,
          values
        );
        if (data?.success) {
          setUser(data?.user);
          localStorage.setItem("token", data?.token);
          setTimeout(() => {
            navigate("/");
          }, 300);
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
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
        <h2 className="text-center">Login</h2>
        <form
          className="mt-4 d-flex flex-column justify-content-center"
          onSubmit={formik.handleSubmit}
        >
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

          <button type="submit" className="btn btn-primary mt-4">
            Login
          </button>
          <div className="mt-3 text-center">
            <p className="text-sm">
              New User ?{" "}
              <Link className="text-decoration-none" to="/register">
                Register Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
