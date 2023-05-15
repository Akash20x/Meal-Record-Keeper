
import React from 'react'
import { NavLink } from 'react-router-dom'
import { HStack, List, ListItem,Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react'
import { MdOutlinePeopleAlt,MdAssessment, MdOutlineFoodBank } from 'react-icons/md'


export function Sidebar({onClose: onCloseDrawer,onOpen: onOpenModal,isAdmin}) {
  
 
  return (
    <List fontSize="1.2em" spacing={4}>
      <ListItem fontWeight="bold" color={!onCloseDrawer ? "white":"black.200"}>
        <NavLink to="/dashboard">
          <Text fontWeight="medium">Dashboard</Text>
        </NavLink>
      </ListItem>
      <ListItem>
        <HStack 
          _hover={{ bg: "#4f46e5" }} 
          borderRadius="5px" 
          p="4px" 
          display="inline-flex"
          alignItems="center"  
        >
          <AddIcon/>
          {!onCloseDrawer ? 
            <Text onClick={onOpenModal} cursor="pointer" fontWeight="medium"> Add Meal</Text> :
            <Text onClick={() => {onOpenModal(true);  onCloseDrawer(true)}} fontWeight="medium" cursor="pointer">Add Meal</Text>
          }
        </HStack>
      </ListItem>
      {
        isAdmin &&  
        <>
        <ListItem>
          <NavLink to="/users">
            <HStack 
              _hover={onCloseDrawer ? {} : { bg: "#4f46e5" }}  
              p="5px" 
              display="inline-flex" 
              borderRadius="5px" 
              fontWeight="medium"
              alignItems="center"  
            >
              <Icon as={MdOutlinePeopleAlt}  boxSize={7} />
              <Text>Users</Text>
            </HStack>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/meals"> 
            <HStack 
              _hover={onCloseDrawer ? {} : { bg: "#4f46e5" }}  
              p="5px" 
              display="inline-flex" 
              borderRadius="5px" 
              fontWeight="medium" 
              ml="-4px"
              alignItems="center"  
            >
              <Icon as={MdOutlineFoodBank}  boxSize={8} />
              <Text>Meals</Text>
            </HStack>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink to="/stats">      
            <HStack 
              _hover={onCloseDrawer ? {} : { bg: "#4f46e5" }}  
              p="5px" 
              display="inline-flex" 
              borderRadius="5px" 
              fontWeight="medium" 
              ml="-4px"
              alignItems="center"  
            >
              <Icon as={MdAssessment}  boxSize={8} />
              <Text>Stats</Text>
            </HStack>
          </NavLink>
        </ListItem>
        </>
      }   
    </List>
  )
}
