import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { format, parse } from 'date-fns';
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { MealModal } from '../modal/MealModal';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { deleteMeal, fetchMeal } from '../../services/mealsServices';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../loader/Loader';

export function MealCard() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [mealData,setMealData] = useState({})

  const state = useSelector((state) => state.meals);
  const { singleMeal, singleMealLoading } = state;
  const dispatch = useDispatch();

  const { name,time,calories } = singleMeal ?? {};

  const exdata = time? parse(time, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()) : null
  const mealTime  = exdata? format(exdata, "hh:mm a") : null
  
  useEffect(()=>{
    dispatch(fetchMeal(id))
  },[])

  const handleUpdateMeal =  () => {
    onOpen(true)
    setMealData({
      name: name,
      time: mealTime,
      calories: calories
    })

  };

  const handleDeleteMeal = () => {
        dispatch(deleteMeal(id));
         navigate('/dashboard')
  };

  return (
  <>
  {singleMealLoading ? (
    <Loader/>
  ): (
    <>
    <Card mx="auto" borderTop="8px" borderColor="purple.400" bg="white" maxW="sm" my="100px">
      <CardHeader color="gray.700">
        <Heading as="h3" size="sm">Meal Name</Heading>
        <Text>{name}</Text>
      </CardHeader>

      <CardBody color="gray.500">
        <Flex  justify="space-between">
          <Box>
            <Heading as="h3" size="sm">Time</Heading>
            <Text>{mealTime}</Text>
          </Box>
          <Box>
            <Heading as="h3" size="sm">Calories</Heading>
            <Text>{calories}</Text>
          </Box>
        </Flex>
      </CardBody>

      <CardFooter display="flex" justifyContent="center">
        <ButtonGroup spacing='2'  justifyContent="center" w="100%" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
          <Button variant='outline' colorScheme='blue' onClick={()=> navigate('/dashboard')}>
            <ArrowBackIcon boxSize={6} />
          </Button>
          <Button variant='solid' colorScheme='blue' onClick={handleUpdateMeal}>
            Update Meal
          </Button>
          <Button variant="outline" colorScheme='blue' onClick={handleDeleteMeal}>
            Delete Meal
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
    <MealModal isOpen = {isOpen}  onClose = {onClose}  id={id} mealData={mealData}/>
    </>
     )}    
 </>
  )
}

