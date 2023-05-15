import { format, parse } from 'date-fns';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {  Flex, Heading, Box, SimpleGrid, Card, CardHeader, CardBody, Text, Grid } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMeals } from '../../services/mealsServices';
import { Loader } from '../../components';


export function Dashboard() {
  

  const state = useSelector((state) => state.meals);
  const { meals, mealsLoading } = state ?? {};
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAllMeals());
    },[])


    function getCorrectTime(time){
      const exdata = parse(time, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()) 
      const mealTime  =  format(exdata, "hh:mm a")
      return mealTime
    }

  return (
    <SimpleGrid 
    spacing={10} 
    minChildWidth={300} 
    mt="30px" 
    maxW={meals.length === 1 && { base: "", md:'', lg: "400" }}     
    >
      {mealsLoading ? 
        <Loader/>
        : (
            meals?.map(item => (
            <Link to={`/meal/${item._id}`} key={item._id}>
              <Card borderTop="8px" borderColor="purple.400" bg="white">

                <CardHeader color="gray.700">
                      <Heading as="h3" size="sm">Meal Name</Heading>
                      <Text>{item.name}</Text>
                </CardHeader>

                <CardBody color="gray.500">
                  <Flex  justify="space-between">
                    <Box>
                      <Heading as="h3" size="sm">Time</Heading>
                      <Text>{getCorrectTime(item.time)}</Text>
                    </Box>
                    <Box>
                      <Heading as="h3" size="sm">Calories</Heading>
                      <Text>{item.calories}</Text>
                    </Box>
                  </Flex>
                </CardBody>

              </Card>
            </Link>
        ))
      )}
    </SimpleGrid>
  )
}
