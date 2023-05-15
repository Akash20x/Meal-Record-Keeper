import React, { useEffect } from 'react'
import { Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react';
import { fetchStats } from '../../services/adminServices';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components';

export function Stats() {

  const state = useSelector((state) => state.admin);
  const { stats,statsLoading } = state;
  const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(fetchStats());
    },[])

    return (
      <>
        {statsLoading ? (
          <Loader />
        ) : (
          <StatGroup py="100px" px={{ base: '100px', xl: '120px' }}>
            <Stat m="10px" textAlign="center">
              <StatLabel>UserCount</StatLabel>
              <StatNumber>{stats.userCount}</StatNumber>
            </Stat>
    
            <Stat m="10px" textAlign="center">
              <StatLabel>MealCount</StatLabel>
              <StatNumber>{stats.mealCount}</StatNumber>
            </Stat>
    
            <Stat m="10px" textAlign="center">
              <StatLabel>AdminCount</StatLabel>
              <StatNumber>{stats.adminCount}</StatNumber>
            </Stat>
          </StatGroup>
        )}
      </>
    );
}

