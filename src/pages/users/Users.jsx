import React, { useEffect } from 'react'
import { Loader, Pagination } from '../../components';
import { useState } from 'react';
import { Badge, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, makeAdmin } from '../../services/adminServices';

export function Users() {

  const [currentPage,setCurrentPage] = useState(1)
  
  const state = useSelector((state) => state.admin);
  const { usersList, usersListLoading,user } = state ?? {};
  const dispatch = useDispatch();
  
  
  useEffect(()=>{
      dispatch(fetchAllUsers(currentPage));
  },[currentPage,user])


    const handleChangeRole = (id,roleStats)=>{
      const isAdmin = roleStats === "admin" ? false : true
      const role = {"isAdmin": isAdmin}
       dispatch(makeAdmin({id,role}));
    }
    return (
      <>
      {usersListLoading ? (
       <Loader/>  
      ):(
      <>
      <TableContainer
        fontWeight="medium" 
        mt={{ base: "30px", md:'20px', lg: "5px" }}
        mb="10px"
        >
      <Table variant='simple'  size="md">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Email</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {usersList?.users?.map((data) => (
            <Tr key={data._id}>
              <Td> {data._id}</Td>
              <Td> {data.email}</Td>
              <Td onClick={()=>handleChangeRole(data._id,data.role)}>
              <Badge 
              variant='subtle' 
              colorScheme={data.role === "admin" ? "red" : "green"}
              cursor="pointer"
              >{data.role}
              </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
      <Pagination
        total={usersList? usersList.total: 1}
        currentPage={currentPage}
        setCurrentPage = {setCurrentPage}
      />
      </>
      )}
    </>
    )
}

