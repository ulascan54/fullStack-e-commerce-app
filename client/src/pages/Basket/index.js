import { useRef, useState } from "react"
import { useBasket } from "../../contexts/BasketContex"
import {
  Alert,
  Button,
  Image,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import CIcon from "@coreui/icons-react"
import { cilTrash } from "@coreui/icons"
import { postOrder } from "../../api"

function Basket() {
  const [address, setAddress] = useState()
  const { items, removeFromBasket, emptyBasket } = useBasket()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const handleSubmitForm = async () => {
    const itemsIds = items.map((item) => item._id)
    const input = {
      address,
      items: JSON.stringify(itemsIds),
    }

    await postOrder(input)
    setAddress("")
    emptyBasket()
    onClose()
  }
  const total = items.reduce((acc, item) => acc + item.price, 0)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        margin: "0 auto",
      }}
    >
      {items.length < 1 && (
        <Alert status="warning">You have not any items in your basket</Alert>
      )}
      {items.length > 0 && (
        <Box>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              alignItems: "center",
            }}
          >
            {items.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor: "#eee",
                  width: "350px",
                  margin: "5px",
                  borderRadius: "7px",
                  position: "relative",
                  fontSize: "16px",
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {item.title} - {item.price}
                </Box>
                <Link to={`/product/${item._id}`}>
                  <Image
                    rounded="lg"
                    width="120px"
                    height="120px"
                    fit="cover"
                    src={item.photos[0]}
                    draggable="false"
                    loading="lazy"
                    alt={`basket ${item.title}`}
                  />
                </Link>
                <Button
                  position="absolute"
                  bottom={5}
                  right={5}
                  mt="2"
                  p="2"
                  colorScheme="pink"
                  onClick={() => {
                    removeFromBasket(item._id)
                  }}
                >
                  <CIcon
                    icon={cilTrash}
                    size="xxl"
                    style={{ "--ci-primary-color": "white" }}
                  />
                </Button>
              </li>
            ))}
          </ul>
          <Box mt={10} fontSize={22}>
            Total: {total} TL
          </Box>

          <Button colorScheme="green" onClick={onOpen}>
            Order
          </Button>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={() => {
              setAddress("")
              onClose()
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Adress</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Adress"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setAddress("")
                    onClose()
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </div>
  )
}

export default Basket
