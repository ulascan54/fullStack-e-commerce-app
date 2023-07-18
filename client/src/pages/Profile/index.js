import { Button, Text, Box } from "@chakra-ui/react"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const handleLogout = async () => {
    logout(() => {
      navigate("../")
    })
  }
  return (
    <div>
      <Text fontSize="22">Profile</Text>
      <code>{JSON.stringify(user)}</code>
      <Box mt={5}>
        <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </div>
  )
}

export default Profile
