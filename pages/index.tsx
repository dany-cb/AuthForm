import { Box, Button, Center, Heading, Spinner, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import fetcher from '../lib/fetcher'

const Home = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetcher('/me')
      .then((res) => setData(res))
      .catch((e) => console.error(e))
  }, [])
  return (
    <>
      <Button
        right="0"
        position="absolute"
        mr="5"
        mt="5"
        onClick={() => fetcher('/logout')}
      >
        Logout
      </Button>
      <Center height="100vh">
        {data ? (
          <VStack>
            <Heading>Congrats you made it here!</Heading>
            <Heading as="h2">Here's your secure personal info:</Heading>
            <VStack>
              <Box>Email: {data?.email}</Box>
              <Box>Username: {data?.username}</Box>
              <Box>CreatedAt: {data?.createdAt}</Box>
            </VStack>
          </VStack>
        ) : (
          <Spinner size="lg" />
        )}
      </Center>
    </>
  )
}

export default Home
