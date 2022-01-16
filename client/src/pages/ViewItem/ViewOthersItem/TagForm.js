import React from 'react'
import {
  FormControl,
  FormLabel,
  Box,
  HStack,
  Tag,
  TagLabel
} from "@chakra-ui/react";

const TagForm = ({ tags }) => {


  return (
    <FormControl>
      <FormLabel htmlFor="tags">Tags</FormLabel>
      <Box minH={3} pb={1}>
        <HStack>
          {tags.map((tag) => (
            <Tag key={tag}>
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </HStack>
      </Box>
    </FormControl>
  );

}

export default TagForm;