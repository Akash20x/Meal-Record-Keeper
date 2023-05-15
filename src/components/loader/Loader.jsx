import { Grid, Spinner } from '@chakra-ui/react'
import React from 'react'

export function Loader({isHeight}) {
  return (
    <Grid placeItems="center" height={isHeight ? "100vh" : "50vh"}>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          /> 
    </Grid>
  )
}

