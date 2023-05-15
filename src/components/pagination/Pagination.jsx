import React from 'react'
import { Box, Button } from '@chakra-ui/react';

export function Pagination(props) {

  const { total, currentPage, setCurrentPage } = props;
  const numOfTotalPages = Math.ceil(total/6)

  const prevPageHandler = ()=>{
    if(currentPage !==1){
      setCurrentPage(currentPage-1)
    }
  }

  const nextPageHandler = ()=>{
    if(currentPage < numOfTotalPages){
      setCurrentPage(currentPage+1)
    }
  }

  return (
    numOfTotalPages > 1 && (
      <Box 
        display="flex" 
        flexDirection="row" 
        mt={{ base: "12px", md:'12px', lg: "0px" }}
        overflowX={{ base: "auto", md: "hidden" }}      
      >
        <Button variant='with-blue'  onClick={() => setCurrentPage(1)}>{"<<"}</Button>
        <Button variant='with-blue' onClick={prevPageHandler}>Prev</Button>
        {[...Array(numOfTotalPages).keys()].slice(Math.max(0, currentPage - 2), Math.min(numOfTotalPages, currentPage + 2)).map((page) => (
          <Button
            onClick={() => setCurrentPage(page+1)}
            key={page}
            variant={page+1 === currentPage  ? "solid" : "ghost"}
            colorScheme={page+1 === currentPage  ? "red" : "blue"}
          >
            {page+1}
          </Button>
        ))}
        <Button variant='with-blue' onClick={nextPageHandler}>Next</Button>
        <Button variant='with-blue' onClick={() => setCurrentPage(numOfTotalPages)}>{">>"}</Button>
      </Box>
    )
  );
};
