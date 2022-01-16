import React from 'react'
import {
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";

const CategoryControl = ({ category }) => {
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="category">Item Category</FormLabel>
      <Text id="category">{category}</Text>
    </FormControl>
  );
}

export default CategoryControl;