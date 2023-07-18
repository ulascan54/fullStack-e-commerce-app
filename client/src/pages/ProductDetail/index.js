import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { fetchProduct } from "../../api"
import { Box, Text, Button } from "@chakra-ui/react"
import ImageGallery from "react-image-gallery"
import { useBasket } from "../../contexts/BasketContex"

import moment from "moment"
function ProductDetail() {
  const { addToBasket, items } = useBasket()
  const { product_id } = useParams()
  const { isLoading, error, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  )
  if (isLoading) return <div>Loading...</div>

  if (error) return <div>An error has occurred: {error.message}</div>

  const findBasketItem = items.find((item) => item._id === product_id)
  const images = data.photos.map((url) => ({ original: url }))

  return (
    <div>
      <Button
        colorScheme="pink"
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? "Remove from basket" : "Add to basket"}
      </Button>
      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
      <p>{data.description}</p>
      <Box margin="10">
        <ImageGallery
          items={images}
          showThumbnails={false}
          showPlayButton={false}
        />
      </Box>
    </div>
  )
}

export default ProductDetail
