import { Button, Center, Container, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';


export function Home() {

  return (
    <Center h="100vh">
      <Container as="section" textAlign="center" bg="white" py="20px" borderRadius="md" m="10px" boxShadow="0 0 10px rgba(0, 0, 0, 0.2)">
        <Heading p="10px" color="#5d55e7">Meal Record Keeper</Heading>
        <Text p="10px">A web app for organizing your meals daily</Text>
        <Link to="/login">
          <Button variant="with-blue">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="with-blue">Signup</Button>
        </Link>
      </Container>
    </Center>
  );
}
