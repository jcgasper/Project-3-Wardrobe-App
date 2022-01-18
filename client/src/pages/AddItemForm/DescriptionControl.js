import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const DescriptionControl = ({ formState, setFormState }) => {
  return (
    <FormControl>
      <FormLabel htmlFor="description" fontSize='lg' fontWeight='bold' textColor='pink.700'>Description</FormLabel>
      <Input
        id="description"
        borderRadius={0}
        focusBorderColor='pink.400'
        borderColor='pink.700'
        placeholder="Type a description of your item (optional)"
        value={formState.description}
        onChange={(e) => setFormState({ ...formState, description: e.target.value })}
        maxLength="50"
      />
    </FormControl>
  );
}

export default DescriptionControl;