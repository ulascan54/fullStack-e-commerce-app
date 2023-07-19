import React from "react"
import { Route, Routes, Link, useResolvedPath } from "react-router-dom"
import styles from "./styles.module.css"
import { Box } from "@chakra-ui/react"
import Home from "./Home"
import Orders from "./Orders"
import Products from "./Products"
import ProductDetail from "./ProductDetail"
import NewProduct from "./Products/new"
function Admin() {
  const url = useResolvedPath("").pathname

  return (
    <div>
      <nav>
        <ul className={styles.adminMenu}>
          <li>
            <Link to={url}>Home</Link>
          </li>
          <li>
            <Link to={`${url}/orders`}>Orders</Link>
          </li>
          <li>
            <Link to={`${url}/products`}>Products</Link>
          </li>
        </ul>
      </nav>

      <Box mt={10}>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={`/orders`} element={<Orders />} />
          <Route path={`/products`} element={<Products />} />
          <Route path={`/products/:product_id`} element={<ProductDetail />} />
          <Route path={`/products/new`} element={<NewProduct />} />
        </Routes>
      </Box>
    </div>
  )
}

export default Admin
