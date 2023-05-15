import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Loader, MealModal, Pagination } from '../../components';
import { format, parse } from 'date-fns';
import { IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserMeal, fetchAllUserMeals, getUserMeal } from '../../services/adminServices';

export function Meals() {

  const [currentPage,setCurrentPage] = useState(1)
  const [mealData,setMealData] = useState({})
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const state = useSelector((state) => state.admin);
  const { allMeals, allMealsLoading } = state ?? {};
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(fetchAllUserMeals(currentPage));
    },[currentPage])




  const getTime = (time)=>{ 
    const exdata = parse(time, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()) 
    const mealTime  =  format(exdata, "hh:mm a")
    return mealTime
  }
    
  const handleDeleteMeal = (id) => {
      dispatch(deleteUserMeal(id));  
  };
    

  const handleUpdateMeal = async (id) => {
     const result = await getUserMeal(id);
      setMealData({
            id : result._id,
          name: result.name,
          time: getTime(result.time),
          calories: result.calories
      })
      onOpen(true)
  };
    
  return (
    <>
    {allMealsLoading ? (
     <Loader/>  
    ):(
    <>
    <TableContainer 
      fontWeight="medium" 
      overflowY={'scroll'}
      mt={{ base: "30px", md:'20px', lg: "5px" }}
      style={{ maxHeight: "68vh" }}
    >
      <Table variant='simple' size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Calories</Th>
            <Th>Time</Th>
            <Th>UserId</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allMeals?.meals?.map((data) => (
            <Tr>
              <Td> {data._id}</Td>
              <Td> {data.name}</Td>
              <Td> {data.calories}</Td>
              <Td> {getTime(data.time)}</Td>
              <Td> {data.userId}</Td>
              <Td>
                <IconButton
                  aria-label="Edit meal"
                  icon={<EditIcon />}
                  size="md"
                  variant="outline"
                  colorScheme="blue"
                  onClick={() => handleUpdateMeal(data._id)}
                />
                <IconButton
                  aria-label="Delete meal"
                  icon={<DeleteIcon />}
                  size="md"
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => handleDeleteMeal(data._id)}
              />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

    </TableContainer>
    <Pagination
      total={allMeals? allMeals.total: 1}
      currentPage={currentPage}
      setCurrentPage = {setCurrentPage}
    />
    <MealModal isOpen = {isOpen}  onClose = {onClose}  id={mealData.id} mealData={mealData} admin={true}/> 
    </>
    )}
  </>
  )
}

