import React from "react"
import {
  Flex,
  Button,
  Input,
  Heading,
  FormControl,
  FormLabel,
  Box,
} from "@chakra-ui/react"
import validationSchema from "./validations"
import { useFormik } from "formik"

function Signup() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      console.log(values)
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
                  value={formik.values.email}
                />
              </FormControl>

              <FormControl>
                <FormLabel mt={4}>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </FormControl>

              <FormControl>
                <FormLabel mt={4}>Password</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                />
              </FormControl>

              <Button mt={4} type="submit" w="100%">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Signup
