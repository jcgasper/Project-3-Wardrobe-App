import React from 'react'
import {
  FormControl,
  FormLabel,
  Text
} from "@chakra-ui/react";

const DescriptionControl = ({ description }) => {
  return (
    <FormControl>
      <FormLabel htmlFor="description">Description</FormLabel>
      <Text>{description}</Text>
    </FormControl>
  );
}

export default DescriptionControl;