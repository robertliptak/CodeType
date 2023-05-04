import * as Yup from "yup";

const registrationValidationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(1, "Username should have a minimum length of 1")
    .max(20, "Username should have a maximum length of 20")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username should only contain alphanumeric characters",
    ),
  email: Yup.string()
    .email("Email should be a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password cannot be longer than 64 characters")
    .matches(
      /^(?=.*\d)(?=.*[A-Z])[A-Za-z\d@$!%*?&]*$/,
      "Password must contain at least 1 capital letter and 1 number",
    ),
  confirmedPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password cannot be longer than 64 characters")
    .matches(
      /^(?=.*\d)(?=.*[A-Z])[A-Za-z\d@$!%*?&]*$/,
      "Password must contain at least 1 capital letter and 1 number",
    ),
});

export default registrationValidationSchema;
