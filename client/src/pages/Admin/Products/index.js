import { useQuery, useMutation, useQueryClient } from "react-query"
import { deleteProduct, fetchProductList } from "../../../api"
import { useMemo } from "react"
import { Flex, Text } from "@chakra-ui/react"

import { Link, useResolvedPath } from "react-router-dom"

import { Table, Button, Popconfirm } from "antd"
function Products() {
  const url = useResolvedPath("").pathname

  const queryClient = useQueryClient()
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["admin:products"],
    queryFn: fetchProductList,
  })

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin:products"] })
    },
  })

  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Proice",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <Popconfirm
              title="Are you suer ?"
              onConfirm={() => {
                deleteMutation.mutate(record._id)
              }}
              okText="Yes"
              cancalText="No"
            >
              <Button type="primary" danger style={{ marginLeft: "4px" }}>
                Delete
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ]
  }, [deleteMutation])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        pr="20px"
        pb="20px"
      >
        <Text fontSize="2xl" pl={5}>
          Products
        </Text>
        <Link to={"new"}>
          <Button type="dashed">New</Button>
        </Link>
      </Flex>
      <Table dataSource={data} columns={columns} rowKey="_id"></Table>
    </div>
  )
}

export default Products
