import * as yup from "yup"

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  price: yup.string().required("Price is required"),
})

export default validationSchema
