import React from "react"
import { useMutation, useQueryClient } from "react-query"
import { postProduct } from "../../../api"
import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  Button,
  FormHelperText,
} from "@chakra-ui/react"
import { Formik, FieldArray } from "formik"

import { message } from "antd"

import validationSchema from "./validations"

function NewProduct() {
  const queryClient = useQueryClient()
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin:products"] })
    },
  })
  const handleSubmit = async (values, bag) => {
    try {
      message.loading({
        content: "Loading new product ....",
        key: "product:new",
        duration: 2,
      })

      const newValues = {
        ...values,
        photos: JSON.stringify(values.photos),
      }

      console.log(newValues)

      newProductMutation.mutate(newValues, {
        onSuccess: () => {
          message.success({
            content: "The product added successfully",
            key: "product:new",
            duration: 2,
          })
        },
      })
    } catch (error) {
      console.log(error)
      message.error({
        content: "The product added failed",
        key: "product:new",
        duration: 2,
      })
    }
  }

  return (
    <div>
      <Text fontSize="2xl" pl={5}>
        Add New Product
      </Text>
      <Formik
        initialValues={{
          title: "t",
          description: "t",
          price: "t",
          photos: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <Box>
              <Box
                my={5}
                textAlign="left"
                style={{
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <FormControl my={3}>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      disabled={isSubmitting}
                      isInvalid={errors.title && touched.title}
                    />
                    {errors.title && touched.title && (
                      <FormHelperText color="red">
                        Error: {errors.title}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl my={3}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      disabled={isSubmitting}
                      isInvalid={errors.description && touched.description}
                    />
                    {errors.description && touched.description && (
                      <FormHelperText color="red">
                        Error: {errors.description}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl my={3}>
                    <FormLabel>Price</FormLabel>
                    <Input
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      disabled={isSubmitting}
                      isInvalid={errors.price && touched.price}
                    />
                    {errors.price && touched.price && (
                      <FormHelperText color="red">
                        Error: {errors.price}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl my={3}>
                    <FormLabel>Photos</FormLabel>
                    <FieldArray
                      name="photos"
                      render={(arrayHelpers) => (
                        <div>
                          {values.photos &&
                            values.photos.map((photo, index) => (
                              <div key={index}>
                                <Flex>
                                  <Input
                                    name={`photos.${index}`}
                                    value={photo}
                                    disabled={isSubmitting}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    mb={3}
                                  />
                                  <Button
                                    style={{
                                      marginLeft: 5,
                                    }}
                                    onClick={() => arrayHelpers.remove(index)}
                                    colorScheme="red"
                                  >
                                    Remove
                                  </Button>
                                </Flex>
                              </div>
                            ))}
                          <Button
                            style={{
                              margin: 5,
                            }}
                            onClick={() => arrayHelpers.push("")}
                          >
                            Add a Photo
                          </Button>
                        </div>
                      )}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="pink"
                    w="full"
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                </form>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </div>
  )
}

export default NewProduct
