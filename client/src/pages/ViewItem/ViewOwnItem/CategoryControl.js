import React from 'react'
import {
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

const CategoryControl = ({ formState, setFormState }) => {
  return (
    <FormControl isRequired>
      <FormLabel 
        htmlFor="type"
        fontSize='lg'
        fontWeight='bold'
        textColor='pink.700'
      >Item Category</FormLabel>
      <Select
        id="type"
        w={200}
        borderRadius={0}
        focusBorderColor='pink.400'
        borderColor='pink.700'
        iconColor='pink.700' 
        defaultValue={formState.category}
        onChange={(e) => setFormState({ ...formState, category: e.target.value, hasChanges: true })}
      >
        <option>Top</option>
        <option>Bottom</option>
        <option>Outerwear</option>
        <option>Footwear</option>
        <option>Accessory</option>
      </Select>
    </FormControl>
  );
}

export default CategoryControl;