import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const DescriptionControl = ({ formState, setFormState }) => {
  return (
    <FormControl>
      <FormLabel htmlFor="description">Description</FormLabel>
      <Input
        id="description"
        placeholder="Type a description of your item (optional)"
        value={formState.description}
        onChange={(e) => setFormState({ ...formState, description: e.target.value })}
        maxLength="100"
      />
    </FormControl>
  );
}

export default DescriptionControl;