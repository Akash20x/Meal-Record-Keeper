import React, { useEffect, useState } from 'react'
import { Grid, GridItem, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Flex, Heading } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Sidebar } from '../sidebar/Sidebar';
import { Navbar } from '../navbar/Navbar';
import { MealModal } from '../modal/MealModal';
import { HamburgerIcon } from '@chakra-ui/icons';
import './mainContainer.css'
import { fetchUserProfile } from '../../services/authServices';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export function MainContainer({ children }) {

    const isMobile = useBreakpointValue({ base: true, lg: false });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpen2 , onOpen: onOpen2, onClose: onClose2 } = useDisclosure();

    const location = useLocation();
    const state = useSelector((state) => state.auth);
    const { isAdmin } = state
    const dispatch = useDispatch();

    const path = location.pathname.split("/")[1]

    useEffect(()=>{
      dispatch(fetchUserProfile())
    },[])
      
  

  return (
   <Grid templateColumns="repeat(6, 1fr)" bg="gray.50" minHeight="100vh">
    {/* sidebar */}
    {isMobile ? (
      <>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader fontWeight="bold">Meal Record</DrawerHeader>
              <DrawerBody>
                <Sidebar onClose={onClose} onOpen={onOpen2} isAdmin={isAdmin} />
              </DrawerBody>
            </DrawerContent>
        </Drawer>
        
      </>
    ) : (
      <GridItem
        as="aside"
        colSpan="1"
        bg="blue.300"
        p="30px"
        className="stickySideBar"
      >
        <Sidebar onOpen={onOpen2} isAdmin={isAdmin} />
      </GridItem>
    )}
    {/* main content & navbar */}
    <GridItem
      as="main"
      colSpan={{ base: 6, lg: 5, xl: 5 }}
      px="40px"
      py="30px"
    >
      <Flex alignItems="center" justify="space-between" className="stickyNav">
        <Flex justifyContent="center" alignItems="center">
        {isMobile && 
            <HamburgerIcon boxSize={8} onClick={onOpen} cursor="pointer"  mx="10px"/>
            }
            <Heading as="h1" color="#5d55e7">{path ==="dashboard" ? "Meals":
            path ==="meal" ? "Meal" : 
            path ==="meals" ? "Users Meals" : 
            path ==="users" ? "Users" : 
            path ==="stats" && "Stats" 
            }</Heading>
        </Flex>
        <Navbar />
      </Flex>
     {children}
     <MealModal isOpen = {isOpen2}  onClose = {onClose2}/>
    </GridItem>
   </Grid>
  )
}