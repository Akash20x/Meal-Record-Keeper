
import React, { useState } from 'react'
import TimePicker from 'react-time-picker';
import { parse, format,isValid } from 'date-fns'
import { Button, FormControl, FormLabel, Input, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { createMeal, updateMeal } from '../../services/mealsServices';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserMeal } from '../../services/adminServices';

export function MealEditor({id,mealData,admin,onClose}) {

  const dispatch = useDispatch();
  

  const dateObj = parse(mealData?.time, 'h:mm aa', new Date()) 

  const [value, onChange] = useState(mealData? dateObj : new Date());

  const [formData, setFormData] = useState({
    name: mealData?.name || "",
    calories:mealData?.calories || ""
    });

  const fillFormValue = (event, fieldName) => {
    const { value } = event.target;
    setFormData((form) => ({ ...form, [fieldName]: value }));
  };

  const handleMeal = async (e) => {
    e.preventDefault();
    const date = parse(value, "HH:mm", new Date()) 
    const time = isValid(date)? format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : value
    const { name, calories } = formData;
    const meal = {
            "name": name,
            "time": time,
            "calories": calories
        }

    try {
          await admin? dispatch(updateUserMeal({meal,id})) : mealData? 
            dispatch(updateMeal({meal,id})) : dispatch(createMeal(meal));

            onClose();
          } catch (error) {
          console.error(error);
          }
      }

  return (
    <>
      <ModalOverlay />
      <ModalContent>

        <ModalHeader>
          {mealData ? "Update your meal": "Add your meal"}
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody pb={6}>
          <form onSubmit={handleMeal}>
            <FormControl isRequired>
              <FormLabel>Meal Name</FormLabel>
              <Input 
                 type="text"
                 value={formData.name}
                 placeholder="Meal name"
                 onChange={(e) => fillFormValue(e, "name")}
              />
            </FormControl>

            <FormControl my="20px">
              <FormLabel>Meal Time</FormLabel>
              <TimePicker 
                amPmAriaLabel="Select AM/PM"
                format="h:m a"
                onChange={onChange}
                value={value}
                clearIcon={null}
              />    
            </FormControl>
          
            <FormControl>
              <FormLabel>Meal Calories</FormLabel>
              <Input 
                type="text"
                value={formData.calories}
                placeholder="Meal Calories"
                onChange={(e) => fillFormValue(e, "calories")}
              />
            </FormControl>

            <Button variant="with-blue" type="submit" mt="15px" ml="-1px">
              {mealData ? "Update Meal": "Add Meal"}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </>
  )
}
