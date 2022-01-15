import React from 'react'
import {
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";

const DescriptionControl = ({ description }) => {
  return (
    <FormControl>
      <FormLabel htmlFor="description">Description</FormLabel>
      <Input
        id="description"
        isDisabled={true}
        value={description}
        maxLength="50"
      />
    </FormControl>
  );
}

export default DescriptionControl;