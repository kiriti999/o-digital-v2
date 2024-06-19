import * as yup from "yup";

export const signupSchema = yup.object({
  firstName: yup.string().required("Name is required"),
  lastName: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!+@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const addTaskSchema = yup.object({
  title: yup.string().max(50).required("Title is required"),
  description: yup.string().max(500).required("Description is required"),
});
