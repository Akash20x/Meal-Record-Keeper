import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Badge, Box, Button, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, useBreakpointValue } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../feature/auth-slice';

export function Navbar() {

  const navigate = useNavigate();
  

  const state = useSelector((state) => state.auth);
  const { user } = state

  const dispatch = useDispatch();

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const handleLogout = () =>{
      dispatch(logOut())
      navigate('/login')
    }
  
  return (
    <Box as="nav" p="10px"  alignItems="center">
    {!isMobile ? (
      <HStack spacing="20px">
        <Badge
          py={2}
          px={4}
          variant="subtle"
          textTransform="lowercase"
          fontSize="sm"
          colorScheme={user.role === "admin" ? "purple" : "green"}
        >{user.role}
        </Badge>
        <Text>{user.email}</Text>
        <Button variant='with-blue' onClick={handleLogout}>Logout</Button>
      </HStack>
    ):(
    <HStack>
      <Menu>
        <MenuButton as={IconButton} icon={<InfoIcon />} bg="red.300" _hover={{ bg: "blue.500" }}>
        </MenuButton>
        <MenuList>
          <MenuItem>{user.role}</MenuItem>
          <MenuItem>{user.email}</MenuItem>
        </MenuList>
      </Menu>
      <Button variant="with-blue" onClick={handleLogout}>Logout</Button>
    </HStack>
   )}
    </Box>
  )
}

