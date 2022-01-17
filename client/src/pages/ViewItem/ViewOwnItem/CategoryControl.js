import React from 'react'
import {
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

const CategoryControl = ({ formState, setFormState }) => {
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="type">Item Category</FormLabel>
      <Select id="type" w={200} defaultValue={formState.category} onChange={(e) => setFormState({ ...formState, category: e.target.value, hasChanges: true })}>
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