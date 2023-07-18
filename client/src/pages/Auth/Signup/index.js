import {
  Flex,
  Button,
  Input,
  Heading,
  FormControl,
  FormLabel,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  FormHelperText,
} from "@chakra-ui/react"
import validationSchema from "./validations"
import { useFormik } from "formik"
import { fetchRegister } from "../../../api"
import { useAuth } from "../../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
function Signup() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        })
        login(registerResponse)
        navigate("/profile")
      } catch (error) {
        bag.setErrors({ general: error.response.data.message })
      }
    },
  })

  return (
    <div>
      <Flex align="center" w="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ width: "300px" }}
                  value={formik.values.email}
                  isInvalid={formik.errors.email && formik.touched.email}
                />

                {formik.errors.email && formik.touched.email && (
                  <FormHelperText color="red">
                    Error: {formik.errors.email}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel mt={4}>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ width: "300px" }}
                  value={formik.values.password}
                  isInvalid={formik.errors.password && formik.touched.password}
                />

                {formik.errors.password && formik.touched.password && (
                  <FormHelperText color="red">
                    Error: {formik.errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl>
                <FormLabel mt={4}>Password</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{ width: "300px" }}
                  value={formik.values.passwordConfirm}
                  isInvalid={
                    formik.errors.passwordConfirm &&
                    formik.touched.passwordConfirm
                  }
                />
                {formik.errors.passwordConfirm &&
                  formik.touched.passwordConfirm && (
                    <FormHelperText color="red">
                      Error: {formik.errors.passwordConfirm}
                    </FormHelperText>
                  )}
              </FormControl>

              <Button mt={4} type="submit" w="100%">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>

      <Stack spacing={3} position="fixed" bottom={0} left={0} p="10px">
        {formik.errors.general && (
          <Alert status="error" borderRadius={15} overflow="hidden">
            <AlertIcon />
            <AlertTitle>Data base error!</AlertTitle>
            <AlertDescription>{formik.errors.general}</AlertDescription>
          </Alert>
        )}
      </Stack>
    </div>
  )
}

export default Signup
