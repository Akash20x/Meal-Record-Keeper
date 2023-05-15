import React from 'react'
import { MealEditor } from './MealEditor'
import { Modal } from '@chakra-ui/react'


export function MealModal({isOpen,onClose,id,mealData,admin}) {
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'sm'}} isCentered>
      <MealEditor onClose={onClose} id={id} mealData={mealData} admin={admin} />
    </Modal> 
  )
}
