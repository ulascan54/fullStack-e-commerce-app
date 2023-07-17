import * as yup from "yup"

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is a required field"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "This field must be same as the password")
    .required("Password confirmation is a required field"),
})

export default validations
