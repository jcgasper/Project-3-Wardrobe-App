import React from 'react'
import {
  FormControl,
  FormLabel,
  Text
} from "@chakra-ui/react";

const DescriptionDisplay = ({ description }) => {
  return (
    <FormControl>
      <FormLabel
        htmlFor="description"
        fontSize='lg'
        fontWeight='bold'
        textColor='pink.700'
      >Description</FormLabel>
      <Text>{description}</Text>
    </FormControl>
  );
}

export default DescriptionDisplay;