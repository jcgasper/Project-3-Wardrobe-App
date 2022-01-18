import React from 'react'
import {
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";

const CategoryDisplay = ({ category }) => {
  return (
    <FormControl>
      <FormLabel 
        htmlFor="category"
        fontSize='lg'
        fontWeight='bold'
        textColor='pink.700'
      >Item Category</FormLabel>
      <Text id="category">{category}</Text>
    </FormControl>
  );
}

export default CategoryDisplay;