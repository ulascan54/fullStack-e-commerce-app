import React from "react"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import { Button, Text, Box } from "@chakra-ui/react"
import { useAuth } from "../../contexts/AuthContext"
import { useBasket } from "../../contexts/BasketContex"
import CIcon from "@coreui/icons-react"
import { cilUser, cilCart } from "@coreui/icons"

function Navbar() {
  const { loggedIn, user } = useAuth()
  const { items } = useBasket()

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">eCommerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="pink">Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="pink">Register</Button>
            </Link>
          </>
        )}

        {loggedIn && (
          <Box display="flex">
            {items.length > 0 && (
              <Box
                display="flex"
                pr={2}
                justifyContent="center"
                alignItems="center"
              >
                <Text
                  fontSize="22px"
                  fontWeight="semibold"
                  pr="2"
                  color="GrayText"
                >
                  {items.length}
                </Text>
                <Link to="/basket">
                  <Button colorScheme="pink" p={2}>
                    <CIcon
                      icon={cilCart}
                      size="lg"
                      style={{ "--ci-primary-color": "white" }}
                    />
                  </Button>
                </Link>
              </Box>
            )}
            {user?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="blue" p={2} w={100} variant="ghost">
                  Admin
                  <CIcon
                    icon={cilUser}
                    size="sm"
                    style={{
                      "--ci-primary-color": "black",
                      padding: "6px",
                      paddingRight: "0",
                    }}
                  />
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
          </Box>
        )}
      </div>
    </nav>
  )
}

export default Navbar
