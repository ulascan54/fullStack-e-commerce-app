import React from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetchProduct, updateProduct } from "../../../api"
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

function ProductDetail() {
  const { product_id } = useParams()
  const { isLoading, isError, data, error } = useQuery(
    ["admin:product", product_id],
    () => fetchProduct(product_id)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error :{error.message}</div>
  }
  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading...", key: "product:update" })
    try {
      await updateProduct(values, product_id)
      message.success({
        content: "The product updated successfully",
        key: "product:update",
        duration: 2,
      })
    } catch (error) {
      message.success({
        content: "The product updated failed",
        key: "product:update",
        duration: 2,
      })
      console.log(error)
    }
  }

  return (
    <div>
      <Text fontSize="2xl" pl={5}>
        Product Detail
      </Text>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
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
                            type="primary"
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
                    Update
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

export default ProductDetail
