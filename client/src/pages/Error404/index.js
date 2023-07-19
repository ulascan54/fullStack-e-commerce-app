import React from "react"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"

import errorImage from "./404.jpg"

function Error404() {
  return (
    <>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          <strong>404.</strong> That's an error.
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          The requested URL was not found on this server. That's all we know.
        </AlertDescription>
      </Alert>
      <img
        src={errorImage}
        alt=""
        style={{
          margin: "20px auto",
          objectFit: "cover",
          width: "250px",
        }}
      />
    </>
  )
}

export default Error404
